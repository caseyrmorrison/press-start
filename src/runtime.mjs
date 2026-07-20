// Client-side runtime, inlined at build time. Small on purpose: rendering
// happens at build; this only handles filters, progress, and copy buttons.
// The progress-store guards mirror src/logic.mjs (unit-tested there).
export const RUNTIME = `
(function () {
  'use strict';
  var KEY = 'press-start-progress';

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
