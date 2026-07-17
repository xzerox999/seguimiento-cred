/**
 * LÓGICA PRINCIPAL DE LA APLICACIÓN (SPA ROUTING, EVENTOS, TIMELINE Y FORMULARIOS)
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Arrays compartidos para controles desde 1 AÑO (idénticos para Término y Prematuro)
const shared1Anio = [
  { name: 'PAIS 1', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro PAIS 1' },
  { name: 'dias 1', type: 'auto', mes: 'CRED 1 AÑO', desc: 'Registro dias 1' },
  { name: 'CRED  1', type: 'date', mes: 'CRED 1 AÑO', desc: 'Fecha CRED  1' },
  { name: '1ra  Sesion estimulacion temprana', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro 1ra  Sesion estimulacion temprana' },
  { name: 'TAM. VIF', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro TAM. VIF' },
  { name: 'EX OJOS', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro EX OJOS' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro EV. ODONTOLOGICA' },
  { name: 'TEST GRAHAM', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro TEST GRAHAM' },
  { name: 'SPR  1°', type: 'date', mes: 'CRED 1 AÑO', desc: 'Fecha SPR  1°' },
  { name: 'NEUMO  3°', type: 'date', mes: 'CRED 1 AÑO', desc: 'Fecha NEUMO  3°' },
  { name: 'VARICELA', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro VARICELA' },
  { name: 'INFLUENZA PEDIATRICA', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro INFLUENZA PEDIATRICA' },
  { name: 'Vitamina VA1  200.000 UI', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro Vitamina VA1  200.000 UI' },
  { name: 'DOSAJE  HB  Dx', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro DOSAJE  HB  Dx' },
  { name: 'TA  suplementacion', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro TA  suplementacion' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        4', type: 'date', mes: 'CRED 1 AÑO', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        4' },
  { name: 'DX ANEMIA SI O NO', type: 'select', mes: 'CRED 1 AÑO', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
  { name: 'dias  2', type: 'auto', mes: '1 AÑO   3 MESES', desc: 'Registro dias  2' },
  { name: 'CRED 2°', type: 'date', mes: '1 AÑO   3 MESES', desc: 'Fecha CRED 2°' },
  { name: '2da  Sesion estimulacion temprana', type: 'date', mes: '1 AÑO   3 MESES', desc: 'Registro 2da  Sesion estimulacion temprana' },
  { name: 'AMA', type: 'date', mes: '1 AÑO   3 MESES', desc: 'Registro AMA' },
  { name: 'HEPATITIS  A', type: 'date', mes: '1 AÑO   3 MESES', desc: 'Registro HEPATITIS  A' },
  { name: 'DOSAJE  HB  Dx', type: 'date', mes: '1 AÑO   3 MESES', desc: 'Registro DOSAJE  HB  Dx' },
  { name: 'HIERRO SF 1', type: 'date', mes: '1 AÑO   3 MESES', desc: 'Registro HIERRO SF 1' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        1', type: 'date', mes: '1 AÑO   3 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        1' },
  { name: 'dias 3', type: 'auto', mes: '1 AÑO  4 MESES', desc: 'Registro dias 3' },
  { name: 'HIERRO SF 2', type: 'date', mes: '1 AÑO  4 MESES', desc: 'Registro HIERRO SF 2' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         2', type: 'date', mes: '1 AÑO  4 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         2' },
  { name: 'dias 4', type: 'auto', mes: '1 AÑO  5 MESES', desc: 'Registro dias 4' },
  { name: 'HIERRO SF 3', type: 'date', mes: '1 AÑO  5 MESES', desc: 'Registro HIERRO SF 3' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)           3', type: 'date', mes: '1 AÑO  5 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)           3' },
  { name: 'dias       5', type: 'auto', mes: '1AÑO 6 MESES', desc: 'Registro dias       5' },
  { name: 'CRED 3°', type: 'date', mes: '1AÑO 6 MESES', desc: 'Fecha CRED 3°' },
  { name: '3ra  Sesion estimulacion temprana', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro 3ra  Sesion estimulacion temprana' },
  { name: 'TAM. VIF', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro TAM. VIF' },
  { name: 'EX OJOS', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro EX OJOS' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro EV. ODONTOLOGICA' },
  { name: 'SPR  2°', type: 'date', mes: '1AÑO 6 MESES', desc: 'Fecha SPR  2°' },
  { name: 'IPV  1° REF', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro IPV  1° REF' },
  { name: 'DPT  1° REF', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro DPT  1° REF' },
  { name: 'Vitamina   VA2   200.000UI', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro Vitamina   VA2   200.000UI' },
  { name: 'DOSAJE HB  c1', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro DOSAJE HB  c1' },
  { name: 'HIERRO SF 4', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro HIERRO SF 4' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)             4', type: 'date', mes: '1AÑO 6 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)             4' },
  { name: 'DX ANEMIA SI O NO', type: 'select', mes: '1AÑO 6 MESES', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
  { name: 'dias      6', type: 'auto', mes: '1 AÑO  7 MESES', desc: 'Registro dias      6' },
  { name: 'HIERRO SF 5', type: 'date', mes: '1 AÑO  7 MESES', desc: 'Registro HIERRO SF 5' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            5', type: 'date', mes: '1 AÑO  7 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            5' },
  { name: 'dias       7', type: 'auto', mes: '1AÑO  8 MESES', desc: 'Registro dias       7' },
  { name: '4ta  Sesion estimulacion temprana', type: 'date', mes: '1AÑO  8 MESES', desc: 'Registro 4ta  Sesion estimulacion temprana' },
  { name: 'HIERRO SF 6', type: 'date', mes: '1AÑO  8 MESES', desc: 'Registro HIERRO SF 6' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              6', type: 'date', mes: '1AÑO  8 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              6' },
  { name: 'PAIS  TA', type: 'date', mes: '1 AÑO 9 MESES', desc: 'Registro PAIS  TA' },
  { name: 'dias        8', type: 'auto', mes: '1 AÑO 9 MESES', desc: 'Registro dias        8' },
  { name: 'CRED 4°', type: 'date', mes: '1 AÑO 9 MESES', desc: 'Fecha CRED 4°' },
  { name: 'DOSAJE  HB  c2', type: 'date', mes: '1 AÑO 9 MESES', desc: 'Registro DOSAJE  HB  c2' },
  { name: 'TA  suplementacion', type: 'date', mes: '1 AÑO 9 MESES', desc: 'Registro TA  suplementacion' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            7', type: 'date', mes: '1 AÑO 9 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            7' },
  { name: 'DX ANEMIA SI O NO', type: 'select', mes: '1 AÑO 9 MESES', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] }
];

const shared2Anios = [
  { name: 'PAIS  1', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro PAIS  1' },
  { name: 'dias   1', type: 'auto', mes: 'CRED  2 AÑOS', desc: 'Registro dias   1' },
  { name: 'CRED  1', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Fecha CRED  1' },
  { name: '1ra  Sesion estimulacion temprana', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro 1ra  Sesion estimulacion temprana' },
  { name: 'INFLUENZA PEDIATRICA', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro INFLUENZA PEDIATRICA' },
  { name: 'ANTIPARASITARIO  1 FCO', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro ANTIPARASITARIO  1 FCO' },
  { name: 'TEST DE GRAHAM', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro TEST DE GRAHAM' },
  { name: 'EX. PARASITOSIS', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro EX. PARASITOSIS' },
  { name: 'TAM. VIF', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro TAM. VIF' },
  { name: 'EX OJOS', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro EX OJOS' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro EV. ODONTOLOGICA' },
  { name: 'Vitamina  VA1 200.000UI', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro Vitamina  VA1 200.000UI' },
  { name: 'DOSAJE HB       Dx', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro DOSAJE HB       Dx' },
  { name: 'HIERRO SF  1', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro HIERRO SF  1' },
  { name: 'DX ANEMIA SI O NO', type: 'select', mes: 'CRED  2 AÑOS', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          1', type: 'date', mes: 'CRED  2 AÑOS', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          1' },
  { name: 'dias           2', type: 'auto', mes: '2 AÑOS  1 MES', desc: 'Registro dias           2' },
  { name: 'HIERRO SF  2', type: 'date', mes: '2 AÑOS  1 MES', desc: 'Registro HIERRO SF  2' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          2', type: 'date', mes: '2 AÑOS  1 MES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          2' },
  { name: 'dias            3', type: 'auto', mes: '2 AÑOS 2 MESES', desc: 'Registro dias            3' },
  { name: 'HIERRO SF  3', type: 'date', mes: '2 AÑOS 2 MESES', desc: 'Registro HIERRO SF  3' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          3', type: 'date', mes: '2 AÑOS 2 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          3' },
  { name: 'dias       4', type: 'auto', mes: '2 AÑOS  3 MESES', desc: 'Registro dias       4' },
  { name: 'HIERRO SF4', type: 'date', mes: '2 AÑOS  3 MESES', desc: 'Registro HIERRO SF4' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         4', type: 'date', mes: '2 AÑOS  3 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         4' },
  { name: 'dias              5', type: 'auto', mes: '2 AÑOS  4 MESES', desc: 'Registro dias              5' },
  { name: 'HIERRO SF5', type: 'date', mes: '2 AÑOS  4 MESES', desc: 'Registro HIERRO SF5' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          5', type: 'date', mes: '2 AÑOS  4 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          5' },
  { name: 'dias               6', type: 'auto', mes: '2 AÑOS  5 MESES', desc: 'Registro dias               6' },
  { name: 'HIERRO SF6', type: 'date', mes: '2 AÑOS  5 MESES', desc: 'Registro HIERRO SF6' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          6', type: 'date', mes: '2 AÑOS  5 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          6' },
  { name: 'PAIS  TA', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro PAIS  TA' },
  { name: 'dias                7', type: 'auto', mes: '2 AÑOS 6 MESES', desc: 'Registro dias                7' },
  { name: 'CRED  2', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Fecha CRED  2' },
  { name: '2da  Sesion estimulacion temprana  2', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro 2da  Sesion estimulacion temprana  2' },
  { name: 'ANTIPARASITARIO  2 FCO', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro ANTIPARASITARIO  2 FCO' },
  { name: 'TAM. VIF      2', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro TAM. VIF      2' },
  { name: 'EX OJOS', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro EX OJOS' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro EV. ODONTOLOGICA' },
  { name: 'Vitamina  VA2             200.000UI', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro Vitamina  VA2             200.000UI' },
  { name: 'DOSAJE  HB      c1', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro DOSAJE  HB      c1' },
  { name: 'TA suplementacion', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro TA suplementacion' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          7', type: 'date', mes: '2 AÑOS 6 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          7' },
  { name: 'DX ANEMIA SI O NO', type: 'select', mes: '2 AÑOS 6 MESES', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] }
];

const shared3Anios = [
  { name: 'PAIS  1', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro PAIS  1' },
  { name: 'dias                                 1', type: 'auto', mes: 'CRED 3 AÑOS', desc: 'Registro dias                                 1' },
  { name: 'CRED 1', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Fecha CRED 1' },
  { name: 'Sesion estimulacion temprana', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro Sesion estimulacion temprana' },
  { name: 'INFLUENZA adulto', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro INFLUENZA adulto' },
  { name: 'ANTIPARASITARIO   1 FCO', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro ANTIPARASITARIO   1 FCO' },
  { name: 'TEST DE GRAHAM', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro TEST DE GRAHAM' },
  { name: 'EX. PARASITOSIS', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro EX. PARASITOSIS' },
  { name: 'TAM. VIF', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro TAM. VIF' },
  { name: 'EX OJOS', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro EX OJOS' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro EV. ODONTOLOGICA' },
  { name: 'Vitamina  VA1      200.000UI', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro Vitamina  VA1      200.000UI' },
  { name: 'DOSAJE  HB Dx', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro DOSAJE  HB Dx' },
  { name: 'HIERRO  SF1', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro HIERRO  SF1' },
  { name: 'DX ANEMIA SI O NO', type: 'select', mes: 'CRED 3 AÑOS', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1', type: 'date', mes: 'CRED 3 AÑOS', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1' },
  { name: 'dias                                 2', type: 'auto', mes: '3 AÑOS 1 MES', desc: 'Registro dias                                 2' },
  { name: 'HIERRO  SF2', type: 'date', mes: '3 AÑOS 1 MES', desc: 'Registro HIERRO  SF2' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2', type: 'date', mes: '3 AÑOS 1 MES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2' },
  { name: 'dias                3', type: 'auto', mes: '3 AÑOS 2 MESES', desc: 'Registro dias                3' },
  { name: 'HIERRO  SF3', type: 'date', mes: '3 AÑOS 2 MESES', desc: 'Registro HIERRO  SF3' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3', type: 'date', mes: '3 AÑOS 2 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3' },
  { name: 'dias              4', type: 'auto', mes: '3 AÑOS 3 MESES', desc: 'Registro dias              4' },
  { name: 'DOSAJE  HB  c1', type: 'date', mes: '3 AÑOS 3 MESES', desc: 'Registro DOSAJE  HB  c1' },
  { name: 'TA suplementacion', type: 'date', mes: '3 AÑOS 3 MESES', desc: 'Registro TA suplementacion' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4', type: 'date', mes: '3 AÑOS 3 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4' },
  { name: 'PAIS TA', type: 'date', mes: '3 AÑOS 6 MESES', desc: 'Registro PAIS TA' },
  { name: 'dias               5', type: 'auto', mes: '3 AÑOS 6 MESES', desc: 'Registro dias               5' },
  { name: 'CRED 2', type: 'date', mes: '3 AÑOS 6 MESES', desc: 'Fecha CRED 2' },
  { name: 'ANTIPARASITARIO  2 FCO', type: 'date', mes: '3 AÑOS 6 MESES', desc: 'Registro ANTIPARASITARIO  2 FCO' },
  { name: 'Vitamina  VA2', type: 'date', mes: '3 AÑOS 6 MESES', desc: 'Registro Vitamina  VA2' },
  { name: 'TAM. VIF', type: 'date', mes: '3 AÑOS 6 MESES', desc: 'Registro TAM. VIF' },
  { name: 'EX OJOS       2', type: 'date', mes: '3 AÑOS 6 MESES', desc: 'Registro EX OJOS       2' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: '3 AÑOS 6 MESES', desc: 'Registro EV. ODONTOLOGICA' }
];

const shared4Anios = [
  { name: 'PAIS  1', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro PAIS  1' },
  { name: 'dias                                 1', type: 'auto', mes: 'CRED 4 AÑOS', desc: 'Registro dias                                 1' },
  { name: 'CRED 1', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Fecha CRED 1' },
  { name: 'Sesion estimulacion temprana', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro Sesion estimulacion temprana' },
  { name: 'INFLUENZA adulto', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro INFLUENZA adulto' },
  { name: 'ANTIPARASITARIO   1 FCO', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro ANTIPARASITARIO   1 FCO' },
  { name: 'TEST DE GRAHAM', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro TEST DE GRAHAM' },
  { name: 'EX. PARASITOSIS', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro EX. PARASITOSIS' },
  { name: 'TAM. VIF', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro TAM. VIF' },
  { name: 'EX  OJOS', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro EX  OJOS' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro EV. ODONTOLOGICA' },
  { name: 'Vitamina  VA1      200.000UI', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro Vitamina  VA1      200.000UI' },
  { name: 'DOSAJE  HB Dx', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro DOSAJE  HB Dx' },
  { name: 'HIERRO  SF1', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro HIERRO  SF1' },
  { name: 'DX ANEMIA SI O NO', type: 'select', mes: 'CRED 4 AÑOS', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1', type: 'date', mes: 'CRED 4 AÑOS', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1' },
  { name: 'dias                                 2', type: 'auto', mes: '4 AÑOS 1 MES', desc: 'Registro dias                                 2' },
  { name: 'HIERRO  SF2', type: 'date', mes: '4 AÑOS 1 MES', desc: 'Registro HIERRO  SF2' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2', type: 'date', mes: '4 AÑOS 1 MES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2' },
  { name: 'dias                3', type: 'auto', mes: '4 AÑOS 2 MESES', desc: 'Registro dias                3' },
  { name: 'HIERRO  SF3', type: 'date', mes: '4 AÑOS 2 MESES', desc: 'Registro HIERRO  SF3' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3', type: 'date', mes: '4 AÑOS 2 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3' },
  { name: 'dias              4', type: 'auto', mes: '4 AÑOS 3 MESES', desc: 'Registro dias              4' },
  { name: 'DOSAJE  HB  c1', type: 'date', mes: '4 AÑOS 3 MESES', desc: 'Registro DOSAJE  HB  c1' },
  { name: 'TA suplementacion', type: 'date', mes: '4 AÑOS 3 MESES', desc: 'Registro TA suplementacion' },
  { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4', type: 'date', mes: '4 AÑOS 3 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4' },
  { name: 'PAIS TA', type: 'date', mes: '4 AÑOS 6 MESES', desc: 'Registro PAIS TA' },
  { name: 'dias               5', type: 'auto', mes: '4 AÑOS 6 MESES', desc: 'Registro dias               5' },
  { name: 'CRED 2', type: 'date', mes: '4 AÑOS 6 MESES', desc: 'Fecha CRED 2' },
  { name: 'ANTIPARASITARIO   2 FCO', type: 'date', mes: '4 AÑOS 6 MESES', desc: 'Registro ANTIPARASITARIO   2 FCO' },
  { name: 'Vitamina  VA2       200.000UI', type: 'date', mes: '4 AÑOS 6 MESES', desc: 'Registro Vitamina  VA2       200.000UI' },
  { name: 'TAM. VIF', type: 'date', mes: '4 AÑOS 6 MESES', desc: 'Registro TAM. VIF' },
  { name: 'EX OJOS', type: 'date', mes: '4 AÑOS 6 MESES', desc: 'Registro EX OJOS' },
  { name: 'EV. ODONTOLOGICA', type: 'date', mes: '4 AÑOS 6 MESES', desc: 'Registro EV. ODONTOLOGICA' }
];

const App = {
  currentView: 'dashboard',
  selectedPaciente: null,
  activeTimelineTab: 'RN',
  
  // Catálogo de controles CRED Niños a Término
  credTerminoActividades: {
    'RN': [
      { name: 'NACIMIENTO', type: 'text', mes: 'LUGAR', desc: 'Registro NACIMIENTO' },
      { name: 'BCG', type: 'date', mes: 'VACUNA', desc: 'Fecha BCG' },
      { name: 'HVB', type: 'date', mes: 'VACUNA', desc: 'Fecha HVB' },
      { name: 'dias', type: 'auto', mes: 'VACUNA', desc: 'Registro dias' },
      { name: 'PAIS 1', type: 'date', mes: 'CONTROL RN', desc: 'Registro PAIS 1' },
      { name: '1° CRED', type: 'date', mes: 'CONTROL RN', desc: 'Fecha 1° CRED' },
      { name: 'dias', type: 'auto', mes: 'CONTROL RN', desc: 'Registro dias' },
      { name: 'TAM. VIF.', type: 'date', mes: 'CONTROL RN', desc: 'Registro TAM. VIF.' },
      { name: 'EX. OJOS', type: 'date', mes: 'CONTROL RN', desc: 'Registro EX. OJOS' },
      { name: '2° CRED', type: 'date', mes: 'CONTROL RN', desc: 'Fecha 2° CRED' },
      { name: 'dias 2', type: 'auto', mes: 'CONTROL RN', desc: 'Registro dias 2' },
      { name: 'PAIS TA', type: 'date', mes: 'CONTROL RN', desc: 'Registro PAIS TA' },
      { name: '3° CRED', type: 'date', mes: 'CONTROL RN', desc: 'Fecha 3° CRED' },
      { name: 'dias 3', type: 'auto', mes: 'CONTROL RN', desc: 'Registro dias 3' },
      { name: 'TAMIZAJE NEONATAL', type: 'date', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE NEONATAL' },
      { name: 'dias 5', type: 'auto', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro dias 5' },
      { name: 'LUGAR', type: 'text', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro LUGAR' },
      { name: 'TAMIZAJE HIPOACUSIA', type: 'select', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE HIPOACUSIA', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'TAMIZAJE CATARATA', type: 'select', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE CATARATA', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'TAMIZAJE CARDIACO', type: 'select', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE CARDIACO', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'DE 2-7 DIAS  RN', type: 'auto', mes: 'VISITA DOMICIL.', desc: 'Registro DE 2-7 DIAS  RN' },
      { name: 'ATENCION EN OTRO EESS', type: 'date', mes: 'OBSERVACION', desc: 'Registro ATENCION EN OTRO EESS' },
      { name: 'DESPUES DE 7 DIAS DEL  SF  V.D. 1', type: 'auto', mes: 'VISITA DOMICIL.  1', desc: 'Registro DESPUES DE 7 DIAS DEL  SF  V.D. 1' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE    SF   V.D. 2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE    SF   V.D. 2' },
      { name: 'DESPUES DE 7 DIAS DEL SF   V.D. 1', type: 'auto', mes: 'VISITA DOMICIL. 1', desc: 'Registro DESPUES DE 7 DIAS DEL SF   V.D. 1' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF   V.D.2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE   SF   V.D.2' },
      { name: 'DESPUES DE 7 DIAS DEL SF    V.D.3', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  3', desc: 'Registro DESPUES DE 7 DIAS DEL SF    V.D.3' },
      { name: 'DESPUES DE 7 DIAS DEL SF       V.D. 1', type: 'auto', mes: 'VISITA DOMICIL.  1', desc: 'Registro DESPUES DE 7 DIAS DEL SF       V.D. 1' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF      V.D. 2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION 2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE  SF      V.D. 2' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF       V,D.3', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  3', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE  SF       V,D.3' },
      { name: 'DESPUES DE 7 DIAS DEL SF       V.D. 1', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION 1', desc: 'Registro DESPUES DE 7 DIAS DEL SF       V.D. 1' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF           V.D. 2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE  SF           V.D. 2' },
      { name: 'DESPUES DE 7 DIAS DEL SF               V.D. 1', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION   1', desc: 'Registro DESPUES DE 7 DIAS DEL SF               V.D. 1' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF 2  V.D. 2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION   2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE   SF 2  V.D. 2' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF    V.D. 3', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION   3', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE   SF    V.D. 3' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF 2 V.D. 2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION   2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE   SF 2 V.D. 2' },
      { name: 'DESPUES DE 7 DIAS DEL SF  V.D.1', type: 'auto', mes: 'VISITA DOMICIL. 1', desc: 'Registro DESPUES DE 7 DIAS DEL SF  V.D.1' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF   V.D.2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE  SF   V.D.2' },
      { name: 'DESPUES DE 7 DIAS DEL  SF  V.D. 1', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  3', desc: 'Registro DESPUES DE 7 DIAS DEL  SF  V.D. 1' }
    ],
    '1-11 MESES': [
      { name: 'PAIS  1', type: 'date', mes: '1 MES', desc: 'Registro PAIS  1' },
      { name: 'dias', type: 'auto', mes: '1 MES', desc: 'Registro dias' },
      { name: 'CRED 1°', type: 'date', mes: '1 MES', desc: 'Fecha CRED 1°' },
      { name: '1ra  Sesion estimulacion temprana', type: 'date', mes: '1 MES', desc: 'Registro 1ra  Sesion estimulacion temprana' },
      { name: 'TAM. VIF', type: 'date', mes: '1 MES', desc: 'Registro TAM. VIF' },
      { name: 'EV. ODONTOLOGICA', type: 'date', mes: '1 MES', desc: 'Registro EV. ODONTOLOGICA' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  1', type: 'date', mes: '1 MES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  1' },
      { name: 'dias  2', type: 'auto', mes: '2 MESES', desc: 'Registro dias  2' },
      { name: 'CRED  2°', type: 'date', mes: '2 MESES', desc: 'Fecha CRED  2°' },
      { name: '2da  Sesion estimulacion temprana', type: 'date', mes: '2 MESES', desc: 'Registro 2da  Sesion estimulacion temprana' },
      { name: 'PENTA  1°', type: 'date', mes: '2 MESES', desc: 'Fecha PENTA  1°' },
      { name: 'IPV  1°', type: 'date', mes: '2 MESES', desc: 'Registro IPV  1°' },
      { name: 'NEUMO 1°', type: 'date', mes: '2 MESES', desc: 'Fecha NEUMO 1°' },
      { name: 'ROTA  1°', type: 'date', mes: '2 MESES', desc: 'Fecha ROTA  1°' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  2', type: 'date', mes: '2 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  2' },
      { name: 'dias  3', type: 'auto', mes: '3 MESES', desc: 'Registro dias  3' },
      { name: 'CRED 3°', type: 'date', mes: '3 MESES', desc: 'Fecha CRED 3°' },
      { name: 'EX. OJOS', type: 'date', mes: '3 MESES', desc: 'Registro EX. OJOS' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  3', type: 'date', mes: '3 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  3' },
      { name: 'dias  4', type: 'auto', mes: '4 MESES', desc: 'Registro dias  4' },
      { name: 'CRED 4°', type: 'date', mes: '4 MESES', desc: 'Fecha CRED 4°' },
      { name: '3ra  Sesion estimulacion temprana', type: 'date', mes: '4 MESES', desc: 'Registro 3ra  Sesion estimulacion temprana' },
      { name: 'PENTA  2°', type: 'date', mes: '4 MESES', desc: 'Fecha PENTA  2°' },
      { name: 'IPV  2°', type: 'date', mes: '4 MESES', desc: 'Registro IPV  2°' },
      { name: 'NEUMO 2°', type: 'date', mes: '4 MESES', desc: 'Fecha NEUMO 2°' },
      { name: 'ROTA  2°', type: 'date', mes: '4 MESES', desc: 'Fecha ROTA  2°' },
      { name: 'HIERRO  SF 1', type: 'date', mes: '4 MESES', desc: 'Registro HIERRO  SF 1' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  4', type: 'date', mes: '4 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  4' },
      { name: 'dias  5', type: 'auto', mes: '5 MESES', desc: 'Registro dias  5' },
      { name: 'REAJUSTE DE DOSIS  PO', type: 'date', mes: '5 MESES', desc: 'Registro REAJUSTE DE DOSIS  PO' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  5', type: 'date', mes: '5 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  5' },
      { name: 'dias  6', type: 'auto', mes: '6 MESES', desc: 'Registro dias  6' },
      { name: 'CRED 5°', type: 'date', mes: '6 MESES', desc: 'Fecha CRED 5°' },
      { name: '4ta  Sesion estimulacion temprana', type: 'date', mes: '6 MESES', desc: 'Registro 4ta  Sesion estimulacion temprana' },
      { name: 'EV. ODONTOLOGICA', type: 'date', mes: '6 MESES', desc: 'Registro EV. ODONTOLOGICA' },
      { name: 'PENTA  3°', type: 'date', mes: '6 MESES', desc: 'Fecha PENTA  3°' },
      { name: 'IPV  3°', type: 'date', mes: '6 MESES', desc: 'Registro IPV  3°' },
      { name: 'INFLUENZA PEDIATRICA 1°', type: 'date', mes: '6 MESES', desc: 'Registro INFLUENZA PEDIATRICA 1°' },
      { name: 'Vitamina VA 1 100.000 UI', type: 'date', mes: '6 MESES', desc: 'Registro Vitamina VA 1 100.000 UI' },
      { name: 'DOSAJE  HB  Dx', type: 'date', mes: '6 MESES', desc: 'Registro DOSAJE  HB  Dx' },
      { name: 'TA suplementacion', type: 'date', mes: '6 MESES', desc: 'Registro TA suplementacion' },
      { name: 'HIERRO  SF 12', type: 'date', mes: '6 MESES', desc: 'Registro HIERRO  SF 12' },
      { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)  1', type: 'date', mes: '6 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)  1' },
      { name: 'DX ANEMIA SI O NO', type: 'select', mes: '6 MESES', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'dias  7', type: 'auto', mes: '7 MESES', desc: 'Registro dias  7' },
      { name: 'CRED 6°', type: 'date', mes: '7 MESES', desc: 'Fecha CRED 6°' },
      { name: '5ta  Sesion estimulacion temprana', type: 'date', mes: '7 MESES', desc: 'Registro 5ta  Sesion estimulacion temprana' },
      { name: 'INFLUENZA PEDIATRICA  2°', type: 'date', mes: '7 MESES', desc: 'Registro INFLUENZA PEDIATRICA  2°' },
      { name: 'TAM. VIF', type: 'date', mes: '7 MESES', desc: 'Registro TAM. VIF' },
      { name: 'REAJUSTE DE DOSIS  SF1', type: 'date', mes: '7 MESES', desc: 'Registro REAJUSTE DE DOSIS  SF1' },
      { name: 'dias  8', type: 'auto', mes: '8 MESES', desc: 'Registro dias  8' },
      { name: 'HIERRO  SF 2', type: 'date', mes: '8 MESES', desc: 'Registro HIERRO  SF 2' },
      { name: 'EX. OJOS', type: 'date', mes: '8 MESES', desc: 'Registro EX. OJOS' },
      { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)    2', type: 'date', mes: '8 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)    2' },
      { name: 'dias  9', type: 'auto', mes: '9 MESES', desc: 'Registro dias  9' },
      { name: 'CRED 7°', type: 'date', mes: '9 MESES', desc: 'Fecha CRED 7°' },
      { name: '6ta  Sesion estimulacion temprana2', type: 'date', mes: '9 MESES', desc: 'Registro 6ta  Sesion estimulacion temprana2' },
      { name: 'DOSAJE HB c1 a los 90 dias del CRED de 6 meses', type: 'auto', mes: '9 MESES', desc: 'Fecha DOSAJE HB c1 a los 90 dias del CRED de 6 meses' },
      { name: 'REAJUSTE DE DOSIS SF2', type: 'date', mes: '9 MESES', desc: 'Registro REAJUSTE DE DOSIS SF2' },
      { name: 'DX ANEMIA SI O NO', type: 'select', mes: '9 MESES', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'dias  10', type: 'auto', mes: '10 MESES', desc: 'Registro dias  10' },
      { name: 'HIERRO  SF 3', type: 'date', mes: '10 MESES', desc: 'Registro HIERRO  SF 3' },
      { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)      3', type: 'date', mes: '10 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)      3' },
      { name: 'dias  11', type: 'auto', mes: '11 MESES', desc: 'Registro dias  11' },
      { name: 'REAJUSTE DE DOSIS SF3', type: 'date', mes: '11 MESES', desc: 'Registro REAJUSTE DE DOSIS SF3' }
    ],
    '1 AÑO': shared1Anio,
    '2 AÑOS': shared2Anios,
    '3 AÑOS': shared3Anios,
    '4 AÑOS': shared4Anios
  },

  // Catálogo de controles CRED Niños Prematuros / BPN
  credPrematurosActividades: {
    'RN': [
      { name: 'NACIMIENTO', type: 'text', mes: 'LUGAR', desc: 'Registro NACIMIENTO' },
      { name: 'BCG', type: 'date', mes: 'VACUNA', desc: 'Fecha BCG' },
      { name: 'HVB', type: 'date', mes: 'VACUNA', desc: 'Fecha HVB' },
      { name: 'dias', type: 'auto', mes: 'VACUNA', desc: 'Registro dias' },
      { name: 'PAIS 1', type: 'date', mes: 'CONTROL RN', desc: 'Registro PAIS 1' },
      { name: '1° CRED', type: 'date', mes: 'CONTROL RN', desc: 'Fecha 1° CRED' },
      { name: 'dias', type: 'auto', mes: 'CONTROL RN', desc: 'Registro dias' },
      { name: 'TAM. VIF.', type: 'date', mes: 'CONTROL RN', desc: 'Registro TAM. VIF.' },
      { name: 'EX. OJOS', type: 'date', mes: 'CONTROL RN', desc: 'Registro EX. OJOS' },
      { name: '2° CRED', type: 'date', mes: 'CONTROL RN', desc: 'Fecha 2° CRED' },
      { name: 'dias 2', type: 'auto', mes: 'CONTROL RN', desc: 'Registro dias 2' },
      { name: 'PAIS TA', type: 'date', mes: 'CONTROL RN', desc: 'Registro PAIS TA' },
      { name: '3° CRED', type: 'date', mes: 'CONTROL RN', desc: 'Fecha 3° CRED' },
      { name: 'dias 3', type: 'auto', mes: 'CONTROL RN', desc: 'Registro dias 3' },
      { name: 'TAMIZAJE NEONATAL PRIMERA', type: 'date', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE NEONATAL PRIMERA' },
      { name: 'SEGUNDA', type: 'date', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro SEGUNDA' },
      { name: 'dias 5', type: 'auto', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro dias 5' },
      { name: 'LUGAR', type: 'text', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro LUGAR' },
      { name: 'TAMIZAJE HIPOACUSIA', type: 'select', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE HIPOACUSIA', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'TAMIZAJE CATARATA', type: 'select', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE CATARATA', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'TAMIZAJE CARDIACO', type: 'select', mes: 'TAMIZAJES EN EL RECIEN NACIDO', desc: 'Registro TAMIZAJE CARDIACO', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'DE 2-7 DIAS  RN', type: 'auto', mes: 'VISITA DOMICIL.', desc: 'Registro DE 2-7 DIAS  RN' },
      { name: 'ATENCION EN OTRO EESS', type: 'date', mes: 'OBSERVACION', desc: 'Registro ATENCION EN OTRO EESS' }
    ],
    '1-11 MESES': [
      { name: 'PAIS  1', type: 'date', mes: '1 MES', desc: 'Registro PAIS  1' },
      { name: 'dias', type: 'auto', mes: '1 MES', desc: 'Registro dias' },
      { name: 'CRED 1°', type: 'date', mes: '1 MES', desc: 'Fecha CRED 1°' },
      { name: '1ra  Sesion estimulacion temprana', type: 'date', mes: '1 MES', desc: 'Registro 1ra  Sesion estimulacion temprana' },
      { name: 'TAM. VIF', type: 'date', mes: '1 MES', desc: 'Registro TAM. VIF' },
      { name: 'EV. ODONTOLOGICA', type: 'date', mes: '1 MES', desc: 'Registro EV. ODONTOLOGICA' },
      { name: 'DOSAJE HB  a los 30 dias  de vida', type: 'auto', mes: '1 MES', desc: 'Registro DOSAJE HB  a los 30 dias  de vida' },
      { name: 'HIERRO   PO1', type: 'date', mes: '1 MES', desc: 'Registro HIERRO   PO1' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  1', type: 'date', mes: '1 MES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  1' },
      { name: 'DESPUES DE 7 DIAS DEL SF  V.D.1', type: 'auto', mes: 'VISITA DOMICIL. 1', desc: 'Registro DESPUES DE 7 DIAS DEL SF  V.D.1' },
      { name: 'dias  2', type: 'auto', mes: '2 MESES', desc: 'Registro dias  2' },
      { name: 'CRED  2°', type: 'date', mes: '2 MESES', desc: 'Fecha CRED  2°' },
      { name: '2da  Sesion estimulacion temprana', type: 'date', mes: '2 MESES', desc: 'Registro 2da  Sesion estimulacion temprana' },
      { name: 'PENTA  1°', type: 'date', mes: '2 MESES', desc: 'Fecha PENTA  1°' },
      { name: 'IPV  1°', type: 'date', mes: '2 MESES', desc: 'Registro IPV  1°' },
      { name: 'NEUMO 1°', type: 'date', mes: '2 MESES', desc: 'Fecha NEUMO 1°' },
      { name: 'ROTA  1°', type: 'date', mes: '2 MESES', desc: 'Fecha ROTA  1°' },
      { name: 'REAJUSTE DE DOSIS PO', type: 'date', mes: '2 MESES', desc: 'Registro REAJUSTE DE DOSIS PO' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  2', type: 'date', mes: '2 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  2' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF   V.D.2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE  SF   V.D.2' },
      { name: 'dias  3', type: 'auto', mes: '3 MESES', desc: 'Registro dias  3' },
      { name: 'CRED 3°', type: 'date', mes: '3 MESES', desc: 'Fecha CRED 3°' },
      { name: 'REAJUSTE DE DOSIS PO', type: 'date', mes: '3 MESES', desc: 'Registro REAJUSTE DE DOSIS PO' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  3', type: 'date', mes: '3 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  3' },
      { name: 'dias  4', type: 'auto', mes: '4 MESES', desc: 'Registro dias  4' },
      { name: 'CRED 4°', type: 'date', mes: '4 MESES', desc: 'Fecha CRED 4°' },
      { name: '3ra  Sesion estimulacion temprana', type: 'date', mes: '4 MESES', desc: 'Registro 3ra  Sesion estimulacion temprana' },
      { name: 'PENTA  2°', type: 'date', mes: '4 MESES', desc: 'Fecha PENTA  2°' },
      { name: 'IPV  2°', type: 'date', mes: '4 MESES', desc: 'Registro IPV  2°' },
      { name: 'NEUMO 2°', type: 'date', mes: '4 MESES', desc: 'Fecha NEUMO 2°' },
      { name: 'ROTA  2°', type: 'date', mes: '4 MESES', desc: 'Fecha ROTA  2°' },
      { name: 'DOSAJE  HB a los 90 dias despues de CRED  de 1 mes', type: 'auto', mes: '4 MESES', desc: 'Fecha DOSAJE  HB a los 90 dias despues de CRED  de 1 mes' },
      { name: 'HIERRO  PO 2', type: 'date', mes: '4 MESES', desc: 'Registro HIERRO  PO 2' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  4', type: 'date', mes: '4 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  4' },
      { name: 'DESPUES DE 7 DIAS DEL  SF  V.D. 1', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  3', desc: 'Registro DESPUES DE 7 DIAS DEL  SF  V.D. 1' },
      { name: 'dias  5', type: 'auto', mes: '5 MESES', desc: 'Registro dias  5' },
      { name: 'REAJUSTE DE DOSIS  PO', type: 'date', mes: '5 MESES', desc: 'Registro REAJUSTE DE DOSIS  PO' },
      { name: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  5', type: 'date', mes: '5 MESES', desc: 'Registro CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  5' },
      { name: 'dias  6', type: 'auto', mes: '6 MESES', desc: 'Registro dias  6' },
      { name: 'CRED 5°', type: 'date', mes: '6 MESES', desc: 'Fecha CRED 5°' },
      { name: '4ta  Sesion estimulacion temprana', type: 'date', mes: '6 MESES', desc: 'Registro 4ta  Sesion estimulacion temprana' },
      { name: 'EV. ODONTOLOGICA', type: 'date', mes: '6 MESES', desc: 'Registro EV. ODONTOLOGICA' },
      { name: 'PENTA  3°', type: 'date', mes: '6 MESES', desc: 'Fecha PENTA  3°' },
      { name: 'IPV  3°', type: 'date', mes: '6 MESES', desc: 'Registro IPV  3°' },
      { name: 'INFLUENZA PEDIATRICA 1°', type: 'date', mes: '6 MESES', desc: 'Registro INFLUENZA PEDIATRICA 1°' },
      { name: 'Vitamina VA 1 100.000 UI', type: 'date', mes: '6 MESES', desc: 'Registro Vitamina VA 1 100.000 UI' },
      { name: 'DOSAJE  HB  Dx', type: 'date', mes: '6 MESES', desc: 'Registro DOSAJE  HB  Dx' },
      { name: 'TA suplementacion', type: 'date', mes: '6 MESES', desc: 'Registro TA suplementacion' },
      { name: 'HIERRO  SF 1', type: 'date', mes: '6 MESES', desc: 'Registro HIERRO  SF 1' },
      { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)  1', type: 'date', mes: '6 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)  1' },
      { name: 'DX ANEMIA SI O NO', type: 'select', mes: '6 MESES', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'DESPUES DE 7 DIAS DEL SF   V.D. 1', type: 'auto', mes: 'VISITA DOMICIL. 1', desc: 'Registro DESPUES DE 7 DIAS DEL SF   V.D. 1' },
      { name: 'dias  7', type: 'auto', mes: '7 MESES', desc: 'Registro dias  7' },
      { name: 'CRED 6°', type: 'date', mes: '7 MESES', desc: 'Fecha CRED 6°' },
      { name: '5ta  Sesion estimulacion temprana', type: 'date', mes: '7 MESES', desc: 'Registro 5ta  Sesion estimulacion temprana' },
      { name: 'INFLUENZA PEDIATRICA  2°', type: 'date', mes: '7 MESES', desc: 'Registro INFLUENZA PEDIATRICA  2°' },
      { name: 'TAM. VIF', type: 'date', mes: '7 MESES', desc: 'Registro TAM. VIF' },
      { name: 'REAJUSTE DE DOSIS  SF1', type: 'date', mes: '7 MESES', desc: 'Registro REAJUSTE DE DOSIS  SF1' },
      { name: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF   V.D.2', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  2', desc: 'Registro DESPUES DE 7 DIAS DEL REAJUSTE   SF   V.D.2' },
      { name: 'dias  8', type: 'auto', mes: '8 MESES', desc: 'Registro dias  8' },
      { name: 'HIERRO  SF 2', type: 'date', mes: '8 MESES', desc: 'Registro HIERRO  SF 2' },
      { name: 'EX. OJOS', type: 'date', mes: '8 MESES', desc: 'Registro EX. OJOS' },
      { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)    2', type: 'date', mes: '8 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)    2' },
      { name: 'DESPUES DE 7 DIAS DEL SF    V.D.3', type: 'auto', mes: 'VISITA DOMICIL. / TELEORIENTACION  3', desc: 'Registro DESPUES DE 7 DIAS DEL SF    V.D.3' },
      { name: 'dias  9', type: 'auto', mes: '9 MESES', desc: 'Registro dias  9' },
      { name: 'CRED 7°', type: 'date', mes: '9 MESES', desc: 'Fecha CRED 7°' },
      { name: '6ta  Sesion estimulacion temprana2', type: 'date', mes: '9 MESES', desc: 'Registro 6ta  Sesion estimulacion temprana2' },
      { name: 'DOSAJE HB c1 a los 90 dias del CRED de 6 meses', type: 'auto', mes: '9 MESES', desc: 'Fecha DOSAJE HB c1 a los 90 dias del CRED de 6 meses' },
      { name: 'REAJUSTE DE DOSIS SF2', type: 'date', mes: '9 MESES', desc: 'Registro REAJUSTE DE DOSIS SF2' },
      { name: 'DX ANEMIA SI O NO', type: 'select', mes: '9 MESES', desc: 'Registro DX ANEMIA SI O NO', options: ["NO", "SI", "OBSERVADO"] },
      { name: 'dias  10', type: 'auto', mes: '10 MESES', desc: 'Registro dias  10' },
      { name: 'HIERRO  SF 3', type: 'date', mes: '10 MESES', desc: 'Registro HIERRO  SF 3' },
      { name: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)      3', type: 'date', mes: '10 MESES', desc: 'Registro CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)      3' },
      { name: 'dias  11', type: 'auto', mes: '11 MESES', desc: 'Registro dias  11' },
      { name: 'REAJUSTE DE DOSIS SF3', type: 'date', mes: '11 MESES', desc: 'Registro REAJUSTE DE DOSIS SF3' }
    ],
    '1 AÑO': shared1Anio,
    '2 AÑOS': shared2Anios,
    '3 AÑOS': shared3Anios,
    '4 AÑOS': shared4Anios
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
      Utils.showAlert("Configuración Requerida", "Por favor, configure la URL de su API de Google Sheets en la sección de 'Ajustes' para permitir la sincronización en la nube.", "warning");
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
      Utils.showToast("URL de API guardada exitosamente.", "success");
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
            Utils.showAlert("Campos Obligatorios", "Por favor completa los campos obligatorios:\nHistoria Clínica, Nombres y Fecha de Nacimiento.", "error");
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
      Utils.showAlert("Sincronización Exitosa", `Datos subidos: ${res.uploaded} registros.\nTotal pacientes en base de datos: ${res.downloaded}.`, "success");
    } else {
      statusText.innerText = 'Error al sincronizar';
      Utils.showAlert("Sincronización Fallida", `Error de sincronización: ${res.error || 'Servidor no disponible'}.\nTrabajando en modo Offline local.`, "warning");
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
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 13px; color: var(--primary); border-color: var(--primary);" onclick="App.openEditPacienteModal('${p.id}')">✏️ Editar</button>
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
    Utils.showAlert("Registro Exitoso", `Paciente ${nombres} registrado localmente con éxito y encolado para sincronización.`, "success");
    
    // Resetear formulario
    document.querySelectorAll('.wizard-panel input, .wizard-panel select').forEach(input => input.value = '');
    window.location.hash = "#dashboard";
  },

  // Ir a la vista de seguimiento CRED de un paciente
  openSeguimiento(dni, module) {
    this.selectedPaciente = Api.getPacienteById(dni);
    if (!this.selectedPaciente) {
      Utils.showAlert("Error", "Error al cargar paciente", "error");
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
      <div style="background-color: var(--primary-light); padding: 20px; border-radius: var(--radius-md); border-left: 5px solid var(--primary); margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; gap: 15px; flex-wrap: wrap;">
        <div>
          <h2 style="color: var(--primary); font-size: 20px; font-weight: 700;">👶 ${p.nombres}</h2>
          <p style="margin-top: 6px; font-size: 14px; color: var(--text-main);">
            <strong>DNI/CNV:</strong> ${p.id} | 
            <strong>HC:</strong> ${p.hc} | 
            <strong>F. Nacimiento:</strong> ${Utils.formatDateToShow(p.fecha_nacimiento)} | 
            <strong>Edad Actual:</strong> ${ageInfo.text} | 
            <strong>Tipo:</strong> ${p.tipo_seguimiento === 'termino' ? 'A Término' : 'BPN/Prematuro'}
          </p>
        </div>
        <button class="btn btn-outline" style="border-color: var(--primary); color: var(--primary); padding: 8px 16px; font-size: 14px;" onclick="App.openEditPacienteModal('${p.id}')">✏️ Editar Datos</button>
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
    const catalog = p.tipo_seguimiento === 'bpn' ? this.credPrematurosActividades : this.credTerminoActividades;
    const actividades = catalog[tab] || [];
    
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
      let segRealizado = seguimientos.find(s => 
        Utils.normalizeActName(s.actividad) === targetActNormalized && 
        Utils.normalizeMesControl(s.mes_control) === targetMesNormalized
      );
      
      let hasCompleted = !!(segRealizado && (segRealizado.fecha_realizada || segRealizado.valor));
      let displayValue = segRealizado ? segRealizado.valor : "";
      const isAuto = act.type === "auto";
      
      if (isAuto) {
        const calculatedVal = this.calculateAutoDias(p, act.mes || "RN", act.name, seguimientos);
        displayValue = calculatedVal;
        hasCompleted = calculatedVal !== "";
        if (hasCompleted) {
          if (!segRealizado) {
            segRealizado = {
              actividad: act.name,
              mes_control: act.mes || "RN",
              valor: calculatedVal
            };
          } else {
            segRealizado.valor = calculatedVal;
          }
        }
      }
      
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
              <p style="font-size: 13px; font-weight: 500; margin-top: 6px;">
                ${isAuto ? `
                  <span style="color: var(--text-main);">📊 Calculado: </span>
                  <span class="${Utils.getDaysStatusColor(displayValue, act.mes || "RN", act.name) === 'green' ? 'text-green' : 'text-red'}">${displayValue} días</span>
                ` : `
                  <span style="color: var(--secondary);">✅ ${segRealizado.fecha_realizada ? `Realizado el: ${Utils.formatDateToShow(segRealizado.fecha_realizada)}` : 'Registrado'}</span>
                  ${(segRealizado.valor && segRealizado.actividad.toLowerCase() !== 'nacimiento' && !segRealizado.actividad.toLowerCase().includes('lugar')) ? `| <strong>Valor:</strong> ${segRealizado.valor}` : (segRealizado.valor ? `: ${segRealizado.valor}` : '')}
                `}
              </p>
              ${(segRealizado.observacion && !isAuto) ? `<p style="font-size: 12px; font-style: italic; margin-top: 2px;">"Obs: ${segRealizado.observacion}"</p>` : ''}
            ` : `
              <p style="font-size: 13px; color: var(--warning); font-weight: 500; margin-top: 6px;">
                ⏳ Pendiente ${isAuto ? '(Días de control)' : ''}
              </p>
            `}
          </div>
          <div class="event-actions">
            ${isAuto ? `
              <span style="font-size: 12px; color: var(--text-muted); font-style: italic; padding: 8px 0;">Automático</span>
            ` : `
              <button class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;" onclick="App.openRegisterControlModal('${act.name}', '${act.mes || ''}', '${fechaSug}', '${segRealizado ? segRealizado.fecha_realizada : ''}', '${segRealizado ? segRealizado.valor : ''}', '${segRealizado ? segRealizado.observacion : ''}')">
                ${hasCompleted ? '✏️ Editar' : '➕ Registrar'}
              </button>
            `}
          </div>
        </div>
      `;
      listEl.appendChild(ev);
    });
    
    container.appendChild(listEl);
  },

  // Calcular automáticamente los días para una actividad auto
  calculateAutoDias(paciente, mesControl, actName, allSeguimientos) {
    const cleanMes = Utils.normalizeMesControl(mesControl);
    const cleanAct = Utils.normalizeActName(actName);
    const birthDate = paciente.fecha_nacimiento;
    
    let pair = null;
    
    if (cleanMes === "RN") {
      if (cleanAct === "DIAS") pair = ["HVB", "RN", "FECHA_NACIMIENTO", ""];
      else if (cleanAct === "DIAS 2") pair = ["2 CRED", "RN", "FECHA_NACIMIENTO", ""];
      else if (cleanAct === "DIAS 3") pair = ["3 CRED", "RN", "FECHA_NACIMIENTO", ""];
      else if (cleanAct === "DIAS 5") pair = ["TAMIZAJE NEONATAL", "RN", "FECHA_NACIMIENTO", ""];
      else if (cleanAct.includes("DIAS")) pair = ["1 CRED", "RN", "FECHA_NACIMIENTO", ""];
    } else if (cleanMes === "1 MES") {
      if (cleanAct === "DIAS") pair = ["CRED 1", "1 MES", "FECHA_NACIMIENTO", ""];
    } else if (cleanMes === "2 MESES") {
      if (cleanAct === "DIAS 2") pair = ["CRED 2", "2 MESES", "CRED 1", "1 MES"];
    } else if (cleanMes === "3 MESES") {
      if (cleanAct === "DIAS 3") pair = ["CRED 3", "3 MESES", "CRED 2", "2 MESES"];
    } else if (cleanMes === "4 MESES") {
      if (cleanAct === "DIAS 4") pair = ["CRED 4", "4 MESES", "CRED 3", "3 MESES"];
    } else if (cleanMes === "5 MESES") {
      if (cleanAct === "DIAS 5") pair = ["REAJUSTE DE DOSIS PO", "5 MESES", "CRED 4", "4 MESES"];
    } else if (cleanMes === "6 MESES") {
      if (cleanAct === "DIAS 6") pair = ["CRED 5", "6 MESES", "REAJUSTE DE DOSIS PO", "5 MESES"];
    } else if (cleanMes === "7 MESES") {
      if (cleanAct === "DIAS 7") pair = ["CRED 6", "7 MESES", "CRED 5", "6 MESES"];
    } else if (cleanMes === "8 MESES") {
      if (cleanAct === "DIAS 8") pair = ["HIERRO SF 2", "8 MESES", "CRED 6", "7 MESES"];
    } else if (cleanMes === "9 MESES") {
      if (cleanAct === "DIAS 9") pair = ["CRED 7", "9 MESES", "HIERRO SF 2", "8 MESES"];
    } else if (cleanMes === "10 MESES") {
      if (cleanAct === "DIAS 10") pair = ["HIERRO SF 3", "10 MESES", "CRED 7", "9 MESES"];
    } else if (cleanMes === "11 MESES") {
      if (cleanAct === "DIAS 11") pair = ["REAJUSTE DE DOSIS SF3", "11 MESES", "HIERRO SF 3", "10 MESES"];
    } else if (cleanMes === "12 MESES") {
      if (cleanAct === "DIAS 1") pair = ["CRED 1", "12 MESES", "REAJUSTE DE DOSIS SF3", "11 MESES"];
    } else if (cleanMes === "15 MESES") {
      if (cleanAct === "DIAS 2") pair = ["CRED 2", "15 MESES", "CRED 1", "12 MESES"];
    } else if (cleanMes === "16 MESES") {
      if (cleanAct === "DIAS 3") pair = ["HIERRO SF 2", "16 MESES", "CRED 2", "15 MESES"];
    } else if (cleanMes === "17 MESES") {
      if (cleanAct === "DIAS 4") pair = ["HIERRO SF 3", "17 MESES", "HIERRO SF 2", "16 MESES"];
    } else if (cleanMes === "18 MESES") {
      if (cleanAct === "DIAS 5") pair = ["CRED 3", "18 MESES", "HIERRO SF 3", "17 MESES"];
    } else if (cleanMes === "19 MESES") {
      if (cleanAct === "DIAS 6") pair = ["HIERRO SF 5", "19 MESES", "CRED 3", "18 MESES"];
    } else if (cleanMes === "20 MESES") {
      if (cleanAct === "DIAS 7") pair = ["4TA SESION ESTIMULACION TEMPRANA", "20 MESES", "HIERRO SF 5", "19 MESES"];
    } else if (cleanMes === "21 MESES") {
      if (cleanAct === "DIAS 8") pair = ["CRED 4", "21 MESES", "4TA SESION ESTIMULACION TEMPRANA", "20 MESES"];
    } else if (cleanMes === "24 MESES") {
      if (cleanAct === "DIAS 1") pair = ["CRED 1", "24 MESES", "CRED 4", "21 MESES"];
    } else if (cleanMes === "25 MESES") {
      if (cleanAct === "DIAS 2") pair = ["HIERRO SF 2", "25 MESES", "CRED 1", "24 MESES"];
    } else if (cleanMes === "26 MESES") {
      if (cleanAct === "DIAS 3") pair = ["HIERRO SF 3", "26 MESES", "HIERRO SF 2", "25 MESES"];
    } else if (cleanMes === "27 MESES") {
      if (cleanAct === "DIAS 4") pair = ["HIERRO SF4", "27 MESES", "HIERRO SF 3", "26 MESES"];
    } else if (cleanMes === "28 MESES") {
      if (cleanAct === "DIAS 5") pair = ["HIERRO SF5", "28 MESES", "HIERRO SF4", "27 MESES"];
    } else if (cleanMes === "29 MESES") {
      if (cleanAct === "DIAS 6") pair = ["HIERRO SF6", "29 MESES", "HIERRO SF5", "28 MESES"];
    } else if (cleanMes === "30 MESES") {
      if (cleanAct === "DIAS 7") pair = ["CRED 2", "30 MESES", "HIERRO SF6", "29 MESES"];
    } else if (cleanMes === "36 MESES") {
      if (cleanAct === "DIAS 1") pair = ["CRED 1", "36 MESES", "CRED 2", "30 MESES"];
    } else if (cleanMes === "37 MESES") {
      if (cleanAct === "DIAS 2") pair = ["HIERRO SF2", "37 MESES", "CRED 1", "36 MESES"];
    } else if (cleanMes === "38 MESES") {
      if (cleanAct === "DIAS 3") pair = ["HIERRO SF3", "38 MESES", "HIERRO SF2", "37 MESES"];
    } else if (cleanMes === "39 MESES") {
      if (cleanAct === "DIAS 4") pair = ["DOSAJE HB C1", "39 MESES", "HIERRO SF3", "38 MESES"];
    } else if (cleanMes === "42 MESES") {
      if (cleanAct === "DIAS 5") pair = ["CRED 2", "42 MESES", "DOSAJE HB C1", "39 MESES"];
    } else if (cleanMes === "48 MESES") {
      if (cleanAct === "DIAS 1") pair = ["CRED 1", "48 MESES", "CRED 2", "42 MESES"];
    } else if (cleanMes === "49 MESES") {
      if (cleanAct === "DIAS 2") pair = ["HIERRO SF2", "49 MESES", "CRED 1", "48 MESES"];
    } else if (cleanMes === "50 MESES") {
      if (cleanAct === "DIAS 3") pair = ["HIERRO SF3", "50 MESES", "HIERRO SF2", "49 MESES"];
    } else if (cleanMes === "51 MESES") {
      if (cleanAct === "DIAS 4") pair = ["DOSAJE HB C1", "51 MESES", "HIERRO SF3", "50 MESES"];
    } else if (cleanMes === "54 MESES") {
      if (cleanAct === "DIAS 5") pair = ["CRED 2", "54 MESES", "DOSAJE HB C1", "51 MESES"];
    }
    
    if (!pair) return "";
    
    const [actAct, mesAct, actPrev, mesPrev] = pair;
    
    const segAct = allSeguimientos.find(s => 
      Utils.normalizeActName(s.actividad) === Utils.normalizeActName(actAct) && 
      Utils.normalizeMesControl(s.mes_control) === Utils.normalizeMesControl(mesAct)
    );
    const dateAct = segAct ? segAct.fecha_realizada : "";
    
    let datePrev = "";
    if (actPrev === "FECHA_NACIMIENTO") {
      datePrev = birthDate;
    } else {
      const segPrev = allSeguimientos.find(s => 
        Utils.normalizeActName(s.actividad) === Utils.normalizeActName(actPrev) && 
        Utils.normalizeMesControl(s.mes_control) === Utils.normalizeMesControl(mesPrev)
      );
      datePrev = segPrev ? segPrev.fecha_realizada : "";
    }
    
    if (dateAct && datePrev) {
      return Utils.daysBetween(datePrev, dateAct);
    }
    return "";
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
      Utils.showAlert("Fecha Requerida", "Por favor indica la fecha de realización", "warning");
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

    // Guardar también cualquier actividad auto-días asociada a este mes/control
    const catalog = this.selectedPaciente.tipo_seguimiento === 'bpn' ? this.credPrematurosActividades : this.credTerminoActividades;
    const currentTabActs = catalog[this.activeTimelineTab] || [];
    currentTabActs.forEach(act => {
      if (act.type === "auto" && Utils.normalizeMesControl(act.mes || "RN") === Utils.normalizeMesControl(mes)) {
        const updatedSeguimientos = Api.getSeguimientoCredByPaciente(this.selectedPaciente.id);
        const diasVal = this.calculateAutoDias(this.selectedPaciente, act.mes || "RN", act.name, updatedSeguimientos);
        
        if (diasVal !== "") {
          const autoSeguimiento = {
            dni_paciente: this.selectedPaciente.id,
            mes_control: act.mes || "RN",
            actividad: act.name,
            fecha_programada: "",
            fecha_realizada: "",
            valor: diasVal,
            observacion: "Calculado automáticamente"
          };
          Api.saveSeguimientoCredLocal(autoSeguimiento);
        }
      }
    });

    document.getElementById('control-dialog').classList.remove('active');
    Utils.showToast("¡Control guardado correctamente!", "success");
    
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
      <div style="background-color: var(--accent-light); padding: 20px; border-radius: var(--radius-md); border-left: 5px solid var(--accent); margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; gap: 15px; flex-wrap: wrap;">
        <div>
          <h2 style="color: var(--accent-hover); font-size: 20px; font-weight: 700;">🩸 Seguimiento de Anemia: ${p.nombres}</h2>
          <p style="margin-top: 6px; font-size: 14px; color: var(--text-main);">
            <strong>DNI/CNV:</strong> ${p.id} | 
            <strong>HC:</strong> ${p.hc} | 
            <strong>F. Nacimiento:</strong> ${Utils.formatDateToShow(p.fecha_nacimiento)} | 
            <strong>Edad Actual:</strong> ${ageInfo.text}
          </p>
        </div>
        <button class="btn btn-outline" style="border-color: var(--accent); color: var(--accent); padding: 8px 16px; font-size: 14px;" onclick="App.openEditPacienteModal('${p.id}')">✏️ Editar Datos</button>
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
      Utils.showAlert("Fecha Requerida", "Por favor indica la fecha de realización", "warning");
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
    Utils.showToast("¡Control de anemia guardado correctamente!", "success");
    
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

  // EXPORTAR A EXCEL EN EL FORMATO MINSA DE 290 COLUMNAS (PROFESIONAL Y CON COLORES)
  exportToMinsaExcel() {
    const db = Api.getLocalDb();
    const pacientes = db.pacientes;
    const seguimientosCred = db.seguimientoCred;
    
    if (pacientes.length === 0) {
      Utils.showAlert("Exportación Vacía", "No hay pacientes para exportar.", "info");
      return;
    }

    try {
      ExcelExporter.exportExcel(pacientes, seguimientosCred);
    } catch (e) {
      console.error(e);
      Utils.showAlert("Error de Exportación", "Error al exportar a Excel: " + e.message, "error");
    }
  },

  openEditPacienteModal(dni) {
    const p = Api.getPacienteById(dni);
    if (!p) {
      Utils.showAlert("Error", "No se pudo cargar la información del paciente.", "error");
      return;
    }
    
    document.getElementById('edit-p-id').value = p.id;
    document.getElementById('edit-p-hc').value = p.hc || '';
    document.getElementById('edit-p-dni').value = p.id || '';
    document.getElementById('edit-p-nombres').value = p.nombres || '';
    let cleanFechaNac = '';
    if (p.fecha_nacimiento) {
      cleanFechaNac = String(p.fecha_nacimiento).split(' ')[0].split('T')[0];
    }
    document.getElementById('edit-p-fecha-nac').value = cleanFechaNac;
    document.getElementById('edit-p-sexo').value = p.sexo || '';
    document.getElementById('edit-p-peso').value = p.peso_nacer || '';
    document.getElementById('edit-p-sem-gest').value = p.sem_gest || '';
    document.getElementById('edit-p-distrito').value = p.distrito || 'SAN SEBASTIAN';
    document.getElementById('edit-p-comunidad').value = p.comunidad || '';
    document.getElementById('edit-p-dni-madre').value = p.dni_madre || '';
    document.getElementById('edit-p-nombre-madre').value = p.nombres_madre || '';
    document.getElementById('edit-p-celular-madre').value = p.celular_madre || '';
    document.getElementById('edit-p-tipo-seguimiento').value = p.tipo_seguimiento || 'termino';
    
    document.getElementById('edit-paciente-dialog').classList.add('active');
  },

  savePacienteEdited() {
    const id = document.getElementById('edit-p-id').value;
    const nombres = document.getElementById('edit-p-nombres').value.toUpperCase().trim();
    
    const p = Api.getPacienteById(id);
    if (!p) {
      Utils.showAlert("Error", "No se encontró el paciente a actualizar.", "error");
      return;
    }
    
    const updatedPaciente = {
      ...p,
      hc: document.getElementById('edit-p-hc').value.trim(),
      nombres: nombres,
      fecha_nacimiento: document.getElementById('edit-p-fecha-nac').value,
      sexo: document.getElementById('edit-p-sexo').value,
      peso_nacer: document.getElementById('edit-p-peso').value || "",
      sem_gest: document.getElementById('edit-p-sem-gest').value || "",
      distrito: document.getElementById('edit-p-distrito').value,
      comunidad: document.getElementById('edit-p-comunidad').value.trim(),
      dni_madre: document.getElementById('edit-p-dni-madre').value.trim(),
      nombres_madre: document.getElementById('edit-p-nombre-madre').value.toUpperCase().trim(),
      celular_madre: document.getElementById('edit-p-celular-madre').value.trim(),
      tipo_seguimiento: document.getElementById('edit-p-tipo-seguimiento').value
    };
    
    Api.savePacienteLocal(updatedPaciente);
    
    document.getElementById('edit-paciente-dialog').classList.remove('active');
    Utils.showToast("Datos actualizados correctamente", "success");
    
    // Recargar vista actual para reflejar cambios
    if (this.currentView === 'dashboard') {
      this.updateDashboardStats();
      this.renderPacientesList(document.getElementById('global-search').value);
    } else if (this.currentView === 'seguimiento-cred') {
      this.initSeguimientoCredView();
    } else if (this.currentView === 'seguimiento-anemia') {
      this.initSeguimientoAnemiaView();
    }
  }
};
