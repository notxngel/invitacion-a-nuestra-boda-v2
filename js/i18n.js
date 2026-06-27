/** i18n — Soporte bilingüe (ES por defecto, EN con localStorage o ?lang=en) **/

const LANG = (() => {
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "es") return stored;
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "es";
})();

const I18N = {
  es: {
    // Navbar
    nav_home: "Inicio",
    nav_moments: "Momentos",
    nav_details: "Detalles",

    // Hero
    hero_eyebrow: "¡NOS CASAMOS!",
    hero_date: "Julio 16, 2026",
    hero_venue: "Garden Vista Ballroom · Passaic, NJ",
    hero_instruction: "Desplázate para ver los detalles",
    countdown_days: "Días",
    countdown_hours: "Horas",
    countdown_minutes: "Minutos",
    countdown_seconds: "Segundos",
    countdown_passed: "¡A partir de hoy, somos esposos!",

    // Album
    album_title: "Momentos que nos trajeron aquí",
    album_subtitle: "Un día que cambió nuestras vidas para siempre",
    caption_1: "La gran pregunta",
    caption_2: "¡Dijo que sí!",
    caption_3: "Tú y yo, siempre",
    caption_4: "Para siempre",
    caption_5: "Con todo mi corazón",
    caption_6: "Mi lugar favorito",

    // Details (Now FAQ)
    details_title: "Detalles del Evento",
    details_subtitle: "Todo lo que necesitas saber",
    faq_q_arrival: "¿A qué hora debo llegar?",
    faq_a_arrival: "4:30 PM · La ceremonia inicia puntualmente a las 5:00 PM.",
    faq_q_parking: "¿Hay estacionamiento?",
    faq_a_parking: "Sí, Valet Parking gratuito para todos los invitados.",
    faq_q_kids: "¿Puedo llevar niños?",
    faq_a_kids: "Evento exclusivo para adultos.",
    faq_q_dresscode: "¿Cuál es el código de vestimenta?",
    faq_a_dresscode: "Formal · Evitar blanco (novia) y verde oliva (cortejo).",
    faq_q_gifts: "¿Tienen mesa de regalos?",
    faq_a_gifts: "Tendremos una Lluvia de Sobres el día del evento. También puedes acompañarnos con un detalle vía Zelle: (973) 955-8525.",
    faq_q_seats: "¿Cómo funcionan los cupos?",
    faq_a_seats: "Cada invitación tiene cupos asignados. Los verás al confirmar.",

    // Locations
    loc_title: "¿Cómo Llegar?",
    loc_subtitle: "Te esperamos en",
    loc_btn: "Abrir en Google Maps",

    // RSVP
    rsvp_title: "Confirmación",
    rsvp_subtitle: "Será un placer compartir este momento tan especial con ustedes",
    rsvp_card_subtitle: "Esperamos contar con tu presencia",
    rsvp_card_text: "¿Ya revisaste todos los detalles del evento? Asegúrate de leerlos antes de confírmarnos tu asistencia.",
    rsvp_deadline: "Fecha límite: 26 de Junio",
    rsvp_open_btn: "Abrir Formulario",
    rsvp_closed_heading: "El período de confirmación ha concluido",
    rsvp_closed_body: "Aunque no podremos tenerte a nuestro lado en este día tan especial, nuestro corazón guarda con profundo cariño cada uno de los momentos compartidos contigo. Tu amor y tu presencia en nuestras vidas son, y siempre serán, un regalo invaluable.",
    rsvp_closed_signature: "Con todo nuestro amor,",

    // Página de cierre (full-page overlay)
    closed_body: "Gracias a todos los que se pudieron registrar — estamos felices y con mucha emoción por verlos ahí. ¡Será una noche que jamás olvidaremos!",
    closed_date_label: "Fecha",
    closed_date_value: "Jueves, 16 de Julio de 2026",
    closed_time_label: "Horario",
    closed_time_value: "Llegada 4:30 PM",
    closed_time_sub: "Ceremonia a las 5:00 PM",
    closed_dress_label: "Vestimenta",
    closed_dress_value: "Formal / Etiqueta Rigurosa",
    closed_dress_sub: "Evitar blanco y verde oliva",
    closed_parking_label: "Estacionamiento",
    closed_parking_value: "Valet Parking gratuito",
    closed_kids_label: "Política de Niños",
    closed_kids_value: "Solo adultos",
    closed_kids_sub: "Celebración exclusiva para adultos",
    closed_venue_address: "29 Macarthur Ave, Passaic, NJ 07055",

    // Modal Form
    modal_title: "Confirmación",
    modal_subtitle: "Será un placer contar contigo",
    modal_deadline: "Por favor confirma antes del <strong>26 de Junio</strong>",
    form_name: "Tu nombre completo",
    form_companion: "Acompañante",
    form_name_placeholder: "Ej: Ana García",
    form_companion_placeholder: "Nombre completo",
    form_attendance: "¿Asistirás?",
    form_yes: "¡Sí, ahí estaré!",
    form_no: "Lo siento, no podré ir",
    form_phone: "Teléfono Móvil (WhatsApp)",
    form_phone_placeholder: "Ej. +1 123 456 7890",
    form_message: "Mensaje (Opcional)",
    form_message_placeholder: "Déjanos tus mejores deseos...",
    form_submit: "Enviar Confirmación",

    // Gate (verificación por nombre)
    gate_label: "Antes de confirmar",
    gate_instruction: "Escribe tu nombre para verificar tu invitación",
    gate_placeholder: "Ej: Ana García",
    gate_btn: "Verificar",
    gate_short: "Escribe al menos dos letras de tu nombre.",
    gate_none: "No encontramos tu nombre en la lista. Revisa cómo lo escribiste o contáctanos.",
    gate_many: "Hay varias coincidencias. Por favor escribe tu nombre y apellido completos.",
    gate_hello: "¡Hola, {name}! Estás en nuestra lista.",
    gate_confirmed: "¡{name}, ya tenemos tu confirmación!",

    // Song suggestion
    songs_title: "Ayudanos a armar la playlist",
    songs_subtitle: "¿Qué canciones no pueden faltar?",
    songs_song_label: "Nombre de la canción",
    songs_song_placeholder: "Ej: Praise",
    songs_artist_label: "Artista (Opcional)",
    songs_artist_placeholder: "Ej: Elevation Worship",

    // Zelle
    zelle_label: "Detalle especial · Zelle",
    zelle_copy: "Copiar",
    zelle_copied: "¡Copiado!",
    zelle_note: "Si quieres acompañar este día con un detalle, aquí puedes hacerlo.",

    // Validation
    form_sending: "Enviando...",
    val_name: "Por favor, ingresa tu nombre.",
    val_phone: "Por favor, ingresa tu teléfono.",
    val_checkbox: "Por favor confirma que leíste los detalles del evento.",
    val_rate_limit: "Por favor espera unos segundos antes de intentar de nuevo.",

    // Form - detalles
    form_read_details: "He leído todos los detalles del evento (horario, dress code, estacionamiento y política de niños)",

    // Success
    success_title: "¡Gracias!",
    success_subtitle: "Tu confirmación fue recibida",
    success_text: "Nos alegra mucho contar contigo en este día tan especial. ¡Nos vemos el 16 de julio!",
    success_apple_cal: "Añadir a Apple Calendar",
    success_google_cal: "Añadir a Google Calendar",
    success_close: "Cerrar Formulario",
    success_test: "(Pruebas: Enviar otra respuesta)",

    // Error
    error_default: "Hubo un error. Intenta de nuevo",
    error_timeout: "Tiempo agotado. Intenta de nuevo.",

    // Footer
    footer_eyebrow: "Con cariño y gratitud",
    footer_made: "Hecho con amor para nuestros invitados"
  },

  en: {
    // Navbar
    nav_home: "Home",
    nav_moments: "Moments",
    nav_details: "FAQ",

    // Hero
    hero_eyebrow: "WE'RE GETTING MARRIED!",
    hero_date: "July 16, 2026",
    hero_venue: "Garden Vista Ballroom · Passaic, NJ",
    hero_instruction: "Scroll down for details",
    countdown_days: "Days",
    countdown_hours: "Hours",
    countdown_minutes: "Minutes",
    countdown_seconds: "Seconds",
    countdown_passed: "As of today, we are married!",

    // Album
    album_title: "Moments that brought us here",
    album_subtitle: "A day that changed our lives forever",
    caption_1: "The big question",
    caption_2: "She said yes!",
    caption_3: "You and me, always",
    caption_4: "Forever",
    caption_5: "With all my heart",
    caption_6: "My favorite place",

    // Details (FAQ)
    details_title: "Event Details",
    details_subtitle: "Everything you need to know",
    faq_q_arrival: "What time should I arrive?",
    faq_a_arrival: "4:30 PM · Ceremony starts promptly at 5:00 PM.",
    faq_q_parking: "Is there parking available?",
    faq_a_parking: "Yes, complimentary Valet Parking for all guests.",
    faq_q_kids: "Can I bring my children?",
    faq_a_kids: "Adults-only celebration.",
    faq_q_dresscode: "What is the dress code?",
    faq_a_dresscode: "Formal · Avoid white (bride) and olive green (wedding party).",
    faq_q_gifts: "Do you have a gift registry?",
    faq_a_gifts: "We'll have a card box (Lluvia de Sobres) on the day. You can also send a gift via Zelle: (973) 955-8525.",
    faq_q_seats: "How do assigned seats work?",
    faq_a_seats: "Each invitation has assigned seats. You'll see them when you RSVP.",

    // Locations
    loc_title: "How to Get There",
    loc_subtitle: "We are waiting for you at",
    loc_btn: "Open in Google Maps",

    // RSVP
    rsvp_title: "RSVP",
    rsvp_subtitle: "It will be a pleasure to share this special moment with you",
    rsvp_card_subtitle: "We hope to count on your presence",
    rsvp_card_text: "Have you reviewed all the event details? Make sure to read them before confirming your attendance.",
    rsvp_deadline: "Deadline: June 26th",
    rsvp_open_btn: "Open Form",
    rsvp_closed_heading: "The RSVP period has ended",
    rsvp_closed_body: "Although we won't be able to have you by our side on this special day, our hearts hold with deep gratitude every moment shared with you. Your love and presence in our lives are, and will always be, an invaluable gift.",
    rsvp_closed_signature: "With all our love,",

    // Closed page (full-page overlay)
    closed_body: "Thank you to everyone who was able to register — we are so excited to see you there. It's going to be a night we'll never forget!",
    closed_date_label: "Date",
    closed_date_value: "Thursday, July 16, 2026",
    closed_time_label: "Schedule",
    closed_time_value: "Arrival 4:30 PM",
    closed_time_sub: "Ceremony at 5:00 PM",
    closed_dress_label: "Dress Code",
    closed_dress_value: "Formal / Black Tie",
    closed_dress_sub: "Avoid white and olive green",
    closed_parking_label: "Parking",
    closed_parking_value: "Free Valet Parking",
    closed_kids_label: "Children's Policy",
    closed_kids_value: "Adults only",
    closed_kids_sub: "Adults-only celebration",
    closed_venue_address: "29 Macarthur Ave, Passaic, NJ 07055",

    // Modal Form
    modal_title: "Confirmation",
    modal_subtitle: "It will be a pleasure to have you",
    modal_deadline: "Please confirm before <strong>June 26th</strong>",
    form_name: "Your full name",
    form_companion: "Guest",
    form_name_placeholder: "e.g. Jane Doe",
    form_companion_placeholder: "Full name",
    form_attendance: "Will you attend?",
    form_yes: "Yes, I'll be there!",
    form_no: "Sorry, I can't make it",
    form_phone: "Mobile Phone (WhatsApp)",
    form_phone_placeholder: "e.g. +1 123 456 7890",
    form_message: "Message (Optional)",
    form_message_placeholder: "Send us your best wishes...",
    form_submit: "Send Confirmation",

    // Gate (name verification)
    gate_label: "Before you confirm",
    gate_instruction: "Type your name to verify your invitation",
    gate_placeholder: "e.g. Jane Doe",
    gate_btn: "Verify",
    gate_short: "Type at least two letters of your name.",
    gate_none: "We couldn't find your name on the list. Check the spelling or contact us.",
    gate_many: "Multiple matches found. Please type your full first and last name.",
    gate_hello: "Hi, {name}! You're on our list.",
    gate_confirmed: "Hi, {name}! We already have your RSVP.",

    // Song suggestion
    songs_title: "Help us build the playlist",
    songs_subtitle: "Which songs can't be missing?",
    songs_song_label: "Song name",
    songs_song_placeholder: "e.g. Praise",
    songs_artist_label: "Artist (Optional)",
    songs_artist_placeholder: "e.g. Elevation Worship",

    // Zelle
    zelle_label: "Gift · Zelle",
    zelle_copy: "Copy",
    zelle_copied: "Copied!",
    zelle_note: "If you'd like to give a gift, you can do so here.",

    // Validation
    form_sending: "Sending...",
    val_name: "Please enter your name.",
    val_phone: "Please enter your phone number.",
    val_checkbox: "Please confirm that you've read the event details.",
    val_rate_limit: "Please wait a few seconds before trying again.",

    // Form - details
    form_read_details: "I have read all event details (schedule, dress code, parking and children's policy)",

    // Success
    success_title: "Thank you!",
    success_subtitle: "Your RSVP has been received",
    success_text: "We are so happy to have you join us on this special day. See you on July 16th!",
    success_apple_cal: "Add to Apple Calendar",
    success_google_cal: "Add to Google Calendar",
    success_close: "Close Form",
    success_test: "(Testing: Send another response)",

    // Error
    error_default: "There was an error. Please try again",
    error_timeout: "Request timed out. Please try again.",

    // Footer
    footer_eyebrow: "With love and gratitude",
    footer_made: "Made with love for our guests"
  }
};

