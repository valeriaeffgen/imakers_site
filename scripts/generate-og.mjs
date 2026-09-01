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
const DOMAIN = process.env.SITE_DOMAIN || 'imakers.com.br';
const FONT = "Figtree Light, Figtree, DejaVu Sans, sans-serif";

/** Caminhos exatos da marca, reaproveitados do componente Squiggle.astro. */
const WAVE = 'M3 26C5.5 12 12 6.5 17 9.5s7 15.5 12.5 18C35.5 30 40 12 47 7.5s8 12.5 13.5 16.5C68 29.4 78 20 95 4.5';
const HEAD = 'M75.5 6.5 95 4.5l-6.5 16.5';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Quebra de linha gulosa. A largura media do glifo e estimada pelo corpo da fonte. */
function wrap(text, fontSize, maxWidth, maxLines = 4) {
  const perChar = fontSize * 0.5;
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

function wordmark({ x, y, size, color = '#ffffff', markColor = MAGENTA }) {
  // Proporcoes medidas na logo original: a seta ocupa 60% da largura da palavra,
  // comeca a 20% dela e o vale da onda para logo acima da altura-x.
  const wordW = size * 3.5;
  const markW = wordW * 0.6;
  return `${squiggle({ x: x + wordW * 0.19, y: y - size * 1.24, w: markW, color: markColor, stroke: size * 0.1 })}
    <text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="500"
      letter-spacing="${-size * 0.028}" fill="${color}">imakers</text>`;
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
function iconSvg(size, { maskable = false } = {}) {
  const pad = maskable ? size * 0.21 : size * 0.14;
  const w = size - pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${maskable ? 0 : size * 0.22}" fill="#202126"/>
    <g transform="translate(${pad} ${size / 2 - (w * 0.32) / 2}) scale(${w / 100})" fill="none" stroke="${MAGENTA}"
       stroke-width="${(size * 0.095) / (w / 100)}" stroke-linecap="round" stroke-linejoin="round">
      <path d="${WAVE}"/><path d="${HEAD}"/>
    </g>
  </svg>`;
}

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#ffffff"/>
    ${wordmark({ x: 119, y: 290, size: 78, color: '#202126' })}
  </svg>`;
}

/* ---------- Manifesto de paginas ---------------------------------------- */
const PAGES = [
  { file: 'default', kicker: 'Da atenção à operação própria', title: 'Transformamos sua presença digital em negócio.' },
  { file: 'metodo', kicker: 'Método IMAKERS', title: 'Discovery, Launch e Engine: três etapas para transformar presença em operação.' },
  { file: 'discovery', kicker: 'Etapa 1', title: 'IMAKERS Discovery: entender antes de construir.' },
  { file: 'launch', kicker: 'Etapa 2', title: 'IMAKERS Launch: colocar a estrutura para funcionar.' },
  { file: 'engine', kicker: 'Etapa 3', title: 'IMAKERS Engine: fazer o negócio continuar evoluindo.' },
  { file: 'solucoes', kicker: 'O que construímos', title: 'Comece simples. Evolua quando o negócio pedir.' },
  { file: 'ativos-proprios', kicker: 'Ativos próprios', title: 'Conteúdos e ferramentas que continuam trabalhando depois da publicação.' },
  { file: 'pagamentos', kicker: 'Pagamentos', title: 'Checkout, pedidos, assinaturas e conciliação — no seu nome.' },
  { file: 'para-quem-e', kicker: 'Para quem é', title: 'Para quem já tem algo para dizer e precisa de estrutura para crescer.' },
  { file: 'autoleitura', kicker: 'Autoleitura', title: 'Descubra em 2 minutos qual estrutura sua presença está pedindo.' },
  { file: 'contato', kicker: 'Vamos conversar', title: 'Conte o que você já construiu. Mostramos o próximo passo.' },
  { file: 'blog', kicker: 'Blog IMAKERS', title: 'Ideias para transformar atenção em operação própria.' },
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
