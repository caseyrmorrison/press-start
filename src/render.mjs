// Build-time page renderer. Pure string generation from the tested content
// model; every content string passes through escapeHtml (defense in depth).
import { PROJECTS, ROADMAP, SKILL_MAP, TRACKS, ENGINES } from '../content/data.mjs';
import { escapeHtml as esc } from './logic.mjs';
import { STYLES } from './styles.mjs';
import { RUNTIME } from './runtime.mjs';

const DIFF_LABEL = { weekend: 'WEEKEND', 'two-weeks': 'TWO WEEKS', 'month-plus': 'MONTH+' };

function sechead(n, title, note) {
  return `<div class="sechead"><span class="n">${n}</span><h2>${esc(title)}</h2>` +
    (note ? `<span class="secnote">${esc(note)}</span>` : '') + `</div>`;
}

function hero() {
  const topics = ROADMAP.reduce((a, ph) => a + ph.items.length, 0);
  return `
<header class="dochead sheet" style="border-bottom:none; padding-bottom:0">
  <div class="corp">PRESS<b>▶</b>START</div>
  <div class="docno">DOC. NO. GDEV-2026-01<br>REV A · JULY 2026 · SINGLE PAGE</div>
</header>
<div class="sheet" style="border-bottom:3px solid var(--rule-strong)"></div>
<nav class="toc sheet" aria-label="Sections">
  <a href="#theory"><b>1</b>THEORY OF OPERATION</a>
  <a href="#pins"><b>2</b>SKILL TRANSFER</a>
  <a href="#roadmap"><b>3</b>ROADMAP</a>
  <a href="#engines"><b>4</b>ENGINE SELECT</a>
  <a href="#projects"><b>5</b>SIDE PROJECTS</a>
  <a href="#tracks"><b>6</b>TRACKS</a>
</nav>
<div class="titleblock sheet">
  <div class="part">GDEV-101 · CAREER RETARGETING MODULE</div>
  <h1>Mid-Career Engineer → Game Developer</h1>
  <p class="sub">A field guide for the engineer with a CS degree, an ECE master's, and a
  decade of real systems behind them — who wants to build games. What to refresh, what to
  learn, what to go deep on, and ${PROJECTS.length} side projects with starter code you can
  run tonight.</p>
  <div class="boot" role="img" aria-label="Boot sequence: your background checks out">PRESS-START BIOS v2.6 — SUBSTRATE CHECK
MEMORY TEST: <b>BS COMPUTER SCIENCE ... OK</b>  <b>MS ELECTRICAL &amp; COMPUTER ENGINEERING ... OK</b>
DETECTED: <span class="amber">C/C++</span> <span class="amber">DSP</span> <span class="amber">LINEAR ALGEBRA</span> <span class="amber">COMP ARCH</span> <span class="amber">NETWORKING</span> — ALL USABLE. NOTHING WASTED.
BOOTING CAREER RETARGET MODULE ...</div>
  <div class="ratings">
    <div><b>${SKILL_MAP.length}</b>SKILL-TRANSFER LANES</div>
    <div><b>${ROADMAP.length}</b>ROADMAP PHASES</div>
    <div><b>${topics}</b>STUDY TOPICS</div>
    <div><b>${PROJECTS.length}</b>PROJECTS W/ CODE</div>
    <div><b>0</b>EXTERNAL DEPENDENCIES</div>
  </div>
</div>`;
}

