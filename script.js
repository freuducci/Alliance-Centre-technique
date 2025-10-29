// Feather icons
feather.replace();

// Helpers
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

// Progress bar on scroll
const progressBar = qs('#progress-bar');
const updateProgress = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
};
document.addEventListener('scroll', updateProgress);
updateProgress();

// Navbar hide/show on scroll
let lastScrollY = window.scrollY;
const navbar = qs('#navbar');
const handleNavbar = () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollY = currentScrollY;
};
document.addEventListener('scroll', handleNavbar);

// Mobile menu toggle
window.toggleMobileMenu = () => {
  const menu = qs('#mobile-menu');
  menu.classList.toggle('hidden');
};

// Back to top button visibility + scroll behavior
const backToTop = qs('#back-to-top');
const toggleBackToTop = () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
};
document.addEventListener('scroll', toggleBackToTop);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Slideshow: cycle through slides in hero section
const slides = qsa('.slide');
if (slides.length) {
  let current = 0;
  setInterval(() => {
    const next = (current + 1) % slides.length;
    slides[current].style.opacity = 0;
    slides[next].style.opacity = 1;
    current = next;
  }, 5000);
}

// Smooth scroll for anchor links
qsa('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = qs(href);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
      const menu = qs('#mobile-menu');
      if (!menu.classList.contains('hidden')) menu.classList.add('hidden');
    }
  });
});

// Reveal elements on scroll
const revealEls = qsa('.slide-up, .hover-lift, .program-card, [class*="bg-white/5"]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up');
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('slide-up'));
}

// Contact form submit (demo only)
const form = qs('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Contact form data:', data);
    alert('Merci ! Votre message a été envoyé.');
    form.reset();
  });
}

// Auto-update dynamic accent references (optional, in case CSS vars change at runtime)
const applyAccentVars = () => {
  document.documentElement.style.setProperty('--color-primary-hover', '#ff7a1a');
};
applyAccentVars();
