/* ================================================
   NOLEN SMITH // PORTFOLIO
   App JavaScript
   ================================================ */

(function () {
  'use strict';

  // ---- THEME TOGGLE ----
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // In-memory theme state for sandboxed environments
  var currentTheme = 'dark';

  function getPreferredTheme() {
    return currentTheme;
  }

  function setTheme(theme) {
    currentTheme = theme;
    html.setAttribute('data-theme', theme);
  }

  setTheme(getPreferredTheme());

  themeToggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ---- LIVE CLOCK (Austin, TX) ----
  const clockEl = document.getElementById('clockTime');

  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeStr = now.toLocaleTimeString('en-US', options);
    clockEl.textContent = timeStr;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // ---- NAVBAR SCROLL STATE ----
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class for border
    if (scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- MOBILE MENU ----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  mobileMenuBtn.addEventListener('click', function () {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ---- SCROLL REVEAL (IntersectionObserver) ----
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger children if there are multiple siblings
            const parent = entry.target.parentElement;
            const siblings = parent ? parent.querySelectorAll('.reveal') : [];
            let staggerIndex = 0;

            siblings.forEach(function (sib, i) {
              if (sib === entry.target) staggerIndex = i;
            });

            entry.target.style.transitionDelay = (staggerIndex * 0.06) + 's';
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- ACTIVE NAV LINK HIGHLIGHT ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.style.color = '';
              if (link.getAttribute('href') === '#' + id) {
                link.style.color = 'var(--color-text)';
              }
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px'
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

})();
