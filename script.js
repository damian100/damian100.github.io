/* DAMIAN — SEC · behavior: theme toggle, avalanche instrument,
   hash glyphs, page integrity, section reveal. No dependencies. */

(function () {
  'use strict';

  var subtle = window.crypto && window.crypto.subtle;
  // SHA-256("hello") — static fallback when WebCrypto is unavailable (e.g. non-HTTPS)
  var FALLBACK_HEX =
    '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824';

  function sha256Hex(text) {
    var bytes = new TextEncoder().encode(text);
    return subtle.digest('SHA-256', bytes).then(function (buf) {
      return Array.prototype.map
        .call(new Uint8Array(buf), function (b) {
          return b.toString(16).padStart(2, '0');
        })
        .join('');
    });
  }

  function hexToBits(hex) {
    var bits = [];
    for (var i = 0; i < hex.length; i++) {
      var n = parseInt(hex[i], 16);
      bits.push((n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1);
    }
    return bits;
  }

  /* ---------- theme toggle ---------- */

  var toggle = document.getElementById('theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    var forced = document.documentElement.dataset.theme;
    if (forced === 'light' || forced === 'dark') return forced;
    return media.matches ? 'dark' : 'light';
  }

  function renderToggle() {
    // The button shows the theme it will switch TO
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    toggle.textContent = next.toUpperCase();
    toggle.setAttribute('aria-label', next === 'dark' ? '어두운 테마로 전환' : '밝은 테마로 전환');
  }

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    renderToggle();
    drawAllGlyphs();
  });

  media.addEventListener('change', function () {
    renderToggle();
    drawAllGlyphs();
  });

  renderToggle();

  /* ---------- avalanche instrument ---------- */

  var input = document.getElementById('avalanche-input');
  var digestOut = document.getElementById('avalanche-digest');
  var bitsBox = document.getElementById('avalanche-bits');
  var ticks = [];

  for (var i = 0; i < 256; i++) {
    ticks.push(bitsBox.appendChild(document.createElement('i')));
  }

  function renderDigest(hex) {
    digestOut.textContent = hex;
    var bits = hexToBits(hex);
    for (var i = 0; i < 256; i++) {
      ticks[i].classList.toggle('on', bits[i] === 1);
    }
  }

  var pending = 0;
  function updateInstrument() {
    var seq = ++pending;
    sha256Hex(input.value).then(function (hex) {
      if (seq === pending) renderDigest(hex); // drop stale keystrokes
    });
  }

  if (subtle) {
    input.addEventListener('input', updateInstrument);
    updateInstrument();
  } else {
    input.disabled = true;
    renderDigest(FALLBACK_HEX);
  }

  /* ---------- project hash glyphs ---------- */

  var glyphs = Array.prototype.slice.call(document.querySelectorAll('.hash-glyph'));

  function drawGlyph(canvas, hex) {
    var dpr = window.devicePixelRatio || 1;
    var size = 32;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--hairline').trim();
    // first 8 bytes → 64 bits → 8×8 cell grid
    var bits = hexToBits(hex.slice(0, 16));
    var cell = size / 8;
    for (var i = 0; i < 64; i++) {
      if (bits[i] === 1) {
        ctx.fillRect((i % 8) * cell, Math.floor(i / 8) * cell, cell - 1, cell - 1);
      }
    }
  }

  function drawAllGlyphs() {
    glyphs.forEach(function (canvas) {
      var seed = canvas.dataset.seed || '';
      if (subtle) {
        sha256Hex(seed).then(function (hex) { drawGlyph(canvas, hex); });
      } else {
        drawGlyph(canvas, FALLBACK_HEX);
      }
    });
  }

  drawAllGlyphs();

  /* ---------- page integrity (colophon detail) ---------- */

  var integrity = document.getElementById('page-integrity');
  if (subtle) {
    sha256Hex(document.documentElement.outerHTML).then(function (hex) {
      integrity.textContent = hex;
    });
  } else {
    integrity.textContent = 'unavailable';
  }

  /* ---------- section reveal ---------- */

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealed = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealed.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } /* tall lists on small screens never reach higher ratios */
    );
    revealed.forEach(function (el) { observer.observe(el); });
  }
})();