function theory() {
  const disciplines = [
    ['ENGINE / SYSTEMS', 'The runtime itself: loops, memory, jobs, asset I/O. The closest lane to embedded work.'],
    ['GAMEPLAY', 'Mechanics, controls, AI, UI. Where "is it fun?" gets decided, in code, daily.'],
    ['GRAPHICS', 'The GPU pipeline, shaders, lighting. Computer architecture with pictures.'],
    ['AUDIO', 'Synthesis, mixing, dynamic music. Applied DSP — and chronically understaffed.'],
    ['NETCODE', 'Prediction, rollback, sync. Distributed systems at 60 Hz with humans attached.'],
    ['TOOLS', 'Editors and pipelines other devs live in. Undervalued, hired everywhere.']
  ];
  return `
<section id="theory" class="sheet">
  ${sechead('1', 'Theory of Operation', 'why this works')}
  <p class="lead">Game development looks like a young person's field from outside. From
  inside, it is a systems-engineering field with a punishing real-time constraint: every
  16.6 ms, simulate a world, resolve its physics, run its AI, mix its audio, and draw it —
  on hardware you don't control. That constraint is why your background transfers: you have
  spent a career shipping under budgets of watts, cycles, and milliseconds.</p>
  <p class="lead">The gap is not ability; it is vocabulary and reps. You need the patterns
  games use (game loops, ECS, state machines), the tools they use (engines, profilers,
  frame debuggers), and a handful of finished projects. This document is the shortest
  honest path through all three.</p>
  <div class="disciplines">
    ${disciplines.map(([t, d]) =>
      `<div><div class="dt">${esc(t)}</div><div class="dd">${esc(d)}</div></div>`).join('')}
  </div>
</section>`;
}

function pins() {
  return `
<section id="pins" class="sheet">
  ${sechead('2', 'Pin Configuration — Skill Transfer', `${SKILL_MAP.length} lanes`)}
  <p class="lead">Every pin on your existing package routes somewhere in game development.
  No de-soldering required.</p>
  <div class="tablewrap">
  <table>
    <thead><tr><th>Pin</th><th>You already have</th><th>In game dev it becomes</th><th>Detail</th></tr></thead>
    <tbody>
    ${SKILL_MAP.map((s, i) => `<tr>
      <td class="mono">${i + 1}</td>
      <td><span class="to">${esc(s.have)}</span></td>
      <td><span class="to" style="color:var(--red)">${esc(s.becomes)}</span></td>
      <td><div class="detail">${esc(s.detail)}</div></td>
    </tr>`).join('')}
    </tbody>
  </table>
  </div>
</section>`;
}

function roadmap() {
  return `
<section id="roadmap" class="sheet">
  ${sechead('3', 'Operating Sequence — Study Roadmap', '~6 months, part-time')}
  <p class="lead">Four phases, each with topics marked <strong>REFRESH</strong> (you knew
  this once), <strong>NEW</strong> (games-specific, learn from scratch), or
  <strong>DEEP</strong> (worth real depth — this is where leverage lives). Check topics off;
  progress persists in your browser.</p>
  <div class="progressbar"><span>BURN-IN</span><div class="track"><div class="fill"></div></div><span class="pct">0%</span></div>
  ${ROADMAP.map(ph => `
  <div class="phase">
    <div class="phase-head">
      <span class="ph-n">PHASE ${ph.order}</span>
      <h3 style="margin:0">${esc(ph.title)}</h3>
      <span class="ph-w">${esc(ph.weeks)}</span>
      <span class="ph-goal">${esc(ph.goal)}</span>
    </div>
    ${ph.items.map((it, i) => `
    <div class="item">
      <input type="checkbox" data-progress-id="ph${ph.order}-${i}" aria-label="Mark ${esc(it.topic)} done">
      <span class="badge ${it.kind}">${it.kind.toUpperCase()}</span>
      <div class="body">
        <h3>${esc(it.topic)}</h3>
        <div class="why">${esc(it.why)}</div>
        <div class="res">${it.resources.map(r => `<span>${esc(r)}</span>`).join('')}</div>
      </div>
    </div>`).join('')}
  </div>`).join('')}
</section>`;
}

function engines() {
  return `
<section id="engines" class="sheet">
  ${sechead('4', 'Component Selection — Pick an Engine', 'commit to one')}
  <p class="lead">Sample all three for a weekend each during Phase 3, then commit. Engine
  choice is a career-direction choice, not a technology beauty contest.</p>
  <div class="engines">
    ${ENGINES.map(e => `
    <div class="engine">
      <h3>${esc(e.name)}</h3>
      <div class="spec">LANG&nbsp;&nbsp;&nbsp;<b>${esc(e.language)}</b><br>
LICENSE&nbsp;<b>${esc(e.license)}</b><br>
CURVE&nbsp;&nbsp;&nbsp;<b>${esc(e.curve)}</b><br>
BEST&nbsp;&nbsp;&nbsp;&nbsp;<b>${esc(e.bestFor)}</b></div>
      <div class="pick">${esc(e.pick)}</div>
      <div class="warn">${esc(e.watchOut)}</div>
    </div>`).join('')}
  </div>
</section>`;
}

