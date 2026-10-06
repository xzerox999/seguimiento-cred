/**
 * INTEGRACIÓN CON GOOGLE SHEETS API + CACHÉ LOCAL (OFFLINE-FIRST)
 */

const Api = {
  // URL por defecto para que funcione automáticamente en cualquier PC sin necesidad de configuración previa
  DEFAULT_API_URL: 'https://script.google.com/macros/s/AKfycbz2KogEKULG-T3DMHBqPKBP0Gh4448O93EVWywiab3l344WcAb57sWtwYLVZwwArshaNQ/exec',

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

  // CLIENTE HTTP ROBUSTO CON REDIRECTS DE GOOGLE, TIMEOUT Y REINTENTOS
  async _fetchWithRetry(url, options = {}, maxRetries = 2) {
    const timeoutMs = 45000; // 45 segundos de margen
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
          throw new Error("Error 404: La URL de la Web App no existe o el despliegue fue eliminado.");
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
          lastError = new Error("Tiempo de espera agotado (45s). El servidor de Google Sheets tardó demasiado en responder.");
        }

        // Si es 403 o configuración de permisos, no tiene sentido reintentar en bucle
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

  // DESCARGAR TODOS LOS DATOS DESDE GOOGLE SHEETS (Sincronización de bajada)
  async downloadAll() {
    if (!this.hasConfiguredApi()) {
      return { success: false, error: "API no configurada. Por favor, revisa la URL en Ajustes." };
    }

    try {
      const url = `${this.getApiUrl()}?action=getAll&_t=${Date.now()}`;
      const data = await this._fetchWithRetry(url, { method: 'GET' });
      
      if (data.error) throw new Error(data.error);

      // Guardar en local con timestamp
      const db = this.getLocalDb();
      db.pacientes = Array.isArray(data.pacientes) ? data.pacientes : [];
      db.seguimientoCred = Array.isArray(data.seguimientoCred) ? data.seguimientoCred : [];
      db.seguimientoAnemia = Array.isArray(data.seguimientoAnemia) ? data.seguimientoAnemia : [];
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
      
      // Enviamos con text/plain para evitar bloqueos por Preflight OPTIONS en Apps Script
      const result = await this._fetchWithRetry(this.getApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      
      if (result.error) throw new Error(result.error);
      
      // Limpiar la cola de sincronización local al completarse
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

  // SINCRONIZACIÓN COMPLETA (Subir pendientes -> Descargar todo)
  async sync() {
    // 1. Intentar subir cambios pendientes primero si hay alguno
    const uploadRes = await this.uploadPending();
    
    // 2. Descargar últimos cambios del servidor
    const downloadRes = await this.downloadAll();
    
    return {
      success: downloadRes.success,
      uploaded: uploadRes.success ? (uploadRes.uploaded || 0) : 0,
      downloaded: downloadRes.success ? downloadRes.countPacientes : 0,
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
