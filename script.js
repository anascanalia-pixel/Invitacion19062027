document.addEventListener("DOMContentLoaded", () => {
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxK91ray7rRkj1OOr06ptvVMa5qf3QByRz_l5XJA6e3FI21HSbH7gwn-ot0lEgYpDdJ/exec";

  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

function showSlide(index) {
  if (index < 0 || index >= slides.length || index === currentSlide) return;

  const current = slides[currentSlide];
  const next = slides[index];

  current.classList.add("turning-out");

  setTimeout(() => {
    current.classList.remove("active", "turning-out");

    currentSlide = index;
    next.classList.add("active", "turning-in");

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      next.classList.remove("turning-in");
    }, 1050);
  }, 260);
}

  function showMessage(title, text) {
    const modal = document.getElementById("successModal");
    if (!modal) return;

    const h2 = modal.querySelector("h2");
    const p = modal.querySelector("p");

    if (h2) h2.textContent = title;
    if (p) p.textContent = text;

    modal.classList.add("show");
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function validateSlide5() {
    const nombre = getValue("nombre");
    const adultos = getValue("personas");
    const ninos = getValue("ninos");
    const numNinos = getValue("cuantosNinos");
    const alergias = getValue("alergias");
    const bus = getValue("bus");
    const contacto = getValue("contacto");

    if (!nombre) return false;
    if (!adultos) return false;
    if (!ninos) return false;
    if (ninos === "Sí" && !numNinos) return false;
    if (!alergias) return false;
    if (!bus) return false;
    if (!contacto) return false;

    return true;
  }

  /* NAVEGACIÓN */

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.id === "startButton") {
  event.preventDefault();

  if (!musicStartedOnce) {
    playMusic();
  }

  showSlide(1);
  return;
}

    if (target.classList.contains("back-button")) {
      event.preventDefault();
      showSlide(currentSlide - 1);
      return;
    }

    if (target.classList.contains("next")) {
      event.preventDefault();

      const activeSlide = document.querySelector(".slide.active");

      if (activeSlide && activeSlide.id === "slide5") {
        if (!validateSlide5()) {
          showMessage("Falta información", "Te ha faltado algún campo sin cumplimentar.");
          return;
        }
      }

      showSlide(currentSlide + 1);
    }
  });

  /* REFUERZO SLIDE 4 */

  const slide4Card = document.querySelector("#slide4 .slide-card");
  if (slide4Card) {
    slide4Card.addEventListener("click", () => {
      showSlide(4);
    });
  }

  /* SELECTS */

  document.querySelectorAll("#slide5 select").forEach((select) => {
    select.addEventListener("change", () => {
      select.classList.toggle("has-value", Boolean(select.value));
    });
  });

  /* NIÑOS */

  const kidsButtons = document.querySelectorAll("#slide5 .kids-btn");
  const kidsHidden = document.getElementById("ninos");
  const kidsCount = document.getElementById("cuantosNinos");

  kidsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      kidsButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const value = button.dataset.value;

      if (kidsHidden) kidsHidden.value = value;

      if (kidsCount) {
        if (value === "Sí") {
          kidsCount.disabled = false;
        } else {
          kidsCount.value = "";
          kidsCount.disabled = true;
        }
      }
    });
  });

  /* LÍMITE PALABRAS */

  function limitWords(element, maxWords) {
    const words = element.value.trim().split(/\s+/).filter(Boolean);
    if (words.length > maxWords) {
      element.value = words.slice(0, maxWords).join(" ");
    }
  }

  const nombreInput = document.getElementById("nombre");
  const contactoTextarea = document.getElementById("contacto");

  if (nombreInput) {
    nombreInput.addEventListener("input", () => limitWords(nombreInput, 20));
  }

  if (contactoTextarea) {
    contactoTextarea.addEventListener("input", () => limitWords(contactoTextarea, 100));
  }

  /* RECUPERAR RESPUESTA GUARDADA */

function cargarRespuestaGuardada() {
  const respuesta = localStorage.getItem("respuestaBoda");

  if (!respuesta) return;

  const data = JSON.parse(respuesta);

  if (data.nombre) document.getElementById("nombre").value = data.nombre;
  if (data.adultos) document.getElementById("personas").value = data.adultos;
  if (data.ninos) document.getElementById("ninos").value = data.ninos;
  if (data.numNinos) document.getElementById("cuantosNinos").value = data.numNinos;
  if (data.alergias) document.getElementById("alergias").value = data.alergias;
  if (data.bus) document.getElementById("bus").value = data.bus;
  if (data.contacto) document.getElementById("contacto").value = data.contacto;

  kidsButtons.forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");

    if (btn.dataset.value === data.ninos) {
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
    }
  });

  if (data.ninos === "Sí") {
    kidsCount.disabled = false;
  } else {
    kidsCount.disabled = true;
    kidsCount.value = "";
  }

  document.querySelectorAll("#slide5 select").forEach((select) => {
    select.classList.toggle("has-value", Boolean(select.value));
  });
}

