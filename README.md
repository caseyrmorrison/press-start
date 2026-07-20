# Press Start — Game Dev for the Mid-Career Engineer

A single-page learning platform for an engineer with a BS in CS and an MS in ECE
who wants into game development. Styled as a component datasheet for part
**GDEV-101, Career Retargeting Module**: skill-transfer pin map, 4-phase study
roadmap with persistent progress, engine selection guide, and 8 side projects
with runnable zero-dependency starter code.

**Live:** https://claude.ai/code/artifact/88248169-8a73-4953-b5a5-930b6fbef5d2
(private until shared — use the page's share menu to give friends access)

## Develop

```sh
npm test       # 24 unit tests (node:test, no dependencies)
npm run build  # tests must pass, then emits dist/index.html + dist/artifact.html
python3 -m http.server 8321 --directory dist   # local preview
```

## Layout

| Path | Purpose |
|---|---|
| `content/data.mjs` | Single source of truth: roadmap, projects, starter code, skill map, engines, tracks |
| `src/logic.mjs` | Pure, unit-tested functions (escaping, filtering, search, hardened progress store) |
| `src/render.mjs` | Build-time HTML generation; all content passes through `escapeHtml` |
| `src/styles.mjs` / `src/runtime.mjs` | Inlined CSS (token-level light/dark theming) and client runtime |
| `test/` | Data-schema, logic, and render-layer tests (written TDD-first) |
| `mocks/` | The three throwaway design mocks used to pick the datasheet direction |
| `build.mjs` | Deterministic build; refuses to emit if tests fail |

See [ARCHITECTURE.md](ARCHITECTURE.md) for the end-to-end design, threat model,
and design process (3 mocks, then 3 screenshot-critique-fix passes).
