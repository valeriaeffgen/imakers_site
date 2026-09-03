/**
 * Gera as imagens sociais (Open Graph / Twitter Card) e os icones PWA.
 *
 * Rode com `npm run og` sempre que criar uma pagina nova ou mudar a marca.
 * As imagens sao versionadas em public/og — o build do site nao depende de
 * fontes instaladas no servidor de deploy.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(root, 'public', 'og');

const MAGENTA = '#ec1b8d';
/** Aparece no rodape da imagem social. Troque junto com o dominio real. */
const DOMAIN = process.env.SITE_DOMAIN || 'viceja.com';
const FONT = "Quicksand Light, Quicksand, DejaVu Sans, sans-serif";

/** Caminhos exatos da marca, reaproveitados do componente Squiggle.astro. */
const WAVE = 'M3 26C5.5 12 12 6.5 17 9.5s7 15.5 12.5 18C35.5 30 40 12 47 7.5s8 12.5 13.5 16.5C68 29.4 78 20 95 4.5';
const HEAD = 'M75.5 6.5 95 4.5l-6.5 16.5';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Quebra de linha gulosa. A largura media do glifo e estimada pelo corpo da fonte. */
function wrap(text, fontSize, maxWidth, maxLines = 4) {
  /* Largura media de glifo, em multiplos do corpo. Medida no navegador com a
     Quicksand em peso 700 sobre os titulos reais deste arquivo: a media deu
     0,5076 e o pior caso 0,5198. Usamos o pior caso, porque errar para a
     linha curta apenas quebra mais cedo, enquanto errar para a linha longa
     estoura a margem da imagem. */
  const perChar = fontSize * 0.52;
  const maxChars = Math.max(8, Math.floor(maxWidth / perChar));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[.,;:]$/, '') + '…';
    return kept;
  }
  return lines;
}

