/**
 * Autoleitura VOCIRE — o diagnostico curto que abre o funil.
 * Cada alternativa distribui pontos entre as faixas; a faixa com mais pontos
 * vira a recomendacao. Tudo roda no navegador: nada e enviado a lugar nenhum.
 */
export type Faixa = 'base' | 'capture' | 'commerce' | 'recurring';

export interface Opcao {
  label: string;
  nota?: string;
  pontos: Partial<Record<Faixa, number>>;
}

export interface Pergunta {
  id: string;
  titulo: string;
  ajuda?: string;
  opcoes: Opcao[];
}

export const PERGUNTAS: Pergunta[] = [
  {
    id: 'presenca',
    titulo: 'O que você já tem hoje?',
    ajuda: 'Escolha a opção mais próxima da sua realidade atual.',
    opcoes: [
      { label: 'Audiência nas redes, sem site estruturado', pontos: { base: 2, capture: 3 } },
      { label: 'Um site, mas ele não gera oportunidades', pontos: { base: 2, capture: 3, commerce: 1 } },
      { label: 'Conteúdo publicado e uma lista de contatos começando', pontos: { capture: 3, commerce: 1 } },
      { label: 'Uma operação vendendo, mas fora do meu site', pontos: { commerce: 3, recurring: 2 } },
    ],
  },
  {
    id: 'objetivo',
    titulo: 'O que precisa acontecer depois que alguém encontra você?',
    ajuda: 'O próximo passo que hoje não acontece sozinho.',
    opcoes: [
      { label: 'Entender quem eu sou e o que eu faço', pontos: { base: 3 } },
      { label: 'Deixar um contato para eu conversar depois', pontos: { capture: 3, base: 1 } },
      { label: 'Comprar ou contratar na hora', pontos: { commerce: 3 } },
      { label: 'Assinar um plano e ter acesso contínuo', pontos: { recurring: 3, commerce: 1 } },
    ],
  },
  {
    id: 'venda',
    titulo: 'Como o dinheiro entra hoje?',
    opcoes: [
      { label: 'Ainda não vendo nada', pontos: { base: 3, capture: 1 } },
      { label: 'Vendo por mensagem, orçamento ou indicação', pontos: { capture: 3, commerce: 1 } },
      { label: 'Vendo produtos ou serviços avulsos', pontos: { commerce: 3 } },
      { label: 'Trabalho com planos, mensalidades ou assinaturas', pontos: { recurring: 3 } },
    ],
  },
  {
    id: 'conteudo',
    titulo: 'Você tem conhecimento que poderia virar material de profundidade?',
    ajuda: 'Guia, e-book, checklist, avaliação, calculadora, quiz.',
    opcoes: [
      { label: 'Tenho muito, e nada organizado', pontos: { capture: 3, base: 2 } },
      { label: 'Tenho algum, mas nunca transformei em material', pontos: { capture: 2, base: 1 } },
      { label: 'Já tenho materiais, quero que gerem contatos', pontos: { capture: 3, commerce: 1 } },
      { label: 'Meu negócio não depende de conteúdo', pontos: { commerce: 2, recurring: 1 } },
    ],
  },
  {
    id: 'acesso',
    titulo: 'Alguém precisa acessar algo restrito depois de pagar?',
    ajuda: 'Área de membros, aulas, comunidade, biblioteca fechada.',
    opcoes: [
      { label: 'Não, tudo é público', pontos: { base: 2, capture: 2 } },
      { label: 'Entrego por e-mail ou link manualmente', pontos: { capture: 2, commerce: 2 } },
      { label: 'Sim, entrego uma vez após a compra', pontos: { commerce: 3 } },
      { label: 'Sim, e o acesso precisa cair se a cobrança falhar', pontos: { recurring: 4 } },
    ],
  },
  {
    id: 'gargalo',
    titulo: 'Qual é o maior gargalo hoje?',
    opcoes: [
      { label: 'As pessoas não entendem o que eu ofereço', pontos: { base: 3, capture: 1 } },
      { label: 'Recebo interesse, mas não vira base de contatos', pontos: { capture: 3 } },
      { label: 'Perco venda no meio do caminho até o pagamento', pontos: { commerce: 3 } },
      { label: 'Não consigo acompanhar cobranças, acessos e cancelamentos', pontos: { recurring: 3 } },
    ],
  },
];

export const RESULTADOS: Record<
  Faixa,
  { nome: string; frase: string; diagnostico: string; primeiros: string[]; href: string }
> = {
  base: {
    nome: 'VOCIRE Base',
    frase: 'Sua prioridade é ter uma casa própria antes de vender por ela.',
    diagnostico:
      'O que falta agora não é checkout — é um lugar próprio que explique quem você é, organize o que você oferece e responda as dúvidas que hoje chegam por mensagem. Começar por pagamento seria construir o telhado antes da parede.',
    primeiros: [
      'Site com páginas institucionais e de oferta',
      'Blog com categorias e busca',
      'Formulário de contato simples',
      'SEO técnico e analytics configurados',
    ],
    href: '/solucoes#base',
  },
  capture: {
    nome: 'VOCIRE Capture',
    frase: 'Sua prioridade é transformar audiência em base própria.',
    diagnostico:
      'Você já gera interesse, mas ele evapora. O próximo passo é criar motivos legítimos para alguém deixar um contato — e uma estrutura que organize esses contatos em vez de deixá-los espalhados em conversas.',
    primeiros: [
      'Quiz, avaliação ou checklist com lógica',
      'Guia ou e-book curto como isca',
      'Landing pages de campanha',
      'Formulários de captura e automação inicial',
    ],
    href: '/solucoes#capture',
  },
  commerce: {
    nome: 'VOCIRE Commerce',
    frase: 'Sua prioridade é vender diretamente pelo site.',
    diagnostico:
      'Você já tem oferta e demanda, mas o dinheiro entra por fora. Colocar a venda no site exige mais do que um botão: pedido, evento confirmado, entrega, reembolso e um relatório em que você possa confiar.',
    primeiros: [
      'Catálogo ou página de oferta',
      'Checkout no provedor escolhido por você',
      'Registro de pedido, confirmação e falha',
      'Webhooks, política de reembolso e relatório',
    ],
    href: '/solucoes#commerce',
  },
  recurring: {
    nome: 'VOCIRE Recurring',
    frase: 'Sua prioridade é sustentar receita recorrente e acesso contínuo.',
    diagnostico:
      'Assinatura não é uma venda repetida: é um ciclo de vida. Cobrança que falha, acesso que precisa cair, plano que muda, cliente que volta. Essa lógica precisa estar no sistema, baseada em eventos confirmados do provedor.',
    primeiros: [
      'Ciclo de assinatura e status de acesso',
      'Cancelamento, falha e recuperação',
      'Alteração de plano e regra de inadimplência',
      'Conciliação e acompanhamento do ciclo de vida',
    ],
    href: '/solucoes#recurring',
  },
};
