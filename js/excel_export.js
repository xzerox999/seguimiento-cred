/**
 * MODULO DE EXPORTACION A EXCEL PROFESIONAL (ESTILO MINSA)
 * Utiliza xlsx-js-style para aplicar colores de fondo, bordes, formatos de celda y formulas de Excel.
 */

const dias_map_0 = {
    20: [19, 11], 23: [22, 11], 27: [26, 11], 30: [29, 11], 32: [31, 11],
    40: [41, 11], 46: [47, 41], 54: [55, 47], 58: [59, 55],
    68: [69, 59], 72: [73, 69], 86: [87, 73], 93: [94, 87], 98: [99, 94],
    104: [105, 99], 107: [108, 105], 110: [111, 108], 126: [127, 111],
    135: [136, 127], 139: [140, 136], 143: [144, 140], 157: [158, 144],
    160: [161, 158], 165: [166, 161], 172: [173, 166], 188: [189, 173],
    191: [192, 189], 195: [196, 192], 198: [199, 196], 201: [202, 199],
    205: [206, 202], 218: [219, 206], 234: [235, 219], 238: [239, 235],
    242: [243, 239], 247: [248, 243], 255: [256, 248], 271: [272, 256],
    275: [276, 272], 279: [280, 276], 284: [285, 280]
};

const dias_map_1 = {
    20: [19, 11], 23: [22, 11], 27: [26, 11], 30: [29, 11], 33: [31, 11],
    41: [42, 11], 50: [51, 42], 60: [61, 51], 65: [66, 61],
    76: [77, 66], 79: [80, 77], 93: [94, 80], 100: [101, 94], 105: [106, 101],
    111: [112, 106], 114: [115, 112], 117: [118, 115], 133: [134, 118],
    142: [143, 134], 146: [147, 143], 150: [151, 147], 164: [165, 151],
    167: [168, 165], 172: [173, 168], 179: [180, 173], 195: [196, 180],
    198: [199, 196], 202: [203, 199], 205: [206, 203], 208: [209, 206],
    212: [213, 209], 225: [226, 213], 241: [242, 226], 245: [246, 242],
    249: [250, 246], 254: [255, 250], 262: [263, 255], 278: [279, 263],
    282: [283, 279], 286: [287, 283], 291: [292, 287]
};

