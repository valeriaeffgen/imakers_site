// Exporta os nove quadros.
// Sem CHROME definido, usa o Chromium que o playwright-core instalou
// (`npx playwright install chromium`, uma vez). Para apontar outro:
//   CHROME=/caminho/para/chrome node render.mjs
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const OUT = new URL('../../dist-instagram/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args:['--no-sandbox'] });
const p = await b.newPage({ viewport:{width:3400,height:1500}, deviceScaleFactor: 1 });
const errs=[]; p.on('pageerror', e=>errs.push(e.message));
await p.goto('file://' + new URL('./index.html', import.meta.url).pathname + '', { waitUntil:'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(700);
for (let i = 1; i <= 9; i++) {
  const ordem = 10 - i;                       // quadro 9 é o primeiro a publicar
  const nome = String(ordem).padStart(2,'0') + '-postar-' + ordem + 'o--quadro-' + i + '.png';
  await p.locator('#q' + i).screenshot({ path: OUT + '/' + nome });
}
// contato: uma folha de contato para conferir tudo de uma vez
await p.locator('.folha').screenshot({ path: OUT + '/folha-de-contato.png' });
const dims = await p.evaluate(() => {
  const el = document.querySelector('#q1').getBoundingClientRect();
  return Math.round(el.width) + '×' + Math.round(el.height);
});
console.log('quadros exportados em', dims);
if (errs.length) console.log('ERROS:', errs.join(' | '));
await b.close();
