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
    // Extraer solo la parte de fecha en caso de ISO
    const cleanDate = dateStr.split('T')[0];
    const parts = cleanDate.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  },
  
  // Formatear fecha para inputs de tipo Date (AAAA-MM-DD)
  formatDateToInput(dateStr) {
    if (!dateStr) return "";
    return dateStr.split('T')[0];
  },

  // Calcular diferencia en días
  daysBetween(dateStr1, dateStr2) {
    if (!dateStr1 || !dateStr2) return 0;
    const d1 = new Date(dateStr1.split('T')[0]);
    const d2 = new Date(dateStr2.split('T')[0]);
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
    const birth = new Date(birthDateStr.split('T')[0]);
    
    // Mapear los meses de control a cantidad de días o meses
    let targetDate = new Date(birth);
    
    if (mesControl === "RN") {
      // Retorna fecha del nacimiento
      return birthDateStr.split('T')[0];
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
  }
};
