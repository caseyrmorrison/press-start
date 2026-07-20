// Single source of truth for all platform content. Pure data — no DOM, no I/O.
// Audience: mid-career engineer, BS CS + MS ECE, wants into game development.

export const DIFFICULTIES = ['weekend', 'two-weeks', 'month-plus'];

// ---------------------------------------------------------------------------
// What you already have → what it becomes in game dev
// ---------------------------------------------------------------------------
export const SKILL_MAP = [
  {
    have: 'DSP & signals coursework',
    becomes: 'Game audio & procedural synthesis',
    detail: 'Filters, envelopes, FFTs and sample-rate thinking map one-to-one onto game audio engines, dynamic music systems and synth-based sound effects. Most gameplay programmers find this hard; you already speak it.'
  },
  {
    have: 'Linear algebra & control systems',
    becomes: '3D math, cameras & game feel',
    detail: 'Transforms, quaternions and projection matrices are the daily bread of engine work. Control theory shows up everywhere feel matters: spring-damper cameras, PID-style aim assist, vehicle handling.'
  },
  {
    have: 'C / C++ & embedded discipline',
    becomes: 'Engine & systems programming',
    detail: 'Shipping on a 168 MHz microcontroller is the same sport as hitting 16.6 ms a frame: fixed budgets, no allocator in the hot loop, profiling first. Modern engine teams hire exactly this mindset.'
  },
  {
    have: 'Computer architecture (caches, pipelines)',
    becomes: 'Data-oriented design & GPU programming',
    detail: 'Cache lines, memory bandwidth and SIMD lanes decide frame rate more than big-O does. Your architecture background is why ECS layouts and shader occupancy will feel obvious instead of mystical.'
  },
  {
    have: 'Networking & protocols',
    becomes: 'Multiplayer netcode',
    detail: 'Latency budgets, jitter, packet loss and clock sync are the whole game in rollback and lockstep netcode. UDP-versus-TCP tradeoffs you already know become client prediction and server reconciliation.'
  },
  {
    have: 'Verilog / parallel hardware thinking',
    becomes: 'Shaders & GPU compute',
    detail: 'A fragment shader is a combinational block evaluated across a million pixels in lockstep. Thinking in dataflow and parallel pipelines — not sequential code — is the hard mental shift, and you already made it.'
  },
  {
    have: 'Grad-school reading stamina',
    becomes: 'Reading engine source & papers',
    detail: 'Game dev moves through GDC talks, SIGGRAPH papers and open engine code (Godot, Quake, Doom 3). Being comfortable extracting ideas from dense primary sources is a genuine competitive edge.'
  }
];

