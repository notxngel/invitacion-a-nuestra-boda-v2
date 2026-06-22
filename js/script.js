/** 0. CONFIGURACIÓN: Fecha y Elementos Base **/

// Fecha de la boda: 16 de Julio de 2026 (todo el día en general)
const weddingDate = new Date("2026-07-16T00:00:00");

// Elementos del contador cacheados para rendimiento
const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  container: document.getElementById("countdown")
};

/**
 * Verifica si el usuario ya envió su confirmación al cargar la página.
 * Si es así, actualiza la tarjeta de RSVP para reflejar que ya está confirmado.
 */
function checkRSVPStatus() {
    if (localStorage.getItem('rsvpStatus') === 'sent') {
        const rsvpCard = document.querySelector('.rsvp__card');
        const rsvpBtn = document.querySelector('.rsvp__card-btn');
        const rsvpText = document.querySelector('.rsvp__card-text');

        if (rsvpBtn) {
            rsvpBtn.innerHTML = `<span>${t("success_title")}</span>`;
        }
        if (rsvpText) {
            rsvpText.innerHTML = `<strong>${t("success_subtitle")}</strong><br>${t("success_text")}`;
        }
    }
}

/**
 * Si las confirmaciones están cerradas (CONFIG.rsvpClosed), reemplaza la
 * tarjeta de RSVP por un mensaje de cierre y elimina el botón para abrir
 * el formulario. Nadie puede confirmar mientras esté activo.
 */
function applyRsvpClosedState() {
  if (!CONFIG.rsvpClosed) return;
  const card = document.querySelector('.rsvp__card');
  if (!card) return;

  card.classList.add('rsvp__card--closed');
  card.innerHTML = `
    <div class="rsvp__card-accent" aria-hidden="true"></div>
    <div class="rsvp__card-icon rsvp__card-icon--closed" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    </div>
    <h3 class="rsvp__card-subtitle">${t("rsvp_closed_heading")}</h3>
    <div class="rsvp__card-divider" aria-hidden="true"></div>
    <p class="rsvp__card-text rsvp__card-text--closed">${t("rsvp_closed_body")}</p>
    <p class="rsvp__card-signature">${t("rsvp_closed_signature")}<br><em>Angel &amp; Clara</em></p>
  `;
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', () => {
  applyRsvpClosedState();
  if (!CONFIG.rsvpClosed) checkRSVPStatus();
});

/** ZELLE: Poblar número desde config e inicializar copiado **/
function initZelle() {
  const el = document.getElementById("zelleDisplay");
  if (el) el.textContent = CONFIG.zellePhone;
}

function copyZelle() {
  const copySpan = document.querySelector(".modal__zelle-copy span[data-i18n]");

  const onSuccess = () => {
    if (copySpan) {
      copySpan.textContent = t("zelle_copied");
      setTimeout(() => { copySpan.textContent = t("zelle_copy"); }, 2000);
    }
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(CONFIG.zellePhone).then(onSuccess).catch(() => {});
  } else {
    const tmp = document.createElement("input");
    tmp.value = CONFIG.zellePhone;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
    onSuccess();
  }
}

initZelle();

/**
 * Actualiza el contador de la cuenta regresiva en el DOM.
 * Calcula la diferencia entre la fecha de la boda y el momento actual.
 * Si la fecha ya pasó, muestra un mensaje de felicitación.
 * 
 * @returns {void}
 */
function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference > 0) {
    // Calcular tiempo
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    countdownElements.days?.replaceChildren(document.createTextNode(String(days)));
    countdownElements.hours?.replaceChildren(document.createTextNode(String(hours)));
    countdownElements.minutes?.replaceChildren(document.createTextNode(String(minutes)));
    countdownElements.seconds?.replaceChildren(document.createTextNode(String(seconds)));
  } else {
    // Si la fecha ya pasó
    if (countdownElements.container) {
        countdownElements.container.innerHTML = `
        <div style="font-family: var(--font-serif); font-size: 1.6rem; letter-spacing: 0.1em; color: var(--color-gold); font-style: italic; text-transform:none;">
            ${t("countdown_passed")}
        </div>
        `;
    }
  }
}

