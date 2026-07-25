// ===== Destination Data =====
const destinations = {
  kerala:     { name: 'Kerala',            price: 14999, days: 4, highlights: 'Houseboat Stay, Munnar Tea Gardens, Alleppey Backwaters, Kathakali Show', bestTime: 'Sep - Mar' },
  varanasi:   { name: 'Varanasi (Banaras)', price: 9999,  days: 3, highlights: 'Ganga Aarti, Kashi Vishwanath Temple, Sarnath, Silk Shopping', bestTime: 'Oct - Mar' },
  manali:     { name: 'Manali',            price: 12999, days: 5, highlights: 'Rohtang Pass, Solang Valley, Hadimba Temple, River Rafting', bestTime: 'Mar - Jun' },
  kasol:      { name: 'Kasol',             price: 11999, days: 4, highlights: 'Kheerganga Trek, Parvati River, Malana Village, Cafe Hopping', bestTime: 'Mar - Jun' },
  shimla:     { name: 'Shimla',            price: 10999, days: 3, highlights: 'Mall Road, The Ridge, Jakhoo Temple, Toy Train Ride', bestTime: 'Mar - Jun' },
  goa:        { name: 'Goa',               price: 13999, days: 4, highlights: 'Baga Beach, Old Goa Churches, Dudhsagar Falls, Night Market', bestTime: 'Nov - Feb' },
  jaipur:     { name: 'Jaipur, Rajasthan', price: 15999, days: 4, highlights: 'Amber Fort, Hawa Mahal, City Palace, Jal Mahal', bestTime: 'Oct - Mar' },
  ladakh:     { name: 'Ladakh',            price: 24999, days: 7, highlights: 'Pangong Lake, Khardung La, Nubra Valley, Monasteries', bestTime: 'Jun - Sep' },
  darjeeling: { name: 'Darjeeling',        price: 16999, days: 4, highlights: 'Tiger Hill Sunrise, Tea Gardens, Toy Train, Batasia Loop', bestTime: 'Mar - May' },
  rishikesh:  { name: 'Rishikesh',         price: 8999,  days: 3, highlights: 'Laxman Jhula, Ganga Aarti, White Water Rafting, Beatles Ashram', bestTime: 'Sep - Nov' },
};

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString('en-IN');
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString('en-IN');
      }
    };
    update();
  });
}

// ===== Scroll Reveal =====
function setupScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.search-bar, .destinations, .packages, .about, .testimonials, .contact, .footer').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ===== Theme Switcher =====
const themeEmojis = { light: '\u{1F331}', dark: '\u{1F319}', ocean: '\u{1F30A}', sunset: '\u{1F305}', forest: '\u{1F332}' };

function initThemeSwitcher() {
  const saved = localStorage.getItem('desinomad-theme') || 'light';
  applyTheme(saved);

  document.getElementById('themeToggle').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('themeDropdown').classList.toggle('active');
  });

  document.addEventListener('click', e => {
    const dd = document.getElementById('themeDropdown');
    const tg = document.getElementById('themeToggle');
    if (!dd.contains(e.target) && !tg.contains(e.target)) dd.classList.remove('active');
  });

  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.dataset.theme;
      applyTheme(theme);
      localStorage.setItem('desinomad-theme', theme);
      document.getElementById('themeDropdown').classList.remove('active');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeToggle').textContent = themeEmojis[theme] || '\u{1F331}';
  document.querySelectorAll('.theme-option').forEach(o => o.classList.toggle('active', o.dataset.theme === theme));
}

