// All page CSS as a string, inlined at build time. Token-level theming:
// light "paper datasheet" is the base; dark redefines only the tokens.
export const STYLES = `
:root {
  --paper: #fbfaf7;
  --paper2: #f2f0ea;
  --ink: #1b2436;
  --rule: #cdd1d9;
  --rule-strong: #1b2436;
  --red: #c8362b;
  --navy: #23406e;
  --dim: #5a6474;
  --chip: #eceae3;
  --scope-bg: #10141c;
  --scope-line: #263042;
  --scope-ink: #d7e3ee;
  --scope-dim: #718096;
  --amber: #ffb454;
  --cyan: #5ccfe6;
  --green: #87d96c;
  --badge-refresh: #23406e;
  --badge-new: #c8362b;
  --badge-deep: #7a4a9e;
  --mono: ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace;
  --sans: "Helvetica Neue", Helvetica, "Segoe UI", Arial, sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root {
    --paper: #131720; --paper2: #0e1118; --ink: #d6dce8; --rule: #2b3345;
    --rule-strong: #aeb8cc; --red: #ff7a6e; --navy: #8fb3e8; --dim: #8b95a8;
    --chip: #1d2330;
  }
}
:root[data-theme="dark"] {
  --paper: #131720; --paper2: #0e1118; --ink: #d6dce8; --rule: #2b3345;
  --rule-strong: #aeb8cc; --red: #ff7a6e; --navy: #8fb3e8; --dim: #8b95a8;
  --chip: #1d2330;
}
:root[data-theme="light"] {
  --paper: #fbfaf7; --paper2: #f2f0ea; --ink: #1b2436; --rule: #cdd1d9;
  --rule-strong: #1b2436; --red: #c8362b; --navy: #23406e; --dim: #5a6474;
  --chip: #eceae3;
}

* { margin: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
body {
  background: var(--paper); color: var(--ink);
  font-family: var(--sans); font-size: 15px; line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--navy); }
button { font: inherit; cursor: pointer; }
:focus-visible { outline: 2px solid var(--red); outline-offset: 2px; }

.sheet { max-width: 980px; margin: 0 auto; padding: 0 32px; }

/* ---- document chrome ---- */
.dochead {
  display: flex; justify-content: space-between; align-items: baseline; gap: 16px;
  padding: 22px 0 12px; border-bottom: 3px solid var(--rule-strong);
}
.corp { font-weight: 700; font-size: 21px; letter-spacing: -0.01em; white-space: nowrap; }
.corp b { color: var(--red); font-weight: 700; }
.docno { font-family: var(--mono); font-size: 12px; color: var(--dim); text-align: right; line-height: 1.5; }

nav.toc {
  position: sticky; top: 0; z-index: 10;
  background: var(--paper); border-bottom: 1px solid var(--rule);
  display: flex; gap: 4px; overflow-x: auto;
  font-family: var(--mono); font-size: 12px; padding: 8px 0;
}
nav.toc a {
  color: var(--dim); text-decoration: none; padding: 4px 10px; white-space: nowrap;
  border-radius: 3px;
}
nav.toc a:hover { color: var(--red); background: var(--chip); }
nav.toc a b { color: var(--red); font-weight: 400; margin-right: 6px; }

/* ---- title block ---- */
.titleblock { padding: 40px 0 28px; border-bottom: 1px solid var(--rule); }
.part { font-family: var(--mono); font-size: 13px; color: var(--red); letter-spacing: 0.18em; }
h1 { font-size: clamp(30px, 5vw, 46px); font-weight: 700; letter-spacing: -0.02em;
  line-height: 1.08; margin: 10px 0 14px; text-wrap: balance; }
.sub { font-size: 16.5px; color: var(--dim); max-width: 68ch; line-height: 1.6; }
.boot {
  margin-top: 26px; padding: 14px 18px; background: var(--scope-bg);
  border-radius: 4px; font-family: var(--mono); font-size: 12.5px;
  color: var(--scope-dim); line-height: 1.8; overflow-x: auto;
}
.boot b { color: var(--green); font-weight: 400; }
.boot .amber { color: var(--amber); }
.ratings { display: flex; flex-wrap: wrap; gap: 24px 40px; padding: 20px 0 0; }
.ratings div { font-family: var(--mono); font-size: 12px; color: var(--dim); }
.ratings b { display: block; font-size: 26px; color: var(--ink); font-weight: 700;
  font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }

/* ---- sections ---- */
section { padding: 44px 0 12px; }
.sechead { display: flex; align-items: baseline; gap: 14px;
  border-bottom: 2px solid var(--rule-strong); padding-bottom: 8px; margin-bottom: 22px; }
.sechead .n { font-family: var(--mono); color: var(--red); font-size: 15px; }
h2 { font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
.secnote { font-family: var(--mono); font-size: 11px; color: var(--dim); margin-left: auto;
  text-transform: uppercase; letter-spacing: 0.08em; }
h3 { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
p.lead { max-width: 70ch; margin-bottom: 14px; }
p.lead + p.lead { margin-top: -2px; }

/* ---- theory grid ---- */
.disciplines { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
  background: var(--rule); border: 1px solid var(--rule); margin-top: 22px; }
.disciplines div { background: var(--paper); padding: 14px 16px; }
.disciplines .dt { font-family: var(--mono); font-size: 11.5px; color: var(--red);
  letter-spacing: 0.1em; margin-bottom: 6px; }
.disciplines .dd { font-size: 13.5px; color: var(--dim); line-height: 1.5; }

/* ---- tables ---- */
table { width: 100%; border-collapse: collapse; font-size: 14px; }
th { text-align: left; font-family: var(--mono); font-weight: 400; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--dim);
  border-bottom: 1.5px solid var(--rule-strong); padding: 6px 10px; }
td { border-bottom: 1px solid var(--rule); padding: 10px; vertical-align: top; }
td.mono { font-family: var(--mono); font-size: 12px; color: var(--navy); white-space: nowrap; }
tr:hover td { background: var(--paper2); }
.tablewrap { overflow-x: auto; }
td .detail { color: var(--dim); font-size: 13px; margin-top: 3px; line-height: 1.5; }
td .to { font-weight: 600; }

/* ---- roadmap ---- */
.progressbar { display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
  font-family: var(--mono); font-size: 12px; color: var(--dim); }
.progressbar .track { flex: 1; height: 8px; background: var(--chip); border-radius: 4px; overflow: hidden; }
.progressbar .fill { height: 100%; width: 0%; background: var(--red); transition: width 0.3s; }
.phase { border: 1px solid var(--rule); border-radius: 4px; margin-bottom: 18px; overflow: hidden; }
.phase-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap;
  padding: 14px 18px; background: var(--paper2); border-bottom: 1px solid var(--rule); }
.phase-head .ph-n { font-family: var(--mono); color: var(--red); font-size: 13px; }
.phase-head .ph-w { font-family: var(--mono); color: var(--dim); font-size: 12px; margin-left: auto; }
.phase-head .ph-goal { flex-basis: 100%; color: var(--dim); font-size: 13.5px; }
.item { display: grid; grid-template-columns: 26px 92px 1fr; gap: 14px;
  padding: 16px 18px; border-bottom: 1px solid var(--rule); }
.item:last-child { border-bottom: 0; }
.item input[type=checkbox] { width: 16px; height: 16px; margin-top: 2px; accent-color: var(--red); }
.badge { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: #fff;
  padding: 3px 7px; border-radius: 3px; height: fit-content; text-align: center; }
.badge.refresh { background: var(--badge-refresh); }
.badge.new { background: var(--badge-new); }
.badge.deep { background: var(--badge-deep); }
.item .why { color: var(--dim); font-size: 13.5px; margin: 4px 0 8px; max-width: 65ch; line-height: 1.55; }
.item .res { font-family: var(--mono); font-size: 12px; color: var(--navy); line-height: 1.7; }
.item .res span { display: block; }
.item .res span::before { content: "▸ "; color: var(--red); }

/* ---- engines ---- */
.engines { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.engine { border: 1px solid var(--rule); border-radius: 4px; padding: 18px; display: flex; flex-direction: column; gap: 10px; }
.engine h3 { font-size: 18px; margin: 0; }
.engine .spec { font-family: var(--mono); font-size: 11.5px; color: var(--dim); line-height: 1.7; }
.engine .spec b { color: var(--navy); font-weight: 400; }
.engine .pick { font-size: 13.5px; line-height: 1.55; }
.engine .warn { font-size: 12.5px; color: var(--dim); border-top: 1px dashed var(--rule);
  padding-top: 8px; margin-top: auto; }
.engine .warn::before { content: "⚠ "; color: var(--red); }

/* ---- projects ---- */
.filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; align-items: center; }
.filters .fl { font-family: var(--mono); font-size: 11px; color: var(--dim);
  text-transform: uppercase; letter-spacing: 0.08em; margin-right: 4px; }
.chipbtn { font-family: var(--mono); font-size: 12px; padding: 5px 12px;
  border: 1px solid var(--rule); background: var(--paper); color: var(--dim);
  border-radius: 999px; }
.chipbtn[aria-pressed="true"] { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.projgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.proj { border: 1px solid var(--rule); border-radius: 4px; padding: 18px;
  display: flex; flex-direction: column; gap: 10px; }
.proj .meta { display: flex; gap: 8px; align-items: center; font-family: var(--mono);
  font-size: 11px; letter-spacing: 0.06em; color: var(--dim); flex-wrap: wrap; }
.proj .meta .diff { color: var(--red); }
.proj h3 { font-size: 17px; margin: 0; }
.proj .pitch { font-size: 13.5px; line-height: 1.55; }
.proj .angle { font-size: 13px; line-height: 1.5; background: var(--paper2);
  border-left: 3px solid var(--red); padding: 10px 12px; color: var(--dim); }
.proj .angle b { display: block; font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.12em; color: var(--red); margin-bottom: 4px; font-weight: 400; }
.proj .lists { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12.5px; }
.proj .lists h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
  color: var(--dim); text-transform: uppercase; margin-bottom: 5px; font-weight: 400; }
.proj .lists ul, .proj .lists ol { padding-left: 16px; color: var(--dim); line-height: 1.6; }
details.code { border: 1px solid var(--scope-line); border-radius: 4px; overflow: hidden;
  background: var(--scope-bg); margin-top: 2px; }
details.code summary { list-style: none; display: flex; justify-content: space-between;
  align-items: center; gap: 10px; cursor: pointer; padding: 9px 14px;
  font-family: var(--mono); font-size: 12px; color: var(--cyan); }
details.code summary::-webkit-details-marker { display: none; }
details.code summary .lang { color: var(--scope-dim); }
details.code summary::after { content: "▸ expand"; color: var(--amber); }
details.code[open] summary::after { content: "▾ collapse"; }
details.code .runline { display: flex; justify-content: space-between; align-items: center; gap: 12px;
  padding: 7px 14px; font-family: var(--mono); font-size: 11.5px; color: var(--scope-dim);
  border-top: 1px solid var(--scope-line); border-bottom: 1px solid var(--scope-line); }
.copybtn { font-family: var(--mono); font-size: 11px; color: var(--scope-bg);
  background: var(--amber); border: 0; padding: 4px 10px; border-radius: 3px; }
pre { padding: 14px; overflow-x: auto; font-family: var(--mono); font-size: 12px;
  line-height: 1.55; color: var(--scope-ink); tab-size: 2; }

/* ---- tracks ---- */
.tracks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.track { border: 1px solid var(--rule); border-radius: 4px; padding: 18px; }
.track h3 { font-size: 16px; }
.track .blurb { font-size: 13px; color: var(--dim); line-height: 1.55; margin: 6px 0 12px; }
.track ol { padding-left: 18px; font-size: 13px; line-height: 1.9; }
.track a { text-decoration: none; }
.track a:hover { text-decoration: underline; }

/* ---- footer ---- */
footer { border-top: 3px solid var(--rule-strong); margin-top: 48px; padding: 12px 0 40px;
  font-family: var(--mono); font-size: 11px; color: var(--dim);
  display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }

@media (max-width: 760px) {
  .sheet { padding: 0 18px; }
  .disciplines, .engines, .projgrid, .tracks { grid-template-columns: 1fr; }
  .proj .lists { grid-template-columns: 1fr; }
  .item { grid-template-columns: 26px 1fr; }
  .item .badge { grid-column: 2; justify-self: start; }
  .item .body { grid-column: 1 / -1; }
}
`;
