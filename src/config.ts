/**
 * Fonte unica de verdade da marca, do SEO e da navegacao.
 * Trocar dominio, telefone, redes ou endpoint de formulario e feito so aqui.
 */

export const SITE = {
  name: 'IMAKERS',
  legalName: 'IMAKERS',
  url: (import.meta.env.SITE as string) || 'https://imakers.com',
  locale: 'pt-BR',
  /** Promessa institucional. Aparece no title da home e no JSON-LD. */
  promise: 'Transformamos sua presenca digital em negocio.',
  promiseAccented: 'Transformamos sua presença digital em negócio.',
  tagline: 'Da atencao a operacao propria.',
  description:
    'A IMAKERS constrói sites, ativos próprios, ferramentas e operação contínua para transformar a audiência que você criou nas redes em negócio.',
  email: 'contato@imakers.com',
  /** Somente digitos, formato internacional — usado no link do WhatsApp. */
  whatsapp: '',
  areaServed: 'BR',
  founded: '2026',
  social: {
    instagram: '',
    linkedin: '',
    youtube: '',
  },
  /**
   * Endpoint do formulario de contato.
   * Vazio = o formulario usa Netlify Forms (atributo data-netlify).
   * Preencha com uma URL (Formspree, Basin, n8n, API propria) para trocar o destino.
   */
  formEndpoint: '',
  /** Preencha para ativar o Google Search Console via meta tag. */
  googleSiteVerification: '',
} as const;

export const CIRCUIT = ['Discovery', 'Launch', 'Engine'] as const;

export const NAV: { label: string; href: string; children?: { label: string; href: string; note: string }[] }[] = [
  {
    label: 'Método',
    href: '/metodo',
    children: [
      { label: 'IMAKERS Discovery', href: '/discovery', note: 'Entender antes de construir.' },
      { label: 'IMAKERS Launch', href: '/launch', note: 'Colocar a estrutura no ar.' },
      { label: 'IMAKERS Engine', href: '/engine', note: 'Manter o negócio em movimento.' },
    ],
  },
  {
    label: 'O que construímos',
    href: '/solucoes',
    children: [
      { label: 'Soluções por complexidade', href: '/solucoes', note: 'Base, Capture, Commerce e Recurring.' },
      { label: 'Ativos próprios', href: '/ativos-proprios', note: 'Blog, quizzes, e-books, guias e ferramentas.' },
      { label: 'Pagamentos', href: '/pagamentos', note: 'Checkout, pedidos, assinaturas e conciliação.' },
    ],
  },
  { label: 'Para quem é', href: '/para-quem-e' },
  { label: 'Autoleitura', href: '/autoleitura' },
  { label: 'Blog', href: '/blog' },
];

export const FOOTER_NAV = [
  {
    title: 'Método',
    links: [
      { label: 'Visão geral', href: '/metodo' },
      { label: 'Discovery', href: '/discovery' },
      { label: 'Launch', href: '/launch' },
      { label: 'Engine', href: '/engine' },
    ],
  },
  {
    title: 'O que construímos',
    links: [
      { label: 'Soluções', href: '/solucoes' },
      { label: 'Ativos próprios', href: '/ativos-proprios' },
      { label: 'Pagamentos', href: '/pagamentos' },
      { label: 'Para quem é', href: '/para-quem-e' },
    ],
  },
  {
    title: 'Comece',
    links: [
      { label: 'Autoleitura', href: '/autoleitura' },
      { label: 'Falar com a IMAKERS', href: '/contato' },
      { label: 'Blog', href: '/blog' },
      { label: 'Perguntas frequentes', href: '/#faq' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Política de privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos de uso', href: '/termos-de-uso' },
      { label: 'RSS do blog', href: '/rss.xml' },
    ],
  },
];

export const CTA = {
  primary: { label: 'Começar pelo Discovery', href: '/contato' },
  secondary: { label: 'Entender como funciona', href: '/metodo' },
  header: { label: 'Quero transformar minha presença', href: '/contato' },
  quiz: { label: 'Fazer a autoleitura', href: '/autoleitura' },
} as const;
