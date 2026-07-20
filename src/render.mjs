// Build-time page renderer. Pure string generation from the tested content
// model; every content string passes through escapeHtml (defense in depth).
import { PROJECTS, ROADMAP, SKILL_MAP, TRACKS, ENGINES } from '../content/data.mjs';
import { escapeHtml as esc } from './logic.mjs';
import { STYLES } from './styles.mjs';
import { makeRuntime } from './runtime.mjs';

// Search index for the quick-find box; embedded as sanitized JSON.
function searchIndex() {
  const entries = [];
  for (const ph of ROADMAP) {
    ph.items.forEach((it, i) => entries.push({
      kind: 'roadmap', anchor: `ph${ph.order}-${i}`, label: it.topic, text: it.why
    }));
  }
  for (const p of PROJECTS) {
    entries.push({ kind: 'project', anchor: `proj-${p.id}`, label: p.title,
      text: p.pitch + ' ' + p.tags.join(' ') });
  }
  return JSON.stringify(entries).replace(/</g, '\\u003c');
}

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
<div class="tocbar"><nav class="toc" aria-label="Sections">
  <a href="#theory"><b>1</b>THEORY OF OPERATION</a>
  <a href="#pins"><b>2</b>SKILL TRANSFER</a>
  <a href="#roadmap"><b>3</b>ROADMAP</a>
  <a href="#engines"><b>4</b>ENGINE SELECT</a>
  <a href="#projects"><b>5</b>SIDE PROJECTS</a>
  <a href="#tracks"><b>6</b>TRACKS</a>
  <div class="qwrap">
    <input id="qfind" class="qfind" type="search" placeholder="find a topic…"
      aria-label="Search topics and projects" autocomplete="off">
    <div id="qresults" class="qresults" hidden></div>
  </div>
</nav></div>
<div class="titleblock sheet">
  <div class="herogrid">
    <div>
      <div class="part">GDEV-101 · CAREER RETARGETING MODULE</div>
      <h1>Mid-Career Engineer → Game Developer</h1>
      <p class="sub">A field guide for the engineer with a CS degree, an ECE master's, and a
      decade of real systems behind them — who wants to build games. What to refresh, what to
      learn, what to go deep on, and ${PROJECTS.length} side projects with starter code you can
      run tonight.</p>
    </div>
    <figure class="fig scopefig" style="margin:0">
      <canvas id="scope" width="800" height="380" aria-label="Oscilloscope: a sine wave gaining harmonics until it is a square wave"></canvas>
      <figcaption class="cap">FIG. 1 — SAME SIGNAL, MORE HARMONICS. (YOUR CAREER, ACQUIRING GAME DEV.)</figcaption>
    </figure>
  </div>
  <div class="boot" role="img" aria-label="Boot sequence: your background checks out">PRESS-START BIOS v2.6 — SUBSTRATE CHECK
MEMORY TEST . <b>BS COMPUTER SCIENCE ........ OK</b>   <b>MS ELECTRICAL &amp; COMPUTER ENG ... OK</b>
DETECTED ... <span class="amber">C/C++</span>  <span class="amber">DSP</span>  <span class="amber">LINEAR ALGEBRA</span>  <span class="amber">COMP ARCH</span>  <span class="amber">NETWORKING</span> — ALL USABLE. NOTHING WASTED.
BOOTING CAREER RETARGET MODULE ......... DONE
PRESS ANY KEY — OR JUST START WITH SECTION 1 <span class="cur">█</span></div>
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
    ['ENGINE / SYSTEMS', 'The runtime itself: loops, memory, jobs, asset I/O. The closest lane to embedded work.', 'embedded • RTOS • C++'],
    ['GAMEPLAY', 'Mechanics, controls, AI, UI. Where "is it fun?" gets decided, in code, daily.', 'state machines • control loops'],
    ['GRAPHICS', 'The GPU pipeline, shaders, lighting. Computer architecture with pictures.', 'comp arch • linear algebra'],
    ['AUDIO', 'Synthesis, mixing, dynamic music. Applied DSP — and chronically understaffed.', 'DSP • signals & systems'],
    ['NETCODE', 'Prediction, rollback, sync. Distributed systems at 60 Hz with humans attached.', 'networking • protocols'],
    ['TOOLS', 'Editors and pipelines other devs live in. Undervalued, hired everywhere.', 'the scripts you already write']
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
    ${disciplines.map(([t, d, from]) =>
      `<div><div class="dt">${esc(t)}</div><div class="dd">${esc(d)}</div>
       <div class="dm"><span>←</span> ${esc(from)}</div></div>`).join('')}
  </div>
</section>`;
}

// DIP-8 package diagram: the reader's skills as pins. Simple geometry only.
function dipFigure() {
  const left = [['1', 'DSP / SIGNALS'], ['2', 'LIN ALG / CTRL'], ['3', 'C/C++ EMBEDDED'], ['4', 'COMP ARCH']];
  const right = [['5', 'NETWORKING'], ['6', 'HDL / PARALLEL'], ['7', 'READING STAMINA'], ['8', 'NC']];
  const pinY = i => 52 + i * 46;
  return `