// Ejecutar al cargar la página (para que no haya retraso de 1 segundo)
updateCountdown();

// Repetir cada 1000ms (1 segundo)
setInterval(updateCountdown, 1000);

/** 1. CARRUSEL: Lógica de navegación del álbum **/
(function initCarousel() {
  const track = document.getElementById("albumTrack");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  
  if (!track || !btnPrev || !btnNext) return;

  // Obtener la cantidad a desplazar (una polaroid + el gap)
  const getScrollAmount = () => {
    const polaroid = track.querySelector(".polaroid");
    if (!polaroid) return 0;
    // Asumimos un gap de 2rem (~32px) configurado en css
    return polaroid.offsetWidth + 32; 
  };

  btnPrev.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  btnNext.addEventListener("click", () => {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
})();

/** 2. ANIMACIONES: Intersection Observer para Timeline **/
(function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Animamos solo una vez al entrar
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
  });
})();

/** 3. NAVBAR: Lógica de visibilidad al hacer scroll **/
(function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const heroSection = document.getElementById("home");

  if (!navbar || !heroSection) return;

  let isTicking = false;

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroBottom = heroSection.offsetHeight - 80; // Margen para que sea fluido
        
        if (scrollY >= heroBottom) {
          // Aparece al salir del hero
          navbar.classList.add("is-visible");
        } else if (scrollY < 100) {
          // Se oculta solo al regresar completamente arriba
          navbar.classList.remove("is-visible");
          navbar.classList.remove("is-open");
          const menuBtn = document.querySelector('.navbar__menu-btn');
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
        isTicking = false;
      });
      isTicking = true;
    }
  });
})();

/** 3.5 NAVBAR: Lógica de Menú Desplegable **/
(function initNavbarDropdown() {
  const navbar = document.querySelector(".navbar");
  const menuBtn = document.querySelector(".navbar__menu-btn");
  const links = document.querySelectorAll(".navbar__link");

  if (!menuBtn || !navbar) return;

  menuBtn.addEventListener("click", () => {
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", !isExpanded);
    navbar.classList.toggle("is-open");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      navbar.classList.remove("is-open");
    });
  });
})();

/** 4. MODAL: Apertura y cierre del RSVP **/

/**
 * Abre el modal de confirmación (RSVP).
 * Bloquea el scroll del fondo y muestra un mensaje de éxito si ya se envió previamente.
 * 
 * @example
 * openRSVP();
 * 
 * @returns {void}
 */
function openRSVP() {
  // Confirmaciones cerradas: no abrir el formulario bajo ninguna circunstancia.
  if (CONFIG.rsvpClosed) return;

  const modal = document.getElementById("rsvpModal");
  if (modal) {
    // Verificamos si el usuario ya envió su confirmación antes
    if (localStorage.getItem('rsvpStatus') === 'sent') {
        mostrarExito();
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Evitar scroll de fondo
  }
}

/**
 * Cierra el modal de confirmación (RSVP).
 * 
 * @param {MouseEvent|null} e - El evento de click (opcional).
 * @returns {void}
 */
function closeRSVP(e) {
  // Si se llama directamente (botón X) o si el evento es click en overlay
  if (!e || e.target.id === "rsvpModal" || e.target.closest(".modal__close")) {
    const modal = document.getElementById("rsvpModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = ""; // Restaurar scroll
    }
  }
}

// Permitir cerrar con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRSVP();
});

/** 5. CUPOS: Generación dinámica de campos de invitados **/

