const PHONE_NUMBER = "5491128233925";

const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");
const quoteForm = document.getElementById("quoteForm");
const yearTarget = document.getElementById("year");

// Carousel functionality
const carousel = document.querySelector(".fleet-carousel");
const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-btn-prev");
const nextBtn = document.querySelector(".carousel-btn-next");
const dots = document.querySelectorAll(".carousel-dot");

let currentSlide = 0;
const totalSlides = carouselSlides.length;

if (carousel && carouselTrack && prevBtn && nextBtn && dots.length > 0) {
  const updateCarousel = () => {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselSlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  };

  const goToSlide = (index) => {
    currentSlide = index;
    updateCarousel();
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  // Auto-play carousel
  let autoPlayInterval;
  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        nextSlide();
      } else {
        goToSlide(0);
      }
    }, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };

  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
  }

  // Initialize carousel
  updateCarousel();
  startAutoPlay();
}

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
