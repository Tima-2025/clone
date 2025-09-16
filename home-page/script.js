// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Digital event button click test
document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('digital');
  if (button) {
    button.addEventListener('click', () => {
      alert("Page changed");
    });
  }

  const button1 = document.getElementById('cambiare');
  if (button1) {
    button1.addEventListener('click', () => {
      alert("Page changed");
    });
  }

  const button2 = document.getElementById('church');
  if (button2) {
    button2.addEventListener('click', () => {
      alert("Page changed");
    });
  }
});

//---------------------------------------------------------------------------------------------------
// ABOUT SECTION CAROUSEL (First Carousel)
//---------------------------------------------------------------------------------------------------

let aboutSlideIndex = 0;
let aboutAutoSlideInterval;

function initAboutCarousel() {
  const slides = document.querySelectorAll('.about-image-carousel .slide');
  const dots = document.querySelectorAll('.about-image-carousel .dot');
  const carouselSlides = document.getElementById('carouselSlides');
  
  if (!slides.length || !carouselSlides) return;
  
  const totalSlides = slides.length;

  function showAboutSlide(index) {
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    // Calculate the transform value (each slide is 20% width)
    const translateX = -index * 20;
    carouselSlides.style.transform = `translateX(${translateX}%)`;
    // Add active class to current dot
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  function changeAboutSlide(direction) {
    aboutSlideIndex += direction;
    // Loop back to first slide if we go past the last
    if (aboutSlideIndex >= totalSlides) {
      aboutSlideIndex = 0;
    }
    // Loop to last slide if we go before the first
    if (aboutSlideIndex < 0) {
      aboutSlideIndex = totalSlides - 1;
    }
    showAboutSlide(aboutSlideIndex);
    resetAboutAutoSlide();
  }

  // Auto-slide functionality
  function aboutAutoSlide() {
    aboutSlideIndex = (aboutSlideIndex + 1) % totalSlides;
    showAboutSlide(aboutSlideIndex);
  }

  function startAboutAutoSlide() {
    aboutAutoSlideInterval = setInterval(aboutAutoSlide, 4000);
  }

  function stopAboutAutoSlide() {
    clearInterval(aboutAutoSlideInterval);
  }

  function resetAboutAutoSlide() {
    stopAboutAutoSlide();
    startAboutAutoSlide();
  }

  // Pause auto-slide when hovering over carousel
  const aboutCarousel = document.querySelector('.about-image-carousel');
  if (aboutCarousel) {
    aboutCarousel.addEventListener('mouseenter', stopAboutAutoSlide);
    aboutCarousel.addEventListener('mouseleave', startAboutAutoSlide);
  }

  // Touch/Swipe support for mobile
  let startX = 0;
  let endX = 0;
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', function(e) {
      startX = e.changedTouches[0].screenX;
      stopAboutAutoSlide();
    });
    carouselWrapper.addEventListener('touchend', function(e) {
      endX = e.changedTouches[0].screenX;
      handleAboutSwipe();
      startAboutAutoSlide();
    });
  }

  function handleAboutSwipe() {
    const swipeThreshold = 50;
    if (endX < startX - swipeThreshold) {
      changeAboutSlide(1); // Swipe left - next slide
    }
    if (endX > startX + swipeThreshold) {
      changeAboutSlide(-1); // Swipe right - previous slide
    }
  }

  // Initialize the about carousel
  showAboutSlide(0);
  startAboutAutoSlide();

  // Keyboard navigation for about carousel
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      changeAboutSlide(-1);
    } else if (e.key === 'ArrowRight') {
      changeAboutSlide(1);
    }
  });
}

//---------------------------------------------------------------------------------------------------
// SHOWCASE SLIDER (4-slide banner)
//---------------------------------------------------------------------------------------------------

// SHOWCASE COMPONENT FUNCTIONALITY
function initShowcaseComponent() {
    const slides = document.querySelectorAll('.sc-slide');
    const dots = document.querySelectorAll('.sc-dot');
    const texts = document.querySelectorAll('.sc-text');
    const prevBtn = document.getElementById('scPrev');
    const nextBtn = document.getElementById('scNext');
    const wrapper = document.querySelector('.showcase-wrapper');
    
    if (!slides.length || !prevBtn || !nextBtn) return;
    
    let current = 0;
    const total = slides.length;
    let autoTimer;
    
    function showSlide(index) {
        // Remove active
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        texts.forEach(t => t.classList.remove('active'));
        
        // Add active
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        texts[index].classList.add('active');
        
        current = index;
    }
    
    function nextSlide() {
        const next = (current + 1) % total;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (current - 1 + total) % total;
        showSlide(prev);
    }
    
    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetTimer();
        });
    });
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetTimer();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetTimer();
        }
    });
    
    // Mouse hover
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => clearInterval(autoTimer));
        wrapper.addEventListener('mouseleave', () => resetTimer());
    }
    
    // Touch support
    let startX = 0;
    wrapper?.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        clearInterval(autoTimer);
    });
    
    wrapper?.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].screenX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        resetTimer();
    });
    
    // Initialize
    showSlide(0);
    resetTimer();
}

// Add to your existing DOMContentLoaded handler
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    
    // Add showcase component
    initShowcaseComponent();
});

//---------------------------------------------------------------------------------------------------
// FAVORITES CAROUSEL
//---------------------------------------------------------------------------------------------------

function initFavoritesCarousel() {
  const container = document.getElementById('carouselContainer');
  const prevBtn = document.getElementById('navPrev');
  const nextBtn = document.getElementById('navNext');
  
  if (!container || !prevBtn || !nextBtn) return;
  
  let currentPosition = 0;
  const cardWidth = 300; // 280px card + 20px gap
  const totalCards = container.children.length;
  const visibleCards = 4;
  const maxPosition = (totalCards - visibleCards) * cardWidth;

  function updateFavoritesCarousel() {
    container.style.transform = `translateX(-${currentPosition}px)`;
    
    // Update button states
    prevBtn.style.opacity = currentPosition <= 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
    
    prevBtn.disabled = currentPosition <= 0;
    nextBtn.disabled = currentPosition >= maxPosition;
  }

  // Previous button
  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Favorites prev clicked');
    if (currentPosition > 0) {
      currentPosition -= cardWidth;
      if (currentPosition < 0) currentPosition = 0;
      updateFavoritesCarousel();
    }
  });

  // Next button
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Favorites next clicked');
    if (currentPosition < maxPosition) {
      currentPosition += cardWidth;
      if (currentPosition > maxPosition) currentPosition = maxPosition;
      updateFavoritesCarousel();
    }
  });

  // Initialize
  updateFavoritesCarousel();
}

//---------------------------------------------------------------------------------------------------
// INITIALIZE ALL CAROUSELS
//---------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing all carousels...');
  
  // Initialize each carousel
  initAboutCarousel();
  initShowcaseSlider();
  initFavoritesCarousel();
  
  console.log('All carousels initialized');
});