function generarCamposDeNombres(cuposArg) {
  const params = new URLSearchParams(window.location.search);
  // Cupos: mínimo 1, máximo 4. Prioridad: argumento (cupos del invitado) > ?c= > 1.
  const base = cuposArg ?? parseInt(params.get("c"));
  const cupos = Math.min(Math.max(parseInt(base) || 1, 1), CONFIG.maxCupos);

  const container = document.getElementById("guestNamesContainer");
  if (!container) return;

  let html = "";
  for (let i = 1; i <= cupos; i++) {
    const label = i === 1 ? t("form_name") : `${t("form_companion")} ${i - 1}`;
    const placeholder = i === 1 ? t("form_name_placeholder") : t("form_companion_placeholder");
    const required = i === 1 ? "required" : "";
    html += `
            <div class="form__group">
                <label class="form__label" for="guest${i}">${label}</label>
                <input
                    class="form__input"
                    type="text"
                    id="guest${i}"
                    name="guest${i}"
                    placeholder="${placeholder}"
                    ${required}
                    autocomplete="off"
                >
                <span class="form__error" id="error-guest${i}"></span>
            </div>`;
  }
  container.innerHTML = html;
}

// Generación inicial (usa ?c= o 1). El gate la regenera con los cupos del invitado.
generarCamposDeNombres();

/** 6. VALIDACIÓN: Feedback visual inmediato en campos **/

// Función reutilizable para marcar un campo como inválido
/**
 * Marca un elemento de entrada como inválido y muestra un mensaje de error.
 * 
 * @param {HTMLInputElement} inputElement - El elemento del DOM a marcar.
 * @param {string} message - El mensaje de error a mostrar.
 * @returns {void}
 */
function setInvalid(inputElement, message) {
  const errorSpan = document.getElementById(`error-${inputElement.id}`);
  inputElement.classList.add("is-invalid");
  if (errorSpan) {
    // Usamos un ícono SVG de advertencia pequeñito junto al mensaje
    errorSpan.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            ${message}
        `;
    errorSpan.classList.add("active");
  }
}

// Función reutilizable para limpiar los errores de un campo
/**
 * Limpia el estado de error de un elemento de entrada.
 * 
 * @param {HTMLInputElement} inputElement - El elemento del DOM a limpiar.
 * @returns {void}
 */
function clearInvalid(inputElement) {
  const errorSpan = document.getElementById(`error-${inputElement.id}`);
  inputElement.classList.remove("is-invalid");
  if (errorSpan) {
    errorSpan.classList.remove("active");
    errorSpan.innerHTML = "";
  }
}

// Configurar los event listeners ("Los espías") a los campos
function setupValidationListeners() {
  const inputs = document.querySelectorAll(".form__input[required]");

  inputs.forEach((input) => {
    // Evento 'blur': se dispara cuando el usuario sale (pierde el foco) del campo
    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        const msg = input.id === "phone" ? t("val_phone") : t("val_name");
        setInvalid(input, msg);
      }
    });

    // Evento 'input': se dispara en tiempo real mientras el usuario escribe
    input.addEventListener("input", () => {
      // Si el usuario empieza a escribir, quitamos el error inmediatamente
      if (input.value.trim() !== "" && input.classList.contains("is-invalid")) {
        clearInvalid(input);
      }
    });
  });
}

// Escuchar cambio en checkbox para limpiar error en tiempo real
function setupCheckboxListener() {
  const readCheckbox = document.getElementById("readDetails");
  if (!readCheckbox) return;
  readCheckbox.addEventListener("change", () => {
    if (readCheckbox.checked) {
      const errorSpan = document.getElementById("error-readDetails");
      if (errorSpan) {
        errorSpan.classList.remove("active");
        errorSpan.innerHTML = "";
      }
    }
  });
}

setupValidationListeners();
setupCheckboxListener();

/** 7. FORMULARIO: Procesamiento y envío de datos (Make/Notion) **/

// La URL del webhook se lee desde config.js (CONFIG.webhookURL)

// Seleccionamos el formulario del HTML
const rsvpForm = document.getElementById("rsvpForm");

// --- Funciones Auxiliares para el Submit ---
let _lastSubmit = 0;

function isSafeToSubmit() {
  // Evitar doble envío si ya se marcó como enviado
  if (localStorage.getItem('rsvpStatus') === 'sent') {
    mostrarExito();
    return false;
  }

  // Rate limiting extraido
  const now = Date.now();
  if (now - _lastSubmit < CONFIG.rateLimitMs) {
    mostrarError(t("val_rate_limit"));
    return false;
  }

  // Honeypot extraido
  const honeypot = document.getElementById("website");
  if (honeypot && honeypot.value !== "") {
    mostrarExito(); // Simular éxito para bots
    return false;
  }
  return true;
}

/**
 * Valida todos los campos obligatorios del formulario RSVP.
 * Enfoca el primer campo inválido si se encuentran errores.
 * 
 * @returns {boolean} True si el formulario es válido, False en caso contrario.
 */
function handleValidation() {
  const requiredInputs = Array.from(document.querySelectorAll(".form__input[required]"));
  let isValid = true;
  let firstInvalidInput = null;

  requiredInputs.forEach((input) => {
    if (input.value.trim() === "") {
      const msg = input.id === "phone" ? t("val_phone") : t("val_name");
      setInvalid(input, msg);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = input;
    }
  });

  // Validar checkbox de lectura obligatoria
  const readCheckbox = document.getElementById("readDetails");
  if (readCheckbox && !readCheckbox.checked) {
    const errorSpan = document.getElementById("error-readDetails");
    if (errorSpan) {
      errorSpan.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        ${t("val_checkbox")}
      `;
      errorSpan.classList.add("active");
    }
    isValid = false;
    if (!firstInvalidInput) firstInvalidInput = readCheckbox;
  }

  if (!isValid) {
    firstInvalidInput.focus();
    firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return isValid;
}

