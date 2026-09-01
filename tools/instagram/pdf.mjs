/**
 * Exporta os nove quadros como PDF vetorial: o texto continua sendo texto,
 * então abre editável em Illustrator, Affinity, Inkscape ou Figma.
 *
 * Gera um arquivo com as nove páginas e um por quadro, para quem quiser
 * mexer em um só.
 *
 *   npx playwright install chromium   # uma vez
 *   node tools/instagram/pdf.mjs
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { POST_W, CELL_H, QUADROS } from './tiles.mjs';

const OUT = new URL('../../dist-instagram/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

/* Em polegadas, não em px: o Chromium converte px para pontos e arredonda,
   o que deixava a página 1px mais alta. 1080px = 11.25in e 1350px = 14.0625in
   caem em números exatos de ponto. */
const PAGINA = {
  preferCSSPageSize: true,   // usa o @page do HTML, sem reconverter px para pontos
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
const p = await b.newPage();
await p.goto('file://' + new URL('./index.html', import.meta.url).pathname, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(500);

await p.pdf({ ...PAGINA, path: OUT + 'imakers-grade-9-quadros.pdf' });
process.stdout.write('  imakers-grade-9-quadros.pdf (9 páginas)\n');

for (let i = 1; i <= QUADROS.length; i++) {
  const ordem = QUADROS.length + 1 - i;
  const nome = `${String(ordem).padStart(2, '0')}-postar-${ordem}o--quadro-${i}.pdf`;
  await p.pdf({ ...PAGINA, path: OUT + nome, pageRanges: String(i) });
  process.stdout.write(`  ${nome}\n`);
}

await b.close();
