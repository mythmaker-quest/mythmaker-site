// Emits dist/styles.css: a single, self-contained stylesheet for consumers that
// can't follow the src/ @import graph — notably the design-sync converter, which
// appends cssEntry verbatim into the design system's CSS closure.
//
// It inlines the token layer and embeds the blackletter display face as a
// data-URI, so the bundle needs no external font files or path resolution.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const ui = join(here, '..');
const read = (p) => readFileSync(join(ui, p), 'utf8');
mkdirSync(join(ui, 'dist'), { recursive: true });

// Google-hosted UI/body/quest faces load at runtime; the blackletter display
// face is client-licensed and ships as a file beside styles.css so the
// design-sync converter copies it into the bundle's fonts/ (it drops
// @font-face rules whose url() isn't a resolvable local file — data-URIs included).
const googleImport =
  '@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Alegreya:ital,wght@0,400;0,500;0,700;1,400&family=IM+Fell+English:ital@0;1&display=swap");';

copyFileSync(join(ui, 'fonts/knights-quest.woff2'), join(ui, 'dist/knights-quest.woff2'));
const knightsFace =
  `@font-face {\n` +
  `  font-family: "Knights Quest";\n` +
  `  src: url("./knights-quest.woff2") format("woff2");\n` +
  `  font-display: swap;\n` +
  `}`;

// Token order mirrors src/styles.css (minus fonts.css, replaced above).
const tokens = ['colors', 'typography', 'spacing', 'effects', 'motion', 'base']
  .map((n) => `/* tokens/${n}.css */\n${read(`src/tokens/${n}.css`)}`)
  .join('\n');

const out = [googleImport, '', knightsFace, '', tokens, ''].join('\n');
mkdirSync(join(ui, 'dist'), { recursive: true });
writeFileSync(join(ui, 'dist/styles.css'), out);
console.log(`bundle-css: wrote dist/styles.css (${(out.length / 1024).toFixed(1)} KB, font inlined)`);