/**
 * Cambia el estado del botón de envío durante el proceso de procesamiento.
 * Muestra u oculta un spinner y deshabilita/habilita el botón.
 * 
 * @param {boolean} isSubmitting - Indica si se está enviando el formulario.
 * @returns {void}
 */
function toggleSubmitState(isSubmitting) {
  const submitBtn = document.getElementById("submitBtn");
  if (!submitBtn) return;

  if (isSubmitting) {
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.innerHTML = `<span class="spinner"></span> ${t("form_sending")}`;
    submitBtn.disabled = true;
    submitBtn.classList.remove('is-error');
  } else {
    if (!submitBtn.classList.contains('is-error')) {
      submitBtn.innerHTML = submitBtn.dataset.originalText || t("form_submit");
    }
    submitBtn.disabled = false;
  }
}

/**
 * Extrae los datos de los invitados y el formulario para su envío.
 * Organiza los nombres de acompañantes y el mensaje en un objeto estructurado.
 * 
 * @returns {Object} Un objeto con los campos: Nombre, Telefono, Invitados, Asistencia, Mensaje.
 */
function extractGuestData() {
  const nameInput = document.getElementById("guest1");
  const titular = nameInput ? nameInput.value.trim() : "";

  const inputs = Array.from(document.querySelectorAll('input[id^="guest"]'));
  const todosLosNombres = inputs
    .map((input) => input.value.trim())
    .filter((val) => val !== "");

  const acompanantes = todosLosNombres.filter((val) => val !== titular && val !== "");

  const formData = new FormData(rsvpForm);
  const mensajeUsuario = formData.get("message") || "";
  const telefono = formData.get("phone") || "";
  const cancion = formData.get("songName") || "";
  const artista = formData.get("songArtist") || "";

  const data = {
    nombre: titular,
    title: titular,
    telefono: telefono,
    invitados: todosLosNombres.length,
    asistencia: formData.get("attendance"),
    token: CONFIG.securityToken,
    mensaje: acompanantes.length > 0
        ? `Acompañantes: ${acompanantes.join(", ")}${mensajeUsuario ? "\n\nMensaje: " + mensajeUsuario : ""}`
        : mensajeUsuario,
  };

  // Solo incluir canción si el invitado llenó el campo
  if (cancion) {
    data.cancion = cancion;
    data.artista = artista;
  }

  return data;
}

