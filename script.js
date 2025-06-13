let map;

function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13, // Default zoom level, but it will adjust based on locations
    center: { lat: 23.2314, lng: 77.4352 }, // Initial center (Bhopal)
  });
  // Add markers for predefined locations
  const locations = [
    { lat: 23.2512, lng: 77.5247, title: "LNCT GROUP OF COLLEGES" },
    { lat: 23.1775, lng: 77.4277, title: "LNCT UNIVERSITY" },
    { lat: 23.3194, lng: 77.4131, title: "JNCT" },
  ];

  /*locations.forEach((location) => {
    new google.maps.Marker({
      position: location,
      map: map,
      title: location.title,
    });
  });

  // Add click events for location items
  document.querySelectorAll(".location-item").forEach((item) => {
    item.addEventListener("click", () => {
      const lat = parseFloat(item.dataset.lat);
      const lng = parseFloat(item.dataset.lng);
      map.setCenter({ lat, lng });
      map.setZoom(12);
    });
  });
}*/
 //yaha se hai
 // Add markers for locations
  locations.forEach((location) => {
    new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.title,
    });
  });

  // Attach click events to the list items
  const locationItems = document.querySelectorAll(".location-item");
  locationItems.forEach((item) => {
    item.addEventListener("click", () => {
      const lat = parseFloat(item.dataset.lat);
      const lng = parseFloat(item.dataset.lng);
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

      // Open the location in Google Maps
      window.open(googleMapsUrl, "_blank");
    });
  });
}

// Load the Google Maps API dynamically
const script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgZaBPOP1B014JZczS7T48ciiGi_QOKkI&callback=initMap";
script.async = true;
document.head.appendChild(script);


// Load the Google Maps API dynamically
/*const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCgZaBPOP1B014JZczS7T48ciiGi_QOKkI&callback=initMap`;
script.async = true;
script.defer = true;
document.head.appendChild(script);*/

/*blog*/
// script.js
const slider = document.querySelector(".slider")
const slides = document.querySelectorAll(".slide")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const sliderContainer = document.querySelector(".slider-container")

let currentIndex = 0
let isTransitioning = false
let autoPlayInterval = null
let touchStartX = 0
let touchEndX = 0
let cardsPerSlide = 3
let totalSlides = 2
let allCards = []

// Check if elements exist
if (!slider || !slides.length) {
  console.warn("Blog slider elements not found")
} else {
  initializeSlider()
}

function initializeSlider() {
  // Extract all cards from slides
  extractAllCards()

  // Set responsive configuration
  updateResponsiveConfig()

  // Rebuild slides based on screen size
  rebuildSlides()

  // Set initial position
  updateSliderPosition()

  // Add event listeners
  addEventListeners()

  // Start auto-play
  startAutoPlay()

  // Add accessibility
  addAccessibility()
}

// Extract all cards from existing slides
function extractAllCards() {
  allCards = []
  slides.forEach((slide) => {
    const cards = slide.querySelectorAll(".card")
    cards.forEach((card) => {
      allCards.push(card.cloneNode(true))
    })
  })
  console.log(`Found ${allCards.length} total cards`)
}

// Update responsive configuration based on screen size
function updateResponsiveConfig() {
  const screenWidth = window.innerWidth

  if (screenWidth <= 575) {
    // Mobile: 1 card per slide
    cardsPerSlide = 1
  } else if (screenWidth <= 767) {
    // Small tablet: 1 card per slide
    cardsPerSlide = 1
  } else if (screenWidth <= 974) {
    // Tablet: 2 cards per slide
    cardsPerSlide = 2
  } else {
    // Desktop: 3 cards per slide (original)
    cardsPerSlide = 3
  }

  totalSlides = Math.ceil(allCards.length / cardsPerSlide)

  // Ensure currentIndex doesn't exceed new totalSlides
  if (currentIndex >= totalSlides) {
    currentIndex = 0
  }

  console.log(`Screen: ${screenWidth}px, Cards per slide: ${cardsPerSlide}, Total slides: ${totalSlides}`)
}

