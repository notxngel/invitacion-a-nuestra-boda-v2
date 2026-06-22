/**
 * LISTA DE INVITADOS
 * ------------------
 * Cada entrada puede ser:
 *   "Nombre Apellido"              → 1 cupo (por defecto)
 *   { nombre: "...", cupos: N }    → N cupos para el grupo
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
  "Aaron E. Reyes",
  "Aines Perdomo",
  "Anthony Sanchez",
  "Antonio Labarrere",
  "Arisleidy Rivera",
  "Bailey Rivas",
  "Brian Barker",
  "Carmen De Jesus",
  "Devin Sarita",
  "Emmanuel Rivera",
  "Enrique Rivera",
  "Francisco Abreu",
  "Gabriela Rivera",
  "Joan Manuel Marte Chavez",
  "Larkin Camilo Casado Custodio",
  "Lauren Labarrere",
  "Marcia Rivera",
  "Michael Morales",
  "Michelle Paulino",
  "Moises Abreu",
  "Monserrat Gomez",
  "Papon",
  "Rachel Hidalgo",
  "Raúl Morales",
  "Zyomara Del Carpio",

  // ── 2 cupos ─────────────────────────────────────────────────────────
  { nombre: "Amanda Baez",             cupos: 2 },
  { nombre: "Ana Julia",               cupos: 2 },
  { nombre: "Apolinar Rivera",         cupos: 2 },
  { nombre: "Arelis Esquea",           cupos: 2 },
  { nombre: "Carolina Espinal",        cupos: 2 },
  { nombre: "Destiny Garcia",          cupos: 2 },
  { nombre: "Elian Del Jesus",         cupos: 2 },
  { nombre: "Emanuel Reyes",           cupos: 2 },  // Josiah (niño) no cuenta
  { nombre: "Enedid Castillo",         cupos: 2 },
  { nombre: "Fernando Saint-Hilaire",  cupos: 2 },
  { nombre: "Genesis Pereda Gonzalez", cupos: 2 },
  { nombre: "Harold Alcantara",        cupos: 2 },
  { nombre: "Johanna Hernandez",       cupos: 2 },
  { nombre: "Judith Pereda",           cupos: 2 },
  { nombre: "Kelvin Castillo",         cupos: 2 },
  { nombre: "Leo Perez",               cupos: 2 },
  { nombre: "Martin Rivera",           cupos: 2 },
  { nombre: "Milagros Rivera",         cupos: 2 },
  { nombre: "Mireya Peña",             cupos: 2 },
  { nombre: "Nancy Rivera",            cupos: 2 },
  { nombre: "Nia Saint-Hilaire",       cupos: 2 },
  { nombre: "Noslen Caballero",        cupos: 2 },
  { nombre: "Ortimidio Bautista",      cupos: 2 },
  { nombre: "Paola Valera",            cupos: 2 },
  { nombre: "Rosemary Hernandez",      cupos: 2 },
  { nombre: "Sergio Rivera",           cupos: 2 },
  { nombre: "Silvia Sagastume",        cupos: 2 },
  { nombre: "Solvi Cruz",              cupos: 2 },
  { nombre: "Tima Rivera",             cupos: 2 },
  { nombre: "Yamila Miranda",          cupos: 2 },

  // ── 3 cupos ─────────────────────────────────────────────────────────
  { nombre: "Angel Matamoros",         cupos: 3 },
  { nombre: "Angie Reyes",             cupos: 3 },
  { nombre: "Falhon Mercedes",         cupos: 3 },
  { nombre: "Julio Ramos",             cupos: 3 },
  { nombre: "Maria Lamarche",          cupos: 3 },
  { nombre: "Ramona Alcantara",        cupos: 3 },

  // ── 4 cupos ─────────────────────────────────────────────────────────
  { nombre: "Aidee Rivas",             cupos: 4 },  // Victoria (niña) excluida del conteo
  { nombre: "Indira Noguera",          cupos: 4 },
  { nombre: "José Salcedo",            cupos: 4 },
  { nombre: "Stephany Minyetty",       cupos: 4 },
  { nombre: "Vinicio Rivera",          cupos: 4 },

]);