<figure class="fig paperfig" style="margin:0">
  <svg viewBox="0 0 360 250" role="img" aria-label="DIP-8 package diagram: your skills as the pins of the GDEV-101 part">
    <rect x="130" y="24" width="100" height="204" rx="4" fill="var(--paper2)" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M 168 24 A 12 12 0 0 0 192 24" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5"/>
    <text x="180" y="132" text-anchor="middle" font-family="var(--mono)" font-size="11" fill="var(--ink)" transform="rotate(90 180 132)">GDEV-101</text>
    ${left.map(([n, label], i) => `
    <rect x="112" y="${pinY(i) - 5}" width="18" height="10" fill="var(--chip)" stroke="var(--ink)" stroke-width="1"/>
    <text x="140" y="${pinY(i) + 3.5}" font-family="var(--mono)" font-size="9" fill="var(--dim)">${n}</text>
    <text x="104" y="${pinY(i) + 3.5}" text-anchor="end" font-family="var(--mono)" font-size="10" fill="var(--navy)">${esc(label)}</text>`).join('')}
    ${right.map(([n, label], i) => `
    <rect x="230" y="${pinY(i) - 5}" width="18" height="10" fill="var(--chip)" stroke="var(--ink)" stroke-width="1"/>
    <text x="220" y="${pinY(i) + 3.5}" text-anchor="end" font-family="var(--mono)" font-size="9" fill="var(--dim)">${n}</text>
    <text x="256" y="${pinY(i) + 3.5}" font-family="var(--mono)" font-size="10" fill="${label === 'NC' ? 'var(--dim)' : 'var(--navy)'}">${esc(label)}</text>`).join('')}
  </svg>
  <figcaption class="cap">FIG. 2 — GDEV-101 PACKAGE. PIN 8 RESERVED FOR FUTURE EXPANSION.</figcaption>
</figure>`;
}

function pins() {
  return `
<section id="pins" class="sheet">
  ${sechead('2', 'Pin Configuration — Skill Transfer', `${SKILL_MAP.length} lanes`)}
  <div class="pinsgrid">
    <div>
      <p class="lead">Every pin on your existing package routes somewhere in game
      development. No de-soldering required.</p>
      <p class="lead">Career changers usually undervalue this: studios are drowning in
      people who can script a jump and starving for people who can profile one. The right
      column of this table is a list of chronically hard-to-hire specialties, and you are
      holding the prerequisites for most of them.</p>
    </div>
    ${dipFigure()}
  </div>
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
    <div class="item" id="ph${ph.order}-${i}">
      <input type="checkbox" data-progress-id="ph${ph.order}-${i}" aria-label="Mark ${esc(it.topic)} done">
      <span class="badge ${it.kind}">${it.kind.toUpperCase()}</span>
      <div class="body">
        <h3>${esc(it.topic)}</h3>
        <div class="why">${esc(it.why)}</div>
      </div>
      <div class="res"><div class="rh">RESOURCES</div>${it.resources.map(r => `<span>${esc(r)}</span>`).join('')}</div>
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
      <dl class="spec">
        <dt>LANG</dt><dd>${esc(e.language)}</dd>
        <dt>LICENSE</dt><dd>${esc(e.license)}</dd>
        <dt>CURVE</dt><dd>${esc(e.curve)}</dd>
        <dt>BEST</dt><dd>${esc(e.bestFor)}</dd>
      </dl>
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
  </div>
  <div class="filtercount" data-proj-count aria-live="polite">${PROJECTS.length} of ${PROJECTS.length} shown</div>
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
  const weeks = { weekend: 1, 'two-weeks': 2, 'month-plus': 5 };
  return `
<section id="tracks" class="sheet">
  ${sechead('6', 'Reference Designs — Choose a Track', 'depth beats breadth')}
  <p class="lead">Three proven configurations of the modules above. Run one track end to
  end rather than sampling everything — a finished sequence is a portfolio.</p>
  <div class="tracks">
    ${TRACKS.map(t => {
      const total = t.projectIds.reduce((a, id) => a + weeks[byId[id].difficulty], 0);
      return `
    <div class="track">
      <div class="trackhead"><h3>${esc(t.name)}</h3>
        <span class="eff">~${total} wk of evenings</span></div>
      <div class="blurb">${esc(t.blurb)}</div>
      <ol>${t.projectIds.map(id =>
        `<li><a href="#proj-${id}">${esc(byId[id].title)}</a></li>`).join('')}</ol>
      <div class="out"><b>OUTPUT</b>${esc(t.outcome)}</div>
    </div>`;
    }).join('')}
  </div>
</section>`;
}

function footer() {
  return `
<footer class="sheet">
  <div class="footgrid">
    <div>
      <div class="fh">REVISION HISTORY</div>
      <table class="revtable">
        <tr><td class="mono">REV&nbsp;0</td><td>BS Computer Science shipped. Errata: believed games were someone else's job.</td></tr>
        <tr><td class="mono">REV&nbsp;1</td><td>MS ECE shipped. Added DSP, comp arch, and control theory. Still not making games. Unclear why.</td></tr>
        <tr><td class="mono">REV&nbsp;A</td><td>This document. Errata resolved: start tonight, ship something small, repeat.</td></tr>
      </table>
    </div>
    <div>
      <div class="fh">ORDERING INFORMATION</div>
      <table class="revtable">
        <tr><td class="mono">PART</td><td>GDEV-101 (this page — bookmark it, share it)</td></tr>
        <tr><td class="mono">PRICE</td><td>Free. Paid in evenings and one honest weekend at a time.</td></tr>
        <tr><td class="mono">AVAIL</td><td>Immediately. The first project runs tonight.</td></tr>
      </table>
    </div>
  </div>
  <div class="footline">
    <span>PRESS START SEMICONDUCTOR — HOBBY DIVISION. THIS DOCUMENT IS PROVIDED "AS IS"; FUN IS GUARANTEED ONLY IF YOU SHIP.</span>
    <span>GDEV-2026-01 REV A · PAGE 1 OF 1</span>
  </div>
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
<script>${makeRuntime(searchIndex())}</script>
</body>
</html>`;
}