// Rebuild slides based on current responsive configuration
function rebuildSlides() {
  if (!slider || !allCards.length) return

  // Clear existing slides
  slider.innerHTML = ""

  // Create new slides with appropriate number of cards
  for (let i = 0; i < totalSlides; i++) {
    const slide = document.createElement("div")
    slide.className = "slide"
    slide.setAttribute("aria-label", `Slide ${i + 1} of ${totalSlides}`)

    // Add cards to this slide
    const startIndex = i * cardsPerSlide
    const endIndex = Math.min(startIndex + cardsPerSlide, allCards.length)

    for (let j = startIndex; j < endIndex; j++) {
      if (allCards[j]) {
        slide.appendChild(allCards[j].cloneNode(true))
      }
    }

    slider.appendChild(slide)
  }

  // Update CSS for responsive card layout
  updateCardLayout()
}

// Update card layout CSS based on cards per slide
function updateCardLayout() {
  const newSlides = slider.querySelectorAll(".slide")

  newSlides.forEach((slide) => {
    const cards = slide.querySelectorAll(".card")

    // Apply responsive flex layout
    slide.style.display = "flex"
    slide.style.gap = "20px"
    slide.style.minWidth = "100%"

    cards.forEach((card) => {
      if (cardsPerSlide === 1) {
        // Mobile: Full width card
        card.style.flex = "1 0 100%"
        card.style.maxWidth = "400px"
        card.style.margin = "0 auto"
      } else if (cardsPerSlide === 2) {
        // Tablet: 2 cards per slide
        card.style.flex = "1 0 calc(50% - 10px)"
        card.style.maxWidth = "none"
        card.style.margin = "0"
      } else {
        // Desktop: 3 cards per slide (original)
        card.style.flex = "1 0 calc(33.33% - 20px)"
        card.style.maxWidth = "none"
        card.style.margin = "0"
      }
    })
  })
}

// Function to update the slider position
function updateSliderPosition() {
  if (!slider) return

  isTransitioning = true
  slider.style.transform = `translateX(-${currentIndex * 100}%)`

  // Update button states
  updateButtonStates()

  // Reset transition flag
  setTimeout(() => {
    isTransitioning = false
  }, 500)
}

// Navigate to the previous slide
function goToPrevSlide() {
  if (isTransitioning) return

  currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1
  updateSliderPosition()
  announceSlideChange()
}

// Navigate to the next slide
function goToNextSlide() {
  if (isTransitioning) return

  currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0
  updateSliderPosition()
  announceSlideChange()
}

// Handle responsive changes
function handleResponsiveChange() {
  const oldCardsPerSlide = cardsPerSlide
  const oldTotalSlides = totalSlides

  updateResponsiveConfig()

  // Only rebuild if configuration changed
  if (oldCardsPerSlide !== cardsPerSlide || oldTotalSlides !== totalSlides) {
    rebuildSlides()
    updateSliderPosition()
    updateButtonStates()
    console.log("Slider rebuilt for responsive change")
  }
}

// Add all event listeners
function addEventListeners() {
  // Button navigation
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault()
      goToPrevSlide()
      restartAutoPlay()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault()
      goToNextSlide()
      restartAutoPlay()
    })
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!isSliderVisible()) return

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        goToPrevSlide()
        restartAutoPlay()
        break
      case "ArrowRight":
        e.preventDefault()
        goToNextSlide()
        restartAutoPlay()
        break
      case " ":
        e.preventDefault()
        toggleAutoPlay()
        break
    }
  })

  // Touch events for mobile
  if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", handleTouchStart, { passive: true })
    sliderContainer.addEventListener("touchend", handleTouchEnd, { passive: true })

    // Mouse events for desktop
    sliderContainer.addEventListener("mousedown", handleMouseStart)
    document.addEventListener("mouseup", handleMouseEnd)

    // Auto-play controls
    sliderContainer.addEventListener("mouseenter", stopAutoPlay)
    sliderContainer.addEventListener("mouseleave", startAutoPlay)
    sliderContainer.addEventListener("focusin", stopAutoPlay)
    sliderContainer.addEventListener("focusout", startAutoPlay)
  }

  // Window events - responsive handling
  window.addEventListener("resize", debounce(handleResponsiveChange, 300))
  document.addEventListener("visibilitychange", handleVisibilityChange)
}

