/* -----------------------------
   MOBILE NAVIGATION
------------------------------*/

// Correct elements
const hamburgerButton = document.getElementById('hamburger-button');
const topNav = document.querySelector('.top-nav');
const navLinks = document.querySelectorAll('.top-nav a');

// Toggle mobile menu
hamburgerButton.addEventListener('click', () => {
  topNav.classList.toggle('active');
  hamburgerButton.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    topNav.classList.remove('active');
    hamburgerButton.classList.remove('active');
  });
});


/* -----------------------------
   LIGHT / DARK MODE
------------------------------*/
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const darkClass = 'dark-theme';
  const body = document.body;

  function setTheme(isDark, animate = true) {
    if (animate) {
      body.style.transition = 'background 0.5s, color 0.5s';
    }
    if (isDark) {
      body.classList.add(darkClass);
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove(darkClass);
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }

  // Restore theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setTheme(true, false);
  } else {
    setTheme(false, false);
  }

  themeToggle.onclick = function() {
    setTheme(!body.classList.contains(darkClass));
  };
})();


/* -----------------------------
   LIGHTBOX GALLERY
------------------------------*/
const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery img');
const closeButton = document.getElementById('lightbox-close-button');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
  });
});

closeButton.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});


/* -----------------------------
   FADE-IN ON SCROLL
------------------------------*/
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Check initial visibility on load for elements already in viewport
function checkInitialFadeInVisibility() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('load', checkInitialFadeInVisibility);


/* -----------------------------
   BACK TO TOP BUTTON
------------------------------*/
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* -----------------------------
    chatForm.onsubmit = function(e) {
      e.preventDefault();
      const userMsg = chatInput.value.trim();
      if (!userMsg) return;
      appendMessage('You', userMsg, true);
      chatInput.value = '';
      setTimeout(() => appendMessage('Support', getBotReply(userMsg), false), 700);
    };

    // Quick reply logic
    const quickReplies = document.querySelectorAll('.quick-reply');
    quickReplies.forEach(btn => {
      btn.onclick = function() {
        const msg = btn.getAttribute('data-msg');
        appendMessage('You', msg, true);
        setTimeout(() => appendMessage('Support', getBotReply(msg), false), 700);
      };
    });

    // Emoji support in messages
    function emojify(text) {
      return text
        .replace(/\bjob\b/gi, '💼 Job')
        .replace(/\bcontact\b/gi, '📞 Contact')
        .replace(/\bvolunteer\b/gi, '🤝 Volunteer')
        .replace(/\bdonate\b/gi, '💸 Donate')
        .replace(/\bphone\b/gi, '📱 Phone')
        .replace(/\bhello\b/gi, '👋 Hello')
        .replace(/\bthanks?\b/gi, '🙏 Thanks');
    }

    function appendMessage(sender, msg, isUser) {
      const msgDiv = document.createElement('div');
      msgDiv.innerHTML = `<strong style='color:${sender==='You'?'#b82323':'#0f766e'}'>${sender}:</strong> ${emojify(msg)}`;
      msgDiv.style.marginBottom = '8px';
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotReply(msg) {
      msg = msg.toLowerCase();
      if (msg.includes('hello')) return 'Hello! How can we help you today? 😊';
      if (msg.includes('help')) return 'Type job, contact, volunteer, donate, or phone for more information 😊';
      if (msg.includes('job')) return 'Check our Work With Us page for opportunities. 💼';
      if (msg.includes('contact')) return 'Reach us via the Contact section or email. 📞';
      if (msg.includes('thanks')) return 'You’re welcome! 🙏';
      if (msg.includes('volunteer')) return 'Visit the Volunteer section. 🤝';
      if (msg.includes('donate')) return 'Visit the Donate section to support us. 💸';
      if (msg.includes('phone')) return 'This is our phone number: +91-9158340428. 📱';
      return 'Thank you for reaching out! We will get back to you soon.';
    }
       CONTACT FORM LOGIC
------------------------------*/
    

// FORM ENHANCEMENTS: Real-time validation, feedback, spinner
// Contact Form
const contactForm = document.querySelector('.contact-form.form');
if (contactForm) {
  const firstInput = contactForm.querySelector('#contact-first');
  const lastInput = contactForm.querySelector('#contact-last');
  const phoneInput = contactForm.querySelector('#contact-phone');
  const emailInput = contactForm.querySelector('#contact-email');
  const spinner = document.getElementById('contact-form-spinner');
  const errorFirst = contactForm.querySelector('#error-first');
  const errorLast = contactForm.querySelector('#error-last');
  const errorPhone = contactForm.querySelector('#error-phone');
  const errorEmail = contactForm.querySelector('#error-email');

  function validateName(input, errorSpan) {
    if (!input.value.trim()) {
      errorSpan.textContent = 'Required.';
      input.classList.add('input-error');
      input.classList.remove('input-success');
      return false;
    }
    errorSpan.textContent = '';
    input.classList.remove('input-error');
    input.classList.add('input-success');
    return true;
  }

  function validateEmail(input, errorSpan) {
    const val = input.value.trim();
    if (!val) {
      errorSpan.textContent = 'Required.';
      input.classList.add('input-error');
      input.classList.remove('input-success');
      return false;
    }
    // Simple email regex
    if (!/^\S+@\S+\.\S+$/.test(val)) {
      errorSpan.textContent = 'Invalid email.';
      input.classList.add('input-error');
      input.classList.remove('input-success');
      return false;
    }
    errorSpan.textContent = '';
    input.classList.remove('input-error');
    input.classList.add('input-success');
    return true;
  }

  function validatePhone(input, errorSpan) {
    const val = input.value.trim();
    if (!val) {
      errorSpan.textContent = '';
      input.classList.remove('input-error');
      input.classList.remove('input-success');
      return true;
    }
    if (!/^\d{10}$/.test(val)) {
      errorSpan.textContent = 'Enter 10 digit phone.';
      input.classList.add('input-error');
      input.classList.remove('input-success');
      return false;
    }
    errorSpan.textContent = '';
    input.classList.remove('input-error');
    input.classList.add('input-success');
    return true;
  }

  firstInput.addEventListener('input', () => validateName(firstInput, errorFirst));
  lastInput.addEventListener('input', () => validateName(lastInput, errorLast));
  emailInput.addEventListener('input', () => validateEmail(emailInput, errorEmail));
  phoneInput.addEventListener('input', () => validatePhone(phoneInput, errorPhone));

  // Intercept submit (simulate spinner)
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    valid &= validateName(firstInput, errorFirst);
    valid &= validateName(lastInput, errorLast);
    valid &= validateEmail(emailInput, errorEmail);
    valid &= validatePhone(phoneInput, errorPhone);
    if (!valid) return;
    spinner.style.display = 'block';
    setTimeout(() => {
      spinner.style.display = 'none';
      contactForm.reset();
      [firstInput, lastInput, phoneInput, emailInput].forEach(i => {
        i.classList.remove('input-success');
      });
      [errorFirst, errorLast, errorPhone, errorEmail].forEach(e => e.textContent = '');
      // Show success modal
      const modal = document.getElementById('success-modal');
      if (modal) modal.style.display = 'block';
    }, 1200);
  });
}