/**
 * Envía los datos del RSVP al webhook de Make.com.
 * Maneja el estado de éxito y error, y almacena el estado en localStorage.
 * 
 * @param {Object} data - Los datos extraídos del formulario.
 * @returns {Promise<void>}
 */
async function sendDataToMake(data) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.fetchTimeoutMs);

  try {
    const response = await fetch(CONFIG.webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (response.ok) {
      localStorage.setItem('rsvpStatus', 'sent');
      _lastSubmit = Date.now();
      mostrarExito();
    } else {
      throw new Error(`Error del servidor: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al enviar:", error);
    if (error.name === 'AbortError') {
      mostrarError(t("error_timeout"));
    } else {
      mostrarError();
    }
  }
}

// Escuchamos el evento 'submit' refactorizado
rsvpForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isSafeToSubmit()) return;
  if (!handleValidation()) return;

  toggleSubmitState(true);
  
  const guestData = extractGuestData();
  await sendDataToMake(guestData);
  
  // Limpia el botón si no fue éxito
  if (localStorage.getItem('rsvpStatus') !== 'sent') {
    toggleSubmitState(false);
  }
});

/** 8. FEEDBACK: Mensajes de éxito, error y cierre **/

/**
 * Muestra el mensaje de éxito en el modal tras un envío exitoso.
 * Genera botones dinámicos para añadir el evento al calendario según el dispositivo.
 * 
 * @returns {void}
 */
function mostrarExito() {
  const modalContent = document.querySelector(".modal__content");

  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('dbg') === CONFIG.adminKey;

  const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent || navigator.vendor);

  const calendarBtn = isApple
    ? `<a href="boda.ics" class="btn btn--apple-cal">${t("success_apple_cal")}</a>`
    : `<a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Angel+y+Clara&dates=20260716T210000Z/20260717T050000Z&details=%C2%A1Te+esperamos+para+celebrar+nuestra+boda!&location=Garden+Vista+Ballroom,+29+Macarthur+Ave,+Passaic,+NJ+07055" target="_blank" rel="noopener" class="btn btn--google-cal">${t("success_google_cal")}</a>`;

  modalContent.innerHTML = `
    <div class="modal__success">
      <div class="modal__success-icon" aria-hidden="true">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="8 12 11 15 16 9"/>
        </svg>
      </div>
      <h2 class="modal__success-title">${t("success_title")}</h2>
      <p class="modal__success-subtitle">${t("success_subtitle")}</p>
      <p class="modal__success-text">${t("success_text")}</p>
      <div class="modal__success-cal">${calendarBtn}</div>
      <div class="modal__success-zelle modal__zelle">
        <p class="modal__zelle-label">${t("zelle_label")}</p>
        <div class="modal__zelle-card">
          <span class="modal__zelle-number">${CONFIG.zellePhone}</span>
          <button class="modal__zelle-copy" type="button" onclick="copyZelle()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span data-i18n="zelle_copy">${t("zelle_copy")}</span>
          </button>
        </div>
        <p class="modal__zelle-note">${t("zelle_note")}</p>
      </div>
      <button class="modal__success-close" onclick="cerrarYReiniciar()">${t("success_close")}</button>
      ${isAdmin ? `<button class="modal__success-debug" onclick="localStorage.removeItem('rsvpStatus'); location.reload();">${t("success_test")}</button>` : ''}
    </div>
  `;
}

/**
 * Muestra un mensaje de error visual en el botón de envío.
 * 
 * @param {string} [mensaje="Hubo un error. Intenta de nuevo"] - El mensaje de error a mostrar.
 * @returns {void}
 */
function mostrarError(mensaje = t("error_default")) {
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.textContent = mensaje;
    submitBtn.disabled = false;
    submitBtn.classList.add('is-error');
  }
}

// Cierra el modal y restaura el formulario a su estado original
/**
 * Cierra el modal de éxito y recarga la página para resetear el estado.
 * 
 * @returns {void}
 */
function cerrarYReiniciar() {
  closeRSVP();

  // Esperamos a que termine la animación de cierre antes de restaurar
  setTimeout(() => {
    rsvpForm?.reset(); // Limpia los campos del formulario
    location.reload(); // Recarga para restaurar el modal limpio
  }, 400);
}

/** 9. CUSTOM CURSOR: Cursor personalizado e interactivo **/
(function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const interactives = document.querySelectorAll('a, button, input, textarea');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();

/** 10. GATE: Verificación de invitado por nombre **/
(function initGuestGate() {
  const gate = document.getElementById("rsvpGate");
  const input = document.getElementById("gateInput");
  const btn = document.getElementById("gateBtn");
  const result = document.getElementById("gateResult");
  const greeting = document.getElementById("gateGreeting");
  const form = document.getElementById("rsvpForm");
  const zelle = document.querySelector(".modal__zelle");

  if (!gate || !input || !btn || !form) return;

  // Normaliza texto: minúsculas, sin acentos, espacios colapsados.
  const normalize = (s) => (s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Convierte cada entrada de la lista a { nombre, cupos }.
  const asEntry = (g) =>
    typeof g === "string"
      ? { nombre: g, cupos: 1 }
      : { nombre: g.nombre, cupos: g.cupos || 1 };

  /**
   * Busca el nombre escrito dentro de GUEST_LIST.
   * Coincide por nombre/apellido (subcadena) o por iniciales (ej: "ll").
   * Devuelve el estado: short | none | many | ok.
   */
  function buscarInvitado(query) {
    const q = normalize(query);
    if (q.length < 2) return { status: "short" };

    const qIniciales = q.replace(/[^a-z0-9]/g, "");
    const lista = typeof GUEST_LIST !== "undefined" ? GUEST_LIST : [];
    const matches = lista.map(asEntry).filter((entry) => {
      const n = normalize(entry.nombre);
      if (n.includes(q)) return true; // subcadena: "lauren", "labarrere"...
      const iniciales = n.split(" ").filter(Boolean).map((w) => w[0]).join("");
      return iniciales === qIniciales; // iniciales: "ll" -> Lauren Labarrere
    });

    if (matches.length === 0) return { status: "none" };
    if (matches.length > 1) return { status: "many" };
    return { status: "ok", entry: matches[0] };
  }

  function showResult(message, type) {
    result.textContent = message || "";
    result.className = "rsvp-gate__result" + (type ? " is-" + type : "");
  }

  function verificar() {
    const res = buscarInvitado(input.value);

    if (res.status === "short") return showResult(t("gate_short"), "error");
    if (res.status === "none") return showResult(t("gate_none"), "error");
    if (res.status === "many") return showResult(t("gate_many"), "error");

    // Coincidencia única: desbloquear el formulario.
    showResult("", "");
    gate.style.display = "none";
    if (zelle) zelle.style.display = "";
    form.style.display = "";

    // Regenerar campos con los cupos del invitado y pre-llenar su nombre.
    generarCamposDeNombres(res.entry.cupos);
    setupValidationListeners();
    const guest1 = document.getElementById("guest1");
    if (guest1) guest1.value = res.entry.nombre;

    if (greeting) {
      greeting.textContent = t("gate_hello").replace("{name}", res.entry.nombre);
      greeting.style.display = "";
    }

    // Llevar la vista al inicio del formulario.
    greeting?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  btn.addEventListener("click", verificar);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verificar();
    }
  });
  // Limpiar el mensaje en cuanto el invitado vuelve a escribir.
  input.addEventListener("input", () => {
    if (result.textContent) showResult("", "");
  });
})();

