// Pure-function tests, written before the implementation (TDD).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeHtml, filterProjects, searchAll, parseProgress, serializeProgress,
  progressPercent
} from '../src/logic.mjs';
import { PROJECTS, ROADMAP } from '../content/data.mjs';

// --- escapeHtml: adversarial strings (XSS defense in depth) ---
test('escapeHtml neutralizes markup and quotes', () => {
  assert.equal(escapeHtml('<script>alert(1)</script>'),
    '&lt;script&gt;alert(1)&lt;/script&gt;');
  assert.equal(escapeHtml(`a & b "c" 'd'`), 'a &amp; b &quot;c&quot; &#39;d&#39;');
  assert.equal(escapeHtml(''), '');
  assert.equal(escapeHtml('plain'), 'plain');
});

test('escapeHtml round-trips starter code safely', () => {
  for (const p of PROJECTS) {
    const out = escapeHtml(p.starter.code);
    assert.ok(!/<[a-zA-Z]/.test(out), `${p.id}: raw tag survived escaping`);
  }
});

// --- filterProjects ---
test('filterProjects: no filters returns all', () => {
  assert.equal(filterProjects(PROJECTS, {}).length, PROJECTS.length);
});

test('filterProjects: by difficulty and tag composes with AND', () => {
  const tag = PROJECTS[0].tags[0];
  const diff = PROJECTS[0].difficulty;
  const got = filterProjects(PROJECTS, { difficulty: diff, tag });
  assert.ok(got.length >= 1);
  for (const p of got) {
    assert.equal(p.difficulty, diff);
    assert.ok(p.tags.includes(tag));
  }
});

test('filterProjects: unknown tag yields empty, never throws', () => {
  assert.deepEqual(filterProjects(PROJECTS, { tag: 'no-such-tag' }), []);
});

// --- searchAll ---
test('searchAll finds roadmap topics and projects, case-insensitive', () => {
  const topic = ROADMAP[0].items[0].topic;
  const hits = searchAll(topic.toUpperCase().slice(0, 6));
  assert.ok(hits.some(h => h.kind === 'roadmap'), 'roadmap hit expected');
  const proj = PROJECTS[0].title;
  const hits2 = searchAll(proj.slice(0, 8).toLowerCase());
  assert.ok(hits2.some(h => h.kind === 'project'), 'project hit expected');
});

test('searchAll: short/empty queries return nothing (no noise)', () => {
  assert.deepEqual(searchAll(''), []);
  assert.deepEqual(searchAll('a'), []);
});

// --- progress store: hostile localStorage payloads must be rejected ---
test('parseProgress rejects malformed and hostile payloads', () => {
  assert.deepEqual(parseProgress(null), {});
  assert.deepEqual(parseProgress('not json {{{'), {});
  assert.deepEqual(parseProgress('"a string"'), {});
  assert.deepEqual(parseProgress('[1,2,3]'), {});
  assert.deepEqual(parseProgress('{"__proto__":{"x":1}}'), {});
  const out = parseProgress('{"ok-id": true, "evil": "<img onerror=x>", "n": 42}');
  assert.deepEqual(out, { 'ok-id': true }); // only boolean true survives
  assert.equal(Object.getPrototypeOf(out), Object.prototype);
  assert.equal(({}).x, undefined, 'prototype must not be polluted');
});

test('serialize/parse round-trip', () => {
  const state = { 'proj-a': true, 'phase-1-0': true };
  assert.deepEqual(parseProgress(serializeProgress(state)), state);
});

test('progressPercent', () => {
  assert.equal(progressPercent({}, 10), 0);
  assert.equal(progressPercent({ a: true, b: true }, 8), 25);
  assert.equal(progressPercent({ a: true }, 0), 0); // no div-by-zero
});