/* -----------------------------
   MAIN CAROUSEL (scoped to .carousel-container)
   This prevents other carousels (e.g., testimonials) from being included
   in the main carousel slide list.
------------------------------*/
const mainCarouselContainer = document.querySelector('.carousel-container');
if (mainCarouselContainer) {
  const carouselSlides = mainCarouselContainer.querySelectorAll('.carousel .carousel-slide');
  const prevBtn = mainCarouselContainer.querySelector('.carousel-btn.prev');
  const nextBtn = mainCarouselContainer.querySelector('.carousel-btn.next');
  let currentSlide = 0;

  function showSlide(i) {
    carouselSlides.forEach((slide, index) => {
      slide.classList.toggle('active', index === i);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
  }

  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlide);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlideFunc);

  let carouselInterval = setInterval(nextSlide, 4000);

  mainCarouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  mainCarouselContainer.addEventListener('mouseleave', () => carouselInterval = setInterval(nextSlide, 4000));

  showSlide(currentSlide);
}


/* -----------------------------
   COUNTERS
------------------------------*/
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    function update() {
      count += step;
      if (count >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = count;
        requestAnimationFrame(update);
      }
    }
    update();
  });
}

const counterSection = document.querySelector('.counter-section');
let started = false;

if (counterSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      animateCounters();
      started = true;
    }
  }, { threshold: 0.4 });

  observer.observe(counterSection);
}

/* -----------------------------
   IMPACT MAP (requires Leaflet CDN in <head>)
------------------------------*/
let map; // Declare map as global for access
let markerGroup; // Declare marker group globally

