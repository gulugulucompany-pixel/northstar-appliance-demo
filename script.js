(function () {
  'use strict';

  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('primary-nav');
  var header = document.getElementById('site-header');
  var heroMedia = document.getElementById('hero-media');
  var heroPhoto = document.getElementById('hero-photo');

  /* Mobile navigation */
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* Header shadow once the page scrolls */
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Hero photo fallback: show the illustration if the photo file is missing */
  function showFallback() {
    if (heroMedia) heroMedia.classList.add('no-photo');
  }
  if (heroPhoto) {
    heroPhoto.addEventListener('error', showFallback);
    if (heroPhoto.complete && heroPhoto.naturalWidth === 0) showFallback();
  }
})();