function squiggle({ x, y, w, color = MAGENTA, stroke = 3, opacity = 1 }) {
  const scale = w / 100;
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}"
      stroke-width="${stroke / scale}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">
      <path d="${WAVE}"/><path d="${HEAD}"/>
    </g>`;
}

/* O wordmark e desenhado em curvas, nao em texto.
   Motivo: o SVG e rasterizado pelo librsvg, que so encontra a fonte se ela
   estiver instalada na maquina que roda o script. Um ativo de marca nao pode
   depender disso — se a fonte faltar, o nome sai em Times ou some. As curvas
   sempre saem iguais.
   Geradas com fontTools (SVGPathPen sobre Quicksand-Medium.ttf, o peso 500)
   com letter-spacing -0.028em, exatamente como o Logo.astro desenha a
   palavra, linha de base em y=0 e corpo 100. Ver scripts/wordmark-path.py,
   que precisa rodar de novo se o nome ou a fonte mudarem.
   O avanco de 2,571 foi confirmado por tres caminhos independentes: o
   SVGPathPen, o opentype.js e getClientRects no navegador.
   Nao use opentype.js para gerar as curvas: nesta instancia variavel ele
   devolve coordenadas NaN a partir da quarta letra, e o librsvg simplesmente
   para de desenhar ali, sem erro. */
const PALAVRA_D = 'M7.4 -52.6Q8.6 -52.6 9.7 -51.95Q10.8 -51.3 11.3 -50.1L27.9 -11.1L26.3 -10.3L43.2 -50Q44.3 -52.7 46.9 -52.6Q48.4 -52.6 49.5 -51.6Q50.6 -50.6 50.6 -49.1Q50.6 -48.5 50.45 -47.95Q50.3 -47.4 50.1 -47L30.8 -2.6Q29.7 -0.1 27.3 0Q26 0.1 24.85 -0.55Q23.7 -1.2 23.2 -2.6L3.9 -46.9Q3.7 -47.3 3.55 -47.8Q3.4 -48.3 3.4 -49Q3.4 -50.3 4.45 -51.45Q5.5 -52.6 7.4 -52.6ZM66.3 -4.1Q66.3 -2.4 65.15 -1.2Q64 0 62.3 0Q60.5 0 59.4 -1.2Q58.3 -2.4 58.3 -4.1V-48.5Q58.3 -50.2 59.45 -51.35Q60.6 -52.5 62.3 -52.5Q64 -52.5 65.15 -51.35Q66.3 -50.2 66.3 -48.5ZM62.3 -59.2Q59.8 -59.2 58.6 -60.2Q57.4 -61.2 57.4 -63.3V-64.7Q57.4 -66.8 58.7 -67.8Q60 -68.8 62.4 -68.8Q64.8 -68.8 66 -67.8Q67.2 -66.8 67.2 -64.7V-63.3Q67.2 -61.2 65.95 -60.2Q64.7 -59.2 62.3 -59.2ZM100.9 -53Q106 -53 110.1 -51.9Q114.2 -50.8 116.6 -48.9Q119 -47 119 -44.6Q119 -43.3 118.1 -42.1Q117.2 -40.9 115.7 -40.9Q114.3 -40.9 113.45 -41.4Q112.6 -41.9 111.85 -42.7Q111.1 -43.5 109.8 -44.1Q108.6 -44.8 106.3 -45.2Q104 -45.6 101.7 -45.6Q96.2 -45.6 92.05 -43Q87.9 -40.4 85.5 -36Q83.1 -31.6 83.1 -26Q83.1 -20.4 85.4 -16Q87.7 -11.6 91.8 -9Q95.9 -6.4 101.3 -6.4Q104.8 -6.4 106.9 -7Q109 -7.6 110.4 -8.4Q112.2 -9.4 113.15 -10.4Q114.1 -11.4 115.7 -11.4Q117.4 -11.4 118.35 -10.3Q119.3 -9.2 119.3 -7.6Q119.3 -5.8 116.8 -3.8Q114.3 -1.8 110.05 -0.4Q105.8 1 100.4 1Q92.8 1 87.1 -2.55Q81.4 -6.1 78.25 -12.25Q75.1 -18.4 75.1 -26Q75.1 -33.6 78.35 -39.7Q81.6 -45.8 87.4 -49.4Q93.2 -53 100.9 -53ZM150.9 1Q142.9 1 136.9 -2.4Q130.9 -5.8 127.55 -11.75Q124.2 -17.7 124.2 -25.5Q124.2 -34.2 127.65 -40.35Q131.1 -46.5 136.65 -49.75Q142.2 -53 148.4 -53Q153 -53 157.3 -51.3Q161.6 -49.6 164.9 -46.35Q168.2 -43.1 170.2 -38.55Q172.2 -34 172.3 -28.4Q172.3 -26.8 171.1 -25.7Q169.9 -24.6 168.3 -24.6H128.8L127 -31.5H165.5L163.9 -30.1V-32.3Q163.5 -36.4 161.15 -39.35Q158.8 -42.3 155.45 -43.9Q152.1 -45.5 148.4 -45.5Q145.4 -45.5 142.45 -44.45Q139.5 -43.4 137.15 -41.05Q134.8 -38.7 133.35 -35Q131.9 -31.3 131.9 -26.1Q131.9 -20.3 134.25 -15.9Q136.6 -11.5 140.8 -8.95Q145 -6.4 150.6 -6.4Q154.1 -6.4 156.7 -7.3Q159.3 -8.2 161.2 -9.55Q163.1 -10.9 164.4 -12.3Q165.7 -13.2 166.9 -13.2Q168.4 -13.2 169.35 -12.2Q170.3 -11.2 170.3 -9.8Q170.3 -8.1 168.7 -6.8Q165.9 -3.7 161.1 -1.35Q156.3 1 150.9 1ZM190.9 3.4Q190.9 8.5 188.65 12.1Q186.4 15.7 183 17.7Q179.6 19.7 175.9 19.7Q174.2 19.7 173.15 18.6Q172.1 17.5 172.1 16V15.3Q172.1 13.8 173.1 12.9Q174.1 12 175.6 11.6Q177.9 11 179.5 9.75Q181.1 8.5 182 6.45Q182.9 4.4 182.9 1.6V-47.7Q182.9 -49.4 184.05 -50.6Q185.2 -51.8 186.9 -51.8Q188.7 -51.8 189.8 -50.6Q190.9 -49.4 190.9 -47.7ZM186.9 -59.2Q184.4 -59.2 183.2 -60.2Q182 -61.2 182 -63.3V-64.7Q182 -66.8 183.3 -67.8Q184.6 -68.8 187 -68.8Q189.4 -68.8 190.6 -67.8Q191.8 -66.8 191.8 -64.7V-63.3Q191.8 -61.2 190.55 -60.2Q189.3 -59.2 186.9 -59.2ZM248.5 -52.2Q250.2 -52.2 251.35 -51.05Q252.5 -49.9 252.5 -48.2V-4.1Q252.5 -2.4 251.35 -1.2Q250.2 0 248.5 0Q246.7 0 245.6 -1.2Q244.5 -2.4 244.5 -4.1V-13.6L246.4 -13.8Q246.4 -11.6 244.9 -9Q243.4 -6.4 240.8 -4.15Q238.2 -1.9 234.65 -0.45Q231.1 1 227 1Q220.2 1 214.8 -2.55Q209.4 -6.1 206.25 -12.2Q203.1 -18.3 203.1 -26.1Q203.1 -34 206.25 -40.05Q209.4 -46.1 214.8 -49.55Q220.2 -53 226.8 -53Q231.1 -53 234.8 -51.6Q238.5 -50.2 241.25 -47.8Q244 -45.4 245.55 -42.5Q247.1 -39.6 247.1 -36.7L244.5 -37.3V-48.2Q244.5 -49.9 245.6 -51.05Q246.7 -52.2 248.5 -52.2ZM227.9 -6.4Q232.9 -6.4 236.75 -9Q240.6 -11.6 242.75 -16.05Q244.9 -20.5 244.9 -26.1Q244.9 -31.6 242.75 -36.05Q240.6 -40.5 236.75 -43.05Q232.9 -45.6 227.9 -45.6Q223 -45.6 219.15 -43.1Q215.3 -40.6 213.1 -36.2Q210.9 -31.8 210.9 -26.1Q210.9 -20.5 213.05 -16.05Q215.2 -11.6 219.05 -9Q222.9 -6.4 227.9 -6.4Z';
const PALAVRA_AVANCO = 2.571;

function wordmark({ x, y, size, color = '#ffffff', markColor = MAGENTA }) {
  // Mesmas proporcoes do componente Logo.astro: a seta ocupa 80% da largura da
  // palavra, centrada sobre ela e apoiada logo acima das letras.
  const wordW = size * PALAVRA_AVANCO;
  const markW = wordW * 0.8;
  const escala = size / 100;
  return `${squiggle({ x: x + wordW * 0.1, y: y - size * 1.62, w: markW, color: markColor, stroke: size * 0.1 })}
    <g transform="translate(${x} ${y}) scale(${escala})" fill="${color}"><path d="${PALAVRA_D}"/></g>`;
}

/* ---------- Imagem social 1200x630 -------------------------------------- */
function ogSvg({ title, kicker }) {
  const W = 1200, H = 630, PAD = 84;
  const size = 66;
  const lines = wrap(title, size, W - PAD * 2 - 40, 4);
  const blockH = lines.length * size * 1.16;
  const top = H - PAD - 74 - blockH + size * 0.82;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#21132a"/><stop offset="0.62" stop-color="#141519"/><stop offset="1" stop-color="#101116"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${MAGENTA}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${MAGENTA}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1080" cy="70" r="420" fill="url(#glow)"/>
  ${squiggle({ x: 700, y: 400, w: 620, color: MAGENTA, stroke: 5, opacity: 0.14 })}
  ${wordmark({ x: PAD, y: PAD + 34, size: 34 })}
  ${kicker ? `<text x="${PAD}" y="${top - size * 1.15}" font-family="${FONT}" font-size="23" font-weight="bold"
      letter-spacing="3.6" fill="${MAGENTA}">${esc(kicker.toUpperCase())}</text>` : ''}
  ${lines
    .map(
      (l, i) =>
        `<text x="${PAD}" y="${top + i * size * 1.16}" font-family="${FONT}" font-size="${size}" font-weight="bold"
          letter-spacing="${-size * 0.024}" fill="#f7f5f4">${esc(l)}</text>`
    )
    .join('\n  ')}
  <rect x="${PAD}" y="${H - PAD - 30}" width="76" height="5" rx="2.5" fill="${MAGENTA}"/>
  <text x="${PAD + 96}" y="${H - PAD - 21}" font-family="${FONT}" font-size="24" font-weight="500"
    fill="#8b8f9c">${DOMAIN}</text>
</svg>`;
}

