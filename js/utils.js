/**
 * UTILIDADES DE CÁLCULO Y FORMATEO
 */

const Utils = {
  // Calcular edad exacta en Años, Meses y Días
  calculateExactAge(birthDateStr) {
    if (!birthDateStr) return { text: "Sin fecha", years: 0, months: 0, days: 0, totalDays: 0 };
    
    // Normalizar formato de fecha
    const birthDate = new Date(birthDateStr);
    if (isNaN(birthDate.getTime())) return { text: "Fecha inválida", years: 0, months: 0, days: 0, totalDays: 0 };
    
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
      months--;
      // Obtener días del mes anterior
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    
    let text = "";
    if (years > 0) {
      text += `${years} a `;
    }
    if (months > 0 || years > 0) {
      text += `${months} m `;
    }
    text += `${days} d`;
    
    return {
      text: text.trim(),
      years: years,
      months: months,
      days: days,
      totalDays: totalDays
    };
  },

  // Formatear fecha para mostrar (DD/MM/AAAA)
  formatDateToShow(dateStr) {
    if (!dateStr) return "-";
    const str = String(dateStr).trim();
    if (!str || str === "None" || str === "null" || str === "-") return "-";
    
    // Si ya tiene formato correcto (DD/MM/AAAA)
    if (str.includes('/') && str.split('/').length === 3) return str;
    
    // Extraer solo la parte de fecha en caso de ISO
    const cleanDate = str.split('T')[0];
    const parts = cleanDate.split('-');
    if (parts.length !== 3) return str;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  },
  
  // Formatear fecha para inputs de tipo Date (AAAA-MM-DD)
  formatDateToInput(dateStr) {
    if (!dateStr) return "";
    const str = String(dateStr).trim();
    if (!str || str === "None" || str === "null") return "";
    return str.split('T')[0];
  },

  // Calcular diferencia en días
  daysBetween(dateStr1, dateStr2) {
    if (!dateStr1 || !dateStr2) return 0;
    const str1 = String(dateStr1).split('T')[0];
    const str2 = String(dateStr2).split('T')[0];
    const d1 = new Date(str1);
    const d2 = new Date(str2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  // Validar DNI
  isValidDNI(dni) {
    const reg = /^[0-9]{8}$/;
    return reg.test(String(dni).trim());
  },

  // Validar CNV (puede ser más largo)
  isValidCNV(cnv) {
    const reg = /^[0-9]{8,12}$/;
    return reg.test(String(cnv).trim());
  },

  // Generar ID temporal corto
  generateTempId() {
    return 'TEMP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  },

  // Obtener fecha límite programada para cada control CRED basado en fecha de nacimiento
  calculateScheduledDate(birthDateStr, mesControl) {
    if (!birthDateStr) return "";
    const str = String(birthDateStr).trim();
    if (!str || str === "None" || str === "null") return "";
    const birth = new Date(str.split('T')[0]);
    
    // Mapear los meses de control a cantidad de días o meses
    let targetDate = new Date(birth);
    
    if (mesControl === "RN") {
      // Retorna fecha del nacimiento
      return str.split('T')[0];
    }
    
    // Analizar el string del mes de control
    // Ejemplos: "1 MES", "2 MESES", "1 AÑO", "1 AÑO 3 MESES", "2 AÑOS", etc.
    const cleanMes = String(mesControl).toUpperCase().trim();
    
    let addMonths = 0;
    
    if (cleanMes.includes("1 MES")) addMonths = 1;
    else if (cleanMes.includes("2 MESES")) addMonths = 2;
    else if (cleanMes.includes("3 MESES")) addMonths = 3;
    else if (cleanMes.includes("4 MESES")) addMonths = 4;
    else if (cleanMes.includes("5 MESES")) addMonths = 5;
    else if (cleanMes.includes("6 MESES")) addMonths = 6;
    else if (cleanMes.includes("7 MESES")) addMonths = 7;
    else if (cleanMes.includes("8 MESES")) addMonths = 8;
    else if (cleanMes.includes("9 MESES")) addMonths = 9;
    else if (cleanMes.includes("10 MESES")) addMonths = 10;
    else if (cleanMes.includes("11 MESES")) addMonths = 11;
    else if (cleanMes.includes("1 AÑO") && cleanMes.includes("3 MESES")) addMonths = 15;
    else if (cleanMes.includes("1 AÑO") && cleanMes.includes("4 MESES")) addMonths = 16;
    else if (cleanMes.includes("1 AÑO") && cleanMes.includes("5 MESES")) addMonths = 17;
    else if (cleanMes.includes("1 AÑO") && cleanMes.includes("6 MESES")) addMonths = 18;
    else if (cleanMes.includes("1 AÑO") && cleanMes.includes("7 MESES")) addMonths = 19;
    else if (cleanMes.includes("1 AÑO") && cleanMes.includes("8 MESES")) addMonths = 20;
    else if (cleanMes.includes("1 AÑO") && cleanMes.includes("9 MESES")) addMonths = 21;
    else if (cleanMes.includes("1 AÑO")) addMonths = 12;
    else if (cleanMes.includes("2 AÑOS") && cleanMes.includes("1 MES")) addMonths = 25;
    else if (cleanMes.includes("2 AÑOS") && cleanMes.includes("2 MESES")) addMonths = 26;
    else if (cleanMes.includes("2 AÑOS") && cleanMes.includes("3 MESES")) addMonths = 27;
    else if (cleanMes.includes("2 AÑOS") && cleanMes.includes("4 MESES")) addMonths = 28;
    else if (cleanMes.includes("2 AÑOS") && cleanMes.includes("5 MESES")) addMonths = 29;
    else if (cleanMes.includes("2 AÑOS") && cleanMes.includes("6 MESES")) addMonths = 30;
    else if (cleanMes.includes("2 AÑOS")) addMonths = 24;
    else if (cleanMes.includes("3 AÑOS") && cleanMes.includes("1 MES")) addMonths = 37;
    else if (cleanMes.includes("3 AÑOS") && cleanMes.includes("2 MESES")) addMonths = 38;
    else if (cleanMes.includes("3 AÑOS") && cleanMes.includes("3 MESES")) addMonths = 39;
    else if (cleanMes.includes("3 AÑOS") && cleanMes.includes("6 MESES")) addMonths = 42;
    else if (cleanMes.includes("3 AÑOS")) addMonths = 36;
    else if (cleanMes.includes("4 AÑOS") && cleanMes.includes("1 MES")) addMonths = 49;
    else if (cleanMes.includes("4 AÑOS") && cleanMes.includes("2 MESES")) addMonths = 50;
    else if (cleanMes.includes("4 AÑOS") && cleanMes.includes("3 MESES")) addMonths = 51;
    else if (cleanMes.includes("4 AÑOS") && cleanMes.includes("6 MESES")) addMonths = 54;
    else if (cleanMes.includes("4 AÑOS")) addMonths = 48;
    
    targetDate.setMonth(targetDate.getMonth() + addMonths);
    return targetDate.toISOString().split('T')[0];
  },

  // Normalizar nombre de actividad para comparaciones robustas
  normalizeActName(name) {
    if (!name) return "";
    let clean = String(name)
      .toUpperCase()
      .replace(/[\r\n]+/g, " ") // Reemplazar saltos de línea por espacio
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar acentos/diacríticos
      .replace(/[^A-Z0-9 ]/g, "") // Mantener solo caracteres alfanuméricos y espacios
      .replace(/\s+/g, " ") // Colapsar espacios múltiples
      .trim();

    // Normalizaciones específicas para Consejería
    if (clean.includes("CONSEJERIA LACTANCIA MATERNA EXCLUSIVA")) {
      return "CONSEJERIA LACTANCIA MATERNA EXCLUSIVA";
    }
    if (clean.includes("CONSEJERIA ALIMENTACION COMPLEMENTARIA")) {
      return "CONSEJERIA ALIMENTACION COMPLEMENTARIA";
    }
    if (clean.includes("ORIENTACION NUTRICIONAL")) {
      // Unificar nombres largos de consejería nutricional
      return "CONSEJERIA ORIENTACION NUTRICIONAL";
    }

    // Normalizaciones específicas para Días
    if (clean.includes("DIAS DE DIFERENCIA")) {
      clean = clean.replace("DIAS DE DIFERENCIA", "");
    }
    if (clean.startsWith("DIAS ")) {
      // Ej: "DIAS 2" -> "DIAS 2", "DIAS" -> "DIAS"
      return clean.trim();
    }
    if (clean === "DIAS") {
      return "DIAS";
    }
    
    // Normalizar dosis de HIERRO (ej: "HIERRO SF 2" -> "HIERRO SF 2", etc.)
    if (clean.startsWith("HIERRO SF") || clean.startsWith("HIERRO SF ")) {
      const numMatch = clean.match(/\d+/);
      const num = numMatch ? numMatch[0] : "";
      return ("HIERRO SF " + num).trim();
    }

    return clean;
  },

  // Normalizar mes_control para mapear correctamente del Excel al Catálogo
  normalizeMesControl(mes) {
    if (!mes) return "RN";
    const clean = String(mes)
      .toUpperCase()
      .replace(/[\r\n]+/g, " ")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Mapear variaciones del recién nacido
    if (["LUGAR", "VACUNA", "CONTROL RN", "TAMIZAJES EN EL RECIEN NACIDO", "RN", "RECIEN NACIDO"].includes(clean)) {
      return "RN";
    }

    // Mapear meses específicos
    if (clean === "1 MES") return "1 MES";
    if (clean === "2 MESES") return "2 MESES";
    if (clean === "3 MESES") return "3 MESES";
    if (clean === "4 MESES") return "4 MESES";
    if (clean === "5 MESES") return "5 MESES";
    if (clean === "6 MESES") return "6 MESES";
    if (clean === "7 MESES") return "7 MESES";
    if (clean === "8 MESES") return "8 MESES";
    if (clean === "9 MESES") return "9 MESES";
    if (clean === "10 MESES") return "10 MESES";
    if (clean === "11 MESES") return "11 MESES";

    // Mapear 1 año y fracciones
    if (["CRED 1 ANIO", "CRED 1 ANO", "12 MESES", "1 ANIO", "1 ANO"].includes(clean)) {
      return "12 MESES";
    }
    if (["1 ANIO 3 MESES", "1 ANO 3 MESES", "15 MESES"].includes(clean)) {
      return "15 MESES";
    }
    if (["1 ANIO 6 MESES", "1 ANO 6 MESES", "18 MESES", "1ANIO 6 MESES", "1ANO 6 MESES"].includes(clean)) {
      return "18 MESES";
    }

    // Mapear 2 años y fracciones
    if (["CRED 2 ANIOS", "CRED 2 ANOS", "24 MESES", "2 ANIOS", "2 ANOS"].includes(clean)) {
      return "24 MESES";
    }
    if (["2 ANIOS 6 MESES", "2 ANO 6 MESES", "2 ANOS 6 MESES", "30 MESES"].includes(clean)) {
      return "30 MESES";
    }

    // Mapear 3 y 4 años
    if (["CRED 3 ANIOS", "CRED 3 ANOS", "3 ANIOS", "3 ANOS", "36 MESES"].includes(clean)) {
      return "36 MESES";
    }
    if (["CRED 4 ANIOS", "CRED 4 ANOS", "4 ANIOS", "4 ANOS", "48 MESES"].includes(clean)) {
      return "48 MESES";
    }

    // Por defecto, retornar el valor limpio
    return clean;
  },

  // Obtener color del estado de días (green o red) según el mes de control y el valor
  getDaysStatusColor(diasVal, mesControl, actName) {
    const dias = parseInt(diasVal, 10);
    if (isNaN(dias)) return "neutral";
    
    const cleanMes = this.normalizeMesControl(mesControl);
    const cleanAct = this.normalizeActName(actName);
    
    let minG = 30, maxG = 37; // default mensual
    
    if (cleanMes === "RN") {
      if (cleanAct === "DIAS") { // BCG / HVB
        minG = 0; maxG = 1;
      } else if (cleanAct === "DIAS 2") { // 2 CRED
        minG = 7; maxG = 14;
      } else if (cleanAct === "DIAS 3") { // 3 CRED
        minG = 15; maxG = 21;
      } else if (cleanAct === "DIAS 5") { // Tamizaje
        minG = 2; maxG = 6;
      } else { // 1 CRED
        minG = 3; maxG = 6;
      }
    } else if (["15 MESES", "18 MESES", "39 MESES", "42 MESES", "51 MESES", "54 MESES"].includes(cleanMes)) {
      if (cleanAct.includes("DIAS")) {
        minG = 90; maxG = 97;
      }
    } else if (["24 MESES", "30 MESES", "36 MESES", "48 MESES"].includes(cleanMes)) {
      if (cleanAct.includes("DIAS")) {
        minG = 180; maxG = 187;
      }
    }
    
    if (dias >= minG && dias <= maxG) {
      return "green";
    } else {
      return "red";
    }
  },

  // Mostrar una alerta profesional usando SweetAlert2
  showAlert(title, text, icon = 'info') {
    if (window.Swal) {
      return Swal.fire({
        title: title,
        html: text.replace(/\n/g, '<br>'), // permitir saltos de línea
        icon: icon,
        confirmButtonColor: '#1F4E79'
      });
    } else {
      alert(`${title}\n\n${text}`);
      return Promise.resolve();
    }
  },

  showToast(title, icon = 'success') {
    if (window.Swal) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      return Toast.fire({
        icon: icon,
        title: title
      });
    } else {
      console.log("Toast:", title);
      return Promise.resolve();
    }
  }
};

