// Pure logic — no DOM, no I/O. Everything here is unit-tested.
import { PROJECTS, ROADMAP } from '../content/data.mjs';

export function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function filterProjects(projects, { difficulty, tag } = {}) {
  return projects.filter(p =>
    (!difficulty || p.difficulty === difficulty) &&
    (!tag || p.tags.includes(tag)));
}

// Search across roadmap topics and projects. Returns typed hits.
export function searchAll(query) {
  const q = String(query ?? '').trim().toLowerCase();
  if (q.length < 2) return [];
  const hits = [];
  for (const ph of ROADMAP) {
    for (const it of ph.items) {
      if ((it.topic + ' ' + it.why).toLowerCase().includes(q)) {
        hits.push({ kind: 'roadmap', phase: ph.title, topic: it.topic });
      }
    }
  }
  for (const p of PROJECTS) {
    if ((p.title + ' ' + p.pitch + ' ' + p.tags.join(' ')).toLowerCase().includes(q)) {
      hits.push({ kind: 'project', id: p.id, title: p.title });
    }
  }
  return hits;
}

// Progress store: defends against malformed/hostile localStorage payloads.
// Only `{ [id]: true }` entries survive; prototype pollution is impossible
// because we copy onto a fresh plain object key-by-key with a name filter.
export function parseProgress(raw) {
  if (typeof raw !== 'string' || !raw) return {};
  let data;
  try { data = JSON.parse(raw); } catch { return {}; }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return {};
  const out = {};
  for (const key of Object.keys(data)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    if (data[key] === true) out[key] = true;
  }
  return out;
}

export function serializeProgress(state) {
  return JSON.stringify(state);
}

export function progressPercent(state, total) {
  if (!total) return 0;
  const done = Object.values(state).filter(v => v === true).length;
  return Math.round((done / total) * 100);
}