/* ---------- Icones ------------------------------------------------------ */
/* Os icones usam o MESMO desenho do favicon.svg: uma versao simplificada da
   seta, com curvas mais abertas, que aguenta tamanhos pequenos. A seta do
   logo tem curvas fechadas demais — no tamanho de icone o traco preenche a
   onda e ela vira uma mancha.
   Fundo branco: a seta magenta se sustenta sozinha e o icone nao vira um
   bloco escuro na barra de abas nem na tela inicial. */
const ICONE_ONDA = 'M9 45C13 25 24 24 30 38c4 9 10 4 22-21';
const ICONE_PONTA = 'M39 19 52 17l-3 13';

function iconSvg(size, { maskable = false } = {}) {
  // Icone maskable: o sistema recorta em circulo, entao o desenho recua para
  // caber na area central segura.
  const escala = (size / 64) * (maskable ? 0.72 : 1);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${maskable ? 0 : size * 0.22}" fill="#ffffff"/>
    <g transform="translate(${size / 2} ${size / 2}) scale(${escala}) translate(-32 -32)"
       fill="none" stroke="${MAGENTA}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="${ICONE_ONDA}"/><path d="${ICONE_PONTA}"/>
    </g>
  </svg>`;
}

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#ffffff"/>
    ${wordmark({ x: (512 - 78 * PALAVRA_AVANCO) / 2, y: 300, size: 78, color: '#202126' })}
  </svg>`;
}

