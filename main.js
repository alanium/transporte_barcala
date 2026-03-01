const PHONE_NUMBER = "5491128233925";

const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");
const quoteForm = document.getElementById("quoteForm");
const yearTarget = document.getElementById("year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && mainMenu) {
  const closeMenu = () => {
    mainMenu.classList.remove("is-open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!mainMenu.classList.contains("is-open")) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && !mainMenu.contains(target) && !menuToggle.contains(target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const origin = String(formData.get("origin") || "").trim();
    const destination = String(formData.get("destination") || "").trim();
    const details = String(formData.get("details") || "").trim();

    if (!name || !origin || !destination) {
      alert("Por favor completa tu nombre, origen y destino.");
      return;
    }

    let message = `Hola, soy ${name}. Quiero pedir cotización para una mudanza/flete. `;
    message += `Origen: ${origin}. Destino: ${destination}.`;

    if (phone) {
      message += ` Teléfono: ${phone}.`;
    }

    if (details) {
      message += ` Detalles: ${details}.`;
    }

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const fleetItems = document.querySelectorAll(".fleet-item");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  }, observerOptions);

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    card.style.animationPlayState = "paused";
    cardObserver.observe(card);
  });

  fleetItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    item.style.animationPlayState = "paused";
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 150);
  });

  const scheduleItems = document.querySelectorAll(".schedule-item");
  scheduleItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "all 0.5s ease";
    item.style.animationPlayState = "paused";
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, 400 + index * 200);
  });

  const infoCards = document.querySelectorAll(".info-card");
  infoCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateX(-20px)";
    card.style.transition = "all 0.5s ease";
    card.style.animationPlayState = "paused";
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateX(0)";
    }, 600 + index * 200);
  });

  const panels = document.querySelectorAll(".panel");
  panels.forEach((panel, index) => {
    panel.style.opacity = "0";
    panel.style.transform = "scale(0.95)";
    panel.style.transition = "all 0.6s ease";
    panel.style.animationPlayState = "paused";
    setTimeout(() => {
      panel.style.opacity = "1";
      panel.style.transform = "scale(1)";
    }, 200 + index * 150);
  });
});

const sections = document.querySelectorAll("section");
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

sections.forEach(section => {
  section.style.animationPlayState = "paused";
  sectionObserver.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const logoText = document.querySelector(".logo-text");
  if (logoText) {
    logoText.style.opacity = "0";
    logoText.style.transform = "translateY(10px)";
    logoText.style.transition = "all 0.6s ease";
    setTimeout(() => {
      logoText.style.opacity = "1";
      logoText.style.transform = "translateY(0)";
    }, 300);
  }
});

const brandElements = document.querySelectorAll(".brand");
brandElements.forEach((brand, index) => {
  brand.style.opacity = "0";
  brand.style.transform = "translateX(-20px)";
  brand.style.transition = "all 0.5s ease";
  setTimeout(() => {
    brand.style.opacity = "1";
    brand.style.transform = "translateX(0)";
  }, 100 + index * 50);
});