function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  // 1. Initialize Map
  map.setView([20.5937, 78.9629], 5); // Center India
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Hide loading spinner when tiles are loaded
  const mapLoading = document.getElementById('map-loading');
  if (mapLoading) {
    map.whenReady(() => {
      mapLoading.style.display = 'none';
    });
  }

  // 2. Define Data and Markers
  const centers = [
    {
      name: 'Bright Star School',
      type: 'education',
      lat: 19.8762, lon: 75.3433,
      story: 'Empowering children through quality education in Maharashtra.'
    },
    {
      name: 'Health Camp - UP',
      type: 'health',
      lat: 21.1458 , lon: 79.0882,
      story: 'Health camps for women and children in Uttar Pradesh.'
    },
    {
      name: 'SHG Women Center',
      type: 'women',
      lat: 18.9582 , lon: 72.8321,
      story: 'Empowering women through SHG and entrepreneurship in Rajasthan.'
    },
    {
      name: 'Skill Training Center',
      type: 'education',
      lat: 18.5246 ,  lon: 73.8786,
      story: 'Vocational training for youth in Madhya Pradesh.'
    },
    {
      name: 'Nutrition Drive',
      type: 'health',
      lat: 28.7041, lon: 77.1025,
      story: 'Nutrition and health awareness in Delhi.'
    }
  ];

  markerGroup = L.layerGroup().addTo(map);

  function renderMarkers(type) {
    if (markerGroup) markerGroup.clearLayers();
    centers.filter(c => type === 'all' || c.type === type).forEach(center => {
      const marker = L.marker([center.lat, center.lon]);
      marker.bindPopup(`<strong>${center.name}</strong><br>${center.story}`);
      markerGroup.addLayer(marker);
    });
  }

  renderMarkers('all');

  // 3. Setup Filters
  const filterBtns = document.querySelectorAll('.map-filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMarkers(btn.getAttribute('data-type'));
    };
  });

  const allBtn = document.querySelector('.map-filter-btn[data-type="all"]');
  if (allBtn) allBtn.classList.add('active');

  // 4. Use IntersectionObserver to invalidate size when map becomes visible
  const mapObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        map.invalidateSize(true);
      }, 200); // A small delay ensures container is fully rendered
      observer.unobserve(mapElement); // Optional: run only once
    }
  }, { threshold: 0.1 });

  mapObserver.observe(mapElement);
}

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map');
  if (mapElement && typeof L !== 'undefined') { // Check if Leaflet is loaded
    map = L.map('map'); // Initialize the global map variable
    initMap();
  }
});

// Also invalidate on window resize for orientation changes
window.addEventListener('resize', () => {
  if (map) {
    setTimeout(() => {
      map.invalidateSize(true);
    }, 200);
  }
});


/* -----------------------------
   DONATION SLIDER
------------------------------*/
// Donation Slider
const slider = document.getElementById('donation-slider');
const amount = document.getElementById('donation-amount');
const progress = document.querySelector('.progress-bar');

if (slider) {
  slider.addEventListener('input', (e) => {
    const val = e.target.value;
    amount.textContent = `₹${val}`;
    progress.style.width = `${(val / 1000) * 100}%`;
  });
}

// Donation progress bar logic
const donationSlider = document.getElementById('donation-slider');
const donationAmount = document.getElementById('donation-amount');
const donationProgressBar = document.getElementById('donation-progress-bar');
const donationProgressLabel = document.getElementById('donation-progress-label');
if (donationSlider && donationAmount && donationProgressBar && donationProgressLabel) {
  const maxDonation = parseInt(donationSlider.max);
  donationSlider.addEventListener('input', function() {
    const value = parseInt(this.value);
    donationAmount.textContent = `₹${value}`;
    // Simulate progress: e.g., goal is 1000
    const percent = Math.round((value / maxDonation) * 100);
    donationProgressBar.style.width = percent + '%';
    donationProgressLabel.textContent = percent + '%';
  });
  // Initialize on load
  const initialValue = parseInt(donationSlider.value);
  donationAmount.textContent = `₹${initialValue}`;
  const initialPercent = Math.round((initialValue / maxDonation) * 100);
  donationProgressBar.style.width = initialPercent + '%';
  donationProgressLabel.textContent = initialPercent + '%';
}

/* -----------------------------
   TESTIMONIAL ROTATOR
------------------------------*/
// Testimonial Rotator (similar to main carousel)
const testimonialSlides = document.querySelectorAll('.testimonial-carousel .carousel-slide');
const testimonialPrevBtn = document.querySelector('.testimonial-section .carousel-btn.prev');
const testimonialNextBtn = document.querySelector('.testimonial-section .carousel-btn.next');
let currentTestimonial = 0;

function showTestimonial(i) {
  testimonialSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === i);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}

