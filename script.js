document.addEventListener("DOMContentLoaded", () => {
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxK91ray7rRkj1OOr06ptvVMa5qf3QByRz_l5XJA6e3FI21HSbH7gwn-ot0lEgYpDdJ/exec";

  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    if (index < 0 || index >= slides.length) return;

    slides[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const startButton = document.getElementById("startButton");

  if (startButton) {
    startButton.addEventListener("click", () => {
      showSlide(1);
    });
  }

  document.querySelectorAll(".next").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const slideActiva = document.querySelector(".slide.active");

      if (slideActiva && slideActiva.id === "slide5") {
        if (!validarFormulario()) {
          alert("Te has dejado algún campo sin cumplimentar.");
          return;
        }
      }

      showSlide(currentSlide + 1);
    });
  });

  document.querySelectorAll(".back-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showSlide(currentSlide - 1);
    });
  });

  const slide4Card = document.querySelector("#slide4 .slide-card");

  if (slide4Card) {
    slide4Card.addEventListener("click", () => {
      showSlide(4);
    });
  }

  document.querySelectorAll("#slide5 select").forEach((select) => {
    select.classList.toggle("has-value", Boolean(select.value));

    select.addEventListener("change", () => {
      select.classList.toggle("has-value", Boolean(select.value));
    });
  });

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

      if (kidsHidden) {
        kidsHidden.value = value;
      }

      if (kidsCount) {
        if (value === "Sí") {
          kidsCount.disabled = false;
        } else {
          kidsCount.value = "";
          kidsCount.classList.remove("has-value");
          kidsCount.disabled = true;
        }
      }
    });
  });

  function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const adultos = document.getElementById("personas").value;
    const ninos = document.getElementById("ninos").value;
    const numNinos = document.getElementById("cuantosNinos").value;
    const alergias = document.getElementById("alergias").value.trim();
    const bus = document.getElementById("bus").value;
    const contacto = document.getElementById("contacto").value.trim();

    if (!nombre || !adultos || !ninos || !alergias || !bus || !contacto) {
      return false;
    }

    if (ninos === "Sí" && !numNinos) {
      return false;
    }

    return true;
  }

  function limitWords(element, maxWords) {
    const words = element.value.trim().split(/\s+/).filter(Boolean);

    if (words.length > maxWords) {
      element.value = words.slice(0, maxWords).join(" ");
    }
  }

  const nombreInput = document.getElementById("nombre");
  const contactoTextarea = document.getElementById("contacto");

  if (nombreInput) {
    nombreInput.addEventListener("input", () => {
      limitWords(nombreInput, 20);
    });
  }

  if (contactoTextarea) {
    contactoTextarea.addEventListener("input", () => {
      limitWords(contactoTextarea, 100);
    });
  }

  const nombreVisual = document.getElementById("nombreVisual");
  const nombreHidden = document.getElementById("nombre");

  if (nombreVisual && nombreHidden) {
    nombreVisual.addEventListener("input", () => {
      nombreHidden.value = nombreVisual.textContent.trim();
    });
  }

  const mapButton = document.getElementById("mapButton");

  if (mapButton) {
    mapButton.addEventListener("click", () => {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=AS-381%2C%20km%203%2C15%2C%2033192%20Pruvia%20de%20Abajo%2C%20Asturias",
        "_blank"
      );
    });
  }

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

  function updateCountdown() {
    const target = new Date("2027-06-19T18:00:00+02:00");
    const now = new Date();
    const diff = target - now;
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

  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", async () => {
      if (bgMusic.paused) {
        try {
          await bgMusic.play();
          musicToggle.textContent = "Ⅱ";
        } catch {
          alert("La música se activará cuando añadamos el archivo de audio.");
        }
      } else {
        bgMusic.pause();
        musicToggle.textContent = "♪";
      }
    });
  }

  const sendButton = document.getElementById("send");

  if (sendButton) {
    sendButton.addEventListener("click", async () => {
      const nombre = document.getElementById("nombre").value.trim();

      if (!validarFormulario()) {
        showSlide(4);
        alert("Te has dejado algún campo sin cumplimentar.");
        return;
      }

      const idGuardado =
        localStorage.getItem("idInvitado") ||
        (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));

      const data = {
        idInvitado: idGuardado,
        nombre: nombre,
        adultos: document.getElementById("personas").value,
        ninos: document.getElementById("ninos").value,
        numNinos: document.getElementById("cuantosNinos").value,
        alergias: document.getElementById("alergias").value,
        bus: document.getElementById("bus").value,
        contacto: document.getElementById("contacto").value
      };

      try {
        sendButton.disabled = true;

        await fetch(WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        localStorage.setItem("idInvitado", idGuardado);
        localStorage.setItem("respuestaBoda", JSON.stringify(data));

        document.getElementById("successModal").classList.add("show");

      } catch (error) {
        alert("No se ha podido enviar la respuesta. Inténtalo de nuevo.");
      } finally {
        sendButton.disabled = false;
      }
    });
  }

  const successModal = document.getElementById("successModal");
  const closeSuccess = document.getElementById("closeSuccess");

  if (closeSuccess && successModal) {
    closeSuccess.addEventListener("click", () => {
      successModal.classList.remove("show");
    });

    successModal.addEventListener("click", (event) => {
      if (event.target === successModal) {
        successModal.classList.remove("show");
      }
    });
  }
});