// ---------------------------------------------------------------------------
// Study roadmap
// ---------------------------------------------------------------------------
export const ROADMAP = [
  {
    order: 1,
    title: 'Re-arm the fundamentals',
    weeks: 'Weeks 1–4',
    goal: 'Sharpen the tools you already own until they cut again.',
    items: [
      {
        kind: 'refresh', topic: 'Modern C++ (17/20)',
        why: 'Your embedded C++ is real but engine codebases lean on move semantics, RAII everywhere, string_view, span and constexpr. A focused refresh beats relearning on the job.',
        resources: ['A Tour of C++ (Stroustrup, 3rd ed.)', 'cppreference.com as a daily driver', 'CppCon "Back to Basics" talks']
      },
      {
        kind: 'refresh', topic: 'Linear algebra for 3D',
        why: 'You did the proofs in grad school; now rebuild the geometric intuition: dot/cross products as tools, change of basis, quaternion rotation without gimbal lock.',
        resources: ['3Blue1Brown — Essence of Linear Algebra', 'Math for Game Programmers (GDC series)', 'immersivemath.com (interactive)']
      },
      {
        kind: 'new', topic: 'The game loop & frame timing',
        why: 'The one structure every game shares and no ECE course teaches: fixed-timestep simulation, interpolated rendering, and why "delta time" bugs make physics explode.',
        resources: ['Game Programming Patterns — Game Loop chapter (free online)', 'Fix Your Timestep! (Gaffer On Games)']
      },
      {
        kind: 'refresh', topic: 'Debugging & profiling workflow',
        why: 'Frame debuggers and profilers are to games what scopes and logic analyzers were to your hardware work — same instinct, new instruments: RenderDoc, Tracy, perf.',
        resources: ['RenderDoc quick-start', 'Tracy profiler docs', 'Superluminal / perf, whichever OS you live on']
      }
    ]
  },
  {
    order: 2,
    title: 'Core game programming',
    weeks: 'Weeks 5–12',
    goal: 'Build small games from raw parts — no engine — so engines never feel like magic.',
    items: [
      {
        kind: 'new', topic: 'Collision detection & response',
        why: 'AABBs, swept tests, separating-axis theorem, and the dark art of resolution order. This is where "it feels janky" bugs live, and interviewers love it.',
        resources: ['Real-Time Collision Detection (Ericson) — ch. 4–5', 'Box2D source code (small, readable)']
      },
      {
        kind: 'new', topic: 'Entity-Component-System architecture',
        why: 'The dominant pattern for game state. It is data-oriented design applied: struct-of-arrays layouts, systems as batch jobs — your cache-aware instincts finally get to show off.',
        resources: ['Game Programming Patterns — Component chapter', 'EnTT library docs & examples', 'Overwatch ECS GDC talk']
      },
      {
        kind: 'deep', topic: 'Data-oriented design',
        why: 'The ideology of modern engine performance. Mike Acton\'s argument is computer architecture applied to games — you have the background to engage with it critically, not religiously.',
        resources: ['Mike Acton — "Data-Oriented Design and C++" (CppCon 2014)', 'Data-Oriented Design book (Richard Fabian, free online)']
      },
      {
        kind: 'refresh', topic: 'Concurrency & job systems',
        why: 'You know threads and RTOS scheduling; games use job graphs with frame-scoped lifetimes instead. Learn the shape: wide fan-out, join before render, no locks in the hot path.',
        resources: ['Naughty Dog — "Parallelizing the Naughty Dog Engine" (GDC)', 'C++ Concurrency in Action, ch. 8–9']
      },
      {
        kind: 'new', topic: 'Game state machines & AI basics',
        why: 'Enemy behavior, animation states, menu flow — all state machines, which you know from digital design. FSMs, then behavior trees, then utility AI, in that order.',
        resources: ['Game Programming Patterns — State chapter', 'The AI of DOOM (2016) — GDC talk']
      }
    ]
  },
  {
    order: 3,
    title: 'Graphics & an engine',
    weeks: 'Weeks 13–20',
    goal: 'Understand the GPU pipeline from first principles, then let an engine do the bookkeeping.',
    items: [
      {
        kind: 'deep', topic: 'The GPU rendering pipeline',
        why: 'Vertex → raster → fragment is a hardware pipeline; your architecture background makes the why obvious (latency hiding, warps, bandwidth). Write a software rasterizer once and the whole stack demystifies.',
        resources: ['Trip Through the Graphics Pipeline (Fabian Giesen, free)', 'LearnOpenGL.com', 'tinyrenderer (ssloy) walkthrough']
      },
      {
        kind: 'new', topic: 'Shader programming (GLSL/HLSL)',
        why: 'Small parallel programs over every pixel — closer to your Verilog instincts than to C. Start with fullscreen effects, then lighting models, then compute.',
        resources: ['The Book of Shaders (free)', 'Shadertoy — read others, then write', 'Catlike Coding shader tutorials']
      },
      {
        kind: 'new', topic: 'Pick ONE engine: Godot, Unity, or Unreal',
        why: 'Godot: open source, small, reads like a codebase you can own. Unity: C#, biggest tutorial ecosystem, fastest to jam. Unreal: C++, industry AAA standard, steepest ramp. Pick by goal — indie/jam → Godot or Unity; AAA job → Unreal.',
        resources: ['Godot docs "Your first 2D game"', 'Unity Learn junior programmer path', 'Unreal "Your First Hour" course — sample all three, commit to one']
      },
      {
        kind: 'refresh', topic: 'Software architecture at game scale',
        why: 'You know SOLID; games bend it. Learn when singletons are load-bearing, why inheritance trees died, and how scenes/prefabs actually structure a project.',
        resources: ['Game Programming Patterns (whole book, free online)', 'Godot or Unity source of one shipped open-source game']
      }
    ]
  },
  {
    order: 4,
    title: 'Specialize & ship',
    weeks: 'Weeks 21+',
    goal: 'Depth in one lane, plus the habit that matters most: finishing.',
    items: [
      {
        kind: 'deep', topic: 'Choose a lane: graphics, audio DSP, or netcode',
        why: 'Mid-career pivots land through leverage, not breadth. Each of these lanes sits directly on your ECE spine — pick the one whose side project you could not stop working on.',
        resources: ['Graphics: GPU Gems / SIGGRAPH Advances course', 'Audio: The Audio Programming Book, WebAudio spec', 'Netcode: Gaffer On Games series, GGPO source']
      },
      {
        kind: 'new', topic: 'Game jams',
        why: 'A jam is a scoped, deadlined, shipped project every 48 hours — the fastest known cure for engineer-perfectionism and the standard way this industry networks.',
        resources: ['Ludum Dare (3×/year)', 'Global Game Jam (January)', 'itch.io weekly jams to warm up']
      },
      {
        kind: 'new', topic: 'A portfolio that reads in 90 seconds',
        why: 'Studios skim: playable web builds, 20-second GIFs, and a README explaining one hard problem per project beat any resume bullet. Ship three small finished things, not one epic.',
        resources: ['itch.io for hosting builds', 'Notes on portfolios from GDC hiring talks']
      },
      {
        kind: 'deep', topic: 'Read one real engine seriously',
        why: 'Doom 3 or Godot source is the game-dev equivalent of reading kernel code in grad school: slow, humbling, and it permanently raises your ceiling.',
        resources: ['Fabien Sanglard — Game Engine Black Books (free PDFs)', 'Godot engine source + architecture docs']
      }
    ]
  }
];

