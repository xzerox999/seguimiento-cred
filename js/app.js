/**
 * LÓGICA PRINCIPAL DE LA APLICACIÓN (SPA ROUTING, EVENTOS, TIMELINE Y FORMULARIOS)
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  currentView: 'dashboard',
  selectedPaciente: null,
  activeTimelineTab: 'RN',
  
  // Catálogo de controles CRED Niños a Término
  credTerminoActividades: {
    "RN": [
      { name: "NACIMIENTO", type: "text", desc: "Lugar de nacimiento (Regional, H. Lorena, etc.)" },
      { name: "BCG", type: "date", desc: "Fecha Vacuna BCG" },
      { name: "HVB", type: "date", desc: "Fecha Vacuna HVB" },
      { name: "PAIS 1", type: "text", desc: "Resultado PAIS 1" },
      { name: "1º CRED", type: "date", desc: "Fecha 1º CRED Recién Nacido" },
      { name: "dias", type: "text", desc: "Días de diferencia al control (sugerido 7 días)" },
      { name: "TAM. VIF.", type: "date", desc: "Tamizaje Violencia Intrafamiliar" },
      { name: "EX. OJOS", type: "date", desc: "Examen de Ojos" },
      { name: "2º CRED", type: "date", desc: "Fecha 2º CRED" },
      { name: "dias 2", type: "text", desc: "Días de diferencia al control (sugerido 14 días)" },
      { name: "PAIS TA", type: "text", desc: "PAIS Tamizaje" },
      { name: "3º CRED", type: "date", desc: "Fecha 3º CRED" },
      { name: "dias 3", type: "text", desc: "Días de diferencia al control (sugerido 21 días)" },
      { name: "TAMIZAJE NEONATAL", type: "date", desc: "Fecha de Tamizaje Neonatal" },
      { name: "dias 5", type: "text", desc: "Días del Tamizaje" },
      { name: "LUGAR", type: "text", desc: "Lugar del Tamizaje" },
      { name: "TAMIZAJE HIPOACUSIA", type: "select", options: ["NO", "SI", "OBSERVADO"], desc: "Tamizaje Hipoacusia" },
      { name: "TAMIZAJE CATARATA", type: "select", options: ["NO", "SI", "OBSERVADO"], desc: "Tamizaje Catarata" },
      { name: "TAMIZAJE CARDIACO", type: "select", options: ["NO", "SI", "OBSERVADO"], desc: "Tamizaje Cardíaco" }
    ],
    "1-11 MESES": [
      // 1 MES
      { name: "PAIS  1", type: "date", mes: "1 MES", desc: "PAIS 1 Mes" },
      { name: "dias", type: "text", mes: "1 MES", desc: "Días" },
      { name: "CRED 1º", type: "date", mes: "1 MES", desc: "CRED 1 Mes" },
      { name: "1ra  Sesion estimulacion temprana", type: "date", mes: "1 MES", desc: "1ra Estimulación" },
      { name: "TAM. VIF", type: "date", mes: "1 MES", desc: "TAM VIF" },
      { name: "CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA ", type: "date", mes: "1 MES", desc: "Consejería LME" },
      // 2 MESES
      { name: "dias  2", type: "text", mes: "2 MESES", desc: "Días" },
      { name: "CRED  2º", type: "date", mes: "2 MESES", desc: "CRED 2 Meses" },
      { name: "2da  Sesion estimulacion temprana", type: "date", mes: "2 MESES", desc: "2da Estimulación" },
      { name: "PENTA  1º", type: "date", mes: "2 MESES", desc: "PENTA 1" },
      { name: "IPV  1º", type: "date", mes: "2 MESES", desc: "IPV 1" },
      { name: "NEUMO 1º", type: "date", mes: "2 MESES", desc: "NEUMO 1" },
      { name: "ROTA  1º", type: "date", mes: "2 MESES", desc: "ROTA 1" },
      { name: "CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  ", type: "date", mes: "2 MESES", desc: "Consejería LME" },
      // 3 MESES
      { name: "dias  3", type: "text", mes: "3 MESES", desc: "Días" },
      { name: "CRED 3º", type: "date", mes: "3 MESES", desc: "CRED 3 Meses" },
      { name: "EX. OJOS ", type: "date", mes: "3 MESES", desc: "Examen de Ojos" },
      { name: "CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA   ", type: "date", mes: "3 MESES", desc: "Consejería LME" },
      // 4 MESES
      { name: "dias  4", type: "text", mes: "4 MESES", desc: "Días" },
      { name: "CRED 4º", type: "date", mes: "4 MESES", desc: "CRED 4 Meses" },
      { name: "3ra  Sesion estimulacion temprana", type: "date", mes: "4 MESES", desc: "3ra Estimulación" },
      { name: "PENTA  2º", type: "date", mes: "4 MESES", desc: "PENTA 2" },
      { name: "IPV  2º", type: "date", mes: "4 MESES", desc: "IPV 2" },
      { name: "NEUMO 2º", type: "date", mes: "4 MESES", desc: "NEUMO 2" },
      { name: "ROTA  2º", type: "date", mes: "4 MESES", desc: "ROTA 2" },
      { name: "HIERRO PREVENTIVO  1 ", type: "date", mes: "4 MESES", desc: "Hierro Preventivo 1" },
      { name: "CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA    ", type: "date", mes: "4 MESES", desc: "Consejería LME" },
      // 5 MESES
      { name: "dias  5", type: "text", mes: "5 MESES", desc: "Días" },
      { name: "CRED 5º", type: "date", mes: "5 MESES", desc: "CRED 5 Meses" },
      { name: "4ta Sesion estimulacion temprana", type: "date", mes: "5 MESES", desc: "4ta Estimulación" },
      { name: "HIERRO PREVENTIVO  2 ", type: "date", mes: "5 MESES", desc: "Hierro Preventivo 2" },
      { name: "CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA     ", type: "date", mes: "5 MESES", desc: "Consejería LME" },
      { name: "VISITA DOMICILIARIA 1", type: "date", mes: "5 MESES", desc: "Visita Domiciliaria 1" },
      // 6 MESES
      { name: "dias   6", type: "text", mes: "6 MESES", desc: "Días" },
      { name: "CRED 6º", type: "date", mes: "6 MESES", desc: "CRED 6 Meses" },
      { name: "5ta Sesion estimulacion temprana", type: "date", mes: "6 MESES", desc: "5ta Estimulación" },
      { name: "PENTA  3º", type: "date", mes: "6 MESES", desc: "PENTA 3" },
      { name: "APO  1º", type: "date", mes: "6 MESES", desc: "APO 1" },
      { name: "HIERRO PREVENTIVO  3 ", type: "date", mes: "6 MESES", desc: "Hierro Preventivo 3" },
      { name: "DOSAJE HB  Dx ", type: "date", mes: "6 MESES", desc: "Dosaje HB Dx" },
      { name: "TAM VIF 6m", type: "date", mes: "6 MESES", desc: "TAM VIF" },
      { name: "CONSEJERIA ALIMENTACION COMPLEMENTARIA", type: "date", mes: "6 MESES", desc: "Consejería AC" },
      { name: "VISITA DOMICIL 1", type: "date", mes: "6 MESES", desc: "Visita Domicil 1" },
      // 7 MESES
      { name: "dias  7", type: "text", mes: "7 MESES", desc: "Días" },
      { name: "CRED 7º", type: "date", mes: "7 MESES", desc: "CRED 7 Meses" },
      { name: "6ta Sesion estimulacion temprana", type: "date", mes: "7 MESES", desc: "6ta Estimulación" },
      { name: "HIERRO PREVENTIVO 4", type: "date", mes: "7 MESES", desc: "Hierro Preventivo 4" },
      { name: "CONSEJERIA ALIMENTACION COMPLEMENTARIA ", type: "date", mes: "7 MESES", desc: "Consejería AC" },
      // 8 MESES
      { name: "dias  8", type: "text", mes: "8 MESES", desc: "Días" },
      { name: "CRED 8º", type: "date", mes: "8 MESES", desc: "CRED 8 Meses" },
      { name: "7ma Sesion estimulacion temprana", type: "date", mes: "8 MESES", desc: "7ma Estimulación" },
      { name: "HIERRO PREVENTIVO 5", type: "date", mes: "8 MESES", desc: "Hierro Preventivo 5" },
      { name: "CONSEJERIA ALIMENTACION COMPLEMENTARIA  ", type: "date", mes: "8 MESES", desc: "Consejería AC" },
      { name: "VISITA DOMICILIARIA 2", type: "date", mes: "8 MESES", desc: "Visita Domiciliaria 2" },
      // 9 MESES
      { name: "dias  9", type: "text", mes: "9 MESES", desc: "Días" },
      { name: "CRED 9º", type: "date", mes: "9 MESES", desc: "CRED 9 Meses" },
      { name: "8va Sesion estimulacion temprana", type: "date", mes: "9 MESES", desc: "8va Estimulación" },
      { name: "HIERRO PREVENTIVO 6", type: "date", mes: "9 MESES", desc: "Hierro Preventivo 6" },
      { name: "CONSEJERIA ALIMENTACION COMPLEMENTARIA   ", type: "date", mes: "9 MESES", desc: "Consejería AC" },
      // 10 MESES
      { name: "dias  10", type: "text", mes: "10 MESES", desc: "Días" },
      { name: "CRED 10º", type: "date", mes: "10 MESES", desc: "CRED 10 Meses" },
      { name: "9na Sesion estimulacion temprana", type: "date", mes: "10 MESES", desc: "9na Estimulación" },
      { name: "CONSEJERIA ALIMENTACION COMPLEMENTARIA    ", type: "date", mes: "10 MESES", desc: "Consejería AC" },
      // 11 MESES
      { name: "dias  11", type: "text", mes: "11 MESES", desc: "Días" },
      { name: "CRED 11º", type: "date", mes: "11 MESES", desc: "CRED 11 Meses" },
      { name: "10ma Sesion estimulacion temprana", type: "date", mes: "11 MESES", desc: "10ma Estimulación" },
      { name: "CONSEJERIA ALIMENTACION COMPLEMENTARIA     ", type: "date", mes: "11 MESES", desc: "Consejería AC" }
    ],
    "1 AÑO": [
      { name: "CRED 1 AÑO", type: "date", mes: "12 MESES", desc: "CRED 1 Año" },
      { name: "SPR 1º", type: "date", mes: "12 MESES", desc: "Vacuna SPR 1" },
      { name: "NEUMO 3º", type: "date", mes: "12 MESES", desc: "Vacuna NEUMO 3" },
      { name: "VARICELA", type: "date", mes: "12 MESES", desc: "Vacuna Varicela" },
      { name: "DOSAJE HB 1 AÑO", type: "date", mes: "12 MESES", desc: "Dosaje HB" },
      { name: "SUPLEMENTACION MULTIMICRONUTRIENTES 1", type: "date", mes: "12 MESES", desc: "Multimicronutrientes 1" },
      // 15 MESES
      { name: "CRED 15m", type: "date", mes: "15 MESES", desc: "CRED 15m" },
      { name: "AMA", type: "date", mes: "15 MESES", desc: "Vacuna Fiebre Amarilla" },
      { name: "SUPLEMENTACION MULTIMICRONUTRIENTES 2", type: "date", mes: "15 MESES", desc: "Multimicronutrientes 2" },
      // 18 MESES
      { name: "CRED 18m", type: "date", mes: "18 MESES", desc: "CRED 18m" },
      { name: "SPR 2º", type: "date", mes: "18 MESES", desc: "Vacuna SPR 2" },
      { name: "DPT 1º REFUERZO", type: "date", mes: "18 MESES", desc: "DPT Refuerzo 1" },
      { name: "APO 1º REFUERZO", type: "date", mes: "18 MESES", desc: "APO Refuerzo 1" },
      { name: "SUPLEMENTACION MULTIMICRONUTRIENTES 3", type: "date", mes: "18 MESES", desc: "Multimicronutrientes 3" }
    ],
    "2 AÑOS": [
      { name: "CRED 2 AÑOS", type: "date", mes: "24 MESES", desc: "CRED 2 Años" },
      { name: "DOSAJE HB 2 AÑOS", type: "date", mes: "24 MESES", desc: "Dosaje HB" },
      { name: "CRED 2 AÑOS 6 MESES", type: "date", mes: "30 MESES", desc: "CRED 2.5 Años" }
    ]
  },

  // Inicialización de la App
  init() {
    Api.initLocalDb();
    this.setupRouter();
    this.setupEvents();
    this.updateDashboardStats();
    this.checkOnlineStatus();
    
    // Si no tiene la API configurada, sugerir configurarla en los ajustes
    if (!Api.hasConfiguredApi()) {
      alert("Por favor, configure la URL de su API de Google Sheets en la sección de 'Ajustes' para permitir la sincronización en la nube.");
      window.location.hash = "#ajustes";
    } else {
      // Intentar sincronizar al iniciar
      this.syncData();
    }
  },

  // Manejar el ruteo SPA
  setupRouter() {
    const handleRoute = () => {
      const hash = window.location.hash || '#dashboard';
      const viewId = hash.substring(1).split('?')[0];
      
      // Ocultar todas las secciones
      document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
      
      // Mostrar la sección correspondiente
      const targetEl = document.getElementById(viewId);
      if (targetEl) {
        targetEl.classList.add('active');
        this.currentView = viewId;
      }
      
      // Actualizar menú activo
      document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
      const activeMenuItem = document.querySelector(`.menu-item a[href="${hash.split('?')[0]}"]`);
      if (activeMenuItem) {
        activeMenuItem.parentElement.classList.add('active');
      }

      // Inicializar vistas específicas si es necesario
      if (viewId === 'dashboard') {
        this.updateDashboardStats();
        this.renderPacientesList('');
      } else if (viewId === 'seguimiento-cred') {
        this.initSeguimientoCredView();
      } else if (viewId === 'seguimiento-anemia') {
        this.initSeguimientoAnemiaView();
      } else if (viewId === 'reportes') {
        this.initReportesView();
      } else if (viewId === 'ajustes') {
        document.getElementById('api-url-input').value = Api.getApiUrl();
      }
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Ejecutar en carga inicial
  },

  // Configurar listeners de eventos de UI
  setupEvents() {
    // Sincronizar en la barra lateral
    document.getElementById('sync-sidebar-btn').addEventListener('click', () => this.syncData());

    // Buscador global en el dashboard
    document.getElementById('global-search').addEventListener('input', (e) => {
      this.renderPacientesList(e.target.value);
    });

    // Guardar URL de API en Ajustes
    document.getElementById('save-api-btn').addEventListener('click', () => {
      const url = document.getElementById('api-url-input').value.trim();
      Api.setApiUrl(url);
      alert("URL de API guardada exitosamente.");
      window.location.hash = "#dashboard";
      this.syncData();
    });

    // WIZARD REGISTRO PACIENTE
    let currentStep = 1;
    const showStep = (step) => {
      document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`step-panel-${step}`).classList.add('active');
      
      document.querySelectorAll('.step-item').forEach((item, idx) => {
        item.classList.remove('active', 'completed');
        if (idx + 1 < step) item.classList.add('completed');
        if (idx + 1 === step) item.classList.add('active');
      });
      
      const percent = ((step - 1) / 2) * 100;
      document.querySelector('.wizard-step-line').style.width = `${percent}%`;
      
      // Control de botones
      document.getElementById('prev-step-btn').style.display = step === 1 ? 'none' : 'block';
      document.getElementById('next-step-btn').innerText = step === 3 ? 'Registrar Paciente' : 'Siguiente';
      currentStep = step;
    };

    document.getElementById('next-step-btn').addEventListener('click', () => {
      if (currentStep < 3) {
        // Validaciones sencillas antes de pasar de paso
        if (currentStep === 1) {
          const hc = document.getElementById('reg-hc').value.trim();
          const nombres = document.getElementById('reg-nombres').value.trim();
          const fechaNac = document.getElementById('reg-fecha-nac').value.trim();
          
          if (!hc || !nombres || !fechaNac) {
            alert("Por favor completa los campos obligatorios: Historia Clínica, Nombres y Fecha de Nacimiento.");
            return;
          }
        }
        showStep(currentStep + 1);
      } else {
        // Guardar paciente final
        this.saveNewPacienteFromForm();
        showStep(1); // Reset
      }
    });

    document.getElementById('prev-step-btn').addEventListener('click', () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });

    // Cerrar diálogos
    document.querySelectorAll('.dialog-close, .dialog-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dialog-overlay').forEach(d => d.classList.remove('active'));
      });
    });

    // Guardar control en el Modal CRED
    document.getElementById('save-control-btn').addEventListener('click', () => {
      this.saveControlCredFromModal();
    });

    // Guardar control en el Modal Anemia
    document.getElementById('save-anemia-btn').addEventListener('click', () => {
      this.saveControlAnemiaFromModal();
    });

    // Importación / Exportación manual
    document.getElementById('export-excel-btn').addEventListener('click', () => {
      this.exportToMinsaExcel();
    });
  },

  // Sincronizar datos
  async syncData() {
    const btn = document.getElementById('sync-sidebar-btn');
    const statusText = document.getElementById('sync-time');
    
    btn.disabled = true;
    btn.innerHTML = '🔄 Sincronizando...';
    statusText.innerText = 'Sincronizando...';
    
    const res = await Api.sync();
    
    btn.disabled = false;
    btn.innerHTML = '🔄 Sincronizar';
    
    if (res.success) {
      statusText.innerText = 'Sincronizado hoy';
      this.updateDashboardStats();
      this.renderPacientesList('');
      // Mostrar toast sutil
      alert(`Sincronización completa!\nDatos subidos: ${res.uploaded} registros.\nTotal pacientes en base de datos: ${res.downloaded}.`);
    } else {
      statusText.innerText = 'Error al sincronizar';
      alert(`Error de sincronización: ${res.error || 'Servidor no disponible'}. Trabajando en modo Offline local.`);
    }
  },

  // Actualizar estadísticas en el Dashboard
  updateDashboardStats() {
    const db = Api.getLocalDb();
    const pacientes = db.pacientes;
    const seguimientos = db.seguimientoCred;
    
    document.getElementById('stat-total-pacientes').innerText = pacientes.length;
    
    const terminoCount = pacientes.filter(p => p.tipo_seguimiento === 'termino').length;
    document.getElementById('stat-termino').innerText = terminoCount;
    
    const bpnCount = pacientes.filter(p => p.tipo_seguimiento === 'bpn').length;
    document.getElementById('stat-bpn').innerText = bpnCount;
    
    // Controles pendientes de hoy o retrasados
    const pendingCount = seguimientos.filter(s => !s.fecha_realizada && s.fecha_programada).length;
    document.getElementById('stat-pendientes').innerText = pendingCount;
  },

  // Renderizar la tabla de pacientes con filtros
  renderPacientesList(query) {
    const tableBody = document.getElementById('pacientes-table-body');
    tableBody.innerHTML = '';
    
    const pacientes = Api.getPacientes(query);
    
    if (pacientes.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center" style="color: var(--text-muted); padding: 30px;">Ningún niño encontrado con la búsqueda.</td></tr>`;
      return;
    }
    
    pacientes.forEach(p => {
      const ageInfo = Utils.calculateExactAge(p.fecha_nacimiento);
      const badgeClass = p.tipo_seguimiento === 'termino' ? 'badge-success' : 'badge-warning';
      const badgeText = p.tipo_seguimiento === 'termino' ? 'A Término' : 'BPN/Prematuro';
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${p.hc}</strong></td>
        <td>${p.id || 'S/DNI'}</td>
        <td><strong>${p.nombres}</strong></td>
        <td>${p.sexo}</td>
        <td>${Utils.formatDateToShow(p.fecha_nacimiento)}</td>
        <td>${ageInfo.text}</td>
        <td><span class="badge ${badgeClass}">${badgeText}</span></td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 13px;" onclick="App.openSeguimiento('${p.id}', 'cred')">📈 CRED</button>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 13px;" onclick="App.openSeguimiento('${p.id}', 'anemia')">🩸 Anemia</button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  },

  // Guardar nuevo paciente
  saveNewPacienteFromForm() {
    const id = document.getElementById('reg-dni').value.trim() || document.getElementById('reg-cnv').value.trim() || Utils.generateTempId();
    const nombres = document.getElementById('reg-nombres').value.toUpperCase().trim();
    
    const nuevoPaciente = {
      id: id,
      distrito: document.getElementById('reg-distrito').value.trim(),
      eess: document.getElementById('reg-eess').value.trim(),
      hc: document.getElementById('reg-hc').value.trim(),
      tipo_doc: document.getElementById('reg-dni').value.trim() ? "DNI" : "CNV",
      nombres: nombres,
      sexo: document.getElementById('reg-sexo').value,
      peso_nacer: document.getElementById('reg-peso').value,
      sem_gest: document.getElementById('reg-sem-gest').value,
      fecha_nacimiento: document.getElementById('reg-fecha-nac').value,
      comunidad: document.getElementById('reg-comunidad').value.trim(),
      dni_madre: document.getElementById('reg-dni-madre').value.trim(),
      nombres_madre: document.getElementById('reg-nombre-madre').value.toUpperCase().trim(),
      celular_madre: document.getElementById('reg-celular-madre').value.trim(),
      tipo_seguimiento: document.getElementById('reg-tipo-seguimiento').value,
      fecha_registro: new Date().toISOString()
    };
    
    Api.savePacienteLocal(nuevoPaciente);
    alert(`Paciente ${nombres} registrado localmente con éxito y encolado para sincronización en la nube.`);
    
    // Resetear formulario
    document.querySelectorAll('.wizard-panel input, .wizard-panel select').forEach(input => input.value = '');
    window.location.hash = "#dashboard";
  },

  // Ir a la vista de seguimiento CRED de un paciente
  openSeguimiento(dni, module) {
    this.selectedPaciente = Api.getPacienteById(dni);
    if (!this.selectedPaciente) {
      alert("Error al cargar paciente");
      return;
    }
    if (module === 'cred') {
      window.location.hash = `#seguimiento-cred?dni=${dni}`;
    } else {
      window.location.hash = `#seguimiento-anemia?dni=${dni}`;
    }
  },

  // INICIALIZAR VISTA SEGUIMIENTO CRED
  initSeguimientoCredView() {
    // Si no hay paciente cargado, redirigir
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const dni = urlParams.get('dni');
    
    if (dni) {
      this.selectedPaciente = Api.getPacienteById(dni);
    }
    
    if (!this.selectedPaciente) {
      window.location.hash = "#dashboard";
      return;
    }
    
    const p = this.selectedPaciente;
    const ageInfo = Utils.calculateExactAge(p.fecha_nacimiento);
    
    // Mostrar cabecera del paciente
    document.getElementById('cred-paciente-info').innerHTML = `
      <div style="background-color: var(--primary-light); padding: 20px; border-radius: var(--radius-md); border-left: 5px solid var(--primary); margin-bottom: 25px;">
        <h2 style="color: var(--primary); font-size: 20px; font-weight: 700;">👶 ${p.nombres}</h2>
        <p style="margin-top: 6px; font-size: 14px; color: var(--text-main);">
          <strong>DNI/CNV:</strong> ${p.id} | 
          <strong>HC:</strong> ${p.hc} | 
          <strong>F. Nacimiento:</strong> ${Utils.formatDateToShow(p.fecha_nacimiento)} | 
          <strong>Edad Actual:</strong> ${ageInfo.text} | 
          <strong>Tipo:</strong> ${p.tipo_seguimiento === 'termino' ? 'A Término' : 'BPN/Prematuro'}
        </p>
      </div>
    `;
    
    // Renderizar las pestañas de edad de acuerdo al tipo de paciente
    const tabContainer = document.getElementById('cred-tabs');
    tabContainer.innerHTML = '';
    
    const tabs = ['RN', '1-11 MESES', '1 AÑO', '2 AÑOS'];
    // Si es BPN, habilitar 3 y 4 años
    if (p.tipo_seguimiento === 'bpn') {
      tabs.push('3 AÑOS', '4 AÑOS');
    }
    
    tabs.forEach(tab => {
      const btn = document.createElement('button');
      btn.className = `tab-btn ${this.activeTimelineTab === tab ? 'active' : ''}`;
      btn.innerText = tab;
      btn.addEventListener('click', () => {
        document.querySelectorAll('#cred-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTimelineTab = tab;
        this.renderTimelineCred(tab);
      });
      tabContainer.appendChild(btn);
    });
    
    this.renderTimelineCred(this.activeTimelineTab);
  },

  // Renderizar la línea de tiempo CRED
  renderTimelineCred(tab) {
    const container = document.getElementById('cred-timeline-container');
    container.innerHTML = '';
    
    const p = this.selectedPaciente;
    const actividades = this.credTerminoActividades[tab] || [];
    
    // Si no está registrado en el catálogo (ej. 3 o 4 años de BPN), crearlo dinámicamente
    if (actividades.length === 0 && (tab === '3 AÑOS' || tab === '4 AÑOS')) {
      const yearsVal = tab === '3 AÑOS' ? 36 : 48;
      // Añadir controles de 3 o 4 años
      actividades.push(
        { name: `CRED ${tab}`, type: "date", mes: `${yearsVal} MESES`, desc: `Control CRED ${tab}` },
        { name: "VISITA DOMICIL. 1", type: "date", mes: `${yearsVal} MESES`, desc: "Visita Domiciliaria 1" }
      );
    }

    const seguimientos = Api.getSeguimientoCredByPaciente(p.id);
    
    const listEl = document.createElement('div');
    listEl.className = 'timeline';
    
    actividades.forEach(act => {
      const targetActNormalized = Utils.normalizeActName(act.name);
      const targetMesNormalized = Utils.normalizeMesControl(act.mes || "RN");

      // Buscar si el paciente ya tiene registrado este seguimiento
      const segRealizado = seguimientos.find(s => 
        Utils.normalizeActName(s.actividad) === targetActNormalized && 
        Utils.normalizeMesControl(s.mes_control) === targetMesNormalized
      );
      
      const hasCompleted = !!(segRealizado && (segRealizado.fecha_realizada || segRealizado.valor));
      const isPending = !hasCompleted;
      
      const ev = document.createElement('div');
      ev.className = `timeline-event ${hasCompleted ? 'completed' : 'pending'}`;
      
      // Calcular fecha límite sugerida
      const mesCont = act.mes || "RN";
      const fechaSug = Utils.calculateScheduledDate(p.fecha_nacimiento, mesCont);
      
      let badgeInfo = `<div class="timeline-badge"></div>`;
      
      ev.innerHTML = `
        ${badgeInfo}
        <div class="timeline-card">
          <div class="event-details">
            <h4>${act.name}</h4>
            <p>${act.desc}</p>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              <strong>Mes sugerido:</strong> ${mesCont} | <strong>Fecha Programada:</strong> ${Utils.formatDateToShow(fechaSug)}
            </p>
            ${hasCompleted ? `
              <p style="font-size: 13px; color: var(--secondary); font-weight: 500; margin-top: 6px;">
                ✅ ${segRealizado.fecha_realizada ? `Realizado el: ${Utils.formatDateToShow(segRealizado.fecha_realizada)}` : 'Registrado'} 
                ${(segRealizado.valor && segRealizado.actividad.toLowerCase() !== 'nacimiento' && !segRealizado.actividad.toLowerCase().includes('lugar')) ? `| <strong>Valor:</strong> ${segRealizado.valor}` : (segRealizado.valor ? `: ${segRealizado.valor}` : '')}
              </p>
              ${segRealizado.observacion ? `<p style="font-size: 12px; font-style: italic; margin-top: 2px;">"Obs: ${segRealizado.observacion}"</p>` : ''}
            ` : `
              <p style="font-size: 13px; color: var(--warning); font-weight: 500; margin-top: 6px;">
                ⏳ Pendiente
              </p>
            `}
          </div>
          <div class="event-actions">
            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;" onclick="App.openRegisterControlModal('${act.name}', '${act.mes || ''}', '${fechaSug}', '${segRealizado ? segRealizado.fecha_realizada : ''}', '${segRealizado ? segRealizado.valor : ''}', '${segRealizado ? segRealizado.observacion : ''}')">
              ${hasCompleted ? '✏️ Editar' : '➕ Registrar'}
            </button>
          </div>
        </div>
      `;
      listEl.appendChild(ev);
    });
    
    container.appendChild(listEl);
  },

  // ABRIR MODAL REGISTRO CONTROL CRED
  openRegisterControlModal(actividadName, mesControl, fechaProgramada, fechaRealizada = '', valor = '', observacion = '') {
    document.getElementById('modal-actividad-title').innerText = actividadName;
    document.getElementById('modal-mes-control').value = mesControl;
    document.getElementById('modal-fecha-prog').value = fechaProgramada;
    document.getElementById('modal-fecha-real').value = fechaRealizada ? Utils.formatDateToInput(fechaRealizada) : Utils.formatDateToInput(new Date().toISOString());
    document.getElementById('modal-valor').value = valor;
    document.getElementById('modal-obs').value = observacion;
    
    // Si la actividad tiene campo especial 'días' calculados, podemos automatizarlo al cambiar la fecha realizada
    const recalculateDays = () => {
      const birthDate = this.selectedPaciente.fecha_nacimiento;
      const realDate = document.getElementById('modal-fecha-real').value;
      if (birthDate && realDate) {
        const diff = Utils.daysBetween(birthDate, realDate);
        // Si la actividad requiere guardar días
        if (actividadName.toLowerCase().includes('dias') || actividadName.toLowerCase().includes('días')) {
          document.getElementById('modal-valor').value = diff;
        }
      }
    };
    
    document.getElementById('modal-fecha-real').addEventListener('change', recalculateDays);
    recalculateDays(); // calcular inicialmente
    
    document.getElementById('control-dialog').classList.add('active');
  },

  // GUARDAR CONTROL DESDE EL MODAL
  saveControlCredFromModal() {
    const actName = document.getElementById('modal-actividad-title').innerText;
    const mes = document.getElementById('modal-mes-control').value;
    const fechaProg = document.getElementById('modal-fecha-prog').value;
    const fechaReal = document.getElementById('modal-fecha-real').value;
    const valor = document.getElementById('modal-valor').value;
    const obs = document.getElementById('modal-obs').value;
    
    if (!fechaReal) {
      alert("Por favor indica la fecha de realización");
      return;
    }
    
    const seguimiento = {
      dni_paciente: this.selectedPaciente.id,
      mes_control: mes,
      actividad: actName,
      fecha_programada: fechaProg,
      fecha_realizada: fechaReal,
      valor: valor,
      observacion: obs
    };
    
    Api.saveSeguimientoCredLocal(seguimiento);
    document.getElementById('control-dialog').classList.remove('active');
    alert("¡Control guardado correctamente!");
    
    // Recargar timeline
    this.renderTimelineCred(this.activeTimelineTab);
  },

  // INICIALIZAR VISTA ANEMIA
  initSeguimientoAnemiaView() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const dni = urlParams.get('dni');
    if (dni) {
      this.selectedPaciente = Api.getPacienteById(dni);
    }
    if (!this.selectedPaciente) {
      window.location.hash = "#dashboard";
      return;
    }
    
    const p = this.selectedPaciente;
    const ageInfo = Utils.calculateExactAge(p.fecha_nacimiento);
    
    document.getElementById('anemia-paciente-info').innerHTML = `
      <div style="background-color: var(--accent-light); padding: 20px; border-radius: var(--radius-md); border-left: 5px solid var(--accent); margin-bottom: 25px;">
        <h2 style="color: var(--accent-hover); font-size: 20px; font-weight: 700;">🩸 Seguimiento de Anemia: ${p.nombres}</h2>
        <p style="margin-top: 6px; font-size: 14px; color: var(--text-main);">
          <strong>DNI/CNV:</strong> ${p.id} | 
          <strong>HC:</strong> ${p.hc} | 
          <strong>F. Nacimiento:</strong> ${Utils.formatDateToShow(p.fecha_nacimiento)} | 
          <strong>Edad Actual:</strong> ${ageInfo.text}
        </p>
      </div>
    `;
    
    // Renderizar tabs para Anemia (Tratamiento / Suplementación / Repetitivo)
    const tabContainer = document.getElementById('anemia-tabs');
    tabContainer.innerHTML = `
      <button class="tab-btn active" onclick="App.changeAnemiaTab('TRATAMIENTO DE ANEMIA')">Tratamiento de Anemia</button>
      <button class="tab-btn" onclick="App.changeAnemiaTab('SUPLEMENTACION PREVENTIVA')">Suplementación Preventiva (Post-Recuperación)</button>
    `;
    
    this.renderTimelineAnemia('TRATAMIENTO DE ANEMIA');
  },

  changeAnemiaTab(fase) {
    document.querySelectorAll('#anemia-tabs .tab-btn').forEach(btn => {
      if (btn.innerText.toUpperCase().includes(fase.split(' ')[0])) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.renderTimelineAnemia(fase);
  },

  // RENDERIZAR TIMELINE ANEMIA
  renderTimelineAnemia(fase) {
    const container = document.getElementById('anemia-timeline-container');
    container.innerHTML = '';
    
    const p = this.selectedPaciente;
    const seguimientos = Api.getSeguimientoAnemiaByPaciente(p.id);
    
    let ciclos = [];
    let actividades = [];
    
    if (fase === 'TRATAMIENTO DE ANEMIA') {
      ciclos = ['PRIMER TRATAMIENTO', 'SEGUNDO TRATAMIENTO', 'TERCER TRATAMIENTO', 'CUARTO TRATAMIENTO', 'QUINTO TRATAMIENTO', 'SEXTO TRATAMIENTO', 'TERMINO DE TRATAMIENTO', 'ANEMIA REPETITIVO'];
      actividades = [
        "EVALUACION / CONSULTA MEDICA",
        "CONSULTA NUTRICIONAL SINCRONA / ASINCRONA",
        "DX ANEMIA DEFINITIVO",
        "DOSAJE HB",
        "HIERRO SF",
        "VISITA DOMICIL"
      ];
    } else {
      // Suplementación Preventiva
      ciclos = ['PRIMER MES', 'SEGUNDO MES', 'TERCER MES', 'CUARTO MES', 'QUINTO MES', 'SEXTO MES', 'SETIMO MES'];
      actividades = [
        "DOSAJE HB",
        "HIERRO SF",
        "CONSEJERIA / ORIENTACION NUTRICIONAL",
        "VISITA DOMICIL"
      ];
    }

    const listEl = document.createElement('div');
    listEl.className = 'timeline';
    
    ciclos.forEach(ciclo => {
      // Crear una cabecera para cada ciclo (ej: Primer Tratamiento)
      const groupHeader = document.createElement('div');
      groupHeader.style = "margin: 30px 0 15px 15px; font-weight: 700; font-size: 16px; color: var(--primary); border-bottom: 1.5px solid var(--border-color); padding-bottom: 6px;";
      groupHeader.innerText = ciclo;
      container.appendChild(groupHeader);
      
      actividades.forEach(act => {
        // En Anemia Repetitivo o Término, cambian las actividades
        if (ciclo === 'TERMINO DE TRATAMIENTO' && !["DOSAJE HB", "PACIENTE RECUPERADO", "TA / PR", "OBSERV"].includes(act)) {
          // Filtrar actividades de Término
          if (act === "DX ANEMIA DEFINITIVO") act = "TA / PR";
          else if (act === "EVALUACION / CONSULTA MEDICA") act = "PACIENTE RECUPERADO";
          else return;
        }
        
        if (ciclo === 'ANEMIA REPETITIVO' && act !== "EVALUACION / CONSULTA MEDICA") {
          if (act === "DX ANEMIA DEFINITIVO") act = "PACIENTE RECUPERADO";
          else return;
        }

        const targetActNormalized = Utils.normalizeActName(act);
        const segRealizado = seguimientos.find(s => 
          String(s.fase) === String(fase) && 
          String(s.ciclo) === String(ciclo) && 
          Utils.normalizeActName(s.actividad).startsWith(targetActNormalized)
        );
        
        const hasCompleted = !!(segRealizado && (segRealizado.fecha_realizada || segRealizado.valor));
        
        const ev = document.createElement('div');
        ev.className = `timeline-event ${hasCompleted ? 'completed' : 'pending'}`;
        
        ev.innerHTML = `
          <div class="timeline-badge"></div>
          <div class="timeline-card">
            <div class="event-details">
              <h4>${act}</h4>
              <p>Seguimiento para: ${ciclo}</p>
              ${hasCompleted ? `
                <p style="font-size: 13px; color: var(--secondary); font-weight: 500; margin-top: 6px;">
                  ✅ ${segRealizado.fecha_realizada ? `Realizado el: ${Utils.formatDateToShow(segRealizado.fecha_realizada)}` : 'Registrado'} 
                  ${segRealizado.valor ? `| <strong>Valor:</strong> ${segRealizado.valor}` : ''}
                </p>
                ${segRealizado.observacion ? `<p style="font-size: 12px; font-style: italic; margin-top: 2px;">"Obs: ${segRealizado.observacion}"</p>` : ''}
              ` : `
                <p style="font-size: 13px; color: var(--warning); font-weight: 500; margin-top: 6px;">
                  ⏳ Pendiente
                </p>
              `}
            </div>
            <div class="event-actions">
              <button class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;" onclick="App.openRegisterAnemiaModal('${fase}', '${ciclo}', '${act}', '${segRealizado ? segRealizado.fecha_realizada : ''}', '${segRealizado ? segRealizado.valor : ''}', '${segRealizado ? segRealizado.observacion : ''}')">
                ${hasCompleted ? '✏️ Editar' : '➕ Registrar'}
              </button>
            </div>
          </div>
        `;
        listEl.appendChild(ev);
      });
    });
    
    container.appendChild(listEl);
  },

  // ABRIR MODAL ANEMIA
  openRegisterAnemiaModal(fase, ciclo, actividad, fechaRealizada = '', valor = '', observacion = '') {
    document.getElementById('modal-anemia-fase').value = fase;
    document.getElementById('modal-anemia-ciclo').value = ciclo;
    document.getElementById('modal-anemia-actividad').value = actividad;
    document.getElementById('modal-anemia-fecha-real').value = fechaRealizada ? Utils.formatDateToInput(fechaRealizada) : Utils.formatDateToInput(new Date().toISOString());
    document.getElementById('modal-anemia-valor').value = valor;
    document.getElementById('modal-anemia-obs').value = observacion;
    
    document.getElementById('anemia-dialog').classList.add('active');
  },

  // GUARDAR CONTROL ANEMIA DESDE EL MODAL
  saveControlAnemiaFromModal() {
    const fase = document.getElementById('modal-anemia-fase').value;
    const ciclo = document.getElementById('modal-anemia-ciclo').value;
    const actividad = document.getElementById('modal-anemia-actividad').value;
    const fechaReal = document.getElementById('modal-anemia-fecha-real').value;
    const valor = document.getElementById('modal-anemia-valor').value;
    const obs = document.getElementById('modal-anemia-obs').value;
    
    if (!fechaReal) {
      alert("Por favor indica la fecha de realización");
      return;
    }
    
    const seguimiento = {
      dni_paciente: this.selectedPaciente.id,
      fase: fase,
      ciclo: ciclo,
      actividad: actividad,
      fecha_realizada: fechaReal,
      valor: valor,
      observacion: obs
    };
    
    Api.saveSeguimientoAnemiaLocal(seguimiento);
    document.getElementById('anemia-dialog').classList.remove('active');
    alert("¡Control de anemia guardado correctamente!");
    
    this.renderTimelineAnemia(fase);
  },

  // INICIALIZAR VISTA REPORTES
  initReportesView() {
    // Generar pequeño reporte local en el dashboard de reportes
    const db = Api.getLocalDb();
    const pacientes = db.pacientes;
    
    let html = `
      <div class="form-grid" style="margin-bottom: 30px;">
        <div class="stat-card">
          <div class="stat-value">${pacientes.length}</div>
          <div class="stat-label">Total Niños Registrados</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${pacientes.filter(p => p.tipo_seguimiento === 'termino').length}</div>
          <div class="stat-label">Niños a Término</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${pacientes.filter(p => p.tipo_seguimiento === 'bpn').length}</div>
          <div class="stat-label">Niños BPN/Prematuros</div>
        </div>
      </div>
      <p style="margin-bottom: 20px; font-size: 15px;">Aquí puedes descargar todos los datos en formato de Excel compatible con el reporte del MINSA.</p>
    `;
    document.getElementById('reportes-stats-container').innerHTML = html;
  },

  // DETECCIÓN ONLINE/OFFLINE
  checkOnlineStatus() {
    const banner = document.getElementById('offline-banner');
    
    const updateStatus = () => {
      if (navigator.onLine) {
        banner.style.display = 'none';
      } else {
        banner.style.display = 'flex';
      }
    };
    
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
  },

  // EXPORTAR A EXCEL EN EL FORMATO MINSA DE 290 COLUMNAS
  exportToMinsaExcel() {
    const db = Api.getLocalDb();
    const pacientes = db.pacientes;
    const seguimientosCred = db.seguimientoCred;
    
    if (pacientes.length === 0) {
      alert("No hay pacientes para exportar.");
      return;
    }

    try {
      // 1. Obtener la plantilla original (si el usuario la subiera o la creamos dinámicamente)
      // Como estamos haciéndolo cliente-side, usaremos SheetJS para construir las tablas
      const wb = XLSX.utils.book_new();
      
      // Hoja de Niños a Término
      const terminoPacientes = pacientes.filter(p => p.tipo_seguimiento === 'termino');
      const terminoRows = this.buildFlatRows(terminoPacientes, seguimientosCred, 'termino');
      const wsTermino = XLSX.utils.json_to_sheet(terminoRows);
      XLSX.utils.book_append_sheet(wb, wsTermino, "SEGUIMIENTO NIÑOS A TERMINO");
      
      // Hoja de BPN Prematuros
      const bpnPacientes = pacientes.filter(p => p.tipo_seguimiento === 'bpn');
      const bpnRows = this.buildFlatRows(bpnPacientes, seguimientosCred, 'bpn');
      const wsBpn = XLSX.utils.json_to_sheet(bpnRows);
      XLSX.utils.book_append_sheet(wb, wsBpn, "SEGUIMIENTO NIÑ@ BPN PREMATUROS");
      
      // Guardar
      XLSX.writeFile(wb, `REPORTE_CRED_MINSA_${new Date().toISOString().split('T')[0]}.xlsx`);
      alert("Archivo Excel exportado correctamente con formato compatible.");
    } catch (e) {
      console.error(e);
      alert("Error al exportar a Excel: " + e.message + "\n¿Se ha cargado la librería de Excel correctamente?");
    }
  },
  
  // Aplanar estructura relacional a filas horizontales para exportación clásica
  buildFlatRows(pacientes, seguimientos, tipo) {
    return pacientes.map((p, idx) => {
      const row = {
        "N°": idx + 1,
        "DISTRITO": p.distrito,
        "E.E.S.S PADRON": p.eess,
        "HC": p.hc,
        "TIPO DOC": p.tipo_doc,
        "N° DOCUMENTO": p.id,
        "NOMBRES Y APELLIDOS": p.nombres,
        "SEXO": p.sexo,
        "PESO": p.peso_nacer,
        "SEM GEST": p.sem_gest,
        "FECHA DE NACIMIENTO": p.fecha_nacimiento,
        "COMUNIDAD": p.comunidad,
        "DNI MADRE": p.dni_madre,
        "NOMBRES Y APELLIDOS MADRE": p.nombres_madre,
        "CELULAR": p.celular_madre
      };
      
      // Buscar y asignar actividades del paciente
      const pacSeg = seguimientos.filter(s => String(s.dni_paciente) === String(p.id));
      
      pacSeg.forEach(seg => {
        // Construimos una columna dinámica para cada actividad
        // Ej: "RN - BCG" o "1 MES - CRED 1º"
        const colKey = `${seg.mes_control ? seg.mes_control + ' - ' : ''}${seg.actividad}`;
        row[colKey] = seg.fecha_realizada || seg.valor || '';
      });
      
      return row;
    });
  }
};
