// Schema/invariant tests for the content model. Written first (TDD): the data
// file must satisfy every invariant here or the build refuses to emit.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, ROADMAP, SKILL_MAP, DIFFICULTIES, TRACKS, ENGINES } from '../content/data.mjs';

test('engines: all three mainstream engines, complete guidance', () => {
  assert.equal(ENGINES.length, 3);
  for (const e of ENGINES) {
    for (const f of ['name', 'language', 'license', 'curve', 'bestFor', 'pick', 'watchOut']) {
      assert.ok(typeof e[f] === 'string' && e[f].length >= 2, `${e.name}: missing ${f}`);
    }
    assert.ok(e.pick.length >= 40, `${e.name}: pick rationale too thin`);
  }
});

test('difficulty enum is closed', () => {
  assert.deepEqual(DIFFICULTIES, ['weekend', 'two-weeks', 'month-plus']);
});

test('projects: at least 6, unique ids, complete fields', () => {
  assert.ok(PROJECTS.length >= 6, `only ${PROJECTS.length} projects`);
  const ids = new Set();
  for (const p of PROJECTS) {
    assert.match(p.id, /^[a-z0-9-]+$/, `bad id ${p.id}`);
    assert.ok(!ids.has(p.id), `duplicate id ${p.id}`);
    ids.add(p.id);
    assert.ok(p.title.length > 3);
    assert.ok(DIFFICULTIES.includes(p.difficulty), `${p.id}: bad difficulty ${p.difficulty}`);
    assert.ok(p.tags.length >= 2, `${p.id}: needs >=2 tags`);
    assert.ok(p.pitch.length >= 40, `${p.id}: pitch too thin`);
    assert.ok(p.eceAngle.length >= 30, `${p.id}: needs a real ECE/CS-background angle`);
    assert.ok(Array.isArray(p.practices) && p.practices.length >= 3, `${p.id}: needs >=3 practice bullets`);
    assert.ok(Array.isArray(p.milestones) && p.milestones.length >= 3, `${p.id}: needs >=3 milestones`);
    assert.ok(p.starter && p.starter.language, `${p.id}: starter code missing`);
    assert.ok(p.starter.code.split('\n').length >= 15, `${p.id}: starter code too short to be useful`);
    assert.ok(p.starter.run.length > 5, `${p.id}: needs run instructions`);
  }
});

test('projects: every difficulty tier is represented', () => {
  for (const d of DIFFICULTIES) {
    assert.ok(PROJECTS.some(p => p.difficulty === d), `no ${d} project`);
  }
});

test('roadmap: phases ordered, items typed refresh|new|deep', () => {
  assert.ok(ROADMAP.length >= 3, 'need >=3 phases');
  ROADMAP.forEach((phase, i) => {
    assert.equal(phase.order, i + 1, 'phases must be ordered');
    assert.ok(phase.title.length > 3);
    assert.ok(phase.weeks.length > 0, `${phase.title}: needs a time estimate`);
    assert.ok(phase.items.length >= 3, `${phase.title}: needs >=3 items`);
    for (const item of phase.items) {
      assert.ok(['refresh', 'new', 'deep'].includes(item.kind), `${item.topic}: bad kind ${item.kind}`);
      assert.ok(item.topic.length > 2);
      assert.ok(item.why.length >= 30, `${item.topic}: 'why' must be substantive`);
      assert.ok(Array.isArray(item.resources) && item.resources.length >= 1, `${item.topic}: needs >=1 resource`);
    }
  });
});

test('roadmap: uses all three item kinds (refresh, new, deep)', () => {
  const kinds = new Set(ROADMAP.flatMap(ph => ph.items.map(it => it.kind)));
  assert.deepEqual([...kinds].sort(), ['deep', 'new', 'refresh']);
});

test('skill map: every entry maps an existing ECE/CS skill to a gamedev use', () => {
  assert.ok(SKILL_MAP.length >= 5);
  for (const s of SKILL_MAP) {
    assert.ok(s.have.length > 3, 'needs the skill they already have');
    assert.ok(s.becomes.length > 3, 'needs the gamedev discipline it becomes');
    assert.ok(s.detail.length >= 40, `${s.have}: detail too thin`);
  }
});

test('tracks: each track references only real project ids', () => {
  const ids = new Set(PROJECTS.map(p => p.id));
  assert.ok(TRACKS.length >= 2);
  for (const t of TRACKS) {
    assert.ok(t.name.length > 2 && t.blurb.length >= 20);
    assert.ok(t.projectIds.length >= 2, `${t.name}: needs >=2 projects`);
    for (const id of t.projectIds) assert.ok(ids.has(id), `${t.name}: unknown project ${id}`);
  }
});

test('starter code never requires the network or nonexistent local assets', () => {
  for (const p of PROJECTS) {
    assert.ok(!/https?:\/\//.test(p.starter.code), `${p.id}: starter code must be offline-runnable`);
    assert.ok(!/fetch\(|XMLHttpRequest|require\(['"](?!\.)/.test(p.starter.code) || p.starter.deps,
      `${p.id}: undeclared dependency in starter code`);
  }
});
