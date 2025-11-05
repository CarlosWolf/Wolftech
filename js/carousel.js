let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-images picture img");
const totalSlides = slides.length;
const indicatorsContainer = document.querySelector(".carousel-indicators");
let autoSlideInterval;

// Crear indicadores dinámicos
function createIndicators() {
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("div");
    indicator.setAttribute("data-index", i);
    indicator.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    indicatorsContainer.appendChild(indicator);
  }
  updateIndicators();
}

// Actualizar posición del carrusel e indicadores
function updateCarousel() {
  const carouselImages = document.querySelector(".carousel-images");
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateIndicators();
}

// Actualizar indicadores activos
function updateIndicators() {
  const indicators = document.querySelectorAll(".carousel-indicators div");
  indicators.forEach((indicator) => indicator.classList.remove("active"));
  indicators[currentIndex].classList.add("active");
}

// Cambio manual de diapositivas
function changeSlide(direction) {
  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
  updateCarousel();
}

// Cambio automático de diapositivas
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSlide(1);
  }, 3000);
}

// Pausar y reanudar carrusel
function pauseCarousel() {
  clearInterval(autoSlideInterval);
}

function resumeCarousel() {
  startAutoSlide();
}

// Inicialización
createIndicators();
startAutoSlide();