# press-start — Architecture

An end-to-end architected learning platform: **"Press Start: Game Development for the
Mid-Career Engineer"** — aimed at someone with a BS in CS and an MS in
Electrical & Computer Engineering who wants to break into (or moonlight in) game
development.

## Goals

1. Introduce game development *through the lens of an ECE/CS background* — map
   what the reader already knows (C/C++, DSP, linear algebra, embedded, computer
   architecture) onto game-dev disciplines.
2. A concrete study roadmap: what to **refresh**, what to **learn new**, what to
   **go deep** on.
3. Side-project ideas with real, runnable starter code.
4. Deployed online (hosted Artifact) so friends can access it via URL.

## System design (end to end)

```
content/data.mjs      — single source of truth: roadmap phases, projects,
                        starter code, skill-transfer map. Pure data, no DOM.
src/logic.mjs         — pure functions: filtering, searching, escaping,
                        relevance scoring, progress model. No DOM. Unit-tested.
test/*.test.mjs       — node:test suites (TDD: written before/with logic).
mocks/mock-{a,b,c}.html — three throwaway design mocks used to pick a direction.
build.mjs             — deterministic build: validates data (re-runs schema
                        checks), inlines data + logic + UI into dist/index.html.
dist/index.html       — single self-contained artifact. No external requests.
```

Data flows one way: `data.mjs → logic.mjs → render (UI layer) → DOM`.
The UI layer is the only code allowed to touch the DOM; everything below it is
pure and unit-testable.

## Security posture (threat model for a static site)

- **No external requests at all** — no CDNs, no fonts, no analytics. The
  artifact host enforces a strict CSP; we build for it rather than around it.
- **XSS**: all content is first-party, but we still render user-visible strings
  through `escapeHtml()` (defense in depth — content and code samples contain
  `<`, `&`, template literals). Code samples are never `eval`'d and never
  `innerHTML`'d raw.
- **No `eval` / `new Function` / inline event handlers built from strings.**
- **localStorage**: progress checkboxes only; values are validated on read
  (JSON parse in try/catch, schema-checked) so a poisoned store cannot inject.
- Supply chain: **zero runtime dependencies**; tests use `node:test` from the
  standard library.

## Testing strategy (TDD)

Tests were written against the content schema and logic API first; data and
logic were then written/extended to make them pass.

- `test/data.test.mjs` — schema/invariant tests: unique IDs, required fields,
  valid difficulty enums, every project has non-empty starter code + a "what
  you'll practice" list, every roadmap item has a `why` grounded in the
  reader's background.
- `test/logic.test.mjs` — pure-function tests: filtering, search, escaping
  (adversarial strings), relevance scoring, progress-store validation
  (malformed/hostile localStorage payloads must be rejected safely).
- `npm test` runs everything; the build refuses to emit if tests fail.

## Design process

Three mock directions (see `mocks/`) rendered in a real browser and
screenshotted; one chosen, then ≥3 screenshot-critique-fix passes on the real
build, each pass listing ≥5 concrete problems.