/* ---------- Manifesto de paginas ---------------------------------------- */
const PAGES = [
  { file: 'default', kicker: 'Da atenção à operação própria', title: 'Transformamos sua presença digital em negócio.' },
  { file: 'metodo', kicker: 'Método Viceja', title: 'Discovery, Launch e Engine: três etapas para transformar presença em operação.' },
  { file: 'discovery', kicker: 'Etapa 1', title: 'Viceja Discovery: entender antes de construir.' },
  { file: 'launch', kicker: 'Etapa 2', title: 'Viceja Launch: colocar a estrutura para funcionar.' },
  { file: 'engine', kicker: 'Etapa 3', title: 'Viceja Engine: fazer o negócio continuar evoluindo.' },
  { file: 'solucoes', kicker: 'O que construímos', title: 'Comece simples. Evolua quando o negócio pedir.' },
  { file: 'ativos-proprios', kicker: 'Ativos próprios', title: 'Conteúdos e ferramentas que continuam trabalhando depois da publicação.' },
  { file: 'pagamentos', kicker: 'Pagamentos', title: 'Checkout, pedidos, assinaturas e conciliação — no seu nome.' },
  { file: 'para-quem-e', kicker: 'Para quem é', title: 'Para quem já tem algo para dizer e precisa de estrutura para crescer.' },
  { file: 'autoleitura', kicker: 'Autoleitura', title: 'Descubra em 2 minutos qual estrutura sua presença está pedindo.' },
  { file: 'contato', kicker: 'Vamos conversar', title: 'Conte o que você já construiu. Mostramos o próximo passo.' },
  { file: 'blog', kicker: 'Blog Viceja', title: 'Ideias para transformar atenção em operação própria.' },
  // Artigos do blog — o campo `og` do frontmatter aponta para estes arquivos.
  { file: 'blog-clique', kicker: 'Estratégia', title: 'Sua audiência clica. E aí, para onde ela vai?' },
  { file: 'blog-ativos', kicker: 'Ativos próprios', title: 'Um guia bem feito trabalha por meses. Um post, por horas.' },
  { file: 'blog-venda', kicker: 'Pagamentos', title: 'Checkout, webhook e conciliação: os oito momentos de uma venda.' },
  { file: 'blog-preco', kicker: 'Operação', title: 'Por que não existe um preço único de site.' },
];

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const p of PAGES) {
    const svg = ogSvg(p);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${p.file}.png`));
    process.stdout.write(`  og/${p.file}.png\n`);
  }

  await sharp(Buffer.from(logoSvg())).png().toFile(path.join(OUT, 'logo.png'));
  process.stdout.write('  og/logo.png\n');

  const pub = path.join(root, 'public');
  await sharp(Buffer.from(iconSvg(192))).png().toFile(path.join(pub, 'icon-192.png'));
  await sharp(Buffer.from(iconSvg(512))).png().toFile(path.join(pub, 'icon-512.png'));
  await sharp(Buffer.from(iconSvg(512, { maskable: true }))).png().toFile(path.join(pub, 'icon-maskable-512.png'));
  await writeFile(path.join(pub, 'og-preview.svg'), ogSvg(PAGES[0]));
  process.stdout.write('  icons + preview\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
