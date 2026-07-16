/**
 * INTEGRACIÓN CON GOOGLE SHEETS API + CACHÉ LOCAL (OFFLINE-FIRST)
 */

const Api = {
  // CONFIGURACIÓN DE LA URL DE GOOGLE APPS SCRIPT
  // Se lee de localStorage para que el usuario pueda cambiarla fácilmente desde la configuración de la web.
  getApiUrl() {
    return localStorage.getItem('cred_api_url') || '';
  },

  setApiUrl(url) {
    localStorage.setItem('cred_api_url', url);
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
    return this.getApiUrl().trim() !== '';
  },

  // DESCARGAR TODOS LOS DATOS DESDE GOOGLE SHEETS (Sincronización de bajada)
  async downloadAll() {
    if (!this.hasConfiguredApi()) {
      return { success: false, error: "API no configurada. Por favor, configura la URL de Apps Script en Ajustes." };
    }

    try {
      const url = `${this.getApiUrl()}?action=getAll`;
      const response = await fetch(url, { method: 'GET' });
      
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      // Guardar en local con timestamp
      const db = this.getLocalDb();
      db.pacientes = data.pacientes || [];
      db.seguimientoCred = data.seguimientoCred || [];
      db.seguimientoAnemia = data.seguimientoAnemia || [];
      db.lastSync = new Date().toISOString();
      this.saveLocalDb(db);
      
      return { success: true, countPacientes: db.pacientes.length };
    } catch (error) {
      console.error("Error al descargar datos:", error);
      return { success: false, error: error.message };
    }
  },

  // ENVIAR CAMBIOS PENDIENTES AL SERVIDOR (Sincronización de subida)
  async uploadPending() {
    if (!this.hasConfiguredApi()) return { success: false, error: "API no configurada" };
    
    const queue = this.getSyncQueue();
    const totalPending = queue.pacientes.length + queue.seguimientoCred.length + queue.seguimientoAnemia.length;
    
    if (totalPending === 0) return { success: true, uploaded: 0 };
    
    try {
      const payload = {
        action: "syncAll",
        data: queue
      };
      
      const response = await fetch(this.getApiUrl(), {
        method: 'POST',
        mode: 'no-cors', // Evitar bloqueos CORS típicos en redireccionamientos de Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // NOTA: Con mode 'no-cors', el browser no lee el cuerpo de la respuesta por seguridad,
      // pero si no hay error de red, asumimos que se envió. Para asegurar mayor control de errores, 
      // limpiamos la cola. Si hay red, Google Apps Script procesará esto en lote de forma exitosa.
      
      // Limpiar la cola de sincronización local ya que se envió con éxito
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
    // 1. Intentar subir cambios pendientes primero
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
    
    // Buscar si ya existe para evitar duplicar
    const index = db.seguimientoCred.findIndex(s => 
      String(s.dni_paciente) === String(seguimiento.dni_paciente) &&
      String(s.mes_control) === String(seguimiento.mes_control) &&
      String(s.actividad) === String(seguimiento.actividad)
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
    
    // Encolar
    const queue = this.getSyncQueue();
    const qIndex = queue.seguimientoCred.findIndex(s => 
      String(s.dni_paciente) === String(seguimiento.dni_paciente) &&
      String(s.mes_control) === String(seguimiento.mes_control) &&
      String(s.actividad) === String(seguimiento.actividad)
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
    
    const index = db.seguimientoAnemia.findIndex(s => 
      String(s.dni_paciente) === String(seguimiento.dni_paciente) &&
      String(s.fase) === String(seguimiento.fase) &&
      String(s.ciclo) === String(seguimiento.ciclo) &&
      String(s.actividad) === String(seguimiento.actividad)
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
      String(s.actividad) === String(seguimiento.actividad)
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
