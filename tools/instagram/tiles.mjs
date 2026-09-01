/**
 * A grade da IMAKERS para o Instagram — conceito "A ponte".
 *
 * Geometria (confirmada no formato atual do Instagram):
 *   célula da grade do perfil ... 1012 × 1350  (3:4)
 *   post publicado ............... 1080 × 1350  (4:5)
 *   sangria ...................... 34 px de cada lado
 *
 * O mosaico é desenhado uma vez, do tamanho da grade inteira (3036 × 4050),
 * e cada quadro mostra o seu recorte. Assim o que atravessa dois quadros
 * atravessa de verdade, sem emenda.
 */
export const CELL_W = 1012;
export const CELL_H = 1350;
export const POST_W = 1080;
export const BLEED = (POST_W - CELL_W) / 2; // 34
export const GRID_W = CELL_W * 3;           // 3036
export const GRID_H = CELL_H * 3;           // 4050

export const COR = {
  paper: '#fbf9f8',
  paper2: '#f2eeec',
  ink: '#202126',
  inkSoft: '#5c5f6b',
  night: '#131418',
  plum: '#1d1220',
  magenta: '#ec1b8d',
  light: '#f7f5f4',
  lightSoft: '#b3b5c0',
};

/* A seta da marca — o mesmo traço do site e da logo.
   A espessura vai em unidades do viewBox (3 = peso da logo) e escala junto com
   o desenho. Nada de vector-effect: ele não herda através do <g>. */
export const seta = (stroke = 3) => `
  <svg viewBox="0 0 100 32" fill="none" preserveAspectRatio="xMidYMid meet"
       style="width:100%;height:auto;display:block;overflow:visible">
    <g stroke="${COR.magenta}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 26C5.5 12 12 6.5 17 9.5s7 15.5 12.5 18C35.5 30 40 12 47 7.5s8 12.5 13.5 16.5C68 29.4 78 20 95 4.5"/>
      <path d="M75.5 6.5 95 4.5l-6.5 16.5"/>
    </g>
  </svg>`;

/* ---------- Os nove quadros, em ordem de LEITURA ---------- */
export const QUADROS = [
  { kicker: 'Continua sendo seu', h: 'Instagram,<br>YouTube,<br>TikTok', p: 'Sua voz, seu ritmo, sua comunidade.' },
  { kicker: 'Continua sendo seu', h: 'Indicação<br>e busca', p: 'As pessoas que já chegam até você.' },
  { kicker: 'Continua sendo seu', h: 'A audiência<br>que você<br>construiu', p: 'Ninguém precisa terceirizar isso.' },

  { banda: 'meio', h: 'A rede social<br>traz a atenção.', p: 'Isso continua sendo seu.' },
  { banda: 'meio', logo: true, p: 'da atenção à operação própria' },
  { banda: 'meio', h: 'A IMAKERS constrói<br>o que acontece<br>depois.', p: 'O destino, não o feed.' },

  { kicker: 'Construímos e operamos', h: 'Site e páginas<br>que trabalham', p: 'A casa que recebe quem você conduz.' },
  { kicker: 'Construímos e operamos', h: 'Ativos próprios<br>e captura', p: 'Blog, guias, quizzes e formulários.' },
  { kicker: 'Construímos e operamos', h: 'Venda, assinatura<br>e dados', p: 'Checkout, acesso e conciliação.' },
];

/* ---------- A camada do mosaico (3036 × 4050) ---------- */
export function mosaico() {
  // A seta ocupa a metade de baixo da faixa do meio: o texto entra por cima,
  // no topo da faixa, e nada se atropela.
  const setaW = GRID_W - 150;
  const setaH = setaW * 0.32;
  const setaX = 75;
  const setaY = CELL_H + 400;
  return `
    <div style="position:absolute;inset:0;background:${COR.paper}"></div>
    <div style="position:absolute;left:0;top:${CELL_H}px;width:${GRID_W}px;height:${CELL_H}px;
                background:linear-gradient(150deg,#26142f 0%,${COR.night} 62%,#101116 100%)"></div>
    <div style="position:absolute;left:0;top:${CELL_H * 2}px;width:${GRID_W}px;height:${CELL_H}px;
                background:${COR.paper2}"></div>
    <div style="position:absolute;left:${setaX}px;top:${setaY}px;width:${setaW}px">
      ${seta(2.4)}
    </div>`;
}
