// Inserisce nell'HTML di produzione la pagina già renderizzata e il CSS in linea:
// contenuti e link sono leggibili senza JavaScript e il primo disegno non aspetta il foglio di stile.
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const client = path.join(root, 'dist', 'client');
const ssrDir = path.join(root, 'dist', 'ssr');
const indexFile = path.join(client, 'index.html');
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

let html = await readFile(indexFile, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('Root marker not found in dist/client/index.html');
html = html.replace(marker, `<div id="root">${render()}</div>`);

// Il percorso include la base di GitHub Pages (/nome-repo/assets/...): si legge solo la parte da assets/ in poi.
const stylesheet = html.match(/<link rel="stylesheet" crossorigin href="[^"]*?\/(assets\/[^"]+\.css)">/);
if (!stylesheet) throw new Error('Stylesheet link not found in dist/client/index.html');
const css = await readFile(path.join(client, stylesheet[1]), 'utf8');
html = html.replace(stylesheet[0], `<style>${css}</style>`);

await writeFile(indexFile, html);
await rm(ssrDir, { recursive: true, force: true });
console.log('Prerendered dist/client/index.html with inline CSS');
