// Render-layer tests (TDD): the generated page must contain all content,
// fully escaped, with no raw markup leaking from data strings.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/render.mjs';
import { escapeHtml } from '../src/logic.mjs';
import { PROJECTS, ROADMAP, SKILL_MAP, TRACKS } from '../content/data.mjs';

const html = renderPage();
// Content strings appear in the page in escaped form.
const has = s => html.includes(escapeHtml(s));

test('page includes every project, roadmap topic, skill, and track', () => {
  for (const p of PROJECTS) assert.ok(has(p.title), `missing project ${p.id}`);
  for (const ph of ROADMAP) {
    assert.ok(has(ph.title), `missing phase ${ph.title}`);
    for (const it of ph.items) assert.ok(has(it.topic), `missing topic ${it.topic}`);
  }
  for (const s of SKILL_MAP) assert.ok(has(s.have), `missing skill ${s.have}`);
  for (const t of TRACKS) assert.ok(has(t.name), `missing track ${t.name}`);
});

test('starter code is escaped: no raw <script> from samples in output', () => {
  // Samples contain <script> tags; escaped they must appear as &lt;script&gt;.
  const body = html.slice(html.indexOf('id="projects"'));
  assert.ok(body.includes('&lt;script&gt;'), 'escaped sample tags expected');
  // Any raw <script> after the projects anchor must be our own runtime only.
  const scripts = body.match(/<script[^>]*>/g) ?? [];
  assert.ok(scripts.length <= 1, `unexpected raw script tags: ${scripts.length}`);
});

test('no external requests: no http(s) src/href, no @import urls', () => {
  assert.ok(!/(?:src|href)="https?:/.test(html), 'external resource reference found');
  assert.ok(!/@import\s+url\(/.test(html), '@import found');
});

test('accessibility & structure basics', () => {
  assert.ok(/<html lang="en"/.test(html));
  assert.match(html, /<title>[^<]{5,}<\/title>/);
  assert.ok((html.match(/<h1[\s>]/g) ?? []).length === 1, 'exactly one h1');
  assert.ok(!/onclick="/.test(html), 'no inline event handlers');
  const buttons = html.match(/<button/g) ?? [];
  assert.ok(buttons.length > 0, 'interactive controls expected');
});

test('both themes are defined at token level', () => {
  assert.ok(html.includes('prefers-color-scheme: dark'));
  assert.ok(html.includes('data-theme="dark"') || html.includes("data-theme='dark'")
    || html.includes(':root[data-theme=dark]') || html.includes(':root[data-theme="dark"]'));
});