if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', nextTestimonial);
if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate every 5s
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause on hover
const testimonialSection = document.querySelector('.testimonial-section');
if (testimonialSection) {
  testimonialSection.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
  testimonialSection.addEventListener('mouseleave', () => testimonialInterval = setInterval(nextTestimonial, 5000));
}

showTestimonial(currentTestimonial);

// Sticky header logic
const topBar = document.querySelector('.top-bar');
let lastScrollY = window.scrollY;

function updateSticky() {
  if (window.scrollY > 60) {
    topBar.classList.add('sticky');
    topBar.classList.add('nav-fade');
  } else {
    topBar.classList.remove('sticky');
    topBar.classList.remove('nav-fade');
  }
  lastScrollY = window.scrollY;
}

window.addEventListener('scroll', updateSticky);
window.addEventListener('load', updateSticky);

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', function() {
  if (heroSection) {
    const offset = window.scrollY * 0.3;
    heroSection.style.backgroundPosition = `center ${offset}px`;
  }
});

// Reveal-on-scroll animation
const revealEls = document.querySelectorAll('.fade-in, .section, .card, .info-card');
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('revealed');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Social sharing logic
function sharePage(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.title);
  let shareUrl = '';
  if (platform === 'whatsapp') {
    shareUrl = `https://wa.me/?text=${text}%20${url}`;
  } else if (platform === 'facebook') {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  } else if (platform === 'twitter') {
    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  }
  window.open(shareUrl, '_blank');
}
// Gamification logic
let userPoints = 0;
function updatePoints(points) {
  userPoints += points;
  document.getElementById('user-points').textContent = userPoints;
}
// Award badge for sharing testimonial
window.shareTestimonial = function(platform) {
  // ...existing code for sharing...
  // Award points for sharing
  updatePoints(10);
  alert('You earned 10 points and the Community Star badge for sharing!');
  // ...existing code...
}
// Award badge for donating (simulate)
const donateBtn = document.querySelector('.donation-widget .cta');
if (donateBtn) {
  donateBtn.addEventListener('click', function(e) {
    e.preventDefault();
    updatePoints(20);
    alert('Thank you for donating! You earned 20 points and the Impact Maker badge!');
  });
}
// Quiz logic
const quizForm = document.getElementById('quiz-form');
if (quizForm) {
  quizForm.onsubmit = function(e) {
    e.preventDefault();
    const answer = quizForm.querySelector('input[name="quiz-q1"]:checked');
    const resultDiv = document.getElementById('quiz-result');
    if (answer && answer.value === 'Space Exploration') {
      updatePoints(15);
      resultDiv.textContent = 'Correct! You earned 15 points and the Quiz Champion badge!';
      resultDiv.style.display = 'block';
    } else {
      resultDiv.textContent = 'Try again!';
      resultDiv.style.display = 'block';
    }
  };
}

// Badge Modal Logic
const badgeModal = document.getElementById('badge-modal');
const badgeModalContent = document.getElementById('badge-modal-content');
const badgeModalClose = document.getElementById('badge-modal-close');

if (badgeModal && badgeModalClose) {
  // Close modal when clicking the close button
  badgeModalClose.onclick = function() {
    badgeModal.style.display = 'none';
  };

  // Close modal when clicking outside the content
  window.onclick = function(event) {
    if (event.target === badgeModal) {
      badgeModal.style.display = 'none';
    }
  };
}

