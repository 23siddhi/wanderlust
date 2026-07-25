// ===== Destination Data =====
const destinations = {
  kerala:      { name: 'Kerala', price: '₹14,999', desc: 'God\'s Own Country - serene backwaters and lush greenery', days: 4, highlights: 'Houseboat Stay, Munnar Tea Gardens, Alleppey Backwaters, Kathakali Show' },
  varanasi:    { name: 'Varanasi (Banaras)', price: '₹9,999', desc: 'Spiritual capital - ancient ghats and Ganga Aarti', days: 3, highlights: 'Ganga Aarti, Kashi Vishwanath, Sarnath, Silk Shopping' },
  manali:      { name: 'Manali', price: '₹12,999', desc: 'Queen of hills - snow peaks and adventure sports', days: 5, highlights: 'Rohtang Pass, Solang Valley, Hadimba Temple, River Rafting' },
  kasol:       { name: 'Kasol', price: '₹11,999', desc: 'Mini Israel of India - backpacker\'s paradise', days: 4, highlights: 'Kheerganga Trek, Parvati River, Malana Village, Cafe Hopping' },
  shimla:      { name: 'Shimla', price: '₹10,999', desc: 'The Hill Queen - colonial charm and mountain views', days: 3, highlights: 'Mall Road, Ridge, Jakhoo Temple, Toy Train Ride' },
  goa:         { name: 'Goa', price: '₹13,999', desc: 'Beach paradise - sun, sand, and vibrant nightlife', days: 4, highlights: 'Baga Beach, Old Goa Churches, Dudhsagar Falls, Night Market' },
  jaipur:      { name: 'Jaipur, Rajasthan', price: '₹15,999', desc: 'Land of Kings - majestic forts and royal palaces', days: 4, highlights: 'Amber Fort, Hawa Mahal, City Palace, Jal Mahal' },
  ladakh:      { name: 'Ladakh', price: '₹24,999', desc: 'Land of high passes - stunning monasteries and lakes', days: 7, highlights: 'Pangong Lake, Khardung La, Nubra Valley, Monasteries' },
  darjeeling:  { name: 'Darjeeling', price: '₹16,999', desc: 'Queen of the Himalayas - tea gardens and toy train', days: 4, highlights: 'Tiger Hill Sunrise, Tea Gardens, Toy Train, Batasia Loop' },
};

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString('en-IN');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString('en-IN');
      }
    };

    updateCounter();
  });
}

// ===== Scroll Reveal Animation =====
function setupScrollReveal() {
  const sections = document.querySelectorAll(
    '.search-bar, .destinations, .packages, .about, .testimonials, .contact, .footer'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
}

// ===== Working Search =====
const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');
const resultsTitle = document.getElementById('resultsTitle');
const resultsDetails = document.getElementById('resultsDetails');
const resultsViewDest = document.getElementById('resultsViewDest');
const resultsBookNow = document.getElementById('resultsBookNow');
const resultsClose = document.getElementById('resultsClose');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const dest = document.getElementById('destination').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const travelers = parseInt(document.getElementById('travelers').value);

  if (!dest) {
    shakeElement(document.getElementById('destination'));
    return;
  }
  if (!checkin) {
    shakeElement(document.getElementById('checkin'));
    return;
  }
  if (!checkout) {
    shakeElement(document.getElementById('checkout'));
    return;
  }
  if (new Date(checkout) <= new Date(checkin)) {
    shakeElement(document.getElementById('checkout'));
    return;
  }

  const data = destinations[dest];
  const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
  const basePrice = parseInt(data.price.replace(/[₹,]/g, ''));
  const totalPerPerson = basePrice + (nights > data.days ? (nights - data.days) * 1500 : 0);
  const totalAll = totalPerPerson * travelers;

  resultsTitle.textContent = data.name + ' Trip Found!';
  resultsDetails.innerHTML = `
    <div class="result-row">
      <span class="result-label">Destination</span>
      <span class="result-value">${data.name}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Description</span>
      <span class="result-value">${data.desc}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Duration</span>
      <span class="result-value">${nights} Nights / ${nights + 1} Days</span>
    </div>
    <div class="result-row">
      <span class="result-label">Check-in</span>
      <span class="result-value">${formatDate(checkin)}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Check-out</span>
      <span class="result-value">${formatDate(checkout)}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Travelers</span>
      <span class="result-value">${travelers} ${travelers === 1 ? 'Person' : 'People'}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Highlights</span>
      <span class="result-value">${data.highlights}</span>
    </div>
    <div class="result-row result-total">
      <span class="result-label">Total Cost</span>
      <span class="result-value">&#8377;${totalAll.toLocaleString('en-IN')}</span>
    </div>
  `;

  searchResults.style.display = 'block';
  searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Scroll to and highlight matching destination card
  const card = document.querySelector(`[data-dest="${dest}"]`);
  if (card) {
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('dest-highlight');
      setTimeout(() => card.classList.remove('dest-highlight'), 3000);
    }, 600);
  }
});

resultsClose.addEventListener('click', () => {
  searchResults.style.display = 'none';
});

resultsViewDest.addEventListener('click', (e) => {
  const dest = document.getElementById('destination').value;
  const card = document.querySelector(`[data-dest="${dest}"]`);
  if (card) {
    e.preventDefault();
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('dest-highlight');
    setTimeout(() => card.classList.remove('dest-highlight'), 3000);
  }
});

resultsBookNow.addEventListener('click', () => {
  const dest = document.getElementById('destination').value;
  const data = destinations[dest];
  alert(`Great choice! To book your ${data.name} trip, call us at:\n\n📞 +91 98765 43210\n\nOr email: hello@desinomad.in\n\nOur team will get back to you within 2 hours!`);
});

function formatDate(dateStr) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-IN', options);
}

function shakeElement(el) {
  el.style.borderColor = '#ef4444';
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, 600);
}

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input').value;

  if (email) {
    alert(`Thanks for subscribing! We'll send travel deals to ${email}`);
    newsletterForm.reset();
  }
});

// ===== Set minimum dates =====
const today = new Date().toISOString().split('T')[0];
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

checkinInput.setAttribute('min', today);
checkoutInput.setAttribute('min', today);

checkinInput.addEventListener('change', () => {
  checkoutInput.setAttribute('min', checkinInput.value);
  if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
    checkoutInput.value = '';
  }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  setupScrollReveal();
  initThemeSwitcher();
});

// ===== Theme Switcher =====
const themeEmojis = { light: '\u{1F331}', dark: '\u{1F319}', ocean: '\u{1F30A}', sunset: '\u{1F305}', forest: '\u{1F332}' };

function initThemeSwitcher() {
  const saved = localStorage.getItem('desinomad-theme') || 'light';
  applyTheme(saved);

  const themeToggle = document.getElementById('themeToggle');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeOptions = document.querySelectorAll('.theme-option');

  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!themeDropdown.contains(e.target) && !themeToggle.contains(e.target)) {
      themeDropdown.classList.remove('active');
    }
  });

  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      applyTheme(theme);
      localStorage.setItem('desinomad-theme', theme);
      themeDropdown.classList.remove('active');

      themeOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.textContent = themeEmojis[theme] || '\u{1F331}';

  const activeOption = document.querySelector(`.theme-option[data-theme="${theme}"]`);
  document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
  if (activeOption) activeOption.classList.add('active');
}
