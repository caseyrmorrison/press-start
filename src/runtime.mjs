// Client-side runtime, inlined at build time. Small on purpose: rendering
// happens at build; this handles filters, progress, copy, search, and the
// scope figure. The progress-store guards mirror src/logic.mjs (unit-tested).
// searchIndexJson must be pre-sanitized JSON (no raw "<").
export const makeRuntime = (searchIndexJson) => `
(function () {
  'use strict';
  var KEY = 'press-start-progress';
  var INDEX = ${searchIndexJson};

  // --- progress store (hardened parse; see logic.mjs tests) ---
  function parseProgress(raw) {
    if (typeof raw !== 'string' || !raw) return {};
    var data;
    try { data = JSON.parse(raw); } catch (e) { return {}; }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return {};
    var out = {};
    for (var i = 0, ks = Object.keys(data); i < ks.length; i++) {
      var k = ks[i];
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
      if (data[k] === true) out[k] = true;
    }
    return out;
  }
  var progress = {};
  try { progress = parseProgress(localStorage.getItem(KEY)); } catch (e) {}

  var boxes = Array.prototype.slice.call(document.querySelectorAll('[data-progress-id]'));
  function refreshBar() {
    var done = boxes.filter(function (b) { return b.checked; }).length;
    var pct = boxes.length ? Math.round(done / boxes.length * 100) : 0;
    var fill = document.querySelector('.progressbar .fill');
    var label = document.querySelector('.progressbar .pct');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = pct + '% (' + done + '/' + boxes.length + ' topics)';
  }
  boxes.forEach(function (box) {
    var id = box.getAttribute('data-progress-id');
    if (progress[id]) box.checked = true;
    box.addEventListener('change', function () {
      if (box.checked) progress[id] = true; else delete progress[id];
      try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) {}
      refreshBar();
    });
  });
  refreshBar();

  // --- project filters (difficulty + tag chips, AND semantics) ---
  var active = { difficulty: null, tag: null };
  var cards = Array.prototype.slice.call(document.querySelectorAll('.proj[data-difficulty]'));
  function applyFilters() {
    var visible = 0;
    cards.forEach(function (c) {
      var okD = !active.difficulty || c.getAttribute('data-difficulty') === active.difficulty;
      var okT = !active.tag || (' ' + c.getAttribute('data-tags') + ' ').indexOf(' ' + active.tag + ' ') >= 0;
      c.style.display = (okD && okT) ? '' : 'none';
      if (okD && okT) visible++;
    });
    var count = document.querySelector('[data-proj-count]');
    if (count) count.textContent = visible + ' of ' + cards.length + ' shown';
  }
  Array.prototype.forEach.call(document.querySelectorAll('.chipbtn'), function (btn) {
    btn.addEventListener('click', function () {
      var kind = btn.getAttribute('data-kind'), val = btn.getAttribute('data-val');
      var on = btn.getAttribute('aria-pressed') === 'true';
      Array.prototype.forEach.call(
        document.querySelectorAll('.chipbtn[data-kind="' + kind + '"]'),
        function (b) { b.setAttribute('aria-pressed', 'false'); });
      active[kind] = on ? null : val;
      btn.setAttribute('aria-pressed', on ? 'false' : 'true');
      applyFilters();
    });
  });

  // --- hero oscilloscope: a sine acquiring harmonics until it is square ---
  (function scope() {
    var cv = document.getElementById('scope');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    var reduced = false;
    try { reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    function wave(x, harmonics) {           // square-wave Fourier partial sum
      var y = 0;
      for (var k = 1; k <= harmonics; k += 2) y += Math.sin(x * k) / k;
      return y * (4 / Math.PI);
    }
    function draw(harmonics, phase) {
      ctx.fillStyle = '#10141c'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#1d2736'; ctx.lineWidth = 1;   // graticule
      ctx.beginPath();
      for (var gx = 0; gx <= W; gx += W / 10) { ctx.moveTo(gx, 0); ctx.lineTo(gx, H); }
      for (var gy = 0; gy <= H; gy += H / 8) { ctx.moveTo(0, gy); ctx.lineTo(W, gy); }
      ctx.stroke();
      ctx.strokeStyle = '#2a3854';
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
      ctx.strokeStyle = '#5ccfe6'; ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(92,207,230,0.6)'; ctx.shadowBlur = 10;
      ctx.beginPath();
      for (var px = 0; px <= W; px++) {
        var y = H / 2 - wave(px / W * Math.PI * 4 + phase, harmonics) * H * 0.3;
        if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#718096';
      ctx.font = '16px ui-monospace, Menlo, monospace';
      ctx.fillText('CH1  500mV', 14, 24);
      ctx.fillStyle = '#ffb454';
      ctx.fillText('HARMONICS: ' + harmonics, W - 170, 24);
    }
    if (reduced) { draw(15, 0); return; }
    var t = 0;
    (function tick() {
      t += 0.016;
      // breathe between 1 and 15 harmonics on an 8s cycle
      var h = 1 + 2 * Math.round(6.5 + 6.5 * Math.sin(t * Math.PI / 4 - Math.PI / 2));
      draw(h, t * 1.4);
      requestAnimationFrame(tick);
    })();
  })();

  // --- sticky nav: highlight the section in view ---
  (function navspy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('nav.toc a'));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    if (!('IntersectionObserver' in window)) return;
    var current = null;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (current) current.classList.remove('active');
          current = map[en.target.id];
          if (current) current.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  })();

  // --- quick find (mirrors logic.mjs searchAll semantics) ---
  (function qfind() {
    var input = document.getElementById('qfind');
    var panel = document.getElementById('qresults');
    if (!input || !panel) return;
    function esc(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function close() { panel.hidden = true; panel.innerHTML = ''; }
    function go(anchor) {
      close(); input.value = '';
      var el = document.getElementById(anchor);
      if (!el) return;
      el.scrollIntoView({ block: 'center' });
      el.classList.add('flash');
      setTimeout(function () { el.classList.remove('flash'); }, 1600);
    }
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) { close(); return; }
      var hits = INDEX.filter(function (e) {
        return (e.label + ' ' + e.text).toLowerCase().indexOf(q) >= 0;
      }).slice(0, 8);
      if (!hits.length) {
        panel.innerHTML = '<div class="qempty">no hits — try "audio", "c++", "rollback"…</div>';
        panel.hidden = false; return;
      }
      panel.innerHTML = hits.map(function (h, i) {
        return '<button type="button" data-i="' + i + '"><span class="qk qk-' + h.kind + '">' +
          (h.kind === 'project' ? 'PROJ' : 'STUDY') + '</span><span>' + esc(h.label) + '</span></button>';
      }).join('');
      Array.prototype.forEach.call(panel.querySelectorAll('button'), function (b) {
        b.addEventListener('click', function () { go(hits[+b.getAttribute('data-i')].anchor); });
      });
      panel.hidden = false;
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter') {
        var first = panel.querySelector('button');
        if (first) first.click();
      }
    });
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && e.target !== input) close();
    });
  })();

  // --- copy buttons ---
  Array.prototype.forEach.call(document.querySelectorAll('.copybtn'), function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('details').querySelector('pre');
      if (!pre) return;
      var done = function () {
        var t = btn.textContent; btn.textContent = 'copied ✓';
        setTimeout(function () { btn.textContent = t; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pre.textContent).then(done, function () {});
      } else {
        var r = document.createRange(); r.selectNodeContents(pre);
        var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        try { document.execCommand('copy'); done(); } catch (e) {}
        sel.removeAllRanges();
      }
    });
  });
})();
`;
