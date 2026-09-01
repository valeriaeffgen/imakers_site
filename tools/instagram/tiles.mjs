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

/* ---------- Os nove quadros, em ordem de LEITURA ----------
   Nenhum quadro vende nada. A linha de cima é o que acontece hoje, a do meio
   nomeia o problema e a de baixo mostra o que está sendo perdido. As frases
   vêm da copy do site. */
export const QUADROS = [
  {
    kicker: 'O que acontece hoje',
    h: 'O conteúdo gera<br>interesse, mas a<br>conversa se perde.',
    p: 'Tudo volta para mensagem dispersa, link solto e processo manual.',
  },
  {
    kicker: 'O que acontece hoje',
    h: 'Os contatos chegam,<br>mas não formam<br>uma base.',
    p: 'Amanhã o ciclo recomeça do zero, com outra pessoa e a mesma explicação.',
  },
  {
    kicker: 'O que acontece hoje',
    h: 'A oferta existe,<br>mas não está<br>organizada.',
    p: 'Cada pessoa precisa perguntar tudo antes de decidir.',
  },

  { banda: 'meio', h: 'O problema não é<br>falta de alcance.', p: 'É que o clique não tem para onde ir.' },
  { banda: 'meio', logo: true, p: 'da atenção à operação própria' },
  {
    banda: 'meio',
    h: 'Se você parar de<br>publicar, o alcance<br>para junto.',
    p: 'A audiência é sua. O alcance é da plataforma.',
  },

  {
    kicker: 'O que poderia ser seu',
    h: 'Um post<br>vive horas.',
    p: 'Um guia bem construído é encontrado por meses.',
  },
  {
    kicker: 'O que poderia ser seu',
    h: 'Alcance é aluguel.<br>Ativo é patrimônio.',
    p: 'Cada ativo novo aumenta o valor dos anteriores.',
  },
  {
    kicker: 'O que poderia ser seu',
    h: 'Conteúdo dentro<br>de uma rede<br>pertence à rede.',
    p: 'O feed é uma linha do tempo. Um lugar próprio é um arquivo.',
  },
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
