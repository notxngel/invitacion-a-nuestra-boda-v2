/**
 * LISTA DE INVITADOS
 * ------------------
 * Cada entrada debe ser un objeto:
 *   { nombre: "...", cupos: N }                   → pendiente de confirmar
 *   { nombre: "...", cupos: N, confirmado: true }  → ya confirmó su asistencia
 *
 * El máximo de cupos por invitación es 4 (CONFIG.maxCupos).
 * El primer nombre de cada grupo es el que se usa para verificar en el gate.
 *
 * NOTA DE PRIVACIDAD: estos nombres viajan al navegador del invitado.
 * La página NUNCA muestra la lista completa — solo confirma el nombre
 * exacto que el invitado escribe.
 */
const GUEST_LIST = Object.freeze([

  // ── 1 cupo ──────────────────────────────────────────────────────────
  { nombre: "Aaron E. Reyes",                cupos: 1, confirmado: true },
  { nombre: "Aines Perdomo",                 cupos: 1, confirmado: true },
  { nombre: "Anthony Sanchez",               cupos: 1, confirmado: true },
  { nombre: "Antonio Labarrere",             cupos: 2 },                   // pendiente
  { nombre: "Arisleidy Rivera",              cupos: 1, confirmado: true },
  { nombre: "Bailey Rivas",                  cupos: 1, confirmado: true },
  { nombre: "Brian Barker",                  cupos: 1, confirmado: true },
  { nombre: "Carmen De Jesus",               cupos: 1, confirmado: true },
  { nombre: "Devin Sarita",                  cupos: 1, confirmado: true },
  { nombre: "Emmanuel Rivera",               cupos: 1, confirmado: true },
  { nombre: "Enrique Rivera",               cupos: 1, confirmado: true },
  { nombre: "Francisco Abreu",               cupos: 1, confirmado: true },
  { nombre: "Gabriela Rivera",               cupos: 1, confirmado: true },
  { nombre: "Joan Manuel Marte Chavez",      cupos: 1, confirmado: true },
  { nombre: "Larkin Camilo Casado Custodio", cupos: 1, confirmado: true },
  { nombre: "Lauren Labarrere",              cupos: 2 },                   // pendiente
  { nombre: "Marcia Rivera",                 cupos: 1, confirmado: true },
  { nombre: "Michael Morales",               cupos: 1, confirmado: true },
  { nombre: "Michelle Paulino",              cupos: 1, confirmado: true },
  { nombre: "Moises Abreu",                  cupos: 1, confirmado: true },
  { nombre: "Monserrat Gomez",               cupos: 1, confirmado: true },
  { nombre: "Papon",                         cupos: 1, confirmado: true },
  { nombre: "Rachel Hidalgo",                cupos: 1, confirmado: true },
  { nombre: "Raúl Morales",                  cupos: 1, confirmado: true },
  { nombre: "Zyomara Del Carpio",            cupos: 1, confirmado: true },

  // ── 2 cupos ─────────────────────────────────────────────────────────
  { nombre: "Amanda Baez",             cupos: 2, confirmado: true },
  { nombre: "Ana Julia",               cupos: 2, confirmado: true },
  { nombre: "Apolinar Rivera",         cupos: 2, confirmado: true },
  { nombre: "Arelis Esquea",           cupos: 2, confirmado: true },
  { nombre: "Carolina Espinal",        cupos: 2, confirmado: true },
  { nombre: "Destiny Garcia",          cupos: 2, confirmado: true },
  { nombre: "Elian Del Jesus",         cupos: 2, confirmado: true },
  { nombre: "Emanuel Reyes",           cupos: 2, confirmado: true },  // Josiah (niño) no cuenta
  { nombre: "Enedid Castillo",         cupos: 2, confirmado: true },
  { nombre: "Fernando Saint-Hilaire",  cupos: 2, confirmado: true },
  { nombre: "Genesis Pereda Gonzalez", cupos: 2, confirmado: true },
  { nombre: "Harold Alcantara",        cupos: 2, confirmado: true },
  { nombre: "Johanna Hernandez",       cupos: 2, confirmado: true },
  { nombre: "Judith Pereda",           cupos: 2, confirmado: true },
  { nombre: "Kelvin Castillo",         cupos: 2, confirmado: true },
  { nombre: "Leo Perez",               cupos: 2, confirmado: true },
  { nombre: "Martin Rivera",           cupos: 2, confirmado: true },
  { nombre: "Milagros Rivera",         cupos: 2, confirmado: true },
  { nombre: "Mireya Peña",             cupos: 2, confirmado: true },
  { nombre: "Nancy Rivera",            cupos: 2, confirmado: true },
  { nombre: "Nia Saint-Hilaire",       cupos: 2, confirmado: true },
  { nombre: "Noslen Caballero",        cupos: 2, confirmado: true },
  { nombre: "Ortimidio Bautista",      cupos: 2, confirmado: true },
  { nombre: "Paola Valera",            cupos: 2, confirmado: true },
  { nombre: "Rosemary Hernandez",      cupos: 2, confirmado: true },
  { nombre: "Sergio Rivera",           cupos: 2, confirmado: true },
  { nombre: "Silvia Sagastume",        cupos: 2, confirmado: true },
  { nombre: "Solvi Cruz",              cupos: 2, confirmado: true },
  { nombre: "Tima Rivera",             cupos: 2, confirmado: true },
  { nombre: "Yamila Miranda",          cupos: 2, confirmado: true },

  // ── 3 cupos ─────────────────────────────────────────────────────────
  { nombre: "Angel Matamoros",         cupos: 3, confirmado: true },
  { nombre: "Angie Reyes",             cupos: 3, confirmado: true },
  { nombre: "Falhon Mercedes",         cupos: 3, confirmado: true },
  { nombre: "Julio Ramos",             cupos: 3, confirmado: true },
  { nombre: "Maria Lamarche",          cupos: 3, confirmado: true },
  { nombre: "Ramona Alcantara",        cupos: 3, confirmado: true },

  // ── 4 cupos ─────────────────────────────────────────────────────────
  { nombre: "Aidee Rivas",             cupos: 4, confirmado: true },  // Victoria (niña) excluida del conteo
  { nombre: "Indira Noguera",          cupos: 4, confirmado: true },
  { nombre: "José Salcedo",            cupos: 4, confirmado: true },
  { nombre: "Stephany Minyetty",       cupos: 4, confirmado: true },
  { nombre: "Vinicio Rivera",          cupos: 4, confirmado: true },

]);
