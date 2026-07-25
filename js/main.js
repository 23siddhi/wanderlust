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

// Close nav when clicking outside
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
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
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

// ===== Search Form Handler =====
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const destination = document.getElementById('destination').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const travelers = document.getElementById('travelers').value;

  if (!destination) {
    alert('Please select a destination');
    return;
  }

  if (!checkin || !checkout) {
    alert('Please select your travel dates');
    return;
  }

  if (new Date(checkout) <= new Date(checkin)) {
    alert('Check-out date must be after check-in date');
    return;
  }

  alert(
    `Searching for trips to ${destination}\n` +
    `Check-in: ${checkin}\n` +
    `Check-out: ${checkout}\n` +
    `Travelers: ${travelers}`
  );
});

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

// ===== Set minimum dates for booking =====
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
});
