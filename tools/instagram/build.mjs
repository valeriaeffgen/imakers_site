/** Gera o HTML de exportação: nove quadros em 1080×1350, prontos para captura. */
import { writeFileSync } from 'node:fs';
import { CELL_W, CELL_H, POST_W, BLEED, GRID_W, GRID_H, COR, QUADROS, mosaico, seta } from './tiles.mjs';

const LOGO = `
  <span class="logo">
    <span class="logo__mark">${seta(3)}</span>
    <b>imakers</b>
  </span>`;

function quadro(i) {
  const q = QUADROS[i];
  const r = Math.floor(i / 3);
  const c = i % 3;
  const meio = q.banda === 'meio';
  const marca = Boolean(q.logo);

  const partes = [];
  if (q.kicker) partes.push(`<p class="kicker">${q.kicker}</p>`);
  if (q.logo) partes.push(LOGO);
  if (q.h) partes.push(`<h2>${q.h}</h2>`);
  if (q.p) partes.push(`<p class="apoio">${q.p}</p>`);

  /* A composição espelha em torno da faixa central: a linha de cima encosta o
     texto na base, as de baixo encostam no topo. A marca vai sempre para a
     ponta oposta ao texto, então nunca se cruzam. */
  const alinha = r === 0 ? 'base' : 'topo';
  const marcaPos = r === 0 ? 'topo' : 'base';

  return `
  <article class="post ${meio ? 'post--meio' : ''} ${marca ? 'post--marca' : ''}" data-alinha="${alinha}" data-marca="${marcaPos}"
           id="q${i + 1}" data-quadro="${i + 1}">
    <div class="mosaico" style="left:${BLEED - c * CELL_W}px; top:${-r * CELL_H}px">${mosaico()}</div>
    <div class="corpo">${partes.join('')}</div>
    <span class="marca">imakers.com</span>
  </article>`;
}

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Figtree'; font-style: normal; font-weight: 300 900; font-display: block;
    src: url('figtree-var-latin.woff2') format('woff2');
  }
  * { box-sizing: border-box; margin: 0; }
  body { background: #444; font-family: 'Figtree', sans-serif; -webkit-font-smoothing: antialiased; }
  .folha { display: flex; flex-wrap: wrap; gap: 24px; padding: 24px; width: ${POST_W * 3 + 24 * 4}px; }

  .post {
    position: relative; width: ${POST_W}px; height: ${CELL_H}px;
    overflow: hidden; isolation: isolate;
  }
  .mosaico { position: absolute; width: ${GRID_W}px; height: ${GRID_H}px; z-index: 0; }

  .corpo {
    position: relative; z-index: 1; height: 100%;
    padding: 108px ${BLEED + 104}px;
    display: flex; flex-direction: column; gap: 26px;
  }
  .post[data-alinha='base'] .corpo { justify-content: flex-end; }
  .post[data-alinha='topo'] .corpo { justify-content: flex-start; }

  .kicker {
    font-size: 27px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
    color: ${COR.magenta};
  }
  h2 {
    font-size: 74px; font-weight: 700; line-height: 1.1; letter-spacing: -0.03em;
    color: ${COR.ink};
  }
  .apoio { font-size: 32px; line-height: 1.4; color: ${COR.inkSoft}; max-width: 22ch; }

  .post--meio h2 { color: ${COR.light}; font-size: 78px; }
  /* O quadro da marca empilha logo, frase e apoio, então tudo aperta um pouco
     para o conjunto terminar acima da seta. */
  .post--marca h2 { font-size: 62px; }
  .post--marca .corpo { gap: 20px; }
  .post--marca .apoio { max-width: none; }
  .post--meio .apoio { color: ${COR.lightSoft}; }

  /* A marca, pequena e constante: no feed cada quadro aparece sozinho. */
  .marca {
    position: absolute; z-index: 1; left: ${BLEED + 104}px;
    font-size: 25px; font-weight: 500; letter-spacing: .01em; color: ${COR.inkSoft}; opacity: .75;
  }
  .post[data-marca='topo'] .marca { top: 104px; }
  .post[data-marca='base'] .marca { bottom: 104px; }
  .post--meio .marca { color: ${COR.lightSoft}; }

  .logo { display: block; position: relative; width: 274px; padding-top: 72px; color: ${COR.light}; }
  .logo__mark { position: absolute; top: 0; left: 10%; width: 80%; }
  .logo b { display: block; font-size: 84px; font-weight: 500; letter-spacing: -.033em; line-height: 1; }

  /* Impressão: cada quadro vira uma página do tamanho exato do post, sem
     margem. É daqui que sai o PDF vetorial, com o texto ainda editável. */
  @page { size: ${POST_W}px ${CELL_H}px; margin: 0; }
  @media print {
    body { background: #fff; }
    .folha { display: block; width: auto; padding: 0; gap: 0; }
    .post { break-after: page; page-break-after: always; }
    .post:last-child { break-after: auto; page-break-after: auto; }
  }
</style></head>
<body><div class="folha">
${QUADROS.map((_, i) => quadro(i)).join('\n')}
</div></body></html>`;

writeFileSync(new URL('./index.html', import.meta.url), html);
console.log('index.html gerado — 9 quadros de ' + POST_W + '×' + CELL_H);