cargarRespuestaGuardada();

  /* CÓMO LLEGAR */

  const mapButton = document.getElementById("mapButton");
  if (mapButton) {
    mapButton.addEventListener("click", () => {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=AS-381%2C%20km%203%2C15%2C%2033192%20Pruvia%20de%20Abajo%2C%20Asturias",
        "_blank"
      );
    });
  }

  /* CALENDARIO */

  const calendarButton = document.getElementById("calendarButton");
  if (calendarButton) {
    calendarButton.addEventListener("click", () => {
      const url =
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        "&text=Boda%20Ana%20y%20Miguel" +
        "&dates=20270619T160000Z/20270620T013000Z" +
        "&details=Restaurante%20La%20Campana%20%28Pruvia%29%20-%20Salon%206" +
        "&location=AS-381%2C%20km%203%2C15%2C%2033192%20Pruvia%20de%20Abajo%2C%20Asturias";

      window.open(url, "_blank");
    });
  }

  /* CUENTA ATRÁS */

  function updateCountdown() {
    const target = new Date("2027-06-19T18:00:00+02:00");
    const diff = target - new Date();
    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    if (diff <= 0) {
      countdown.innerHTML = "¡Hoy!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdown.innerHTML =
      `${days} días<br>` +
      `${String(hours).padStart(2, "0")}h · ${String(minutes).padStart(2, "0")}m · ${String(seconds).padStart(2, "0")}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

/* MÚSICA */

const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

let musicFadeInterval = null;
let musicIsPlaying = false;
let musicStartedOnce = false;

function fadeAudio(targetVolume, duration, callback) {
  if (!bgMusic) return;

  clearInterval(musicFadeInterval);

  const steps = 30;
  const startVolume = bgMusic.volume;
  const volumeChange = targetVolume - startVolume;
  let currentStep = 0;

  musicFadeInterval = setInterval(() => {
    currentStep++;

    const progress = currentStep / steps;
    bgMusic.volume = Math.max(
      0,
      Math.min(1, startVolume + volumeChange * progress)
    );

    if (currentStep >= steps) {
      clearInterval(musicFadeInterval);
      bgMusic.volume = targetVolume;
      if (callback) callback();
    }
  }, duration / steps);
}

async function playMusic() {
  if (!bgMusic || !musicToggle) return;

  try {
    bgMusic.volume = 0;
    await bgMusic.play();

    musicIsPlaying = true;
    musicStartedOnce = true;
    musicToggle.classList.add("playing");
    musicToggle.innerHTML = "🎼";
    musicToggle.setAttribute("aria-label", "Apagar música");

    fadeAudio(0.15, 3000);
  } catch {
    showMessage("Música", "Pulsa el icono de música para activarla.");
  }
}

function stopMusic() {
  if (!bgMusic || !musicToggle) return;

  fadeAudio(0, 2000, () => {
    bgMusic.pause();
    musicIsPlaying = false;
    musicToggle.classList.remove("playing");
    musicToggle.innerHTML = "🎼";
    musicToggle.setAttribute("aria-label", "Activar música");
  });
}

if (musicToggle && bgMusic) {
  bgMusic.volume = 0;

  musicToggle.addEventListener("click", () => {
    if (musicIsPlaying) {
      stopMusic();
    } else {
      playMusic();
    }
  });
}

  /* ENVIAR RESPUESTA */

  const sendButton = document.getElementById("send");

  if (sendButton) {
    sendButton.addEventListener("click", async () => {
      if (!validateSlide5()) {
        showSlide(4);
        showMessage("Falta información", "Te ha faltado algún campo sin cumplimentar.");
        return;
      }

      const idGuardado =
        localStorage.getItem("idInvitado") ||
        (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));

      const data = {
        idInvitado: idGuardado,
        nombre: getValue("nombre"),
        adultos: getValue("personas"),
        ninos: getValue("ninos"),
        numNinos: getValue("cuantosNinos"),
        alergias: getValue("alergias"),
        bus: getValue("bus"),
        contacto: getValue("contacto")
      };

      try {
        sendButton.disabled = true;

        await fetch(WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        localStorage.setItem("idInvitado", idGuardado);
        localStorage.setItem("respuestaBoda", JSON.stringify(data));

        showMessage("¡Gracias!", "Tu respuesta se ha enviado.");
      } catch {
        showMessage("Error", "No se ha podido enviar la respuesta. Inténtalo de nuevo.");
      } finally {
        sendButton.disabled = false;
      }
    });
  }

  /* CERRAR MODAL */

  const successModal = document.getElementById("successModal");
  const closeSuccess = document.getElementById("closeSuccess");

  if (successModal && closeSuccess) {
    closeSuccess.addEventListener("click", () => {
      successModal.classList.remove("show");
    });

    successModal.addEventListener("click", (event) => {
      if (event.target === successModal) {
        successModal.classList.remove("show");
      }
    });
  }
  /* VISOR ZOOM DIAPOSITIVAS */

const zoomButton = document.getElementById("zoomButton");
const zoomModal = document.getElementById("zoomModal");
const zoomImage = document.getElementById("zoomImage");
const closeZoom = document.getElementById("closeZoom");

if (zoomButton && zoomModal && zoomImage && closeZoom) {
  zoomButton.addEventListener("click", () => {
    const slideNumber = currentSlide + 1;
    zoomImage.src = `img/slide${slideNumber}.png`;
    zoomModal.classList.add("show");
  });

  closeZoom.addEventListener("click", () => {
    zoomModal.classList.remove("show");
    zoomImage.src = "";
  });
}
});