function projects() {
  const allTags = [...new Set(PROJECTS.flatMap(p => p.tags))].sort();
  return `
<section id="projects" class="sheet">
  ${sechead('5', 'Application Notes — Side Projects', 'starter code included')}
  <p class="lead">Each project is scoped, has a bring-up sequence (milestones in order),
  and ships with starter code that runs with zero dependencies. Copy it, run it tonight,
  then make it yours — the "next:" comments mark where the real project begins.</p>
  <div class="filters" role="group" aria-label="Filter projects">
    <span class="fl">Effort</span>
    ${['weekend', 'two-weeks', 'month-plus'].map(d =>
      `<button class="chipbtn" data-kind="difficulty" data-val="${d}" aria-pressed="false">${DIFF_LABEL[d]}</button>`).join('')}
    <span class="fl" style="margin-left:12px">Topic</span>
    ${allTags.map(t =>
      `<button class="chipbtn" data-kind="tag" data-val="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('')}
    <span class="fl" style="margin-left:auto" data-proj-count>${PROJECTS.length} of ${PROJECTS.length} shown</span>
  </div>
  <div class="projgrid">
    ${PROJECTS.map(p => `
    <article class="proj" id="proj-${p.id}" data-difficulty="${p.difficulty}" data-tags="${esc(p.tags.join(' '))}">
      <div class="meta"><span class="diff">${DIFF_LABEL[p.difficulty]}</span><span>·</span>${p.tags.map(esc).join(' · ')}</div>
      <h3>${esc(p.title)}</h3>
      <div class="pitch">${esc(p.pitch)}</div>
      <div class="angle"><b>WHY YOUR BACKGROUND HELPS</b>${esc(p.eceAngle)}</div>
      <div class="lists">
        <div><h4>You'll practice</h4><ul>${p.practices.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div><h4>Bring-up sequence</h4><ol>${p.milestones.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
      </div>
      <details class="code">
        <summary><span>starter code</span><span class="lang">${esc(p.starter.language)}</span></summary>
        <div class="runline"><span>$ ${esc(p.starter.run)}</span><button class="copybtn" type="button">copy code</button></div>
        <pre><code>${esc(p.starter.code)}</code></pre>
      </details>
    </article>`).join('')}
  </div>
</section>`;
}

function tracks() {
  const byId = Object.fromEntries(PROJECTS.map(p => [p.id, p]));
  return `
<section id="tracks" class="sheet">
  ${sechead('6', 'Reference Designs — Choose a Track', 'depth beats breadth')}
  <p class="lead">Three proven configurations of the modules above. Run one track end to
  end rather than sampling everything — a finished sequence is a portfolio.</p>
  <div class="tracks">
    ${TRACKS.map(t => `
    <div class="track">
      <h3>${esc(t.name)}</h3>
      <div class="blurb">${esc(t.blurb)}</div>
      <ol>${t.projectIds.map(id =>
        `<li><a href="#proj-${id}">${esc(byId[id].title)}</a></li>`).join('')}</ol>
    </div>`).join('')}
  </div>
</section>`;
}

function footer() {
  return `
<footer class="sheet">
  <span>PRESS START SEMICONDUCTOR — HOBBY DIVISION. THIS DOCUMENT IS PROVIDED "AS IS"; FUN IS GUARANTEED ONLY IF YOU SHIP.</span>
  <span>GDEV-2026-01 REV A · PAGE 1 OF 1</span>
</footer>`;
}

export function renderPage() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Press Start — Game Dev for the Mid-Career Engineer</title>
<style>${STYLES}</style>
</head>
<body>
${hero()}
<main>
${theory()}
${pins()}
${roadmap()}
${engines()}
${projects()}
${tracks()}
</main>
${footer()}
<script>${RUNTIME}</script>
</body>
</html>`;
}