// ---------------------------------------------------------------------------
// Side projects with starter code
// ---------------------------------------------------------------------------
export const PROJECTS = [
  {
    id: 'pong-fixed-timestep',
    title: 'Pong with a Real Game Loop',
    difficulty: 'weekend',
    tags: ['fundamentals', 'physics'],
    pitch: 'Everyone writes Pong; almost nobody writes it with a fixed-timestep simulation and interpolated rendering. Build the loop every engine hides from you.',
    eceAngle: 'The loop is a discrete-time control system: simulate at a fixed 120 Hz, render at whatever vsync gives you, interpolate between states. Deterministic like your embedded ISRs.',
    practices: ['Fixed-timestep accumulator loop', 'State interpolation for smooth rendering', 'Simple AABB collision + restitution', 'Input sampling vs. simulation separation'],
    milestones: ['Ball bounces deterministically at any frame rate', 'Paddle AI with reaction delay (make it beatable)', 'Freeze the tab for 2 s — simulation catches up without tunneling', 'Score, serve states, and a tiny FSM for game flow'],
    starter: {
      language: 'JavaScript (single HTML file)',
      run: 'Save as pong.html, open in any browser.',
      code: `<canvas id="c" width="800" height="450"></canvas>
<script>
const ctx = document.getElementById('c').getContext('2d');
const DT = 1 / 120;                       // fixed sim step: 120 Hz
const state = { ballX: 400, ballY: 225, velX: 220, velY: 140,
                p1: 190, p2: 190, prev: null };
const keys = {};
onkeydown = e => keys[e.key] = true;
onkeyup   = e => keys[e.key] = false;

function step(s) {                        // pure-ish simulation tick
  s.prev = { ballX: s.ballX, ballY: s.ballY };
  if (keys.w) s.p1 -= 300 * DT;
  if (keys.s) s.p1 += 300 * DT;
  s.p2 += Math.sign(s.ballY - (s.p2 + 35)) * 200 * DT;  // chasing AI
  s.ballX += s.velX * DT; s.ballY += s.velY * DT;
  if (s.ballY < 8 || s.ballY > 442) s.velY *= -1;
  const hitP1 = s.ballX < 30 && s.ballY > s.p1 && s.ballY < s.p1 + 70;
  const hitP2 = s.ballX > 770 && s.ballY > s.p2 && s.ballY < s.p2 + 70;
  if (hitP1 || hitP2) s.velX *= -1.05;    // speed up each volley
  if (s.ballX < 0 || s.ballX > 800) { s.ballX = 400; s.velX = 220 * Math.sign(-s.velX); }
}

let acc = 0, last = performance.now();
function frame(now) {
  acc += Math.min((now - last) / 1000, 0.25); last = now;
  while (acc >= DT) { step(state); acc -= DT; }
  const a = acc / DT;                     // interpolation factor
  const bx = state.prev ? state.prev.ballX + (state.ballX - state.prev.ballX) * a : state.ballX;
  const by = state.prev ? state.prev.ballY + (state.ballY - state.prev.ballY) * a : state.ballY;
  ctx.fillStyle = '#111'; ctx.fillRect(0, 0, 800, 450);
  ctx.fillStyle = '#eee';
  ctx.fillRect(20, state.p1, 10, 70); ctx.fillRect(770, state.p2, 10, 70);
  ctx.fillRect(bx - 6, by - 6, 12, 12);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
</script>`
    }
  },
  {
    id: 'chip-synth',
    title: 'Chiptune Synth from Scratch',
    difficulty: 'weekend',
    tags: ['audio', 'dsp'],
    pitch: 'Build a NES-style synthesizer — pulse waves, noise channel, envelopes — straight from your DSP coursework, and give every future game you make its sound.',
    eceAngle: 'This is literally signals & systems: oscillators, ADSR envelopes as piecewise gain functions, LFSR noise (hello, digital design), and a first-order low-pass you will implement from the difference equation.',
    practices: ['WebAudio graph construction', 'ADSR envelope implementation', 'LFSR-based noise channel', 'Musical timing via lookahead scheduling'],
    milestones: ['Play a note with a pulse wave + ADSR on keypress', 'Add a 15-bit LFSR noise channel for percussion', 'Sequence an 8-step loop with proper lookahead scheduling', 'Export a laser/jump/coin SFX generator preset'],
    starter: {
      language: 'JavaScript (single HTML file)',
      run: 'Save as synth.html, open in a browser, press keys A–K.',
      code: `<p>Focus this page, then press A S D F G H J K</p>
<script>
const ac = new AudioContext();
// NES-ish pulse: square via periodic wave with odd harmonics
function pulseOsc(freq) {
  const n = 16, real = new Float32Array(n), imag = new Float32Array(n);
  for (let i = 1; i < n; i += 2) imag[i] = 4 / (i * Math.PI); // square series
  const o = new OscillatorNode(ac, { frequency: freq });
  o.setPeriodicWave(ac.createPeriodicWave(real, imag));
  return o;
}
function adsr(t0, a, d, s, r, dur) {       // gain envelope, straight from class
  const g = new GainNode(ac, { gain: 0 });
  g.gain.linearRampToValueAtTime(0.4, t0 + a);
  g.gain.linearRampToValueAtTime(0.4 * s, t0 + a + d);
  g.gain.setValueAtTime(0.4 * s, t0 + dur);
  g.gain.linearRampToValueAtTime(0, t0 + dur + r);
  return g;
}
function note(freq) {
  const t0 = ac.currentTime, o = pulseOsc(freq), g = adsr(t0, 0.01, 0.08, 0.6, 0.12, 0.2);
  o.connect(g).connect(ac.destination);
  o.start(t0); o.stop(t0 + 0.4);
}
// 15-bit LFSR noise, the actual NES algorithm — sounds like a snare
function noiseHit() {
  const len = ac.sampleRate * 0.15, buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0); let lfsr = 1;
  for (let i = 0; i < len; i++) {
    const bit = (lfsr ^ (lfsr >> 1)) & 1;
    lfsr = (lfsr >> 1) | (bit << 14);
    d[i] = (lfsr & 1) ? 0.3 : -0.3;
  }
  const src = new AudioBufferSourceNode(ac, { buffer: buf });
  const g = adsr(ac.currentTime, 0.001, 0.05, 0.2, 0.08, 0.05);
  src.connect(g).connect(ac.destination); src.start();
}
const scale = { a: 262, s: 294, d: 330, f: 349, g: 392, h: 440, j: 494, k: 523 };
onkeydown = e => {
  if (e.repeat) return;
  if (scale[e.key]) note(scale[e.key]);
  if (e.key === ' ') noiseHit();
};
</script>`
    }
  },
  {
    id: 'boids-spatial-hash',
    title: 'Boids with a Spatial Hash',
    difficulty: 'weekend',
    tags: ['simulation', 'ai', 'performance'],
    pitch: 'Flocking from three steering rules — then make it handle 5,000 agents at 60 fps. The optimization is the project.',
    eceAngle: 'Naive boids is O(n²) neighbor search. Fixing it with a uniform spatial grid is a cache-locality exercise: bucket by cell, query 9 cells, watch the profiler. Data-oriented design in 100 lines.',
    practices: ['Steering behaviors (separation/alignment/cohesion)', 'Uniform grid spatial partitioning', 'Profiling before/after with performance.now()', 'Tuning emergent behavior parameters'],
    milestones: ['100 boids flocking with the three rules', 'Spatial hash: 5,000 boids at 60 fps', 'On-screen frame-time readout proving it', 'Predator boid that scatters the flock'],
    starter: {
      language: 'JavaScript (single HTML file)',
      run: 'Save as boids.html, open in a browser.',
      code: `<canvas id="c" width="900" height="560"></canvas>
<script>
const ctx = document.getElementById('c').getContext('2d');
const N = 400, CELL = 40, W = 900, H = 560;
const boids = Array.from({ length: N }, () => ({
  x: Math.random() * W, y: Math.random() * H,
  vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1
}));
function neighbors(grid, b) {              // 9-cell query around b
  const cx = (b.x / CELL) | 0, cy = (b.y / CELL) | 0, out = [];
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const cell = grid.get((cx + dx) + ',' + (cy + dy));
    if (cell) out.push(...cell);
  }
  return out;
}
function tick() {
  const grid = new Map();                  // rebuild each frame — cheap
  for (const b of boids) {
    const k = ((b.x / CELL) | 0) + ',' + ((b.y / CELL) | 0);
    (grid.get(k) ?? grid.set(k, []).get(k)).push(b);
  }
  for (const b of boids) {
    let sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, n = 0;
    for (const o of neighbors(grid, b)) {
      if (o === b) continue;
      const dx = o.x - b.x, dy = o.y - b.y, d2 = dx * dx + dy * dy;
      if (d2 > 1600) continue;
      n++;
      if (d2 < 400) { sx -= dx; sy -= dy; }          // separation
      ax += o.vx; ay += o.vy;                        // alignment
      cx += o.x; cy += o.y;                          // cohesion
    }
    if (n) {
      b.vx += sx * 0.015 + (ax / n - b.vx) * 0.05 + (cx / n - b.x) * 0.0008;
      b.vy += sy * 0.015 + (ay / n - b.vy) * 0.05 + (cy / n - b.y) * 0.0008;
    }
    const sp = Math.hypot(b.vx, b.vy) || 1;          // clamp speed
    b.vx = b.vx / sp * 2.2; b.vy = b.vy / sp * 2.2;
    b.x = (b.x + b.vx + W) % W; b.y = (b.y + b.vy + H) % H;
  }
}
function frame() {
  const t0 = performance.now();
  tick();
  ctx.fillStyle = '#0b0e14'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#7fd4ff';
  for (const b of boids) ctx.fillRect(b.x - 1.5, b.y - 1.5, 3, 3);
  ctx.fillStyle = '#888'; ctx.font = '12px monospace';
  ctx.fillText((performance.now() - t0).toFixed(2) + ' ms/tick — now make N=5000 work', 10, 16);
  requestAnimationFrame(frame);
}
frame();
</script>`
    }
  },
  {
    id: 'software-rasterizer',
    title: 'Software Triangle Rasterizer',
    difficulty: 'two-weeks',
    tags: ['graphics', 'fundamentals'],
    pitch: 'Render a spinning cube to an image using nothing but C++ and math — no GPU, no libraries. After this, every graphics API makes sense forever.',
    eceAngle: 'You implement the actual hardware pipeline stages in software: model-view-projection transforms (your linear algebra), edge-function rasterization, z-buffering. It is the graphics equivalent of building a CPU in Verilog.',
    practices: ['Model-view-projection matrix pipeline', 'Edge-function triangle rasterization', 'Depth buffering', 'Flat + Lambert shading'],
    milestones: ['Wireframe cube in a PPM image', 'Filled triangles with a z-buffer', 'Lambert-lit rotating cube written as image sequence', 'Perspective-correct vertex colors'],
    starter: {
      language: 'C++17, zero dependencies',
      run: 'g++ -O2 -std=c++17 raster.cpp -o raster && ./raster && open out.ppm',
      code: `// raster.cpp — minimal triangle rasterizer to a PPM image
#include <array>
#include <cmath>
#include <cstdio>
#include <vector>
struct V3 { float x, y, z; };
constexpr int W = 640, H = 480;

float edge(const V3& a, const V3& b, const V3& c) {   // signed area * 2
  return (c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x);
}

int main() {
  std::vector<unsigned char> img(W * H * 3, 20);
  std::vector<float> zbuf(W * H, 1e9f);
  // one triangle in screen space (extend: project a cube through MVP)
  V3 tri[3] = { {120, 400, 1}, {320, 60, 2}, {560, 420, 1} };
  V3 color[3] = { {255, 80, 60}, {60, 220, 120}, {70, 120, 255} };
  float area = edge(tri[0], tri[1], tri[2]);
  for (int y = 0; y < H; ++y)
    for (int x = 0; x < W; ++x) {
      V3 p = { x + 0.5f, y + 0.5f, 0 };
      float w0 = edge(tri[1], tri[2], p) / area;      // barycentric
      float w1 = edge(tri[2], tri[0], p) / area;
      float w2 = edge(tri[0], tri[1], p) / area;
      if (w0 < 0 || w1 < 0 || w2 < 0) continue;       // outside
      float z = w0 * tri[0].z + w1 * tri[1].z + w2 * tri[2].z;
      if (z >= zbuf[y * W + x]) continue;             // depth test
      zbuf[y * W + x] = z;
      for (int c = 0; c < 3; ++c) {
        float v = w0 * (&color[0].x)[c] + w1 * (&color[1].x)[c] + w2 * (&color[2].x)[c];
        img[(y * W + x) * 3 + c] = (unsigned char)v;  // interpolated color
      }
    }
  FILE* f = fopen("out.ppm", "wb");
  fprintf(f, "P6 %d %d 255\\n", W, H);
  fwrite(img.data(), 1, img.size(), f);
  fclose(f);
  std::puts("wrote out.ppm — next: MVP matrices, then a spinning cube");
}`
    }
  },
  {
    id: 'ecs-asteroids',
    title: 'Asteroids on a Hand-Rolled ECS',
    difficulty: 'two-weeks',
    tags: ['architecture', 'performance'],
    pitch: 'Build Asteroids where every rock, bullet and ship is just an entity ID plus arrays of components — the architecture inside Unity DOTS and Overwatch, at a size you can hold in your head.',
    eceAngle: 'ECS is struct-of-arrays memory layout as an architecture: systems iterate contiguous typed arrays instead of chasing pointers. Your cache-hierarchy intuition is the whole point of this pattern.',
    practices: ['Entity ID + component-array bookkeeping', 'Systems as pure batch transforms', 'Struct-of-arrays vs array-of-structs tradeoffs', 'Spawn/despawn without allocation churn'],
    milestones: ['Ship flies under thrust with wrap-around', 'Bullets despawn by lifetime component', 'Asteroids split via spawn queue (no mid-iteration mutation)', 'Collision system with the ship — lives & game over'],
    starter: {
      language: 'JavaScript (single HTML file)',
      run: 'Save as ecs.html, open in a browser. Arrows + space.',
      code: `<canvas id="c" width="800" height="600"></canvas>
<script>
// Minimal ECS: entities are indices; components are parallel arrays.
const MAX = 1024;
const alive = new Uint8Array(MAX);
const px = new Float32Array(MAX), py = new Float32Array(MAX);
const vx = new Float32Array(MAX), vy = new Float32Array(MAX);
const rot = new Float32Array(MAX), radius = new Float32Array(MAX);
const kind = new Uint8Array(MAX);          // 0 ship, 1 rock, 2 bullet
const ttl = new Float32Array(MAX);
function spawn(k, x, y) {
  for (let e = 0; e < MAX; e++) if (!alive[e]) {
    alive[e] = 1; kind[e] = k; px[e] = x; py[e] = y;
    vx[e] = vy[e] = rot[e] = 0; ttl[e] = k === 2 ? 1.2 : Infinity;
    radius[e] = k === 0 ? 12 : k === 1 ? 30 : 2;
    return e;
  }
  throw new Error('entity pool exhausted');
}
const ship = spawn(0, 400, 300);
for (let i = 0; i < 6; i++) {
  const r = spawn(1, Math.random() * 800, Math.random() * 600);
  vx[r] = Math.random() * 60 - 30; vy[r] = Math.random() * 60 - 30;
}
const keys = {};
onkeydown = e => { keys[e.key] = true; if (e.key === ' ') {
  const b = spawn(2, px[ship], py[ship]);
  vx[b] = Math.cos(rot[ship]) * 400; vy[b] = Math.sin(rot[ship]) * 400;
}};
onkeyup = e => keys[e.key] = false;
function movementSystem(dt) {
  for (let e = 0; e < MAX; e++) if (alive[e]) {
    px[e] = (px[e] + vx[e] * dt + 800) % 800;
    py[e] = (py[e] + vy[e] * dt + 600) % 600;
    if ((ttl[e] -= dt) <= 0) alive[e] = 0;
  }
}
function inputSystem(dt) {
  if (keys.ArrowLeft) rot[ship] -= 4 * dt;
  if (keys.ArrowRight) rot[ship] += 4 * dt;
  if (keys.ArrowUp) { vx[ship] += Math.cos(rot[ship]) * 250 * dt;
                      vy[ship] += Math.sin(rot[ship]) * 250 * dt; }
}
const ctx = document.getElementById('c').getContext('2d');
function renderSystem() {
  ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, 800, 600);
  for (let e = 0; e < MAX; e++) if (alive[e]) {
    ctx.strokeStyle = ['#9ef', '#c96', '#fe6'][kind[e]];
    ctx.beginPath();
    if (kind[e] === 0) {                   // ship: a triangle
      ctx.save(); ctx.translate(px[e], py[e]); ctx.rotate(rot[e]);
      ctx.moveTo(14, 0); ctx.lineTo(-10, 8); ctx.lineTo(-10, -8);
      ctx.closePath(); ctx.restore();
    } else ctx.arc(px[e], py[e], radius[e], 0, 7);
    ctx.stroke();
  }
}
let last = performance.now();
(function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05); last = now;
  inputSystem(dt); movementSystem(dt); renderSystem();
  requestAnimationFrame(frame);
})(last);
// Next: collisionSystem (rocks×bullets), split rocks via a spawn queue.
</script>`
    }
  },
  {
    id: 'verlet-physics',
    title: '2D Physics Playground (Verlet)',
    difficulty: 'two-weeks',
    tags: ['physics', 'simulation'],
    pitch: 'Cloth, ropes and ragdolls from one integrator and one constraint solver — the trick behind Hitman\'s ragdolls, in a page of code you can poke with the mouse.',
    eceAngle: 'Verlet integration is a numerical-methods refresher with instant visual feedback: position-based dynamics, constraint relaxation as iterative solving, stability vs. stiffness tradeoffs you can feel by dragging.',
    practices: ['Verlet integration', 'Distance-constraint relaxation', 'Interactive mouse constraints', 'Stability tuning (iterations vs. stiffness)'],
    milestones: ['Swinging rope pinned at one end', 'Cloth grid that tears when overstretched', 'Draggable points with the mouse', 'A box "ragdoll" of points + stick constraints'],
    starter: {
      language: 'JavaScript (single HTML file)',
      run: 'Save as verlet.html, open in a browser, drag the cloth.',
      code: `<canvas id="c" width="800" height="600"></canvas>
<script>
const ctx = document.getElementById('c').getContext('2d');
const pts = [], sticks = [], COLS = 24, ROWS = 14, GAP = 22;
for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
  pts.push({ x: 140 + x * GAP, y: 40 + y * GAP,
             ox: 140 + x * GAP, oy: 40 + y * GAP,
             pin: y === 0 && x % 4 === 0 });
const at = (x, y) => pts[y * COLS + x];
for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
  if (x < COLS - 1) sticks.push([at(x, y), at(x + 1, y), GAP]);
  if (y < ROWS - 1) sticks.push([at(x, y), at(x, y + 1), GAP]);
}
let mouse = null;
onmousemove = e => mouse = { x: e.offsetX, y: e.offsetY };
function tick() {
  for (const p of pts) {                    // Verlet: position holds velocity
    if (p.pin) continue;
    const nx = p.x + (p.x - p.ox) * 0.99, ny = p.y + (p.y - p.oy) * 0.99 + 0.35;
    p.ox = p.x; p.oy = p.y; p.x = nx; p.y = ny;
    if (mouse) {                            // soft mouse pull
      const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
      if (d < 40) { p.x += dx * 0.08; p.y += dy * 0.08; }
    }
  }
  for (let it = 0; it < 4; it++)            // constraint relaxation
    for (const [a, b, rest] of sticks) {
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
      const diff = (d - rest) / d * 0.5;
      if (!a.pin) { a.x += dx * diff; a.y += dy * diff; }
      if (!b.pin) { b.x -= dx * diff; b.y -= dy * diff; }
    }
}
(function frame() {
  tick();
  ctx.fillStyle = '#0d0f14'; ctx.fillRect(0, 0, 800, 600);
  ctx.strokeStyle = '#9fb8d0'; ctx.beginPath();
  for (const [a, b] of sticks) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
  ctx.stroke();
  requestAnimationFrame(frame);
})();
// Next: tear sticks when stretched > 1.6× rest; add circle colliders.
</script>`
    }
  },
  {
    id: 'raycaster-dungeon',
    title: 'Wolfenstein-Style Raycaster',
    difficulty: 'month-plus',
    tags: ['graphics', 'fundamentals'],
    pitch: 'A textured first-person dungeon renderer using 1992 mathematics — one ray per screen column. The most satisfying rendering project per line of code that exists.',
    eceAngle: 'DDA grid traversal, fixed-point-friendly math, fisheye correction via perpendicular distance — this is signal sampling and geometry, and it runs on anything, including that microcontroller on your desk.',
    practices: ['DDA ray-grid traversal', 'Perspective projection from first principles', 'Column-based rendering', 'Texture sampling & shading by distance'],
    milestones: ['Untextured walls with correct perspective', 'WASD + mouse-look movement with collision', 'Wall textures + distance fog', 'Sprites (enemies/pickups) with z-sorting'],
    starter: {
      language: 'JavaScript (single HTML file)',
      run: 'Save as ray.html, open in a browser. WASD to move.',
      code: `<canvas id="c" width="800" height="500"></canvas>
<script>
const ctx = document.getElementById('c').getContext('2d');
const MAP = [                              // 1 = wall, 0 = open
  [1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,1,0,1],[1,0,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,1,0,0,0,1],[1,0,1,0,1,1,1,1,0,1],[1,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,1,0,1,0,1],[1,0,0,0,1,0,0,0,0,1],[1,0,1,0,0,0,1,1,0,1],
  [1,1,1,1,1,1,1,1,1,1]];
const player = { x: 1.5, y: 1.5, ang: 0.7 };
const keys = {};
onkeydown = e => keys[e.key.toLowerCase()] = true;
onkeyup   = e => keys[e.key.toLowerCase()] = false;
function castRay(ang) {                     // step-based DDA (upgrade: true DDA)
  const dx = Math.cos(ang), dy = Math.sin(ang);
  let d = 0;
  while (d < 20) {
    d += 0.02;
    const x = player.x + dx * d, y = player.y + dy * d;
    if (MAP[y | 0][x | 0]) return { d, side: Math.abs((x % 1) - 0.5) > Math.abs((y % 1) - 0.5) };
  }
  return { d: 20, side: false };
}
const FOV = Math.PI / 3;
(function frame() {
  const mv = (keys.w ? 0.05 : 0) - (keys.s ? 0.05 : 0);
  const nx = player.x + Math.cos(player.ang) * mv;
  const ny = player.y + Math.sin(player.ang) * mv;
  if (!MAP[ny | 0][nx | 0]) { player.x = nx; player.y = ny; }  // collision
  player.ang += (keys.d ? 0.04 : 0) - (keys.a ? 0.04 : 0);
  ctx.fillStyle = '#1a1d24'; ctx.fillRect(0, 0, 800, 250);      // ceiling
  ctx.fillStyle = '#2b2620'; ctx.fillRect(0, 250, 800, 250);    // floor
  for (let col = 0; col < 800; col++) {
    const ang = player.ang - FOV / 2 + FOV * (col / 800);
    const ray = castRay(ang);
    const dist = ray.d * Math.cos(ang - player.ang);            // fisheye fix
    const h = Math.min(500, 380 / dist);
    const shade = Math.max(30, 200 - dist * 22) * (ray.side ? 0.7 : 1);
    ctx.fillStyle = 'rgb(' + shade + ',' + shade * 0.75 + ',' + shade * 0.5 + ')';
    ctx.fillRect(col, 250 - h / 2, 1, h);
  }
  requestAnimationFrame(frame);
})();
// Next: replace step-march with true DDA, then texture the walls.
</script>`
    }
  },
  {
    id: 'rollback-pong',
    title: 'Networked Pong with Rollback',
    difficulty: 'month-plus',
    tags: ['netcode', 'architecture'],
    pitch: 'Two browser tabs playing Pong over a simulated laggy link, with client prediction and rollback — the netcode architecture behind every good fighting game.',
    eceAngle: 'This is your networking background weaponized: deterministic simulation, input delay vs. rollback tradeoffs, and clock sync. The starter simulates 90 ms latency locally via BroadcastChannel so you can build the hard part first.',
    practices: ['Deterministic fixed-point simulation', 'Input buffering & delay frames', 'State snapshot/restore for rollback', 'Latency simulation & measurement'],
    milestones: ['Two tabs exchange inputs via BroadcastChannel', 'Lockstep with input delay (feel the lag)', 'Rollback: predict remote input, rewind & replay on correction', 'On-screen rollback counter + artificial-latency slider'],
    starter: {
      language: 'JavaScript (two browser tabs, no server)',
      run: 'Save as rollback.html, open in TWO tabs side by side. W/S in each.',
      code: `<canvas id="c" width="600" height="360"></canvas><div id="s"></div>
<script>
// Deterministic sim + input exchange over BroadcastChannel with fake latency.
const chan = new BroadcastChannel('pong');
const LATENCY = 90;                          // ms, one way — tune and feel it
const side = location.hash === '#p2' ? 1 : 0;
if (!location.hash) location.hash = '#p2';   // first tab claims p1... open a second
document.title = 'Pong ' + (side ? 'P2' : 'P1');
let frameN = 0;
const localIn = [], remoteIn = [];           // input logs, indexed by frame
function simStep(st, in0, in1) {             // MUST be deterministic
  st.p[0] += (in0 & 1 ? -4 : 0) + (in0 & 2 ? 4 : 0);
  st.p[1] += (in1 & 1 ? -4 : 0) + (in1 & 2 ? 4 : 0);
  st.bx += st.vx; st.by += st.vy;
  if (st.by < 8 || st.by > 352) st.vy = -st.vy;
  if (st.bx < 24 && st.by > st.p[0] && st.by < st.p[0] + 60) st.vx = -st.vx;
  if (st.bx > 576 && st.by > st.p[1] && st.by < st.p[1] + 60) st.vx = -st.vx;
  if (st.bx < 0 || st.bx > 600) { st.bx = 300; st.by = 180; }
}
let state = { p: [150, 150], bx: 300, by: 180, vx: 3, vy: 2 };
const keys = {};
onkeydown = e => keys[e.key] = true;
onkeyup = e => keys[e.key] = false;
chan.onmessage = e => {                      // receive delayed remote input
  const { f, bits } = e.data;
  remoteIn[f] = bits;
};
setInterval(() => {                          // 60 Hz sim clock
  const bits = (keys.w ? 1 : 0) | (keys.s ? 2 : 0);
  localIn[frameN] = bits;
  setTimeout(() => chan.postMessage({ f: frameN, bits }), LATENCY);
  // naive lockstep: stall if remote input missing (rollback is YOUR upgrade)
  const rIn = remoteIn[frameN - 6];          // 6 frames of input delay
  if (frameN < 6 || rIn !== undefined) {
    const l = localIn[frameN - 6] ?? 0;
    simStep(state, side ? rIn : l, side ? l : rIn ?? 0);
    frameN++;
  }
  document.getElementById('s').textContent =
    'frame ' + frameN + ' | you are P' + (side + 1) + ' | stalled: ' + (rIn === undefined && frameN >= 6);
}, 16);
const ctx = document.getElementById('c').getContext('2d');
(function draw() {
  ctx.fillStyle = '#101318'; ctx.fillRect(0, 0, 600, 360);
  ctx.fillStyle = '#e8e8e8';
  ctx.fillRect(16, state.p[0], 8, 60); ctx.fillRect(576, state.p[1], 8, 60);
  ctx.fillRect(state.bx - 5, state.by - 5, 10, 10);
  requestAnimationFrame(draw);
})();
// Upgrade path: snapshot state each frame; when late input arrives and
// disagrees with your prediction (repeat-last-input), rewind & replay.
</script>`
    }
  }
];

