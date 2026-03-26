/* ================================================
   NOLEN SMITH // PORTFOLIO
   App JavaScript (Multi-page)
   ================================================ */

(function () {
  'use strict';

  // ---- THEME TOGGLE ----
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // In-memory theme state for sandboxed environments
  var currentTheme = 'dark';

  // Try to restore from sessionStorage for multi-page persistence
  try {
    var saved = sessionStorage.getItem('ns-theme');
    if (saved === 'light' || saved === 'dark') {
      currentTheme = saved;
    }
  } catch (e) {}

  function setTheme(theme) {
    currentTheme = theme;
    html.setAttribute('data-theme', theme);
    try { sessionStorage.setItem('ns-theme', theme); } catch (e) {}
  }

  setTheme(currentTheme);

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ---- LIVE CLOCK (Austin, TX) ----
  var clockEl = document.getElementById('clockTime');

  function updateClock() {
    if (!clockEl) return;
    var now = new Date();
    var options = {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockEl.textContent = now.toLocaleTimeString('en-US', options);
  }

  updateClock();
  setInterval(updateClock, 1000);

  // ---- NAVBAR SCROLL STATE ----
  var navbar = document.getElementById('navbar');

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- MOBILE MENU ----
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
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
  }

  // ---- SCROLL REVEAL (IntersectionObserver) ----
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var parent = entry.target.parentElement;
            var siblings = parent ? parent.querySelectorAll('.reveal') : [];
            var staggerIndex = 0;

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
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
