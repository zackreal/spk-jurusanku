

let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

const nav = document.getElementById('main-nav');

function onScroll({ scroll }) {
  if (scroll > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

if (lenis) {
  lenis.on('scroll', onScroll);
} else {

  window.addEventListener('scroll', () => onScroll({ scroll: window.scrollY }), { passive: true });
}

const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
    });
  });
}

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (!target) return;
  const duration = 1600;
  const startTime = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(easeOut(progress) * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {

      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 80);
    } else {

      if (entry.boundingClientRect.top < 0) {
        entry.target.classList.remove('revealed');
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(animateCount);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

const cardStack = document.querySelector('.hero-card-stack');
if (cardStack) {
  cardStack.addEventListener('mousemove', (e) => {
    const rect = cardStack.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const rotateX = -y * 6;
    const rotateY = x * 8;
    cardStack.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  cardStack.addEventListener('mouseleave', () => {
    cardStack.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    cardStack.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  });
  cardStack.addEventListener('mouseenter', () => {
    cardStack.style.transition = 'transform 0.1s linear';
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const selector = anchor.getAttribute('href');
    const target = document.querySelector(selector);
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
  if (lenis) lenis.destroy();
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}