// Badge click handlers
const badgeCards = document.querySelectorAll('.badge-card');
badgeCards.forEach(card => {
  card.addEventListener('click', function() {
    const badgeTitle = this.querySelector('h3').textContent;
    const badgeDesc = this.querySelector('p').textContent;
    let modalHTML = '';

    if (badgeTitle.includes('Community Star')) {
      modalHTML = `
        <h2>Community Star Badge</h2>
        <p><strong>Description:</strong> ${badgeDesc}</p>
        <p><strong>How to Earn:</strong> Share your testimonial or story about Param Social Foundation's impact on our website or social media.</p>
        <p><strong>Points Awarded:</strong> 10 points</p>
        <p><strong>Impact:</strong> Your story helps inspire others and spreads awareness about our work in communities.</p>
      `;
    } else if (badgeTitle.includes('Impact Maker')) {
      modalHTML = `
        <h2>Impact Maker Badge</h2>
        <p><strong>Description:</strong> ${badgeDesc}</p>
        <p><strong>How to Earn:</strong> Make a donation or volunteer your time with our programs.</p>
        <p><strong>Points Awarded:</strong> 20 points</p>
        <p><strong>Impact:</strong> Your contribution directly supports our mission to empower communities across India.</p>
      `;
    } else if (badgeTitle.includes('Quiz Champion')) {
      modalHTML = `
        <h2>Quiz Champion Badge</h2>
        <p><strong>Description:</strong> ${badgeDesc}</p>
        <p><strong>How to Earn:</strong> Complete the quick quiz about Param Social Foundation's work.</p>
        <p><strong>Points Awarded:</strong> 15 points</p>
        <p><strong>Impact:</strong> Learning about our programs helps you understand how you can get involved.</p>
      `;
      
    }

    badgeModalContent.innerHTML = modalHTML;
    badgeModal.style.display = 'block';
  });
});
/* ---------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  // Detect mobile/touch device
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouch) {
    document.querySelectorAll(".nav-dropdown").forEach(drop => {

      const toggle = drop.querySelector(".dropdown-toggle");
      const menu = drop.querySelector(".dropdown-menu");

      if (!toggle || !menu) return;

      // Disable hover behaviour completely
      toggle.onmouseenter = null;
      menu.onmouseenter = null;

      // Toggle submenu on tap
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close any other open dropdowns
        document.querySelectorAll(".dropdown-menu").forEach(m => {
          if (m !== menu) m.style.display = "none";
        });

        // Toggle active menu
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      });
    });

    // Close all when clicking outside
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.style.display = "none";
      });
    });

  } // end if touch
});   FINAL FIX: Mobile dropdown should open ONLY on click
--------------------------------------------------- */

const launcher = document.getElementById('chat-launcher');
const chatBox = document.getElementById('mini-chat');
const closeBtn = document.getElementById('mini-chat-close');
const chatForm = document.getElementById('mini-chat-form');
const chatInput = document.getElementById('mini-chat-input');
const chatMessages = document.getElementById('mini-chat-messages');

/* Toggle chat */
launcher.onclick = () => chatBox.classList.remove('hidden');
closeBtn.onclick = () => chatBox.classList.add('hidden');

/* Send message */
chatForm.onsubmit = function (e) {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;

  addMessage('You', msg);
  chatInput.value = '';

  setTimeout(() => {
    addMessage('Support', getBotReply(msg));
  }, 600);
};

function addMessage(sender, text) {
  const div = document.createElement('div');
  div.className = sender === 'You' ? 'user' : 'bot';
  div.innerHTML = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* YOUR EXISTING LOGIC (UNCHANGED) */
function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes('hello')) return 'Hello! How can we help you today? 😊';
  if (msg.includes('help')) return 'Type job, contact, volunteer, donate, or phone for more information 😊';
  if (msg.includes('job')) return 'Check our Work With Us page for opportunities.';
  if (msg.includes('contact')) return 'Reach us via the Contact section or email.';
  if (msg.includes('thanks')) return 'You’re welcome!';
  if (msg.includes('volunteer')) return 'Visit the Volunteer section.';
  if (msg.includes('donate')) return 'Visit the Donate section to support us.';
  if (msg.includes('phone')) return 'This is our phone number : +91-9158340428.';
  return 'Thank you for reaching out! We will get back to you soon.';
}
setTimeout(() => {
  addMessage('Support', 'Hi 👋 How can we help you today?');
}, 400);
const quickOptions = document.getElementById('quick-options');

/* Show options when chat opens */
launcher.onclick = () => {
  chatBox.classList.remove('hidden');
  quickOptions.style.display = 'flex';
};

/* Handle option click */
quickOptions.querySelectorAll('button').forEach(btn => {
  btn.onclick = () => {
    const msg = btn.dataset.msg;

    addMessage('You', msg);
    quickOptions.style.display = 'none'; // hide after choice

    setTimeout(() => {
      addMessage('Support', getBotReply(msg));
    }, 500);
  };
});
launcher.onclick = () => {
  chatBox.classList.remove('hidden');
  quickOptions.style.display = 'flex';

  if (!chatMessages.hasChildNodes()) {
    setTimeout(() => {
      addMessage('Support', 'Hi 👋 Please choose an option below.');
    }, 300);
  }
};
// Auto welcome message on site load
window.addEventListener('load', () => {
  setTimeout(() => {
    // Show chat box (but still minimized)
    chatBox.classList.remove('hidden');

    // Add welcome message only once
    if (!chatMessages.hasChildNodes()) {
      addMessage(
        'Support',
        'Hi 👋 Welcome to Param Social Foundation! How can we help you today?'
      );
    }
  }, 2500); // 2.5 seconds delay
});