// ===== SEARCH - THE MAIN FEATURE =====
const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const destKey = document.getElementById('destination').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const travelers = parseInt(document.getElementById('travelers').value);

  // Validate
  let valid = true;
  if (!destKey) { shakeEl(document.getElementById('destination')); valid = false; }
  if (!checkin) { shakeEl(document.getElementById('checkin')); valid = false; }
  if (!checkout) { shakeEl(document.getElementById('checkout')); valid = false; }
  if (valid && new Date(checkout) <= new Date(checkin)) { shakeEl(document.getElementById('checkout')); valid = false; }
  if (!valid) return;

  const data = destinations[destKey];
  const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000*60*60*24));
  const totalPerPerson = data.price + Math.max(0, nights - data.days) * 1500;
  const totalAll = totalPerPerson * travelers;

  // Fill results
  document.getElementById('resultsTitle').textContent = data.name + ' Trip Found!';
  document.getElementById('resultsDetails').innerHTML = `
    <div class="result-row"><span class="result-label">Destination</span><span class="result-value">${data.name}</span></div>
    <div class="result-row"><span class="result-label">Best Time</span><span class="result-value">${data.bestTime}</span></div>
    <div class="result-row"><span class="result-label">Duration</span><span class="result-value">${nights} Nights / ${nights + 1} Days</span></div>
    <div class="result-row"><span class="result-label">Check-in</span><span class="result-value">${fmtDate(checkin)}</span></div>
    <div class="result-row"><span class="result-label">Check-out</span><span class="result-value">${fmtDate(checkout)}</span></div>
    <div class="result-row"><span class="result-label">Travelers</span><span class="result-value">${travelers} ${travelers === 1 ? 'Person' : 'People'}</span></div>
    <div class="result-row"><span class="result-label">Price/Person</span><span class="result-value">\u20B9${totalPerPerson.toLocaleString('en-IN')}</span></div>
    <div class="result-row"><span class="result-label">Highlights</span><span class="result-value">${data.highlights}</span></div>
    <div class="result-row result-total"><span class="result-label">Total Cost</span><span class="result-value">\u20B9${totalAll.toLocaleString('en-IN')}</span></div>
  `;

  searchResults.style.display = 'block';
  searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Highlight destination card
  const card = document.querySelector('[data-dest="' + destKey + '"]');
  if (card) {
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('dest-highlight');
      setTimeout(() => card.classList.remove('dest-highlight'), 3000);
    }, 500);
  }
});

// Close results
document.getElementById('resultsClose').addEventListener('click', () => {
  searchResults.style.display = 'none';
});

// View destination
document.getElementById('resultsViewDest').addEventListener('click', function(e) {
  e.preventDefault();
  const destKey = document.getElementById('destination').value;
  const card = document.querySelector('[data-dest="' + destKey + '"]');
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('dest-highlight');
    setTimeout(() => card.classList.remove('dest-highlight'), 3000);
  }
});

// BOOK NOW - Full booking confirmation
document.getElementById('resultsBookNow').addEventListener('click', function() {
  const destKey = document.getElementById('destination').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const travelers = parseInt(document.getElementById('travelers').value);
  const data = destinations[destKey];
  const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000*60*60*24));
  const total = (data.price + Math.max(0, nights - data.days) * 1500) * travelers;

  document.getElementById('modalTitle').textContent = 'Booking Confirmed for ' + data.name + '!';
  document.getElementById('modalMessage').textContent = 'Your trip has been booked successfully. Our team will contact you within 2 hours to confirm details.';
  document.getElementById('modalDetails').innerHTML = `
    <div class="modal-row"><span>Booking ID</span><span>DN${Date.now().toString().slice(-8)}</span></div>
    <div class="modal-row"><span>Destination</span><span>${data.name}</span></div>
    <div class="modal-row"><span>Dates</span><span>${fmtDate(checkin)} to ${fmtDate(checkout)}</span></div>
    <div class="modal-row"><span>Travelers</span><span>${travelers}</span></div>
    <div class="modal-row"><span>Total</span><span>\u20B9${total.toLocaleString('en-IN')}</span></div>
    <div class="modal-row"><span>Contact</span><span>+91 98765 43210</span></div>
  `;

  document.getElementById('bookingModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

// Close modal
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalDone').addEventListener('click', closeModal);

document.getElementById('bookingModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

function closeModal() {
  document.getElementById('bookingModal').style.display = 'none';
  document.body.style.overflow = '';
}

// ===== Newsletter =====
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input').value;
  if (email) {
    alert('Thanks for subscribing! We will send travel deals to ' + email);
    this.reset();
  }
});

// ===== Date Setup =====
const today = new Date().toISOString().split('T')[0];
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
checkinInput.min = today;
checkoutInput.min = today;

checkinInput.addEventListener('change', () => {
  checkoutInput.min = checkinInput.value;
  if (checkoutInput.value && checkoutInput.value <= checkinInput.value) checkoutInput.value = '';
});

// ===== Helpers =====
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

function shakeEl(el) {
  el.style.borderColor = '#ef4444';
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 600);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  setupScrollReveal();
  initThemeSwitcher();
});
