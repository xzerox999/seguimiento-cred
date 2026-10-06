/**
 * INTEGRACIÓN CON GOOGLE SHEETS API + CACHÉ LOCAL (OFFLINE-FIRST)
 */

const Api = {
  // URL por defecto para que funcione automáticamente en cualquier PC sin necesidad de configuración previa
  DEFAULT_API_URL: 'https://script.google.com/macros/s/AKfycbwBJhO80aV4gO1CkuprApn-TlDdh6_QCn9GKY7e7nv1fwiwIQdHgVMRzwS8a2Ix9a0DjQ/exec',

  // CONFIGURACIÓN DE LA URL DE GOOGLE APPS SCRIPT
  // Se lee de localStorage; si está vacío, usa la URL predeterminada del proyecto.
  getApiUrl() {
    return (localStorage.getItem('cred_api_url') || this.DEFAULT_API_URL).trim();
  },

  setApiUrl(url) {
    localStorage.setItem('cred_api_url', (url || '').trim());
  },

  // Inicializar base de datos local vacía si no existe
  initLocalDb() {
    if (!localStorage.getItem('cred_db')) {
      const emptyDb = {
        pacientes: [],
        seguimientoCred: [],
        seguimientoAnemia: [],
        lastSync: null
      };
      localStorage.setItem('cred_db', JSON.stringify(emptyDb));
    }
    if (!localStorage.getItem('cred_sync_queue')) {
      localStorage.setItem('cred_sync_queue', JSON.stringify({
        pacientes: [],
        seguimientoCred: [],
        seguimientoAnemia: []
      }));
    }
  },

  // Obtener base de datos local
  getLocalDb() {
    this.initLocalDb();
    return JSON.parse(localStorage.getItem('cred_db'));
  },

  // Guardar en base de datos local
  saveLocalDb(db) {
    localStorage.setItem('cred_db', JSON.stringify(db));
  },

  // Obtener cola de sincronización pendiente
  getSyncQueue() {
    this.initLocalDb();
    return JSON.parse(localStorage.getItem('cred_sync_queue'));
  },

  // Guardar cola de sincronización
  saveSyncQueue(queue) {
    localStorage.setItem('cred_sync_queue', JSON.stringify(queue));
  },

  // COMPROBAR CONEXIÓN Y ESTADO DE LA API
  hasConfiguredApi() {
    return this.getApiUrl() !== '';
  },

  // Desempaqueta datos ya sea que vengan en formato compacto {headers, rows} o en objetos
  _unpackRows(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (raw.headers && Array.isArray(raw.rows)) {
      const { headers, rows } = raw;
      return rows.map(r => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = r[i] !== undefined ? r[i] : "";
        });
        return obj;
      });
    }
    return [];
  },

  // CLIENTE HTTP ROBUSTO CON REDIRECTS DE GOOGLE, TIMEOUT Y REINTENTOS
  async _fetchWithRetry(url, options = {}, maxRetries = 2) {
    const timeoutMs = 90000; // 90 segundos para dar amplio margen en conexiones lentas
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      let timeoutId;
      try {
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const fetchOptions = {
          ...options,
          redirect: 'follow', // OBLIGATORIO para el redirect 302 que siempre hace Apps Script
          signal: controller.signal
        };

        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);

        if (response.status === 403) {
          throw new Error("Error 403 (Acceso Denegado): La Web App de Google Apps Script no tiene permisos públicos. En Apps Script ve a Implementar > Administrar implementaciones y asegúrate de configurar 'Quién tiene acceso: Cualquiera'.");
        }

        if (response.status === 404) {
          throw new Error("Error 404: El servidor de Google Apps Script tardó demasiado en procesar o la URL es incorrecta.");
        }

        if (!response.ok) {
          throw new Error(`Error en el servidor de Google (HTTP ${response.status}: ${response.statusText})`);
        }

        const text = await response.text();

        // Si Google devuelve una página HTML de error/login en vez de JSON
        if (text.startsWith('<!DOCTYPE') || text.startsWith('<html') || text.includes('accounts.google.com')) {
          throw new Error("Google devolvió una pantalla de inicio de sesión o error HTML. Verifica que el despliegue esté configurado con 'Quién tiene acceso: Cualquiera'.");
        }

        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch (parseErr) {
          throw new Error(`Respuesta inválida recibida de la API: ${text.slice(0, 100)}...`);
        }

        return parsed;
      } catch (err) {
        if (timeoutId) clearTimeout(timeoutId);
        lastError = err;

        if (err.name === 'AbortError') {
          lastError = new Error("Tiempo de espera agotado. El servidor de Google Sheets tardó demasiado en responder.");
        }

        if (lastError.message.includes("403") || lastError.message.includes("Acceso Denegado")) {
          throw lastError;
        }

        console.warn(`Intento ${attempt}/${maxRetries} falló:`, lastError.message);
        if (attempt < maxRetries) {
          await new Promise(res => setTimeout(res, 1200 * attempt));
        }
      }
    }

    throw lastError;
  },

  // PROBAR CONEXIÓN RÁPIDA (Para diagnóstico)
  async testConnection() {
    if (!this.hasConfiguredApi()) {
      return { success: false, error: "No hay ninguna URL de API configurada." };
    }

    try {
      const url = `${this.getApiUrl()}?action=ping&_t=${Date.now()}`;
      const data = await this._fetchWithRetry(url, { method: 'GET' }, 1);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // DESCARGAR TODOS LOS DATOS DESDE GOOGLE SHEETS (Modular, por Chunks para +11,000 filas y ultra-rápido)
  async downloadAll(progressCb) {
    if (!this.hasConfiguredApi()) {
      return { success: false, error: "API no configurada. Por favor, revisa la URL en Ajustes." };
    }

    try {
      const baseUrl = this.getApiUrl();
      const db = this.getLocalDb();

      // Fase 1: Descargar Pacientes (~1-2s)
      if (progressCb) progressCb('Descargando pacientes...');
      const pRes = await this._fetchWithRetry(`${baseUrl}?action=getPacientes&_t=${Date.now()}`);
      if (pRes.error) throw new Error(pRes.error);
      const pacientes = this._unpackRows(pRes.pacientes);

      // Fase 2: Descargar Seguimiento CRED por Chunks (Ultra-rápido y seguro para +11,000 registros)
      let seguimientoCred = [];
      let credHeaders = [];
      let credRows = [];
      let chunk = 1;
      const chunkSize = 5000;
      let hasMoreChunks = true;

      while (hasMoreChunks) {
        if (progressCb) progressCb(`Descargando controles CRED (bloque ${chunk})...`);
        try {
          const credRes = await this._fetchWithRetry(`${baseUrl}?action=getSeguimientoCred&chunk=${chunk}&chunkSize=${chunkSize}&_t=${Date.now()}`);
          if (credRes && credRes.seguimientoCred) {
            const raw = credRes.seguimientoCred;
            if (raw.headers && Array.isArray(raw.rows)) {
              credHeaders = raw.headers;
              credRows.push(...raw.rows);
              hasMoreChunks = raw.hasMore === true;
              chunk++;
            } else if (Array.isArray(raw)) {
              seguimientoCred = raw;
              hasMoreChunks = false;
            } else {
              hasMoreChunks = false;
            }
          } else {
            hasMoreChunks = false;
          }
        } catch (credErr) {
          console.warn(`Chunk ${chunk} no respondió por bloques:`, credErr.message);
          hasMoreChunks = false;
        }
      }

      if (credRows.length > 0) {
        seguimientoCred = this._unpackRows({ headers: credHeaders, rows: credRows });
      }

      // Fase 3: Descargar Seguimiento Anemia (0.1s porque la hoja es ligera)
      if (progressCb) progressCb('Descargando controles anemia...');
      let seguimientoAnemia = [];
      try {
        const anemiaRes = await this._fetchWithRetry(`${baseUrl}?action=getSeguimientoAnemia&_t=${Date.now()}`);
        if (!anemiaRes.error && anemiaRes.seguimientoAnemia) {
          seguimientoAnemia = this._unpackRows(anemiaRes.seguimientoAnemia);
        }
      } catch (anemiaErr) {
        console.warn("Fallo getSeguimientoAnemia modular:", anemiaErr.message);
      }

      // Si por alguna razón ambas listas de seguimiento vinieron vacías, intentar fallback getAll
      if (seguimientoCred.length === 0 && seguimientoAnemia.length === 0) {
        try {
          if (progressCb) progressCb('Descargando base de datos completa...');
          const allRes = await this._fetchWithRetry(`${baseUrl}?action=getAll&_t=${Date.now()}`);
          if (allRes) {
            if (allRes.seguimientoCred) seguimientoCred = this._unpackRows(allRes.seguimientoCred);
            if (allRes.seguimientoAnemia) seguimientoAnemia = this._unpackRows(allRes.seguimientoAnemia);
          }
        } catch (e) {
          console.warn("Fallback getAll no respondió:", e.message);
        }
      }

      // Guardar en base de datos local
      db.pacientes = pacientes.length > 0 ? pacientes : db.pacientes;
      db.seguimientoCred = seguimientoCred.length > 0 ? seguimientoCred : db.seguimientoCred;
      db.seguimientoAnemia = seguimientoAnemia.length > 0 ? seguimientoAnemia : db.seguimientoAnemia;
      db.lastSync = new Date().toISOString();
      this.saveLocalDb(db);
      
      return { 
        success: true, 
        countPacientes: db.pacientes.length,
        countCred: db.seguimientoCred.length,
        countAnemia: db.seguimientoAnemia.length
      };
    } catch (error) {
      console.error("Error al descargar datos:", error);
      return { success: false, error: error.message };
    }
  },

  // SUBIR CAMBIOS PENDIENTES
  async uploadPending() {
    if (!this.hasConfiguredApi()) return { success: false, error: "API no configurada" };
    
    const queue = this.getSyncQueue();
    const totalPending = (queue.pacientes || []).length + 
                         (queue.seguimientoCred || []).length + 
                         (queue.seguimientoAnemia || []).length;
    
    if (totalPending === 0) return { success: true, uploaded: 0 };
    
    try {
      const payload = {
        action: "syncAll",
        data: queue
      };
      
      const result = await this._fetchWithRetry(this.getApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      
      if (result.error) throw new Error(result.error);
      
      this.saveSyncQueue({
        pacientes: [],
        seguimientoCred: [],
        seguimientoAnemia: []
      });
      
      return { success: true, uploaded: totalPending };
    } catch (error) {
      console.error("Error al subir cambios pendientes:", error);
      return { success: false, error: error.message };
    }
  },

  // SINCRONIZACIÓN COMPLETA (Subir pendientes -> Descargar todo con progreso)
  async sync(progressCb) {
    if (progressCb) progressCb('Subiendo cambios pendientes...');
    const uploadRes = await this.uploadPending();
    
    const downloadRes = await this.downloadAll(progressCb);
    
    return {
      success: downloadRes.success,
      uploaded: uploadRes.success ? (uploadRes.uploaded || 0) : 0,
      downloaded: downloadRes.success ? downloadRes.countPacientes : 0,
      countCred: downloadRes.success ? downloadRes.countCred : 0,
      error: downloadRes.error || uploadRes.error
    };
  },

  // OPERACIONES CON PACIENTES
  getPacientes(query = '') {
    const db = this.getLocalDb();
    if (!query) return db.pacientes;
    
    const q = String(query).toLowerCase().trim();
    return db.pacientes.filter(p => 
      String(p.id).toLowerCase().includes(q) || 
      String(p.nombres).toLowerCase().includes(q) || 
      String(p.hc).toLowerCase().includes(q)
    );
  },

  getPacienteById(id) {
    const db = this.getLocalDb();
    return db.pacientes.find(p => String(p.id) === String(id));
  },

  savePacienteLocal(paciente) {
    const db = this.getLocalDb();
    const index = db.pacientes.findIndex(p => String(p.id) === String(paciente.id));
    
    if (index !== -1) {
      db.pacientes[index] = paciente;
    } else {
      db.pacientes.push(paciente);
    }
    this.saveLocalDb(db);
    
    // Encolar para subir
    const queue = this.getSyncQueue();
    const qIndex = queue.pacientes.findIndex(p => String(p.id) === String(paciente.id));
    if (qIndex !== -1) {
      queue.pacientes[qIndex] = paciente;
    } else {
      queue.pacientes.push(paciente);
    }
    this.saveSyncQueue(queue);
    
    // Intentar sincronizar en background inmediatamente (sin bloquear el hilo principal)
    this.uploadPending().catch(e => console.log("Sincronización en background pospuesta."));
    
    return paciente;
  },

  // OPERACIONES CON SEGUIMIENTO CRED
  getSeguimientoCredByPaciente(dni) {
    const db = this.getLocalDb();
    return db.seguimientoCred.filter(s => String(s.dni_paciente) === String(dni));
  },

  saveSeguimientoCredLocal(seguimiento) {
    const db = this.getLocalDb();
    
    // Normalizar campos del seguimiento antes de procesar y guardar
    seguimiento.actividad = Utils.normalizeActName(seguimiento.actividad);
    seguimiento.mes_control = Utils.normalizeMesControl(seguimiento.mes_control);
    
    const targetActNormalized = Utils.normalizeActName(seguimiento.actividad);
    const targetMesNormalized = Utils.normalizeMesControl(seguimiento.mes_control);
    
    // Buscar si ya existe para evitar duplicar
    const index = db.seguimientoCred.findIndex(s => 
      String(s.dni_paciente) === String(seguimiento.dni_paciente) &&
      Utils.normalizeMesControl(s.mes_control) === targetMesNormalized &&
      Utils.normalizeActName(s.actividad) === targetActNormalized
    );
    
    if (index !== -1) {
      db.seguimientoCred[index] = { ...db.seguimientoCred[index], ...seguimiento };
    } else {
      if (!seguimiento.id_seguimiento) {
        seguimiento.id_seguimiento = Math.random().toString(36).substr(2, 9).toUpperCase();
      }
      db.seguimientoCred.push(seguimiento);
    }
    this.saveLocalDb(db);
    
    // Encolar para subir
    const queue = this.getSyncQueue();
    const qIndex = queue.seguimientoCred.findIndex(s => 
      String(s.dni_paciente) === String(seguimiento.dni_paciente) &&
      Utils.normalizeMesControl(s.mes_control) === targetMesNormalized &&
      Utils.normalizeActName(s.actividad) === targetActNormalized
    );
    
    if (qIndex !== -1) {
      queue.seguimientoCred[qIndex] = { ...queue.seguimientoCred[qIndex], ...seguimiento };
    } else {
      queue.seguimientoCred.push(seguimiento);
    }
    this.saveSyncQueue(queue);
    
    this.uploadPending().catch(e => console.log("Sincronización en background pospuesta."));
    return seguimiento;
  },

  // OPERACIONES CON SEGUIMIENTO ANEMIA
  getSeguimientoAnemiaByPaciente(dni) {
    const db = this.getLocalDb();
    return db.seguimientoAnemia.filter(s => String(s.dni_paciente) === String(dni));
  },

  saveSeguimientoAnemiaLocal(seguimiento) {
    const db = this.getLocalDb();
    
    // Normalizar la actividad
    seguimiento.actividad = Utils.normalizeActName(seguimiento.actividad);
    const targetActNormalized = Utils.normalizeActName(seguimiento.actividad);
    
    const index = db.seguimientoAnemia.findIndex(s => 
      String(s.dni_paciente) === String(seguimiento.dni_paciente) &&
      String(s.fase) === String(seguimiento.fase) &&
      String(s.ciclo) === String(seguimiento.ciclo) &&
      Utils.normalizeActName(s.actividad) === targetActNormalized
    );
    
    if (index !== -1) {
      db.seguimientoAnemia[index] = { ...db.seguimientoAnemia[index], ...seguimiento };
    } else {
      if (!seguimiento.id_seguimiento) {
        seguimiento.id_seguimiento = Math.random().toString(36).substr(2, 9).toUpperCase();
      }
      db.seguimientoAnemia.push(seguimiento);
    }
    this.saveLocalDb(db);
    
    // Encolar
    const queue = this.getSyncQueue();
    const qIndex = queue.seguimientoAnemia.findIndex(s => 
      String(s.dni_paciente) === String(seguimiento.dni_paciente) &&
      String(s.fase) === String(seguimiento.fase) &&
      String(s.ciclo) === String(seguimiento.ciclo) &&
      Utils.normalizeActName(s.actividad) === targetActNormalized
    );
    
    if (qIndex !== -1) {
      queue.seguimientoAnemia[qIndex] = { ...queue.seguimientoAnemia[qIndex], ...seguimiento };
    } else {
      queue.seguimientoAnemia.push(seguimiento);
    }
    this.saveSyncQueue(queue);
    
    this.uploadPending().catch(e => console.log("Sincronización en background pospuesta."));
    return seguimiento;
  }
};