/** Función auxiliar: obtener una traducción por clave **/
function t(key) {
  return I18N[LANG]?.[key] ?? I18N.es[key] ?? key;
}

/** Aplicar traducciones a todos los elementos con data-i18n **/
function applyTranslations() {
  if (LANG === "es") return; // Español es el idioma base del HTML

  // Cambiar el atributo lang del <html>
  document.documentElement.lang = "en";

  // Traducir elementos estáticos con data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value) {
      // Soportar HTML en ciertas keys (como modal_deadline que tiene <strong>)
      if (value.includes("<")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }
  });

  // Traducir placeholders con data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = t(key);
    if (value) el.placeholder = value;
  });

  // Traducir aria-labels con data-i18n-aria
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    const value = t(key);
    if (value) el.setAttribute("aria-label", value);
  });
}

// Ejecutar traducciones al cargar
applyTranslations();

// Inicializar el botón de idioma
(function initLangToggle() {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;

  // Marcar la opción activa
  btn.querySelectorAll("[data-lang-opt]").forEach(el => {
    el.classList.toggle("is-active", el.dataset.langOpt === LANG);
  });

  btn.addEventListener("click", () => {
    const next = LANG === "es" ? "en" : "es";
    localStorage.setItem("lang", next);
    location.reload();
  });
})();