// Touch event handlers
function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX
  stopAutoPlay()
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX
  handleSwipe()
  startAutoPlay()
}

// Mouse event handlers
let mouseStartX = 0
let isMouseDown = false

function handleMouseStart(e) {
  mouseStartX = e.clientX
  isMouseDown = true
  if (sliderContainer) {
    sliderContainer.style.cursor = "grabbing"
  }
  stopAutoPlay()
  e.preventDefault()
}

function handleMouseEnd(e) {
  if (!isMouseDown) return

  isMouseDown = false
  if (sliderContainer) {
    sliderContainer.style.cursor = "grab"
  }

  const mouseEndX = e.clientX
  const diff = mouseStartX - mouseEndX
  const threshold = 50

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      goToNextSlide()
    } else {
      goToPrevSlide()
    }
  }

  startAutoPlay()
}

// Handle swipe gestures
function handleSwipe() {
  const threshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      goToNextSlide()
    } else {
      goToPrevSlide()
    }
  }
}

// Auto-play functionality
function startAutoPlay() {
  if (totalSlides <= 1) return

  stopAutoPlay()
  autoPlayInterval = setInterval(() => {
    if (!isTransitioning && isSliderVisible()) {
      goToNextSlide()
    }
  }, 5000)
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

function toggleAutoPlay() {
  if (autoPlayInterval) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
}

function restartAutoPlay() {
  stopAutoPlay()
  setTimeout(startAutoPlay, 1000)
}

// Update button states
function updateButtonStates() {
  if (prevBtn && nextBtn) {
    if (totalSlides <= 1) {
      // Hide buttons if only one slide
      prevBtn.style.display = "none"
      nextBtn.style.display = "none"
    } else {
      prevBtn.style.display = "flex"
      nextBtn.style.display = "flex"
      prevBtn.style.opacity = "1"
      nextBtn.style.opacity = "1"
      prevBtn.disabled = false
      nextBtn.disabled = false
    }
  }
}

// Accessibility features
function addAccessibility() {
  if (prevBtn) {
    prevBtn.setAttribute("aria-label", "Previous slide")
    prevBtn.setAttribute("tabindex", "0")
  }

  if (nextBtn) {
    nextBtn.setAttribute("aria-label", "Next slide")
    nextBtn.setAttribute("tabindex", "0")
  }

  if (sliderContainer) {
    sliderContainer.setAttribute("role", "region")
    sliderContainer.setAttribute("aria-label", "Blog posts carousel")
    sliderContainer.style.cursor = "grab"
  }
}

// Announce slide changes for screen readers
function announceSlideChange() {
  const announcement = `Slide ${currentIndex + 1} of ${totalSlides}`

  let liveRegion = document.getElementById("slider-live-region")
  if (!liveRegion) {
    liveRegion = document.createElement("div")
    liveRegion.id = "slider-live-region"
    liveRegion.setAttribute("aria-live", "polite")
    liveRegion.setAttribute("aria-atomic", "true")
    liveRegion.style.cssText = "position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;"
    document.body.appendChild(liveRegion)
  }

  liveRegion.textContent = announcement
}

// Utility functions
function isSliderVisible() {
  if (!sliderContainer) return false

  const rect = sliderContainer.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Public API for external control
window.blogSlider = {
  goToSlide: (index) => {
    if (index >= 0 && index < totalSlides && index !== currentIndex) {
      currentIndex = index
      updateSliderPosition()
      announceSlideChange()
    }
  },
  getCurrentSlide: () => currentIndex,
  getTotalSlides: () => totalSlides,
  getCardsPerSlide: () => cardsPerSlide,
  next: goToNextSlide,
  prev: goToPrevSlide,
  play: startAutoPlay,
  pause: stopAutoPlay,
  rebuild: handleResponsiveChange,
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSlider)
} else {
  initializeSlider()
}

console.log("Responsive blog slider initialized successfully")

/*contact us*/
function sendEmail(){
    const templateParams={
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    subject: document.querySelector("#subject").value,
    message: document.querySelector("#message").value,
    };

    emailjs.send("service_r9rfwno", "template_s3c3z2g", templateParams).then(
        ()=>alert("Email sent||").catch(()=>alert("Email not send"))
    );
    
}
