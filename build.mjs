// Deterministic build: render the page and write dist/index.html.
// `npm run build` runs the full test suite first and aborts on failure.
import { mkdir, writeFile } from 'node:fs/promises';
import { renderPage } from './src/render.mjs';

const html = renderPage();
await mkdir('dist', { recursive: true });
await writeFile('dist/index.html', html);
console.log(`dist/index.html written (${(html.length / 1024).toFixed(1)} KiB)`);
