/**
 * LISTA DE INVITADOS
 * ------------------
 * Edita SOLO este archivo para agregar o quitar invitados.
 *
 * Cada entrada puede ser:
 *   1) Un texto con el nombre completo:        "Lauren Labarrere"
 *   2) Un objeto con cupos (acompañantes):     { nombre: "Familia Pérez", cupos: 4 }
 *
 * Si no pones "cupos", se asume 1 (solo esa persona).
 * El máximo de cupos por invitación es 4 (ver CONFIG.maxCupos).
 *
 * NOTA DE PRIVACIDAD: estos nombres viajan al navegador del invitado.
 * Sin embargo, la página NUNCA muestra la lista completa: solo confirma
 * el nombre exacto que el invitado escribe. Si escribe algo ambiguo, se le
 * pide el nombre completo; nunca se le muestra un listado de otras personas.
 */
const GUEST_LIST = Object.freeze([
  "Lauren Labarrere",
  "Antonio Labarrere",

  // ────────────────────────────────────────────────────────────
  // Pega aquí el resto de los invitados, uno por línea, así:
  //   "Nombre Apellido",
  //   { nombre: "Nombre Apellido", cupos: 2 },
  // ────────────────────────────────────────────────────────────
]);