const EXPORT_COLUMNS_TERMINO = [
  { num: 1, letter: 'A', row2: 'IPRESS:', row3: '', row4: 'N°' },
  { num: 2, letter: 'B', row2: '', row3: 'PADRON NOMINAL', row4: 'DISTRITO' },
  { num: 3, letter: 'C', row2: '', row3: 'PADRON NOMINAL', row4: 'E.E.S.S PADRON' },
  { num: 4, letter: 'D', row2: '', row3: 'DATOS DEL NIÑO', row4: 'HC' },
  { num: 5, letter: 'E', row2: '', row3: 'DATOS DEL NIÑO', row4: 'CNV' },
  { num: 6, letter: 'F', row2: '', row3: 'DATOS DEL NIÑO', row4: 'DNI' },
  { num: 7, letter: 'G', row2: '', row3: 'DATOS DEL NIÑO', row4: 'NOMBRES Y APELLIDOS' },
  { num: 8, letter: 'H', row2: '', row3: 'DATOS DEL NIÑO', row4: 'SEXO' },
  { num: 9, letter: 'I', row2: '', row3: 'DATOS DEL NIÑO', row4: 'PESO' },
  { num: 10, letter: 'J', row2: '', row3: 'DATOS DEL NIÑO', row4: 'SEM GEST' },
  { num: 11, letter: 'K', row2: '', row3: 'DATOS DEL NIÑO', row4: 'FECHA DE NACIMIENTO' },
  { num: 12, letter: 'L', row2: '', row3: 'DATOS DEL NIÑO', row4: 'EDAD DEL NIÑO' },
  { num: 13, letter: 'M', row2: '', row3: 'DIRECCION', row4: 'COMUNIDAD' },
  { num: 14, letter: 'N', row2: '', row3: 'DATOS DE LA MADRE', row4: 'DNI' },
  { num: 15, letter: 'O', row2: '', row3: 'DATOS DE LA MADRE', row4: 'NOMBRES Y APELLIDOS MADRE' },
  { num: 16, letter: 'P', row2: '', row3: 'DATOS DE LA MADRE', row4: 'CELULAR' },
  { num: 17, letter: 'Q', row2: 'PAQUETE INTEGRAL RN                                                                              PAQUETE INTEGRAL RN', row3: 'LUGAR', row4: 'NACIMIENTO' },
  { num: 18, letter: 'R', row2: '', row3: 'VACUNA', row4: 'BCG' },
  { num: 19, letter: 'S', row2: '', row3: 'VACUNA', row4: 'HVB' },
  { num: 20, letter: 'T', row2: '', row3: 'VACUNA', row4: 'dias' },
  { num: 21, letter: 'U', row2: '', row3: 'CONTROL RN', row4: 'PAIS 1' },
  { num: 22, letter: 'V', row2: '', row3: 'CONTROL RN', row4: '1° CRED' },
  { num: 23, letter: 'W', row2: '', row3: 'CONTROL RN', row4: 'dias' },
  { num: 24, letter: 'X', row2: '', row3: 'CONTROL RN', row4: 'TAM. VIF.' },
  { num: 25, letter: 'Y', row2: '', row3: 'CONTROL RN', row4: 'EX. OJOS' },
  { num: 26, letter: 'Z', row2: '', row3: 'CONTROL RN', row4: '2° CRED' },
  { num: 27, letter: 'AA', row2: '', row3: 'CONTROL RN', row4: 'dias 2' },
  { num: 28, letter: 'AB', row2: '', row3: 'CONTROL RN', row4: 'PAIS TA' },
  { num: 29, letter: 'AC', row2: '', row3: 'CONTROL RN', row4: '3° CRED' },
  { num: 30, letter: 'AD', row2: '', row3: 'CONTROL RN', row4: 'dias 3' },
  { num: 31, letter: 'AE', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE NEONATAL' },
  { num: 32, letter: 'AF', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'dias 5' },
  { num: 33, letter: 'AG', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'LUGAR' },
  { num: 34, letter: 'AH', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE HIPOACUSIA' },
  { num: 35, letter: 'AI', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE CATARATA' },
  { num: 36, letter: 'AJ', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE CARDIACO' },
  { num: 37, letter: 'AK', row2: '', row3: 'VISITA DOMICIL.', row4: 'DE 2-7 DIAS  RN' },
  { num: 38, letter: 'AL', row2: '', row3: 'OBSERVACION', row4: 'ATENCION EN OTRO EESS' },
  { num: 39, letter: 'AM', row2: 'PAQUETE INTEGRAL MENOR DE UN AÑO                                                                                                                                                    PAQUETE INTEGRAL MENOR DE UN AÑO                                                                                                                                                    PAQUETE INTEGRAL MENOR DE UN AÑO                                                                                                                                                    PAQUETE INTEGRAL MENOR DE UN AÑO', row3: '1 MES', row4: 'PAIS  1' },
  { num: 40, letter: 'AN', row2: '', row3: '1 MES', row4: 'dias' },
  { num: 41, letter: 'AO', row2: '', row3: '1 MES', row4: 'CRED 1°' },
  { num: 42, letter: 'AP', row2: '', row3: '1 MES', row4: '1ra  Sesion estimulacion temprana' },
  { num: 43, letter: 'AQ', row2: '', row3: '1 MES', row4: 'TAM. VIF' },
  { num: 44, letter: 'AR', row2: '', row3: '1 MES', row4: 'EV. ODONTOLOGICA' },
  { num: 45, letter: 'AS', row2: '', row3: '1 MES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  1' },
  { num: 46, letter: 'AT', row2: '', row3: '2 MESES', row4: 'dias  2' },
  { num: 47, letter: 'AU', row2: '', row3: '2 MESES', row4: 'CRED  2°' },
  { num: 48, letter: 'AV', row2: '', row3: '2 MESES', row4: '2da  Sesion estimulacion temprana' },
  { num: 49, letter: 'AW', row2: '', row3: '2 MESES', row4: 'PENTA  1°' },
  { num: 50, letter: 'AX', row2: '', row3: '2 MESES', row4: 'IPV  1°' },
  { num: 51, letter: 'AY', row2: '', row3: '2 MESES', row4: 'NEUMO 1°' },
  { num: 52, letter: 'AZ', row2: '', row3: '2 MESES', row4: 'ROTA  1°' },
  { num: 53, letter: 'BA', row2: '', row3: '2 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  2' },
  { num: 54, letter: 'BB', row2: '', row3: '3 MESES', row4: 'dias  3' },
  { num: 55, letter: 'BC', row2: '', row3: '3 MESES', row4: 'CRED 3°' },
  { num: 56, letter: 'BD', row2: '', row3: '3 MESES', row4: 'EX. OJOS' },
  { num: 57, letter: 'BE', row2: '', row3: '3 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  3' },
  { num: 58, letter: 'BF', row2: '', row3: '4 MESES', row4: 'dias  4' },
  { num: 59, letter: 'BG', row2: '', row3: '4 MESES', row4: 'CRED 4°' },
  { num: 60, letter: 'BH', row2: '', row3: '4 MESES', row4: '3ra  Sesion estimulacion temprana' },
  { num: 61, letter: 'BI', row2: '', row3: '4 MESES', row4: 'PENTA  2°' },
  { num: 62, letter: 'BJ', row2: '', row3: '4 MESES', row4: 'IPV  2°' },
  { num: 63, letter: 'BK', row2: '', row3: '4 MESES', row4: 'NEUMO 2°' },
  { num: 64, letter: 'BL', row2: '', row3: '4 MESES', row4: 'ROTA  2°' },
  { num: 65, letter: 'BM', row2: '', row3: '4 MESES', row4: 'HIERRO  SF 1' },
  { num: 66, letter: 'BN', row2: '', row3: '4 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  4' },
  { num: 67, letter: 'BO', row2: '', row3: 'VISITA DOMICIL.  1', row4: 'DESPUES DE 7 DIAS DEL  SF  V.D. 1' },
  { num: 68, letter: 'BP', row2: '', row3: '5 MESES', row4: 'dias  5' },
  { num: 69, letter: 'BQ', row2: '', row3: '5 MESES', row4: 'REAJUSTE DE DOSIS  PO' },
  { num: 70, letter: 'BR', row2: '', row3: '5 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  5' },
  { num: 71, letter: 'BS', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE    SF   V.D. 2' },
  { num: 72, letter: 'BT', row2: '', row3: '6 MESES', row4: 'dias  6' },
  { num: 73, letter: 'BU', row2: '', row3: '6 MESES', row4: 'CRED 5°' },
  { num: 74, letter: 'BV', row2: '', row3: '6 MESES', row4: '4ta  Sesion estimulacion temprana' },
  { num: 75, letter: 'BW', row2: '', row3: '6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 76, letter: 'BX', row2: '', row3: '6 MESES', row4: 'PENTA  3°' },
  { num: 77, letter: 'BY', row2: '', row3: '6 MESES', row4: 'IPV  3°' },
  { num: 78, letter: 'BZ', row2: '', row3: '6 MESES', row4: 'INFLUENZA PEDIATRICA 1°' },
  { num: 79, letter: 'CA', row2: '', row3: '6 MESES', row4: 'Vitamina VA 1 100.000 UI' },
  { num: 80, letter: 'CB', row2: '', row3: '6 MESES', row4: 'DOSAJE  HB  Dx' },
  { num: 81, letter: 'CC', row2: '', row3: '6 MESES', row4: 'TA suplementacion' },
  { num: 82, letter: 'CD', row2: '', row3: '6 MESES', row4: 'HIERRO  SF 12' },
  { num: 83, letter: 'CE', row2: '', row3: '6 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)  1' },
  { num: 84, letter: 'CF', row2: '', row3: '6 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 85, letter: 'CG', row2: '', row3: 'VISITA DOMICIL. 1', row4: 'DESPUES DE 7 DIAS DEL SF   V.D. 1' },
  { num: 86, letter: 'CH', row2: '', row3: '7 MESES', row4: 'dias  7' },
  { num: 87, letter: 'CI', row2: '', row3: '7 MESES', row4: 'CRED 6°' },
  { num: 88, letter: 'CJ', row2: '', row3: '7 MESES', row4: '5ta  Sesion estimulacion temprana' },
  { num: 89, letter: 'CK', row2: '', row3: '7 MESES', row4: 'INFLUENZA PEDIATRICA  2°' },
  { num: 90, letter: 'CL', row2: '', row3: '7 MESES', row4: 'TAM. VIF' },
  { num: 91, letter: 'CM', row2: '', row3: '7 MESES', row4: 'REAJUSTE DE DOSIS  SF1' },
  { num: 92, letter: 'CN', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF   V.D.2' },
  { num: 93, letter: 'CO', row2: '', row3: '8 MESES', row4: 'dias  8' },
  { num: 94, letter: 'CP', row2: '', row3: '8 MESES', row4: 'HIERRO  SF 2' },
  { num: 95, letter: 'CQ', row2: '', row3: '8 MESES', row4: 'EX. OJOS' },
  { num: 96, letter: 'CR', row2: '', row3: '8 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)    2' },
  { num: 97, letter: 'CS', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  3', row4: 'DESPUES DE 7 DIAS DEL SF    V.D.3' },
  { num: 98, letter: 'CT', row2: '', row3: '9 MESES', row4: 'dias  9' },
  { num: 99, letter: 'CU', row2: '', row3: '9 MESES', row4: 'CRED 7°' },
  { num: 100, letter: 'CV', row2: '', row3: '9 MESES', row4: '6ta  Sesion estimulacion temprana2' },
  { num: 101, letter: 'CW', row2: '', row3: '9 MESES', row4: 'DOSAJE HB c1 a los 90 dias del CRED de 6 meses' },
  { num: 102, letter: 'CX', row2: '', row3: '9 MESES', row4: 'REAJUSTE DE DOSIS SF2' },
  { num: 103, letter: 'CY', row2: '', row3: '9 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 104, letter: 'CZ', row2: '', row3: '10 MESES', row4: 'dias  10' },
  { num: 105, letter: 'DA', row2: '', row3: '10 MESES', row4: 'HIERRO  SF 3' },
  { num: 106, letter: 'DB', row2: '', row3: '10 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)      3' },
  { num: 107, letter: 'DC', row2: '', row3: '11 MESES', row4: 'dias  11' },
  { num: 108, letter: 'DD', row2: '', row3: '11 MESES', row4: 'REAJUSTE DE DOSIS SF3' },
  { num: 109, letter: 'DE', row2: 'PAQUETE INTEGRAL UN AÑO                                                                                                                          PAQUETE INTEGRAL UN AÑO                                                                                                                          PAQUETE INTEGRAL UN AÑO                                                                                                                          PAQUETE INTEGRAL UN AÑO', row3: 'CRED 1 AÑO', row4: 'PAIS 1' },
  { num: 110, letter: 'DF', row2: '', row3: 'CRED 1 AÑO', row4: 'dias 1' },
  { num: 111, letter: 'DG', row2: '', row3: 'CRED 1 AÑO', row4: 'CRED  1' },
  { num: 112, letter: 'DH', row2: '', row3: 'CRED 1 AÑO', row4: '1ra  Sesion estimulacion temprana' },
  { num: 113, letter: 'DI', row2: '', row3: 'CRED 1 AÑO', row4: 'TAM. VIF' },
  { num: 114, letter: 'DJ', row2: '', row3: 'CRED 1 AÑO', row4: 'EX OJOS' },
  { num: 115, letter: 'DK', row2: '', row3: 'CRED 1 AÑO', row4: 'EV. ODONTOLOGICA' },
  { num: 116, letter: 'DL', row2: '', row3: 'CRED 1 AÑO', row4: 'TEST GRAHAM' },
  { num: 117, letter: 'DM', row2: '', row3: 'CRED 1 AÑO', row4: 'SPR  1°' },
  { num: 118, letter: 'DN', row2: '', row3: 'CRED 1 AÑO', row4: 'NEUMO  3°' },
  { num: 119, letter: 'DO', row2: '', row3: 'CRED 1 AÑO', row4: 'VARICELA' },
  { num: 120, letter: 'DP', row2: '', row3: 'CRED 1 AÑO', row4: 'INFLUENZA PEDIATRICA' },
  { num: 121, letter: 'DQ', row2: '', row3: 'CRED 1 AÑO', row4: 'Vitamina VA1  200.000 UI' },
  { num: 122, letter: 'DR', row2: '', row3: 'CRED 1 AÑO', row4: 'DOSAJE  HB  Dx' },
  { num: 123, letter: 'DS', row2: '', row3: 'CRED 1 AÑO', row4: 'TA  suplementacion' },
  { num: 124, letter: 'DT', row2: '', row3: 'CRED 1 AÑO', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        4' },
  { num: 125, letter: 'DU', row2: '', row3: 'CRED 1 AÑO', row4: 'DX ANEMIA SI O NO' },
  { num: 126, letter: 'DV', row2: '', row3: '1 AÑO   3 MESES', row4: 'dias  2' },
  { num: 127, letter: 'DW', row2: '', row3: '1 AÑO   3 MESES', row4: 'CRED 2°' },
  { num: 128, letter: 'DX', row2: '', row3: '1 AÑO   3 MESES', row4: '2da  Sesion estimulacion temprana' },
  { num: 129, letter: 'DY', row2: '', row3: '1 AÑO   3 MESES', row4: 'AMA' },
  { num: 130, letter: 'DZ', row2: '', row3: '1 AÑO   3 MESES', row4: 'HEPATITIS  A' },
  { num: 131, letter: 'EA', row2: '', row3: '1 AÑO   3 MESES', row4: 'DOSAJE  HB  Dx' },
  { num: 132, letter: 'EB', row2: '', row3: '1 AÑO   3 MESES', row4: 'HIERRO SF 1' },
  { num: 133, letter: 'EC', row2: '', row3: '1 AÑO   3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        1' },
  { num: 134, letter: 'ED', row2: '', row3: 'VISITA DOMICIL.  1', row4: 'DESPUES DE 7 DIAS DEL SF       V.D. 1' },
  { num: 135, letter: 'EE', row2: '', row3: '1 AÑO  4 MESES', row4: 'dias 3' },
  { num: 136, letter: 'EF', row2: '', row3: '1 AÑO  4 MESES', row4: 'HIERRO SF 2' },
  { num: 137, letter: 'EG', row2: '', row3: '1 AÑO  4 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         2' },
  { num: 138, letter: 'EH', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION 2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF      V.D. 2' },
  { num: 139, letter: 'EI', row2: '', row3: '1 AÑO  5 MESES', row4: 'dias 4' },
  { num: 140, letter: 'EJ', row2: '', row3: '1 AÑO  5 MESES', row4: 'HIERRO SF 3' },
  { num: 141, letter: 'EK', row2: '', row3: '1 AÑO  5 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)           3' },
  { num: 142, letter: 'EL', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  3', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF       V,D.3' },
  { num: 143, letter: 'EM', row2: '', row3: '1AÑO 6 MESES', row4: 'dias       5' },
  { num: 144, letter: 'EN', row2: '', row3: '1AÑO 6 MESES', row4: 'CRED 3°' },
  { num: 145, letter: 'EO', row2: '', row3: '1AÑO 6 MESES', row4: '3ra  Sesion estimulacion temprana' },
  { num: 146, letter: 'EP', row2: '', row3: '1AÑO 6 MESES', row4: 'TAM. VIF' },
  { num: 147, letter: 'EQ', row2: '', row3: '1AÑO 6 MESES', row4: 'EX OJOS' },
  { num: 148, letter: 'ER', row2: '', row3: '1AÑO 6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 149, letter: 'ES', row2: '', row3: '1AÑO 6 MESES', row4: 'SPR  2°' },
  { num: 150, letter: 'ET', row2: '', row3: '1AÑO 6 MESES', row4: 'IPV  1° REF' },
  { num: 151, letter: 'EU', row2: '', row3: '1AÑO 6 MESES', row4: 'DPT  1° REF' },
  { num: 152, letter: 'EV', row2: '', row3: '1AÑO 6 MESES', row4: 'Vitamina   VA2   200.000UI' },
  { num: 153, letter: 'EW', row2: '', row3: '1AÑO 6 MESES', row4: 'DOSAJE HB  c1' },
  { num: 154, letter: 'EX', row2: '', row3: '1AÑO 6 MESES', row4: 'HIERRO SF 4' },
  { num: 155, letter: 'EY', row2: '', row3: '1AÑO 6 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)             4' },
  { num: 156, letter: 'EZ', row2: '', row3: '1AÑO 6 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 157, letter: 'FA', row2: '', row3: '1 AÑO  7 MESES', row4: 'dias      6' },
  { num: 158, letter: 'FB', row2: '', row3: '1 AÑO  7 MESES', row4: 'HIERRO SF 5' },
  { num: 159, letter: 'FC', row2: '', row3: '1 AÑO  7 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            5' },
  { num: 160, letter: 'FD', row2: '', row3: '1AÑO  8 MESES', row4: 'dias       7' },
  { num: 161, letter: 'FE', row2: '', row3: '1AÑO  8 MESES', row4: '4ta  Sesion estimulacion temprana' },
  { num: 162, letter: 'FF', row2: '', row3: '1AÑO  8 MESES', row4: 'HIERRO SF 6' },
  { num: 163, letter: 'FG', row2: '', row3: '1AÑO  8 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              6' },
  { num: 164, letter: 'FH', row2: '', row3: '1 AÑO 9 MESES', row4: 'PAIS  TA' },
  { num: 165, letter: 'FI', row2: '', row3: '1 AÑO 9 MESES', row4: 'dias        8' },
  { num: 166, letter: 'FJ', row2: '', row3: '1 AÑO 9 MESES', row4: 'CRED 4°' },
  { num: 167, letter: 'FK', row2: '', row3: '1 AÑO 9 MESES', row4: 'DOSAJE  HB  c2' },
  { num: 168, letter: 'FL', row2: '', row3: '1 AÑO 9 MESES', row4: 'TA  suplementacion' },
  { num: 169, letter: 'FM', row2: '', row3: '1 AÑO 9 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            7' },
  { num: 170, letter: 'FN', row2: '', row3: '1 AÑO 9 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 171, letter: 'FO', row2: 'PAQUETE INTEGRAL DOS AÑOS                                                                                                          PAQUETE INTEGRAL DOS AÑOS                                                                                                          PAQUETE INTEGRAL DOS AÑOS', row3: 'CRED  2 AÑOS', row4: 'PAIS  1' },
  { num: 172, letter: 'FP', row2: '', row3: 'CRED  2 AÑOS', row4: 'dias   1' },
  { num: 173, letter: 'FQ', row2: '', row3: 'CRED  2 AÑOS', row4: 'CRED  1' },
  { num: 174, letter: 'FR', row2: '', row3: 'CRED  2 AÑOS', row4: '1ra  Sesion estimulacion temprana' },
  { num: 175, letter: 'FS', row2: '', row3: 'CRED  2 AÑOS', row4: 'INFLUENZA PEDIATRICA' },
  { num: 176, letter: 'FT', row2: '', row3: 'CRED  2 AÑOS', row4: 'ANTIPARASITARIO  1 FCO' },
  { num: 177, letter: 'FU', row2: '', row3: 'CRED  2 AÑOS', row4: 'TEST DE GRAHAM' },
  { num: 178, letter: 'FV', row2: '', row3: 'CRED  2 AÑOS', row4: 'EX. PARASITOSIS' },
  { num: 179, letter: 'FW', row2: '', row3: 'CRED  2 AÑOS', row4: 'TAM. VIF' },
  { num: 180, letter: 'FX', row2: '', row3: 'CRED  2 AÑOS', row4: 'EX OJOS' },
  { num: 181, letter: 'FY', row2: '', row3: 'CRED  2 AÑOS', row4: 'EV. ODONTOLOGICA' },
  { num: 182, letter: 'FZ', row2: '', row3: 'CRED  2 AÑOS', row4: 'Vitamina  VA1 200.000UI' },
  { num: 183, letter: 'GA', row2: '', row3: 'CRED  2 AÑOS', row4: 'DOSAJE HB       Dx' },
  { num: 184, letter: 'GB', row2: '', row3: 'CRED  2 AÑOS', row4: 'HIERRO SF  1' },
  { num: 185, letter: 'GC', row2: '', row3: 'CRED  2 AÑOS', row4: 'DX ANEMIA SI O NO' },
  { num: 186, letter: 'GD', row2: '', row3: 'CRED  2 AÑOS', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          1' },
  { num: 187, letter: 'GE', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION 1', row4: 'DESPUES DE 7 DIAS DEL SF       V.D. 1' },
  { num: 188, letter: 'GF', row2: '', row3: '2 AÑOS  1 MES', row4: 'dias           2' },
  { num: 189, letter: 'GG', row2: '', row3: '2 AÑOS  1 MES', row4: 'HIERRO SF  2' },
  { num: 190, letter: 'GH', row2: '', row3: '2 AÑOS  1 MES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          2' },
  { num: 191, letter: 'GI', row2: '', row3: '2 AÑOS 2 MESES', row4: 'dias            3' },
  { num: 192, letter: 'GJ', row2: '', row3: '2 AÑOS 2 MESES', row4: 'HIERRO SF  3' },
  { num: 193, letter: 'GK', row2: '', row3: '2 AÑOS 2 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          3' },
  { num: 194, letter: 'GL', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF           V.D. 2' },
  { num: 195, letter: 'GM', row2: '', row3: '2 AÑOS  3 MESES', row4: 'dias       4' },
  { num: 196, letter: 'GN', row2: '', row3: '2 AÑOS  3 MESES', row4: 'HIERRO SF4' },
  { num: 197, letter: 'GO', row2: '', row3: '2 AÑOS  3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         4' },
  { num: 198, letter: 'GP', row2: '', row3: '2 AÑOS  4 MESES', row4: 'dias              5' },
  { num: 199, letter: 'GQ', row2: '', row3: '2 AÑOS  4 MESES', row4: 'HIERRO SF5' },
  { num: 200, letter: 'GR', row2: '', row3: '2 AÑOS  4 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          5' },
  { num: 201, letter: 'GS', row2: '', row3: '2 AÑOS  5 MESES', row4: 'dias               6' },
  { num: 202, letter: 'GT', row2: '', row3: '2 AÑOS  5 MESES', row4: 'HIERRO SF6' },
  { num: 203, letter: 'GU', row2: '', row3: '2 AÑOS  5 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          6' },
  { num: 204, letter: 'GV', row2: '', row3: '2 AÑOS 6 MESES', row4: 'PAIS  TA' },
  { num: 205, letter: 'GW', row2: '', row3: '2 AÑOS 6 MESES', row4: 'dias                7' },
  { num: 206, letter: 'GX', row2: '', row3: '2 AÑOS 6 MESES', row4: 'CRED  2' },
  { num: 207, letter: 'GY', row2: '', row3: '2 AÑOS 6 MESES', row4: '2da  Sesion estimulacion temprana  2' },
  { num: 208, letter: 'GZ', row2: '', row3: '2 AÑOS 6 MESES', row4: 'ANTIPARASITARIO  2 FCO' },
  { num: 209, letter: 'HA', row2: '', row3: '2 AÑOS 6 MESES', row4: 'TAM. VIF      2' },
  { num: 210, letter: 'HB', row2: '', row3: '2 AÑOS 6 MESES', row4: 'EX OJOS' },
  { num: 211, letter: 'HC', row2: '', row3: '2 AÑOS 6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 212, letter: 'HD', row2: '', row3: '2 AÑOS 6 MESES', row4: 'Vitamina  VA2             200.000UI' },
  { num: 213, letter: 'HE', row2: '', row3: '2 AÑOS 6 MESES', row4: 'DOSAJE  HB      c1' },
  { num: 214, letter: 'HF', row2: '', row3: '2 AÑOS 6 MESES', row4: 'TA suplementacion' },
  { num: 215, letter: 'HG', row2: '', row3: '2 AÑOS 6 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          7' },
  { num: 216, letter: 'HH', row2: '', row3: '2 AÑOS 6 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 217, letter: 'HI', row2: 'PAQUETE INTEGRAL TRES AÑOS                                                                                                                                        PAQUETE INTEGRAL TRES AÑOS', row3: 'CRED 3 AÑOS', row4: 'PAIS  1' },
  { num: 218, letter: 'HJ', row2: '', row3: 'CRED 3 AÑOS', row4: 'dias                                 1' },
  { num: 219, letter: 'HK', row2: '', row3: 'CRED 3 AÑOS', row4: 'CRED 1' },
  { num: 220, letter: 'HL', row2: '', row3: 'CRED 3 AÑOS', row4: 'Sesion estimulacion temprana' },
  { num: 221, letter: 'HM', row2: '', row3: 'CRED 3 AÑOS', row4: 'INFLUENZA adulto' },
  { num: 222, letter: 'HN', row2: '', row3: 'CRED 3 AÑOS', row4: 'ANTIPARASITARIO   1 FCO' },
  { num: 223, letter: 'HO', row2: '', row3: 'CRED 3 AÑOS', row4: 'TEST DE GRAHAM' },
  { num: 224, letter: 'HP', row2: '', row3: 'CRED 3 AÑOS', row4: 'EX. PARASITOSIS' },
  { num: 225, letter: 'HQ', row2: '', row3: 'CRED 3 AÑOS', row4: 'TAM. VIF' },
  { num: 226, letter: 'HR', row2: '', row3: 'CRED 3 AÑOS', row4: 'EX OJOS' },
  { num: 227, letter: 'HS', row2: '', row3: 'CRED 3 AÑOS', row4: 'EV. ODONTOLOGICA' },
  { num: 228, letter: 'HT', row2: '', row3: 'CRED 3 AÑOS', row4: 'Vitamina  VA1      200.000UI' },
  { num: 229, letter: 'HU', row2: '', row3: 'CRED 3 AÑOS', row4: 'DOSAJE  HB Dx' },
  { num: 230, letter: 'HV', row2: '', row3: 'CRED 3 AÑOS', row4: 'HIERRO  SF1' },
  { num: 231, letter: 'HW', row2: '', row3: 'CRED 3 AÑOS', row4: 'DX ANEMIA SI O NO' },
  { num: 232, letter: 'HX', row2: '', row3: 'CRED 3 AÑOS', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1' },
  { num: 233, letter: 'HY', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   1', row4: 'DESPUES DE 7 DIAS DEL SF               V.D. 1' },
  { num: 234, letter: 'HZ', row2: '', row3: '3 AÑOS 1 MES', row4: 'dias                                 2' },
  { num: 235, letter: 'IA', row2: '', row3: '3 AÑOS 1 MES', row4: 'HIERRO  SF2' },
  { num: 236, letter: 'IB', row2: '', row3: '3 AÑOS 1 MES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2' },
  { num: 237, letter: 'IC', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF 2  V.D. 2' },
  { num: 238, letter: 'ID', row2: '', row3: '3 AÑOS 2 MESES', row4: 'dias                3' },
  { num: 239, letter: 'IE', row2: '', row3: '3 AÑOS 2 MESES', row4: 'HIERRO  SF3' },
  { num: 240, letter: 'IF', row2: '', row3: '3 AÑOS 2 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3' },
  { num: 241, letter: 'IG', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   3', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF    V.D. 3' },
  { num: 242, letter: 'IH', row2: '', row3: '3 AÑOS 3 MESES', row4: 'dias              4' },
  { num: 243, letter: 'II', row2: '', row3: '3 AÑOS 3 MESES', row4: 'DOSAJE  HB  c1' },
  { num: 244, letter: 'IJ', row2: '', row3: '3 AÑOS 3 MESES', row4: 'TA suplementacion' },
  { num: 245, letter: 'IK', row2: '', row3: '3 AÑOS 3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4' },
  { num: 246, letter: 'IL', row2: '', row3: '3 AÑOS 6 MESES', row4: 'PAIS TA' },
  { num: 247, letter: 'IM', row2: '', row3: '3 AÑOS 6 MESES', row4: 'dias               5' },
  { num: 248, letter: 'IN', row2: '', row3: '3 AÑOS 6 MESES', row4: 'CRED 2' },
  { num: 249, letter: 'IO', row2: '', row3: '3 AÑOS 6 MESES', row4: 'ANTIPARASITARIO  2 FCO' },
  { num: 250, letter: 'IP', row2: '', row3: '3 AÑOS 6 MESES', row4: 'Vitamina  VA2' },
  { num: 251, letter: 'IQ', row2: '', row3: '3 AÑOS 6 MESES', row4: 'TAM. VIF' },
  { num: 252, letter: 'IR', row2: '', row3: '3 AÑOS 6 MESES', row4: 'EX OJOS       2' },
  { num: 253, letter: 'IS', row2: '', row3: '3 AÑOS 6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 254, letter: 'IT', row2: 'PAQUETE INTEGRAL CUATRO AÑOS                                                                                                                                        PAQUETE INTEGRAL CUATRO AÑOS', row3: 'CRED 4 AÑOS', row4: 'PAIS  1' },
  { num: 255, letter: 'IU', row2: '', row3: 'CRED 4 AÑOS', row4: 'dias                                 1' },
  { num: 256, letter: 'IV', row2: '', row3: 'CRED 4 AÑOS', row4: 'CRED 1' },
  { num: 257, letter: 'IW', row2: '', row3: 'CRED 4 AÑOS', row4: 'Sesion estimulacion temprana' },
  { num: 258, letter: 'IX', row2: '', row3: 'CRED 4 AÑOS', row4: 'INFLUENZA adulto' },
  { num: 259, letter: 'IY', row2: '', row3: 'CRED 4 AÑOS', row4: 'ANTIPARASITARIO   1 FCO' },
  { num: 260, letter: 'IZ', row2: '', row3: 'CRED 4 AÑOS', row4: 'TEST DE GRAHAM' },
  { num: 261, letter: 'JA', row2: '', row3: 'CRED 4 AÑOS', row4: 'EX. PARASITOSIS' },
  { num: 262, letter: 'JB', row2: '', row3: 'CRED 4 AÑOS', row4: 'TAM. VIF' },
  { num: 263, letter: 'JC', row2: '', row3: 'CRED 4 AÑOS', row4: 'EX  OJOS' },
  { num: 264, letter: 'JD', row2: '', row3: 'CRED 4 AÑOS', row4: 'EV. ODONTOLOGICA' },
  { num: 265, letter: 'JE', row2: '', row3: 'CRED 4 AÑOS', row4: 'Vitamina  VA1      200.000UI' },
  { num: 266, letter: 'JF', row2: '', row3: 'CRED 4 AÑOS', row4: 'DOSAJE  HB Dx' },
  { num: 267, letter: 'JG', row2: '', row3: 'CRED 4 AÑOS', row4: 'HIERRO  SF1' },
  { num: 268, letter: 'JH', row2: '', row3: 'CRED 4 AÑOS', row4: 'DX ANEMIA SI O NO' },
  { num: 269, letter: 'JI', row2: '', row3: 'CRED 4 AÑOS', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1' },
  { num: 270, letter: 'JJ', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   1', row4: 'DESPUES DE 7 DIAS DEL SF               V.D. 1' },
  { num: 271, letter: 'JK', row2: '', row3: '4 AÑOS 1 MES', row4: 'dias                                 2' },
  { num: 272, letter: 'JL', row2: '', row3: '4 AÑOS 1 MES', row4: 'HIERRO  SF2' },
  { num: 273, letter: 'JM', row2: '', row3: '4 AÑOS 1 MES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2' },
  { num: 274, letter: 'JN', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF 2 V.D. 2' },
  { num: 275, letter: 'JO', row2: '', row3: '4 AÑOS 2 MESES', row4: 'dias                3' },
  { num: 276, letter: 'JP', row2: '', row3: '4 AÑOS 2 MESES', row4: 'HIERRO  SF3' },
  { num: 277, letter: 'JQ', row2: '', row3: '4 AÑOS 2 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3' },
  { num: 278, letter: 'JR', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   3', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF    V.D. 3' },
  { num: 279, letter: 'JS', row2: '', row3: '4 AÑOS 3 MESES', row4: 'dias              4' },
  { num: 280, letter: 'JT', row2: '', row3: '4 AÑOS 3 MESES', row4: 'DOSAJE  HB  c1' },
  { num: 281, letter: 'JU', row2: '', row3: '4 AÑOS 3 MESES', row4: 'TA suplementacion' },
  { num: 282, letter: 'JV', row2: '', row3: '4 AÑOS 3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4' },
  { num: 283, letter: 'JW', row2: '', row3: '4 AÑOS 6 MESES', row4: 'PAIS TA' },
  { num: 284, letter: 'JX', row2: '', row3: '4 AÑOS 6 MESES', row4: 'dias               5' },
  { num: 285, letter: 'JY', row2: '', row3: '4 AÑOS 6 MESES', row4: 'CRED 2' },
  { num: 286, letter: 'JZ', row2: '', row3: '4 AÑOS 6 MESES', row4: 'ANTIPARASITARIO   2 FCO' },
  { num: 287, letter: 'KA', row2: '', row3: '4 AÑOS 6 MESES', row4: 'Vitamina  VA2       200.000UI' },
  { num: 288, letter: 'KB', row2: '', row3: '4 AÑOS 6 MESES', row4: 'TAM. VIF' },
  { num: 289, letter: 'KC', row2: '', row3: '4 AÑOS 6 MESES', row4: 'EX OJOS' },
  { num: 290, letter: 'KD', row2: '', row3: '4 AÑOS 6 MESES', row4: 'EV. ODONTOLOGICA' },
];

const EXPORT_COLUMNS_BPN = [
  { num: 1, letter: 'A', row2: 'IPRESS:', row3: '', row4: 'N°' },
  { num: 2, letter: 'B', row2: '', row3: 'PADRON NOMINAL', row4: 'DISTRITO' },
  { num: 3, letter: 'C', row2: '', row3: 'PADRON NOMINAL', row4: 'E.E.S.S PADRON' },
  { num: 4, letter: 'D', row2: '', row3: 'DATOS DEL NIÑO', row4: 'HC' },
  { num: 5, letter: 'E', row2: '', row3: 'DATOS DEL NIÑO', row4: 'CNV' },
  { num: 6, letter: 'F', row2: '', row3: 'DATOS DEL NIÑO', row4: 'DNI' },
  { num: 7, letter: 'G', row2: '', row3: 'DATOS DEL NIÑO', row4: 'NOMBRES Y APELLIDOS' },
  { num: 8, letter: 'H', row2: '', row3: 'DATOS DEL NIÑO', row4: 'SEXO' },
  { num: 9, letter: 'I', row2: '', row3: 'DATOS DEL NIÑO', row4: 'PESO' },
  { num: 10, letter: 'J', row2: '', row3: 'DATOS DEL NIÑO', row4: 'SEM GEST' },
  { num: 11, letter: 'K', row2: '', row3: 'DATOS DEL NIÑO', row4: 'FECHA DE NACIMIENTO' },
  { num: 12, letter: 'L', row2: '', row3: 'DATOS DEL NIÑO', row4: 'EDAD DEL NIÑO' },
  { num: 13, letter: 'M', row2: '', row3: 'DIRECCION', row4: 'COMUNIDAD' },
  { num: 14, letter: 'N', row2: '', row3: 'DATOS DE LA MADRE', row4: 'DNI' },
  { num: 15, letter: 'O', row2: '', row3: 'DATOS DE LA MADRE', row4: 'NOMBRES Y APELLIDOS MADRE' },
  { num: 16, letter: 'P', row2: '', row3: 'DATOS DE LA MADRE', row4: 'CELULAR' },
  { num: 17, letter: 'Q', row2: 'PAQUETE INTEGRAL RN                                                                              PAQUETE INTEGRAL RN', row3: 'LUGAR', row4: 'NACIMIENTO' },
  { num: 18, letter: 'R', row2: '', row3: 'VACUNA', row4: 'BCG' },
  { num: 19, letter: 'S', row2: '', row3: 'VACUNA', row4: 'HVB' },
  { num: 20, letter: 'T', row2: '', row3: 'VACUNA', row4: 'dias' },
  { num: 21, letter: 'U', row2: '', row3: 'CONTROL RN', row4: 'PAIS 1' },
  { num: 22, letter: 'V', row2: '', row3: 'CONTROL RN', row4: '1° CRED' },
  { num: 23, letter: 'W', row2: '', row3: 'CONTROL RN', row4: 'dias' },
  { num: 24, letter: 'X', row2: '', row3: 'CONTROL RN', row4: 'TAM. VIF.' },
  { num: 25, letter: 'Y', row2: '', row3: 'CONTROL RN', row4: 'EX. OJOS' },
  { num: 26, letter: 'Z', row2: '', row3: 'CONTROL RN', row4: '2° CRED' },
  { num: 27, letter: 'AA', row2: '', row3: 'CONTROL RN', row4: 'dias 2' },
  { num: 28, letter: 'AB', row2: '', row3: 'CONTROL RN', row4: 'PAIS TA' },
  { num: 29, letter: 'AC', row2: '', row3: 'CONTROL RN', row4: '3° CRED' },
  { num: 30, letter: 'AD', row2: '', row3: 'CONTROL RN', row4: 'dias 3' },
  { num: 31, letter: 'AE', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE NEONATAL PRIMERA' },
  { num: 32, letter: 'AF', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'SEGUNDA' },
  { num: 33, letter: 'AG', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'dias 5' },
  { num: 34, letter: 'AH', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'LUGAR' },
  { num: 35, letter: 'AI', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE HIPOACUSIA' },
  { num: 36, letter: 'AJ', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE CATARATA' },
  { num: 37, letter: 'AK', row2: '', row3: 'TAMIZAJES EN EL RECIEN NACIDO', row4: 'TAMIZAJE CARDIACO' },
  { num: 38, letter: 'AL', row2: '', row3: 'VISITA DOMICIL.', row4: 'DE 2-7 DIAS  RN' },
  { num: 39, letter: 'AM', row2: '', row3: 'OBSERVACION', row4: 'ATENCION EN OTRO EESS' },
  { num: 40, letter: 'AN', row2: 'PAQUETE INTEGRAL MENOR DE UN AÑO                                                                                                                                                    PAQUETE INTEGRAL MENOR DE UN AÑO                                                                                                                                                    PAQUETE INTEGRAL MENOR DE UN AÑO                                                                                                                                                    PAQUETE INTEGRAL MENOR DE UN AÑO', row3: '1 MES', row4: 'PAIS  1' },
  { num: 41, letter: 'AO', row2: '', row3: '1 MES', row4: 'dias' },
  { num: 42, letter: 'AP', row2: '', row3: '1 MES', row4: 'CRED 1°' },
  { num: 43, letter: 'AQ', row2: '', row3: '1 MES', row4: '1ra  Sesion estimulacion temprana' },
  { num: 44, letter: 'AR', row2: '', row3: '1 MES', row4: 'TAM. VIF' },
  { num: 45, letter: 'AS', row2: '', row3: '1 MES', row4: 'EV. ODONTOLOGICA' },
  { num: 46, letter: 'AT', row2: '', row3: '1 MES', row4: 'DOSAJE HB  a los 30 dias  de vida' },
  { num: 47, letter: 'AU', row2: '', row3: '1 MES', row4: 'HIERRO   PO1' },
  { num: 48, letter: 'AV', row2: '', row3: '1 MES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  1' },
  { num: 49, letter: 'AW', row2: '', row3: 'VISITA DOMICIL. 1', row4: 'DESPUES DE 7 DIAS DEL SF  V.D.1' },
  { num: 50, letter: 'AX', row2: '', row3: '2 MESES', row4: 'dias  2' },
  { num: 51, letter: 'AY', row2: '', row3: '2 MESES', row4: 'CRED  2°' },
  { num: 52, letter: 'AZ', row2: '', row3: '2 MESES', row4: '2da  Sesion estimulacion temprana' },
  { num: 53, letter: 'BA', row2: '', row3: '2 MESES', row4: 'PENTA  1°' },
  { num: 54, letter: 'BB', row2: '', row3: '2 MESES', row4: 'IPV  1°' },
  { num: 55, letter: 'BC', row2: '', row3: '2 MESES', row4: 'NEUMO 1°' },
  { num: 56, letter: 'BD', row2: '', row3: '2 MESES', row4: 'ROTA  1°' },
  { num: 57, letter: 'BE', row2: '', row3: '2 MESES', row4: 'REAJUSTE DE DOSIS PO' },
  { num: 58, letter: 'BF', row2: '', row3: '2 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  2' },
  { num: 59, letter: 'BG', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF   V.D.2' },
  { num: 60, letter: 'BH', row2: '', row3: '3 MESES', row4: 'dias  3' },
  { num: 61, letter: 'BI', row2: '', row3: '3 MESES', row4: 'CRED 3°' },
  { num: 62, letter: 'BJ', row2: '', row3: '3 MESES', row4: '2026-04-20 00:00:00' },
  { num: 63, letter: 'BK', row2: '', row3: '3 MESES', row4: 'REAJUSTE DE DOSIS PO' },
  { num: 64, letter: 'BL', row2: '', row3: '3 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  3' },
  { num: 65, letter: 'BM', row2: '', row3: '4 MESES', row4: 'dias  4' },
  { num: 66, letter: 'BN', row2: '', row3: '4 MESES', row4: 'CRED 4°' },
  { num: 67, letter: 'BO', row2: '', row3: '4 MESES', row4: '3ra  Sesion estimulacion temprana' },
  { num: 68, letter: 'BP', row2: '', row3: '4 MESES', row4: 'PENTA  2°' },
  { num: 69, letter: 'BQ', row2: '', row3: '4 MESES', row4: 'IPV  2°' },
  { num: 70, letter: 'BR', row2: '', row3: '4 MESES', row4: 'NEUMO 2°' },
  { num: 71, letter: 'BS', row2: '', row3: '4 MESES', row4: 'ROTA  2°' },
  { num: 72, letter: 'BT', row2: '', row3: '4 MESES', row4: 'DOSAJE  HB a los 90 dias despues de CRED  de 1 mes' },
  { num: 73, letter: 'BU', row2: '', row3: '4 MESES', row4: 'HIERRO  PO 2' },
  { num: 74, letter: 'BV', row2: '', row3: '4 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  4' },
  { num: 75, letter: 'BW', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  3', row4: 'DESPUES DE 7 DIAS DEL  SF  V.D. 1' },
  { num: 76, letter: 'BX', row2: '', row3: '5 MESES', row4: 'dias  5' },
  { num: 77, letter: 'BY', row2: '', row3: '5 MESES', row4: 'REAJUSTE DE DOSIS  PO' },
  { num: 78, letter: 'BZ', row2: '', row3: '5 MESES', row4: 'CONSEJERIA  LACTANCIA MATERNA EXCLUSIVA  5' },
  { num: 79, letter: 'CA', row2: '', row3: '6 MESES', row4: 'dias  6' },
  { num: 80, letter: 'CB', row2: '', row3: '6 MESES', row4: 'CRED 5°' },
  { num: 81, letter: 'CC', row2: '', row3: '6 MESES', row4: '4ta  Sesion estimulacion temprana' },
  { num: 82, letter: 'CD', row2: '', row3: '6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 83, letter: 'CE', row2: '', row3: '6 MESES', row4: 'PENTA  3°' },
  { num: 84, letter: 'CF', row2: '', row3: '6 MESES', row4: 'IPV  3°' },
  { num: 85, letter: 'CG', row2: '', row3: '6 MESES', row4: 'INFLUENZA PEDIATRICA 1°' },
  { num: 86, letter: 'CH', row2: '', row3: '6 MESES', row4: 'Vitamina VA 1 100.000 UI' },
  { num: 87, letter: 'CI', row2: '', row3: '6 MESES', row4: 'DOSAJE  HB  Dx' },
  { num: 88, letter: 'CJ', row2: '', row3: '6 MESES', row4: 'TA suplementacion' },
  { num: 89, letter: 'CK', row2: '', row3: '6 MESES', row4: 'HIERRO  SF 1' },
  { num: 90, letter: 'CL', row2: '', row3: '6 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)  1' },
  { num: 91, letter: 'CM', row2: '', row3: '6 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 92, letter: 'CN', row2: '', row3: 'VISITA DOMICIL. 1', row4: 'DESPUES DE 7 DIAS DEL SF   V.D. 1' },
  { num: 93, letter: 'CO', row2: '', row3: '7 MESES', row4: 'dias  7' },
  { num: 94, letter: 'CP', row2: '', row3: '7 MESES', row4: 'CRED 6°' },
  { num: 95, letter: 'CQ', row2: '', row3: '7 MESES', row4: '5ta  Sesion estimulacion temprana' },
  { num: 96, letter: 'CR', row2: '', row3: '7 MESES', row4: 'INFLUENZA PEDIATRICA  2°' },
  { num: 97, letter: 'CS', row2: '', row3: '7 MESES', row4: 'TAM. VIF' },
  { num: 98, letter: 'CT', row2: '', row3: '7 MESES', row4: 'REAJUSTE DE DOSIS  SF1' },
  { num: 99, letter: 'CU', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF   V.D.2' },
  { num: 100, letter: 'CV', row2: '', row3: '8 MESES', row4: 'dias  8' },
  { num: 101, letter: 'CW', row2: '', row3: '8 MESES', row4: 'HIERRO  SF 2' },
  { num: 102, letter: 'CX', row2: '', row3: '8 MESES', row4: 'EX. OJOS' },
  { num: 103, letter: 'CY', row2: '', row3: '8 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)    2' },
  { num: 104, letter: 'CZ', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  3', row4: 'DESPUES DE 7 DIAS DEL SF    V.D.3' },
  { num: 105, letter: 'DA', row2: '', row3: '9 MESES', row4: 'dias  9' },
  { num: 106, letter: 'DB', row2: '', row3: '9 MESES', row4: 'CRED 7°' },
  { num: 107, letter: 'DC', row2: '', row3: '9 MESES', row4: '6ta  Sesion estimulacion temprana2' },
  { num: 108, letter: 'DD', row2: '', row3: '9 MESES', row4: 'DOSAJE HB c1 a los 90 dias del CRED de 6 meses' },
  { num: 109, letter: 'DE', row2: '', row3: '9 MESES', row4: 'REAJUSTE DE DOSIS SF2' },
  { num: 110, letter: 'DF', row2: '', row3: '9 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 111, letter: 'DG', row2: '', row3: '10 MESES', row4: 'dias  10' },
  { num: 112, letter: 'DH', row2: '', row3: '10 MESES', row4: 'HIERRO  SF 3' },
  { num: 113, letter: 'DI', row2: '', row3: '10 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)      3' },
  { num: 114, letter: 'DJ', row2: '', row3: '11 MESES', row4: 'dias  11' },
  { num: 115, letter: 'DK', row2: '', row3: '11 MESES', row4: 'REAJUSTE DE DOSIS SF3' },
  { num: 116, letter: 'DL', row2: 'PAQUETE INTEGRAL UN AÑO                                                                                                                          PAQUETE INTEGRAL UN AÑO                                                                                                                          PAQUETE INTEGRAL UN AÑO                                                                                                                          PAQUETE INTEGRAL UN AÑO', row3: 'CRED 1 AÑO', row4: 'PAIS 1' },
  { num: 117, letter: 'DM', row2: '', row3: 'CRED 1 AÑO', row4: 'dias 1' },
  { num: 118, letter: 'DN', row2: '', row3: 'CRED 1 AÑO', row4: 'CRED  1' },
  { num: 119, letter: 'DO', row2: '', row3: 'CRED 1 AÑO', row4: '1ra  Sesion estimulacion temprana' },
  { num: 120, letter: 'DP', row2: '', row3: 'CRED 1 AÑO', row4: 'TAM. VIF' },
  { num: 121, letter: 'DQ', row2: '', row3: 'CRED 1 AÑO', row4: 'EX OJOS' },
  { num: 122, letter: 'DR', row2: '', row3: 'CRED 1 AÑO', row4: 'EV. ODONTOLOGICA' },
  { num: 123, letter: 'DS', row2: '', row3: 'CRED 1 AÑO', row4: 'TEST GRAHAM' },
  { num: 124, letter: 'DT', row2: '', row3: 'CRED 1 AÑO', row4: 'SPR  1°' },
  { num: 125, letter: 'DU', row2: '', row3: 'CRED 1 AÑO', row4: 'NEUMO  3°' },
  { num: 126, letter: 'DV', row2: '', row3: 'CRED 1 AÑO', row4: 'VARICELA' },
  { num: 127, letter: 'DW', row2: '', row3: 'CRED 1 AÑO', row4: 'INFLUENZA PEDIATRICA' },
  { num: 128, letter: 'DX', row2: '', row3: 'CRED 1 AÑO', row4: 'Vitamina VA1  200.000 UI' },
  { num: 129, letter: 'DY', row2: '', row3: 'CRED 1 AÑO', row4: 'DOSAJE  HB  Dx' },
  { num: 130, letter: 'DZ', row2: '', row3: 'CRED 1 AÑO', row4: 'TA  suplementacion' },
  { num: 131, letter: 'EA', row2: '', row3: 'CRED 1 AÑO', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        4' },
  { num: 132, letter: 'EB', row2: '', row3: 'CRED 1 AÑO', row4: 'DX ANEMIA SI O NO' },
  { num: 133, letter: 'EC', row2: '', row3: '1 AÑO   3 MESES', row4: 'dias  2' },
  { num: 134, letter: 'ED', row2: '', row3: '1 AÑO   3 MESES', row4: 'CRED 2°' },
  { num: 135, letter: 'EE', row2: '', row3: '1 AÑO   3 MESES', row4: '2da  Sesion estimulacion temprana' },
  { num: 136, letter: 'EF', row2: '', row3: '1 AÑO   3 MESES', row4: 'AMA' },
  { num: 137, letter: 'EG', row2: '', row3: '1 AÑO   3 MESES', row4: 'HEPATITIS  A' },
  { num: 138, letter: 'EH', row2: '', row3: '1 AÑO   3 MESES', row4: 'DOSAJE  HB  Dx' },
  { num: 139, letter: 'EI', row2: '', row3: '1 AÑO   3 MESES', row4: 'HIERRO SF 1' },
  { num: 140, letter: 'EJ', row2: '', row3: '1 AÑO   3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)        1' },
  { num: 141, letter: 'EK', row2: '', row3: 'VISITA DOMICIL.  1', row4: 'DESPUES DE 7 DIAS DEL SF       V.D. 1' },
  { num: 142, letter: 'EL', row2: '', row3: '1 AÑO  4 MESES', row4: 'dias 3' },
  { num: 143, letter: 'EM', row2: '', row3: '1 AÑO  4 MESES', row4: 'HIERRO SF 2' },
  { num: 144, letter: 'EN', row2: '', row3: '1 AÑO  4 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         2' },
  { num: 145, letter: 'EO', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION 2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF      V.D. 2' },
  { num: 146, letter: 'EP', row2: '', row3: '1 AÑO  5 MESES', row4: 'dias 4' },
  { num: 147, letter: 'EQ', row2: '', row3: '1 AÑO  5 MESES', row4: 'HIERRO SF 3' },
  { num: 148, letter: 'ER', row2: '', row3: '1 AÑO  5 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)           3' },
  { num: 149, letter: 'ES', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  3', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF       V,D.3' },
  { num: 150, letter: 'ET', row2: '', row3: '1AÑO 6 MESES', row4: 'dias       5' },
  { num: 151, letter: 'EU', row2: '', row3: '1AÑO 6 MESES', row4: 'CRED 3°' },
  { num: 152, letter: 'EV', row2: '', row3: '1AÑO 6 MESES', row4: '3ra  Sesion estimulacion temprana' },
  { num: 153, letter: 'EW', row2: '', row3: '1AÑO 6 MESES', row4: 'TAM. VIF' },
  { num: 154, letter: 'EX', row2: '', row3: '1AÑO 6 MESES', row4: 'EX OJOS' },
  { num: 155, letter: 'EY', row2: '', row3: '1AÑO 6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 156, letter: 'EZ', row2: '', row3: '1AÑO 6 MESES', row4: 'SPR  2°' },
  { num: 157, letter: 'FA', row2: '', row3: '1AÑO 6 MESES', row4: 'IPV  1° REF' },
  { num: 158, letter: 'FB', row2: '', row3: '1AÑO 6 MESES', row4: 'DPT  1° REF' },
  { num: 159, letter: 'FC', row2: '', row3: '1AÑO 6 MESES', row4: 'Vitamina   VA2   200.000UI' },
  { num: 160, letter: 'FD', row2: '', row3: '1AÑO 6 MESES', row4: 'DOSAJE HB  c1' },
  { num: 161, letter: 'FE', row2: '', row3: '1AÑO 6 MESES', row4: 'HIERRO SF 4' },
  { num: 162, letter: 'FF', row2: '', row3: '1AÑO 6 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)             4' },
  { num: 163, letter: 'FG', row2: '', row3: '1AÑO 6 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 164, letter: 'FH', row2: '', row3: '1 AÑO  7 MESES', row4: 'dias      6' },
  { num: 165, letter: 'FI', row2: '', row3: '1 AÑO  7 MESES', row4: 'HIERRO SF 5' },
  { num: 166, letter: 'FJ', row2: '', row3: '1 AÑO  7 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            5' },
  { num: 167, letter: 'FK', row2: '', row3: '1AÑO  8 MESES', row4: 'dias       7' },
  { num: 168, letter: 'FL', row2: '', row3: '1AÑO  8 MESES', row4: '4ta  Sesion estimulacion temprana' },
  { num: 169, letter: 'FM', row2: '', row3: '1AÑO  8 MESES', row4: 'HIERRO SF 6' },
  { num: 170, letter: 'FN', row2: '', row3: '1AÑO  8 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              6' },
  { num: 171, letter: 'FO', row2: '', row3: '1 AÑO 9 MESES', row4: 'PAIS  TA' },
  { num: 172, letter: 'FP', row2: '', row3: '1 AÑO 9 MESES', row4: 'dias        8' },
  { num: 173, letter: 'FQ', row2: '', row3: '1 AÑO 9 MESES', row4: 'CRED 4°' },
  { num: 174, letter: 'FR', row2: '', row3: '1 AÑO 9 MESES', row4: 'DOSAJE  HB  c2' },
  { num: 175, letter: 'FS', row2: '', row3: '1 AÑO 9 MESES', row4: 'TA  suplementacion' },
  { num: 176, letter: 'FT', row2: '', row3: '1 AÑO 9 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)            7' },
  { num: 177, letter: 'FU', row2: '', row3: '1 AÑO 9 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 178, letter: 'FV', row2: 'PAQUETE INTEGRAL DOS AÑOS                                                                                                          PAQUETE INTEGRAL DOS AÑOS                                                                                                          PAQUETE INTEGRAL DOS AÑOS', row3: 'CRED  2 AÑOS', row4: 'PAIS  1' },
  { num: 179, letter: 'FW', row2: '', row3: 'CRED  2 AÑOS', row4: 'dias   1' },
  { num: 180, letter: 'FX', row2: '', row3: 'CRED  2 AÑOS', row4: 'CRED  1' },
  { num: 181, letter: 'FY', row2: '', row3: 'CRED  2 AÑOS', row4: '1ra  Sesion estimulacion temprana' },
  { num: 182, letter: 'FZ', row2: '', row3: 'CRED  2 AÑOS', row4: 'INFLUENZA PEDIATRICA' },
  { num: 183, letter: 'GA', row2: '', row3: 'CRED  2 AÑOS', row4: 'ANTIPARASITARIO  1 FCO' },
  { num: 184, letter: 'GB', row2: '', row3: 'CRED  2 AÑOS', row4: 'TEST DE GRAHAM' },
  { num: 185, letter: 'GC', row2: '', row3: 'CRED  2 AÑOS', row4: 'EX. PARASITOSIS' },
  { num: 186, letter: 'GD', row2: '', row3: 'CRED  2 AÑOS', row4: 'TAM. VIF' },
  { num: 187, letter: 'GE', row2: '', row3: 'CRED  2 AÑOS', row4: 'EX OJOS' },
  { num: 188, letter: 'GF', row2: '', row3: 'CRED  2 AÑOS', row4: 'EV. ODONTOLOGICA' },
  { num: 189, letter: 'GG', row2: '', row3: 'CRED  2 AÑOS', row4: 'Vitamina  VA1 200.000UI' },
  { num: 190, letter: 'GH', row2: '', row3: 'CRED  2 AÑOS', row4: 'DOSAJE HB       Dx' },
  { num: 191, letter: 'GI', row2: '', row3: 'CRED  2 AÑOS', row4: 'HIERRO SF  1' },
  { num: 192, letter: 'GJ', row2: '', row3: 'CRED  2 AÑOS', row4: 'DX ANEMIA SI O NO' },
  { num: 193, letter: 'GK', row2: '', row3: 'CRED  2 AÑOS', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          1' },
  { num: 194, letter: 'GL', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION 1', row4: 'DESPUES DE 7 DIAS DEL SF       V.D. 1' },
  { num: 195, letter: 'GM', row2: '', row3: '2 AÑOS  1 MES', row4: 'dias           2' },
  { num: 196, letter: 'GN', row2: '', row3: '2 AÑOS  1 MES', row4: 'HIERRO SF  2' },
  { num: 197, letter: 'GO', row2: '', row3: '2 AÑOS  1 MES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          2' },
  { num: 198, letter: 'GP', row2: '', row3: '2 AÑOS 2 MESES', row4: 'dias            3' },
  { num: 199, letter: 'GQ', row2: '', row3: '2 AÑOS 2 MESES', row4: 'HIERRO SF  3' },
  { num: 200, letter: 'GR', row2: '', row3: '2 AÑOS 2 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          3' },
  { num: 201, letter: 'GS', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION  2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE  SF           V.D. 2' },
  { num: 202, letter: 'GT', row2: '', row3: '2 AÑOS  3 MESES', row4: 'dias       4' },
  { num: 203, letter: 'GU', row2: '', row3: '2 AÑOS  3 MESES', row4: 'HIERRO SF4' },
  { num: 204, letter: 'GV', row2: '', row3: '2 AÑOS  3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)         4' },
  { num: 205, letter: 'GW', row2: '', row3: '2 AÑOS  4 MESES', row4: 'dias              5' },
  { num: 206, letter: 'GX', row2: '', row3: '2 AÑOS  4 MESES', row4: 'HIERRO SF5' },
  { num: 207, letter: 'GY', row2: '', row3: '2 AÑOS  4 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          5' },
  { num: 208, letter: 'GZ', row2: '', row3: '2 AÑOS  5 MESES', row4: 'dias               6' },
  { num: 209, letter: 'HA', row2: '', row3: '2 AÑOS  5 MESES', row4: 'HIERRO SF6' },
  { num: 210, letter: 'HB', row2: '', row3: '2 AÑOS  5 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          6' },
  { num: 211, letter: 'HC', row2: '', row3: '2 AÑOS 6 MESES', row4: 'PAIS  TA' },
  { num: 212, letter: 'HD', row2: '', row3: '2 AÑOS 6 MESES', row4: 'dias                7' },
  { num: 213, letter: 'HE', row2: '', row3: '2 AÑOS 6 MESES', row4: 'CRED  2' },
  { num: 214, letter: 'HF', row2: '', row3: '2 AÑOS 6 MESES', row4: '2da  Sesion estimulacion temprana  2' },
  { num: 215, letter: 'HG', row2: '', row3: '2 AÑOS 6 MESES', row4: 'ANTIPARASITARIO  2 FCO' },
  { num: 216, letter: 'HH', row2: '', row3: '2 AÑOS 6 MESES', row4: 'TAM. VIF      2' },
  { num: 217, letter: 'HI', row2: '', row3: '2 AÑOS 6 MESES', row4: 'EX OJOS' },
  { num: 218, letter: 'HJ', row2: '', row3: '2 AÑOS 6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 219, letter: 'HK', row2: '', row3: '2 AÑOS 6 MESES', row4: 'Vitamina  VA2             200.000UI' },
  { num: 220, letter: 'HL', row2: '', row3: '2 AÑOS 6 MESES', row4: 'DOSAJE  HB      c1' },
  { num: 221, letter: 'HM', row2: '', row3: '2 AÑOS 6 MESES', row4: 'TA suplementacion' },
  { num: 222, letter: 'HN', row2: '', row3: '2 AÑOS 6 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)          7' },
  { num: 223, letter: 'HO', row2: '', row3: '2 AÑOS 6 MESES', row4: 'DX ANEMIA SI O NO' },
  { num: 224, letter: 'HP', row2: 'PAQUETE INTEGRAL TRES AÑOS                                                                                                                                        PAQUETE INTEGRAL TRES AÑOS', row3: 'CRED 3 AÑOS', row4: 'PAIS  1' },
  { num: 225, letter: 'HQ', row2: '', row3: 'CRED 3 AÑOS', row4: 'dias                                 1' },
  { num: 226, letter: 'HR', row2: '', row3: 'CRED 3 AÑOS', row4: 'CRED 1' },
  { num: 227, letter: 'HS', row2: '', row3: 'CRED 3 AÑOS', row4: 'Sesion estimulacion temprana' },
  { num: 228, letter: 'HT', row2: '', row3: 'CRED 3 AÑOS', row4: 'INFLUENZA adulto' },
  { num: 229, letter: 'HU', row2: '', row3: 'CRED 3 AÑOS', row4: 'ANTIPARASITARIO   1 FCO' },
  { num: 230, letter: 'HV', row2: '', row3: 'CRED 3 AÑOS', row4: 'TEST DE GRAHAM' },
  { num: 231, letter: 'HW', row2: '', row3: 'CRED 3 AÑOS', row4: 'EX. PARASITOSIS' },
  { num: 232, letter: 'HX', row2: '', row3: 'CRED 3 AÑOS', row4: 'TAM. VIF' },
  { num: 233, letter: 'HY', row2: '', row3: 'CRED 3 AÑOS', row4: 'EX OJOS' },
  { num: 234, letter: 'HZ', row2: '', row3: 'CRED 3 AÑOS', row4: 'EV. ODONTOLOGICA' },
  { num: 235, letter: 'IA', row2: '', row3: 'CRED 3 AÑOS', row4: 'Vitamina  VA1      200.000UI' },
  { num: 236, letter: 'IB', row2: '', row3: 'CRED 3 AÑOS', row4: 'DOSAJE  HB Dx' },
  { num: 237, letter: 'IC', row2: '', row3: 'CRED 3 AÑOS', row4: 'HIERRO  SF1' },
  { num: 238, letter: 'ID', row2: '', row3: 'CRED 3 AÑOS', row4: 'DX ANEMIA SI O NO' },
  { num: 239, letter: 'IE', row2: '', row3: 'CRED 3 AÑOS', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1' },
  { num: 240, letter: 'IF', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   1', row4: 'DESPUES DE 7 DIAS DEL SF               V.D. 1' },
  { num: 241, letter: 'IG', row2: '', row3: '3 AÑOS 1 MES', row4: 'dias                                 2' },
  { num: 242, letter: 'IH', row2: '', row3: '3 AÑOS 1 MES', row4: 'HIERRO  SF2' },
  { num: 243, letter: 'II', row2: '', row3: '3 AÑOS 1 MES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2' },
  { num: 244, letter: 'IJ', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF 2  V.D. 2' },
  { num: 245, letter: 'IK', row2: '', row3: '3 AÑOS 2 MESES', row4: 'dias                3' },
  { num: 246, letter: 'IL', row2: '', row3: '3 AÑOS 2 MESES', row4: 'HIERRO  SF3' },
  { num: 247, letter: 'IM', row2: '', row3: '3 AÑOS 2 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3' },
  { num: 248, letter: 'IN', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   3', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF    V.D. 3' },
  { num: 249, letter: 'IO', row2: '', row3: '3 AÑOS 3 MESES', row4: 'dias              4' },
  { num: 250, letter: 'IP', row2: '', row3: '3 AÑOS 3 MESES', row4: 'DOSAJE  HB  c1' },
  { num: 251, letter: 'IQ', row2: '', row3: '3 AÑOS 3 MESES', row4: 'TA suplementacion' },
  { num: 252, letter: 'IR', row2: '', row3: '3 AÑOS 3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4' },
  { num: 253, letter: 'IS', row2: '', row3: '3 AÑOS 6 MESES', row4: 'PAIS TA' },
  { num: 254, letter: 'IT', row2: '', row3: '3 AÑOS 6 MESES', row4: 'dias               5' },
  { num: 255, letter: 'IU', row2: '', row3: '3 AÑOS 6 MESES', row4: 'CRED 2' },
  { num: 256, letter: 'IV', row2: '', row3: '3 AÑOS 6 MESES', row4: 'ANTIPARASITARIO  2 FCO' },
  { num: 257, letter: 'IW', row2: '', row3: '3 AÑOS 6 MESES', row4: 'Vitamina  VA2' },
  { num: 258, letter: 'IX', row2: '', row3: '3 AÑOS 6 MESES', row4: 'TAM. VIF' },
  { num: 259, letter: 'IY', row2: '', row3: '3 AÑOS 6 MESES', row4: 'EX OJOS       2' },
  { num: 260, letter: 'IZ', row2: '', row3: '3 AÑOS 6 MESES', row4: 'EV. ODONTOLOGICA' },
  { num: 261, letter: 'JA', row2: 'PAQUETE INTEGRAL CUATRO AÑOS                                                                                                                                        PAQUETE INTEGRAL CUATRO AÑOS', row3: 'CRED 4 AÑOS', row4: 'PAIS  1' },
  { num: 262, letter: 'JB', row2: '', row3: 'CRED 4 AÑOS', row4: 'dias                                 1' },
  { num: 263, letter: 'JC', row2: '', row3: 'CRED 4 AÑOS', row4: 'CRED 1' },
  { num: 264, letter: 'JD', row2: '', row3: 'CRED 4 AÑOS', row4: 'Sesion estimulacion temprana' },
  { num: 265, letter: 'JE', row2: '', row3: 'CRED 4 AÑOS', row4: 'INFLUENZA adulto' },
  { num: 266, letter: 'JF', row2: '', row3: 'CRED 4 AÑOS', row4: 'ANTIPARASITARIO   1 FCO' },
  { num: 267, letter: 'JG', row2: '', row3: 'CRED 4 AÑOS', row4: 'TEST DE GRAHAM' },
  { num: 268, letter: 'JH', row2: '', row3: 'CRED 4 AÑOS', row4: 'EX. PARASITOSIS' },
  { num: 269, letter: 'JI', row2: '', row3: 'CRED 4 AÑOS', row4: 'TAM. VIF' },
  { num: 270, letter: 'JJ', row2: '', row3: 'CRED 4 AÑOS', row4: 'EX  OJOS' },
  { num: 271, letter: 'JK', row2: '', row3: 'CRED 4 AÑOS', row4: 'EV. ODONTOLOGICA' },
  { num: 272, letter: 'JL', row2: '', row3: 'CRED 4 AÑOS', row4: 'Vitamina  VA1      200.000UI' },
  { num: 273, letter: 'JM', row2: '', row3: 'CRED 4 AÑOS', row4: 'DOSAJE  HB Dx' },
  { num: 274, letter: 'JN', row2: '', row3: 'CRED 4 AÑOS', row4: 'HIERRO  SF1' },
  { num: 275, letter: 'JO', row2: '', row3: 'CRED 4 AÑOS', row4: 'DX ANEMIA SI O NO' },
  { num: 276, letter: 'JP', row2: '', row3: 'CRED 4 AÑOS', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)              1' },
  { num: 277, letter: 'JQ', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   1', row4: 'DESPUES DE 7 DIAS DEL SF               V.D. 1' },
  { num: 278, letter: 'JR', row2: '', row3: '4 AÑOS 1 MES', row4: 'dias                                 2' },
  { num: 279, letter: 'JS', row2: '', row3: '4 AÑOS 1 MES', row4: 'HIERRO  SF2' },
  { num: 280, letter: 'JT', row2: '', row3: '4 AÑOS 1 MES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)               2' },
  { num: 281, letter: 'JU', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   2', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF 2 V.D. 2' },
  { num: 282, letter: 'JV', row2: '', row3: '4 AÑOS 2 MESES', row4: 'dias                3' },
  { num: 283, letter: 'JW', row2: '', row3: '4 AÑOS 2 MESES', row4: 'HIERRO  SF3' },
  { num: 284, letter: 'JX', row2: '', row3: '4 AÑOS 2 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                3' },
  { num: 285, letter: 'JY', row2: '', row3: 'VISITA DOMICIL. / TELEORIENTACION   3', row4: 'DESPUES DE 7 DIAS DEL REAJUSTE   SF    V.D. 3' },
  { num: 286, letter: 'JZ', row2: '', row3: '4 AÑOS 3 MESES', row4: 'dias              4' },
  { num: 287, letter: 'KA', row2: '', row3: '4 AÑOS 3 MESES', row4: 'DOSAJE  HB  c1' },
  { num: 288, letter: 'KB', row2: '', row3: '4 AÑOS 3 MESES', row4: 'TA suplementacion' },
  { num: 289, letter: 'KC', row2: '', row3: '4 AÑOS 3 MESES', row4: 'CONSEJERIA / ORIENTACION NUTRICIONAL (RIESGO NUTRICIONAL / SUPLEMENTACION / TRATAMIENTO CON HIERRO)                 4' },
  { num: 290, letter: 'KD', row2: '', row3: '4 AÑOS 6 MESES', row4: 'PAIS TA' },
  { num: 291, letter: 'KE', row2: '', row3: '4 AÑOS 6 MESES', row4: 'dias               5' },
  { num: 292, letter: 'KF', row2: '', row3: '4 AÑOS 6 MESES', row4: 'CRED 2' },
  { num: 293, letter: 'KG', row2: '', row3: '4 AÑOS 6 MESES', row4: 'ANTIPARASITARIO   2 FCO' },
  { num: 294, letter: 'KH', row2: '', row3: '4 AÑOS 6 MESES', row4: 'Vitamina  VA2       200.000UI' },
  { num: 295, letter: 'KI', row2: '', row3: '4 AÑOS 6 MESES', row4: 'TAM. VIF' },
  { num: 296, letter: 'KJ', row2: '', row3: '4 AÑOS 6 MESES', row4: 'EX OJOS' },
  { num: 297, letter: 'KK', row2: '', row3: '4 AÑOS 6 MESES', row4: 'EV. ODONTOLOGICA' },
];


const ExcelExporter = {
  // Paleta de colores por sección
  colors: {
    demograficos: { bg: "1F4E79", text: "FFFFFF" }, // Azul oscuro
    demograficosLight: { bg: "2F5597", text: "FFFFFF" },
    paqueteRn: { bg: "7030A0", text: "FFFFFF" }, // Morado
    paqueteRnLight: { bg: "8EA9DB", text: "000000" },
    paquete1Anio: { bg: "375623", text: "FFFFFF" }, // Verde oscuro
    paquete1AnioLight: { bg: "A9D08E", text: "000000" },
    paqueteUnAnio: { bg: "833C0C", text: "FFFFFF" }, // Marron/Dorado
    paqueteUnAnioLight: { bg: "F4B084", text: "000000" },
    paqueteDosAnios: { bg: "008080", text: "FFFFFF" }, // Teal
    paqueteDosAniosLight: { bg: "80CBC4", text: "000000" },
    paqueteTresAnios: { bg: "C00000", text: "FFFFFF" }, // Rojo
    paqueteTresAniosLight: { bg: "FFC000", text: "000000" },
    paqueteCuatroAnios: { bg: "7030A0", text: "FFFFFF" }, // Morado
    paqueteCuatroAniosLight: { bg: "D9E1F2", text: "000000" }
  },

  // Obtener estilo de sección según el mes o texto de sección
  getSectionColors(secName, mesName) {
    const sec = (secName || "").toUpperCase();
    const mes = (mesName || "").toUpperCase();

    if (sec.includes("PAQUETE INTEGRAL RN") || mes.includes("RN") || mes.includes("VACUNA") || mes.includes("CONTROL RN") || mes.includes("TAMIZAJES")) {
      return { main: this.colors.paqueteRn.bg, light: this.colors.paqueteRnLight.bg };
    }
    if (sec.includes("MENOR DE UN AÑO") || ["1 MES", "2 MESES", "3 MESES", "4 MESES", "5 MESES", "6 MESES", "7 MESES", "8 MESES", "9 MESES", "10 MESES", "11 MESES"].includes(mes)) {
      return { main: this.colors.paquete1Anio.bg, light: this.colors.paquete1AnioLight.bg };
    }
    if (sec.includes("UN AÑO") || mes.includes("1 AÑO") || mes.includes("1AÑO") || mes.includes("12 MESES") || mes.includes("15 MESES") || mes.includes("18 MESES")) {
      return { main: this.colors.paqueteUnAnio.bg, light: this.colors.paqueteUnAnioLight.bg };
    }
    if (sec.includes("DOS AÑOS") || mes.includes("2 AÑOS") || mes.includes("2AÑO") || mes.includes("24 MESES") || mes.includes("30 MESES")) {
      return { main: this.colors.paqueteDosAnios.bg, light: this.colors.paqueteDosAniosLight.bg };
    }
    if (sec.includes("TRES AÑOS") || mes.includes("3 AÑOS") || mes.includes("36 MESES") || mes.includes("42 MESES")) {
      return { main: this.colors.paqueteTresAnios.bg, light: this.colors.paqueteTresAniosLight.bg };
    }
    if (sec.includes("CUATRO AÑOS") || mes.includes("4 AÑOS") || mes.includes("48 MESES") || mes.includes("54 MESES")) {
      return { main: this.colors.paqueteCuatroAnios.bg, light: this.colors.paqueteCuatroAniosLight.bg };
    }
    return { main: this.colors.demograficos.bg, light: this.colors.demograficosLight.bg };
  },

  // Helper para parsear un string de fecha (ej: YYYY-MM-DD o ISO) a un objeto Date local sin desajustes de zona horaria
  parseLocalDate(dateStr) {
    if (!dateStr) return null;
    const cleanStr = String(dateStr).split("T")[0]; // Mantener solo YYYY-MM-DD
    const parts = cleanStr.split("-");
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mes indexado en 0
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  },

  // Exportar base de datos a Excel completo
  exportExcel(pacientes, seguimientos) {
    if (!pacientes || pacientes.length === 0) {
      Utils.showAlert("Exportación Vacía", "No hay pacientes registrados en el sistema.", "info");
      return;
    }

    try {
      const wb = XLSX.utils.book_new();

      // 1. Hoja de Niños a Término
      const terminoPacientes = pacientes.filter(p => p.tipo_seguimiento === 'termino');
      const wsTermino = this.buildSheet(terminoPacientes, seguimientos, EXPORT_COLUMNS_TERMINO, "termino");
      XLSX.utils.book_append_sheet(wb, wsTermino, "SEGUIMIENTO NIÑOS A TERMINO");

      // 2. Hoja de BPN / Prematuros
      const bpnPacientes = pacientes.filter(p => p.tipo_seguimiento === 'bpn');
      const wsBpn = this.buildSheet(bpnPacientes, seguimientos, EXPORT_COLUMNS_BPN, "bpn");
      XLSX.utils.book_append_sheet(wb, wsBpn, "SEGUIMIENTO NIÑ@ BPN PREMATUROS");

      // Guardar archivo
      const filename = `SEGUIMIENTO_CRED_MINSA_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, filename);
      Utils.showAlert("Exportación Exitosa", "¡Excel profesional exportado con éxito!", "success");
    } catch (e) {
      console.error(e);
      Utils.showAlert("Error de Exportación", "Error al exportar el archivo Excel: " + e.message, "error");
    }
  },

  // Construir una hoja de cálculo completa con celdas combinadas y estilos
  buildSheet(pacientes, seguimientos, columnsMap, tipo) {
    const ws = {};
    
    // Alturas de fila
    const rowHeights = [
      { hpt: 35 }, // Fila 0: Titulo
      { hpt: 26 }, // Fila 1: Secciones
      { hpt: 22 }, // Fila 2: Meses
      { hpt: 30 }  // Fila 3: Actividades
    ];
    
    // Escribir Fila 0: Titulo de la Hoja
    const titleText = `IPRESS SAN SEBASTIAN - RED CUSCO NORTE - SEGUIMIENTO DE ${tipo === 'bpn' ? 'BPN / PREMATUROS' : 'NIÑOS A TERMINO'}`;
    ws["A1"] = {
      v: titleText,
      t: "s",
      s: {
        font: { name: "Calibri", sz: 14, bold: true, color: { rgb: "1F4E79" } },
        alignment: { vertical: "center", horizontal: "left" }
      }
    };
    
    // Escribir encabezados de columnas (Fila 1, 2, 3)
    columnsMap.forEach((col, colIdx) => {
      const cLetter = col.letter;
      
      // Estilos por defecto para los encabezados
      const headerColors = this.getSectionColors(col.row2, col.row3);
      
      const styleRow2 = {
        fill: { fgColor: { rgb: col.row2 ? headerColors.main : "1F4E79" } },
        font: { name: "Calibri", sz: 10, bold: true, color: { rgb: "FFFFFF" } },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "FFFFFF" } },
          bottom: { style: "thin", color: { rgb: "FFFFFF" } },
          left: { style: "thin", color: { rgb: "FFFFFF" } },
          right: { style: "thin", color: { rgb: "FFFFFF" } }
        }
      };

      const styleRow3 = {
        fill: { fgColor: { rgb: col.row3 ? headerColors.light : "2F5597" } },
        font: { name: "Calibri", sz: 9, bold: true, color: { rgb: col.row3 ? "000000" : "FFFFFF" } },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "FFFFFF" } },
          bottom: { style: "thin", color: { rgb: "FFFFFF" } },
          left: { style: "thin", color: { rgb: "FFFFFF" } },
          right: { style: "thin", color: { rgb: "FFFFFF" } }
        }
      };

      const styleRow4 = {
        fill: { fgColor: { rgb: "F2F2F2" } },
        font: { name: "Calibri", sz: 8.5, bold: true, color: { rgb: "333333" } },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "D3D3D3" } },
          bottom: { style: "medium", color: { rgb: "1F4E79" } },
          left: { style: "thin", color: { rgb: "D3D3D3" } },
          right: { style: "thin", color: { rgb: "D3D3D3" } }
        }
      };

      ws[cLetter + "2"] = { v: col.row2 || "", t: "s", s: styleRow2 };
      ws[cLetter + "3"] = { v: col.row3 || "", t: "s", s: styleRow3 };
      ws[cLetter + "4"] = { v: col.row4 || "", t: "s", s: styleRow4 };
    });

    // Combinar encabezados (Merges)
    const merges = [];
    
    // 1. Combinar Secciones Principales (Fila 2 - index 1)
    let startCol = -1;
    let currentSec = "";
    for (let c = 0; c < columnsMap.length; c++) {
      const col = columnsMap[c];
      if (col.row2 !== currentSec) {
        if (startCol !== -1 && c - 1 > startCol) {
          merges.push({ s: { c: startCol, r: 1 }, e: { c: c - 1, r: 1 } });
        }
        startCol = c;
        currentSec = col.row2;
      }
    }
    if (startCol !== -1 && columnsMap.length - 1 > startCol) {
      merges.push({ s: { c: startCol, r: 1 }, e: { c: columnsMap.length - 1, r: 1 } });
    }

    // 2. Combinar Meses de Control (Fila 3 - index 2)
    startCol = -1;
    let currentMes = "";
    for (let c = 0; c < columnsMap.length; c++) {
      const col = columnsMap[c];
      if (col.row3 !== currentMes) {
        if (startCol !== -1 && c - 1 > startCol) {
          merges.push({ s: { c: startCol, r: 2 }, e: { c: c - 1, r: 2 } });
        }
        startCol = c;
        currentMes = col.row3;
      }
    }
    if (startCol !== -1 && columnsMap.length - 1 > startCol) {
      merges.push({ s: { c: startCol, r: 2 }, e: { c: columnsMap.length - 1, r: 2 } });
    }
    
    // Combinar titulo en la Fila 1 (A1:P1)
    merges.push({ s: { c: 0, r: 0 }, e: { c: 15, r: 0 } });

    // Rellenar datos de los pacientes
    const baseBorderStyle = {
      top: { style: "thin", color: { rgb: "E2E8F0" } },
      bottom: { style: "thin", color: { rgb: "E2E8F0" } },
      left: { style: "thin", color: { rgb: "E2E8F0" } },
      right: { style: "thin", color: { rgb: "E2E8F0" } }
    };

    pacientes.forEach((p, pIdx) => {
      const rIdx = pIdx + 5; // Fila 5 de Excel (1-indexed es 5)
      rowHeights.push({ hpt: 20 }); // Altura de fila de datos
      
      const pSeguimientos = seguimientos.filter(s => s.dni_paciente === p.id);

      columnsMap.forEach((col, colIdx) => {
        const cLetter = col.letter;
        const cellRef = cLetter + rIdx;
        
        let cellObj = {
          t: "s",
          v: "",
          s: {
            font: { name: "Calibri", sz: 10 },
            border: baseBorderStyle,
            alignment: { vertical: "center", horizontal: "left" }
          }
        };

        // 1. Columnas Demográficas básicas
        if (col.num <= 16) {
          cellObj.s.fill = { fgColor: { rgb: "F8FAFC" } }; // Fondo ligeramente gris
          cellObj.s.alignment.horizontal = "center";
          
          if (col.num === 1) { // N°
            cellObj.v = pIdx + 1;
            cellObj.t = "n";
          } else if (col.num === 2) { // DISTRITO
            cellObj.v = p.distrito || "";
          } else if (col.num === 3) { // E.E.S.S
            cellObj.v = p.eess || "";
          } else if (col.num === 4) { // HC
            cellObj.v = p.hc || "";
          } else if (col.num === 5) { // CNV
            cellObj.v = p.tipo_doc === "CNV" ? p.id : "";
          } else if (col.num === 6) { // DNI
            cellObj.v = p.tipo_doc === "DNI" ? p.id : "";
          } else if (col.num === 7) { // NOMBRES Y APELLIDOS
            cellObj.v = p.nombres || "";
            cellObj.s.alignment.horizontal = "left";
            cellObj.s.font.bold = true;
          } else if (col.num === 8) { // SEXO
            cellObj.v = p.sexo || "";
          } else if (col.num === 9) { // PESO
            cellObj.v = p.peso_nacer ? parseFloat(p.peso_nacer) : "";
            cellObj.t = cellObj.v !== "" ? "n" : "s";
          } else if (col.num === 10) { // SEM GEST
            cellObj.v = p.sem_gest ? parseInt(p.sem_gest, 10) : "";
            cellObj.t = cellObj.v !== "" ? "n" : "s";
          } else if (col.num === 11) { // FECHA DE NACIMIENTO
            const parsedDate = this.parseLocalDate(p.fecha_nacimiento);
            if (parsedDate) {
              cellObj.t = "d";
              cellObj.v = parsedDate;
              cellObj.z = "yyyy-mm-dd";
            } else {
              cellObj.v = p.fecha_nacimiento || "";
            }
          } else if (col.num === 12) { // EDAD
            // Edad calculada se maneja en el cliente, mostramos vacío o texto amigable
            cellObj.v = "";
          } else if (col.num === 13) { // COMUNIDAD/DIRECCION
            cellObj.v = p.comunidad || "";
            cellObj.s.alignment.horizontal = "left";
          } else if (col.num === 14) { // DNI MADRE
            cellObj.v = p.dni_madre || "";
          } else if (col.num === 15) { // NOMBRES MADRE
            cellObj.v = p.nombres_madre || "";
            cellObj.s.alignment.horizontal = "left";
          } else if (col.num === 16) { // CELULAR
            cellObj.v = p.celular_madre || "";
          }
        }
        
        // 2. Columnas de Seguimiento
        else {
          const actNameNormalized = Utils.normalizeActName(col.row4);
          const mesNormalized = Utils.normalizeMesControl(col.row3);
          const isDiasCol = actNameNormalized.includes("DIAS");

          cellObj.s.alignment.horizontal = "center";

          if (isDiasCol) {
            // Escribir Fórmula de días!
            const diasMap = tipo === "bpn" ? dias_map_1 : dias_map_0;
            if (col.num in diasMap) {
              const [actCol, prevCol] = diasMap[col.num];
              const actLetter = columnsMap[actCol - 1].letter;
              const prevLetter = columnsMap[prevCol - 1].letter;
              
              // Formula: =IF(AND(ACT_CELL<>"", PREV_CELL<>""), DAYS(ACT_CELL, PREV_CELL), "")
              // En openpyxl/Excel se puede usar DAYS o restar directamente: ACT_CELL - PREV_CELL
              cellObj.f = `IF(AND(${actLetter}${rIdx}<>"",${prevLetter}${rIdx}<>""), ${actLetter}${rIdx}-${prevLetter}${rIdx}, "")`;
              cellObj.t = "n";
              
              // Calcular valor real en JS para aplicar color condicional
              const segAct = pSeguimientos.find(s => Utils.normalizeActName(s.actividad) === Utils.normalizeActName(columnsMap[actCol - 1].row4) && Utils.normalizeMesControl(s.mes_control) === Utils.normalizeMesControl(columnsMap[actCol - 1].row3));
              let prevVal = "";
              if (columnsMap[prevCol - 1].row4 === "FECHA DE NACIMIENTO") {
                prevVal = p.fecha_nacimiento;
              } else {
                const segPrev = pSeguimientos.find(s => Utils.normalizeActName(s.actividad) === Utils.normalizeActName(columnsMap[prevCol - 1].row4) && Utils.normalizeMesControl(s.mes_control) === Utils.normalizeMesControl(columnsMap[prevCol - 1].row3));
                prevVal = segPrev ? segPrev.fecha_realizada : "";
              }
              const actVal = segAct ? segAct.fecha_realizada : "";
              
              if (actVal && prevVal) {
                const daysDiff = Utils.daysBetween(prevVal, actVal);
                const colorStatus = Utils.getDaysStatusColor(daysDiff, col.row3, col.row4);
                
                if (colorStatus === "green") {
                  cellObj.s.fill = { fgColor: { rgb: "E8F8F5" } }; // Verde suave
                  cellObj.s.font.color = { rgb: "27AE60" };
                  cellObj.s.font.bold = true;
                } else if (colorStatus === "red") {
                  cellObj.s.fill = { fgColor: { rgb: "FDEDEC" } }; // Rojo suave
                  cellObj.s.font.color = { rgb: "C0392B" };
                  cellObj.s.font.bold = true;
                }
              }
            }
          } else {
            // Celda normal de actividad (Fecha o valor)
            const seg = pSeguimientos.find(s => 
              Utils.normalizeActName(s.actividad) === actNameNormalized && 
              Utils.normalizeMesControl(s.mes_control) === mesNormalized
            );
            
            let valToWrite = "";
            let isDateVal = false;

            if (seg) {
              if (seg.fecha_realizada) {
                valToWrite = seg.fecha_realizada;
                isDateVal = true;
              } else if (seg.valor) {
                if (String(seg.valor).match(/^\d{4}-\d{2}-\d{2}/)) {
                  valToWrite = seg.valor;
                  isDateVal = true;
                } else {
                  valToWrite = seg.valor;
                }
              }
            }

            // Si es columna de PAIS o TA, y no tenemos fecha, intentar heredarla del control del mismo mes
            const isPaisOrTaCol = actNameNormalized.includes("PAIS") || actNameNormalized.includes("TA SUPLEMENTACION") || actNameNormalized.includes("TA  SUPLEMENTACION");
            if (isPaisOrTaCol && !isDateVal) {
              let targetControlName = "";
              if (mesNormalized === "RN") {
                if (actNameNormalized.includes("PAIS 1")) targetControlName = "1 CRED";
                else if (actNameNormalized.includes("PAIS TA")) targetControlName = "3 CRED";
              } else {
                // Buscar control CRED en el mismo mes
                const controlAct = columnsMap.find(c => 
                  Utils.normalizeMesControl(c.row3) === mesNormalized && 
                  Utils.normalizeActName(c.row4).includes("CRED")
                );
                if (controlAct) {
                  targetControlName = controlAct.row4;
                }
              }

              if (targetControlName) {
                const segControl = pSeguimientos.find(s => 
                  Utils.normalizeMesControl(s.mes_control) === mesNormalized && 
                  Utils.normalizeActName(s.actividad) === Utils.normalizeActName(targetControlName)
                );
                if (segControl && segControl.fecha_realizada) {
                  valToWrite = segControl.fecha_realizada;
                  isDateVal = true;
                }
              }
            }

            if (isDateVal && valToWrite) {
              const parsedDate = this.parseLocalDate(valToWrite);
              if (parsedDate) {
                cellObj.t = "d";
                cellObj.v = parsedDate;
                cellObj.z = "yyyy-mm-dd";
              } else {
                cellObj.v = valToWrite;
              }
            } else {
              cellObj.v = valToWrite || "";
            }
          }
        }
        
        ws[cellRef] = cellObj;
      });
    });

    // Definir dimensiones de la hoja
    const maxCellRef = columnsMap[columnsMap.length - 1].letter + (pacientes.length + 4);
    ws["!ref"] = `A1:${maxCellRef}`;
    
    // Asignar combinaciones de celdas
    ws["!merges"] = merges;

    // Asignar alturas de filas
    ws["!rows"] = rowHeights;

    // Congelar paneles (Fila 5, Columna Q / index 16)
    ws["!views"] = [
      {
        state: "frozen",
        ySplit: 4,
        xSplit: 16,
        topLeftCell: "Q5",
        activePane: "bottomRight"
      }
    ];

    // Ajustar ancho de columnas automáticamente
    const wscols = [];
    columnsMap.forEach(col => {
      if (col.num === 1) wscols.push({ wch: 5 }); // N°
      else if (col.num === 7) wscols.push({ wch: 32 }); // Nombres
      else if (col.num === 11) wscols.push({ wch: 14 }); // Nacimiento
      else if (col.num <= 16) wscols.push({ wch: 13 }); // Demográficos
      else if (col.row4.toLowerCase().includes("dias")) wscols.push({ wch: 7 }); // Días
      else wscols.push({ wch: 11 }); // Actividades por defecto
    });
    ws["!cols"] = wscols;

    return ws;
  }
};