// ---------------------------------------------------------------------------
// Engine selection guide
// ---------------------------------------------------------------------------
export const ENGINES = [
  {
    name: 'Godot',
    language: 'GDScript / C# / C++ (modules)',
    license: 'MIT — genuinely free',
    curve: 'Gentle',
    bestFor: 'Indie & 2D, learning how engines work',
    pick: 'Pick if you value open source and want an engine whose entire codebase you can read. Closest to the "own your stack" embedded ethos; the editor itself is a Godot game.',
    watchOut: '3D is capable but a tier behind Unreal; console export needs third-party help.'
  },
  {
    name: 'Unity',
    language: 'C#',
    license: 'Proprietary, free tier (revenue-capped)',
    curve: 'Moderate',
    bestFor: 'Fastest route to a jam-ready game; mobile; the largest tutorial ecosystem',
    pick: 'Pick if you want maximum learning resources and job postings. C# is a weekend transition from C++, and DOTS/ECS lets your data-oriented instincts loose later.',
    watchOut: 'Trust wobbles after the 2023 pricing episode; engine source is closed.'
  },
  {
    name: 'Unreal',
    language: 'C++ / Blueprints',
    license: 'Source-available, 5% royalty past $1M',
    curve: 'Steep',
    bestFor: 'AAA-track roles, high-end 3D, the industry-standard C++ codebase',
    pick: 'Pick if the goal is a professional engine-programming job. It is the only mainstream engine where your C++ depth is the native language, and reading its source is an education.',
    watchOut: 'Heavy tooling, long compiles; overkill for small 2D games.'
  }
];

// ---------------------------------------------------------------------------
// Curated tracks through the projects
// ---------------------------------------------------------------------------
export const TRACKS = [
  {
    name: 'Engine Programmer',
    blurb: 'From game loop to architecture to shipping systems — the path to engine and gameplay-systems roles.',
    projectIds: ['pong-fixed-timestep', 'ecs-asteroids', 'verlet-physics', 'rollback-pong']
  },
  {
    name: 'Graphics Programmer',
    blurb: 'Rasterization from first principles up through real-time rendering — the deepest lane, and the one closest to computer architecture.',
    projectIds: ['software-rasterizer', 'raycaster-dungeon', 'boids-spatial-hash']
  },
  {
    name: 'Audio / DSP Specialist',
    blurb: 'The rarest specialty in game dev and the one your MS hands you almost for free.',
    projectIds: ['chip-synth', 'pong-fixed-timestep', 'rollback-pong']
  }
];
