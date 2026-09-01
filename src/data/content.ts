/**
 * Conteudo estruturado da IMAKERS.
 * Tudo que aparece em mais de uma pagina vive aqui — as paginas so renderizam.
 * Fonte: Business Blueprint, Plano operacional e Copy da landing page.
 */

/* ---------- Sinais do problema ----------------------------------------- */
export const SINAIS = [
  { situacao: 'O conteúdo gera interesse, mas a conversa se perde.', falta: 'Um destino próprio para continuar a jornada.' },
  { situacao: 'A oferta existe, mas não está organizada.', falta: 'Uma estrutura clara de apresentação e decisão.' },
  { situacao: 'Os contatos chegam, mas não formam uma base.', falta: 'Captura, organização e relacionamento próprios.' },
  { situacao: 'O site existe, mas não trabalha pelo negócio.', falta: 'Conteúdo, ferramentas e dados conectados à oferta.' },
];

/* ---------- Os quatro pilares de construcao ----------------------------- */
export const PILARES = [
  {
    n: '01',
    kicker: 'Casa própria',
    titulo: 'Site e páginas que trabalham',
    texto:
      'Um site não precisa ser apenas um cartão de visitas. Ele pode apresentar sua história, organizar suas ofertas, responder dúvidas, capturar interesse e conduzir cada pessoa para o próximo passo.',
    entregas: ['Páginas institucionais', 'Páginas de oferta', 'Blog', 'Landing pages', 'Área de conteúdos', 'Arquitetura de navegação'],
    href: '/solucoes',
  },
  {
    n: '02',
    kicker: 'Ativos próprios',
    titulo: 'Conteúdos que aprofundam a relação',
    texto:
      'Criamos e organizamos materiais que continuam trabalhando depois da publicação: artigos, guias, e-books, quizzes, avaliações, checklists, bibliotecas e páginas educativas.',
    entregas: ['Blog', 'Quiz', 'E-book', 'Guia', 'Checklist', 'Calculadora', 'Avaliação', 'Newsletter'],
    href: '/ativos-proprios',
  },
  {
    n: '03',
    kicker: 'Ferramentas de negócio',
    titulo: 'Da curiosidade à ação',
    texto:
      'Quando a pessoa precisa decidir, comprar, agendar, se inscrever ou deixar seus dados, a experiência precisa ser simples e conectada ao negócio.',
    entregas: ['Formulários', 'Captação', 'Catálogo', 'Checkout', 'Pedidos', 'Pagamentos', 'Agendamentos', 'Acesso restrito'],
    href: '/pagamentos',
  },
  {
    n: '04',
    kicker: 'Operação contínua',
    titulo: 'Um ecossistema que melhora com o tempo',
    texto:
      'O trabalho não termina quando o site entra no ar. O Engine acompanha os ativos, os dados, as oportunidades e os pontos de fricção para tornar a operação mais clara, útil e eficiente.',
    entregas: ['Atualização de páginas', 'Novos ativos', 'Leitura de dados', 'Acompanhamento de pagamentos', 'Conciliação', 'Melhorias de jornada'],
    href: '/engine',
  },
];

/* ---------- O circuito Discovery -> Launch -> Engine -------------------- */
export const METODO = [
  {
    id: 'discovery',
    etapa: 'Etapa 1',
    nome: 'IMAKERS Discovery',
    frase: 'Entender antes de construir.',
    texto:
      'Mapeamos o que você já tem, quem você quer alcançar, o que pode oferecer e qual estrutura faz sentido para o momento do seu negócio.',
    fecho:
      'O Discovery termina com uma direção clara, uma faixa de complexidade recomendada e um plano de ativação.',
    resultado: 'Clareza sobre o que construir, por que construir e qual é o próximo passo.',
    href: '/discovery',
    entregas: [
      'Leitura da presença pública e da audiência atual',
      'Definição de público prioritário e proposta de valor',
      'Mapa de oferta, jornada e pontos de conversão',
      'Arquitetura de páginas, CTAs e captura',
      'Faixa de complexidade recomendada',
      'Plano de ativação com ordem de construção',
    ],
  },
  {
    id: 'launch',
    etapa: 'Etapa 2',
    nome: 'IMAKERS Launch',
    frase: 'Colocar a estrutura para funcionar.',
    texto:
      'Construímos o ecossistema definido no Discovery: site, páginas, ativos, ferramentas, integrações e caminhos de conversão.',
    fecho:
      'O Launch termina com uma operação publicada, testada e pronta para receber a audiência que você já está construindo.',
    resultado: 'Uma presença própria ativa e conectada à sua oferta.',
    href: '/launch',
    entregas: [
      'Site ou landing page publicado',
      'Páginas de oferta e jornada de decisão',
      'Primeiro ativo próprio no ar',
      'Formulário, agenda ou fluxo de conversão funcionando',
      'Eventos e indicadores essenciais configurados',
      'Ponte editorial e handover com checklist de continuidade',
    ],
  },
  {
    id: 'engine',
    etapa: 'Etapa 3',
    nome: 'IMAKERS Engine',
    frase: 'Fazer o negócio continuar evoluindo.',
    texto:
      'Mantemos e desenvolvemos os ativos próprios, observamos o comportamento da operação, acompanhamos oportunidades e ajustamos os pontos que impedem a jornada de avançar.',
    fecho: 'O Engine não é suporte indefinido. É uma operação de ativos próprios e ponte editorial.',
    resultado: 'Um ecossistema que acumula conhecimento, ativos e possibilidades de receita.',
    href: '/engine',
    entregas: [
      'Mapa editorial de temas e prioridades',
      'Um ativo de profundidade por ciclo',
      'Otimização de página, CTA, título ou link existente',
      'Briefing de ponte editorial para você publicar',
      'Banco de ideias para uso nas redes',
      'Relatório de acessos, cliques, cadastros e conversões',
    ],
  },
];

/* ---------- Frentes mensais do Engine ----------------------------------- */
export const ENGINE_FRENTES = [
  { frente: 'Planejamento', entrega: 'Mapa editorial de temas e prioridades do ecossistema.' },
  { frente: 'Ativo principal', entrega: 'Um artigo, guia, quiz, página ou outro ativo de profundidade.' },
  { frente: 'Otimização', entrega: 'Atualização de um ativo existente, CTA, título, link ou página.' },
  { frente: 'Ponte editorial', entrega: 'Briefing com temas, chamadas, CTAs e destinos para você publicar.' },
  { frente: 'Repositório', entrega: 'Banco de ideias e sugestões para uso nas redes, sem criação de arte.' },
  { frente: 'Métricas', entrega: 'Acessos, cliques, cadastros, downloads e conversões.' },
  { frente: 'Gestão', entrega: 'Uma reunião ou relatório executivo mensal.' },
];

/* ---------- Perfis atendidos -------------------------------------------- */
export const PERFIS = [
  {
    slug: 'marca-autoral',
    nome: 'Marca autoral',
    dor: 'Você tem conhecimento, visão ou uma linguagem própria, mas ainda depende de links soltos e conversas individuais para apresentar o que oferece.',
    constroi: ['Site autoral', 'Biblioteca de conteúdos', 'Guias', 'Quizzes', 'Produtos digitais', 'Páginas de oferta e captação'],
    faixa: 'Capture',
  },
  {
    slug: 'profissional-de-servico',
    nome: 'Profissional de serviço',
    dor: 'Você é encontrado pelas redes, indicações ou buscas, mas a pessoa ainda precisa perguntar tudo antes de decidir.',
    constroi: ['Página de serviço', 'Avaliação inicial', 'Perguntas frequentes', 'Agendamento', 'Pré-atendimento', 'Jornada de conversão'],
    faixa: 'Capture',
  },
  {
    slug: 'venda-direta',
    nome: 'Negócio que quer vender diretamente',
    dor: 'Você já possui uma oferta, mas ainda não tem uma experiência própria para vender, receber pagamentos e acompanhar pedidos.',
    constroi: ['Catálogo', 'Checkout', 'Pagamentos', 'Pedidos', 'Entrega', 'Reembolso', 'Relatório operacional'],
    faixa: 'Commerce',
  },
  {
    slug: 'recorrencia',
    nome: 'Negócio de recorrência',
    dor: 'Você quer trabalhar com planos, assinaturas, comunidade, acesso contínuo ou programas de manutenção.',
    constroi: ['Assinaturas', 'Status de acesso', 'Cobranças recorrentes', 'Recuperação', 'Cancelamento', 'Ciclo de vida'],
    faixa: 'Recurring',
  },
];

/* ---------- Faixas de solucao ------------------------------------------- */
export const FAIXAS = [
  {
    slug: 'base',
    nome: 'IMAKERS Base',
    complexidade: 1,
    resumo: 'Blog, páginas institucionais e conteúdo próprio, sem cobrança no site.',
    para: 'Quem precisa de uma casa própria antes de vender por ela.',
    inclui: [
      'Até cinco páginas ou modelos principais',
      'Blog com categorias, busca e páginas de conteúdo',
      'Formulário simples de contato',
      'SEO técnico e analytics configurados',
      'Publicação e treinamento de uso',
    ],
    engine: 'Site, blog, páginas, SEO básico, atualização e métricas de uso.',
    naoInclui: ['Checkout', 'Pagamentos', 'Pedidos', 'Assinaturas', 'Conciliação financeira'],
  },
  {
    slug: 'capture',
    nome: 'IMAKERS Capture',
    complexidade: 2,
    destaque: true,
    resumo: 'Blog, formulários, quiz, guia ou e-book, captura e relacionamento.',
    para: 'Quem precisa transformar audiência em base própria.',
    inclui: [
      'Tudo do Base',
      'Quiz, avaliação ou checklist com lógica',
      'Guia ou e-book curto como isca',
      'Landing pages de campanha',
      'Formulários de captura e automação inicial de relacionamento',
    ],
    engine: 'Ativos próprios, captação, quizzes, guias, e-books, automações simples e métricas de leads.',
    naoInclui: ['Checkout', 'Pagamentos', 'Pedidos', 'Assinaturas'],
  },
  {
    slug: 'commerce',
    nome: 'IMAKERS Commerce',
    complexidade: 3,
    resumo: 'Venda avulsa de produtos, serviços, ingressos ou materiais digitais.',
    para: 'A primeira faixa em que entra dinheiro pelo site.',
    inclui: [
      'Tudo do Capture',
      'Catálogo ou página de oferta',
      'Checkout no provedor escolhido por você',
      'Registro de pedido, confirmação, sucesso e falha',
      'Webhooks, política de reembolso e relatório de pedidos',
      'Testes em ambiente de homologação',
    ],
    engine: 'Catálogo, páginas de oferta, pedidos, pagamento, reembolso, conversão e conciliação.',
    naoInclui: ['Assinaturas', 'Cobrança recorrente', 'Split de pagamentos'],
  },
  {
    slug: 'recurring',
    nome: 'IMAKERS Recurring',
    complexidade: 4,
    resumo: 'Assinaturas, planos, pagamentos recorrentes, acesso e inadimplência.',
    para: 'Clubes, comunidades pagas, programas contínuos e planos mensais.',
    inclui: [
      'Tudo do Commerce',
      'Ciclo de assinatura e status de acesso',
      'Cancelamento, falha e tentativa de recuperação',
      'Alteração de plano e regra de inadimplência',
      'Acesso liberado apenas por evento confirmado do provedor',
    ],
    engine: 'Assinaturas, status de acesso, falhas, recuperação, cancelamento, planos e retenção.',
    naoInclui: ['Múltiplos recebedores', 'Split', 'Regras de repasse entre vendedores'],
  },
  {
    slug: 'platform',
    nome: 'IMAKERS Platform',
    complexidade: 5,
    futuro: true,
    resumo: 'Vários recebedores, marketplace, split, regras de repasse ou operação customizada.',
    para: 'Operações que precisam distribuir dinheiro entre vendedores.',
    inclui: [
      'Contas conectadas e cadastro de recebedores',
      'Comissões e regras de repasse por vendedor',
      'Reconciliação multi-recebedor',
      'Projeto precedido de validação jurídica e contábil',
    ],
    engine: 'Contas conectadas, repasses, comissões, regras por vendedor e reconciliação multi-recebedor.',
    naoInclui: [],
  },
];

/* ---------- Matriz de escopo -------------------------------------------- */
export const MATRIZ = {
  colunas: ['Base', 'Capture', 'Commerce', 'Recurring', 'Platform'],
  linhas: [
    { tema: 'Blog e páginas próprias', v: ['Sim', 'Sim', 'Sim', 'Sim', 'Sim'] },
    { tema: 'Quiz, guia ou e-book', v: ['Módulo', 'Incluído', 'Incluído', 'Incluído', 'Sob projeto'] },
    { tema: 'Formulário', v: ['Simples', 'Captura', 'Pedido/contato', 'Assinatura/contato', 'Multi-fluxo'] },
    { tema: 'Checkout', v: ['Não', 'Não', 'Sim', 'Sim', 'Sim'] },
    { tema: 'Pix, cartão e boleto', v: ['Não', 'Não', 'Sim', 'Sim', 'Sim'] },
    { tema: 'Pedido e entrega', v: ['Não', 'Não', 'Sim', 'Sim', 'Sim'] },
    { tema: 'Assinatura', v: ['Não', 'Não', 'Não', 'Sim', 'Sim'] },
    { tema: 'Área restrita', v: ['Não', 'Não', 'Opcional', 'Conforme escopo', 'Sim'] },
    { tema: 'Conciliação', v: ['Não', 'Não', 'Simples', 'Completa', 'Multi-recebedor'] },
    { tema: 'Split de pagamento', v: ['Não', 'Não', 'Não', 'Não', 'Projeto específico'] },
    { tema: 'Operação de redes sociais', v: ['Nunca', 'Nunca', 'Nunca', 'Nunca', 'Nunca'] },
  ],
};

/* ---------- Nao fazemos / fazemos --------------------------------------- */
export const FRONTEIRA = [
  { nao: 'Criar artes para redes', sim: 'Criar páginas e ativos próprios para receber a audiência.' },
  { nao: 'Operar Instagram ou TikTok', sim: 'Criar a ponte editorial entre a rede e o site.' },
  { nao: 'Publicar diariamente', sim: 'Organizar temas, CTAs e destinos para você publicar.' },
  { nao: 'Responder directs', sim: 'Construir formulários, FAQs e fluxos de conversão.' },
  { nao: 'Editar e publicar vídeos', sim: 'Criar páginas, roteiros de apoio e materiais de profundidade.' },
  { nao: 'Gerenciar comunidade social', sim: 'Operar a base própria, os ativos e os dados do ecossistema.' },
];

/* ---------- Quando voce precisa de... ----------------------------------- */
export const NECESSIDADES = [
  { precisa: 'Organizar conhecimento', constroi: 'Blog, categorias, páginas e biblioteca.', faixa: 'Base' },
  { precisa: 'Capturar interesse', constroi: 'Quiz, formulário, guia, e-book e newsletter.', faixa: 'Capture' },
  { precisa: 'Apresentar uma oferta', constroi: 'Landing page, página de serviço e jornada de decisão.', faixa: 'Capture' },
  { precisa: 'Vender uma vez', constroi: 'Checkout, pagamento, pedido e entrega.', faixa: 'Commerce' },
  { precisa: 'Vender todos os meses', constroi: 'Assinatura, acesso, cobrança recorrente e retenção.', faixa: 'Recurring' },
  { precisa: 'Escalar a operação', constroi: 'Painel, integrações, dados, automações e novas ferramentas.', faixa: 'Platform' },
];

/* ---------- Como comecamos ---------------------------------------------- */
export const PROCESSO = [
  { passo: '1. Conversa inicial', o: 'Entendemos contexto, oferta e objetivo.' },
  { passo: '2. Discovery', o: 'Mapeamos oportunidades, jornada e escopo.' },
  { passo: '3. Plano de ativação', o: 'Definimos o que será construído e em qual ordem.' },
  { passo: '4. Launch', o: 'Desenvolvemos, integramos, testamos e publicamos.' },
  { passo: '5. Engine', o: 'Mantemos, medimos e ampliamos a operação.' },
];

/* ---------- Catalogo de ativos proprios --------------------------------- */
export const ATIVOS = [
  { cat: 'Editorial', ex: ['Artigo', 'Análise', 'Entrevista', 'Estudo', 'Página temática'], desc: 'Constrói autoridade e traz busca orgânica ao longo do tempo.' },
  { cat: 'Interativo', ex: ['Quiz', 'Avaliação', 'Checklist', 'Calculadora', 'Diagnóstico'], desc: 'Transforma curiosidade em uma resposta personalizada — e em um contato.' },
  { cat: 'Rico', ex: ['E-book', 'Guia', 'Playbook', 'Relatório', 'Material de referência'], desc: 'Aprofunda a relação e justifica a troca por um cadastro.' },
  { cat: 'Conversão', ex: ['Landing page', 'Página de oferta', 'Sequência de captura', 'FAQ'], desc: 'Leva a pessoa da atenção até a decisão sem fricção.' },
  { cat: 'Relacionamento', ex: ['Newsletter', 'Sequência de e-mails', 'Onboarding', 'Atualização de base'], desc: 'Mantém a base própria viva, sem depender do alcance de uma rede.' },
  { cat: 'Apoio social', ex: ['Pauta', 'Chamada', 'CTA', 'Link', 'Roteiro editorial'], desc: 'A ponte que conecta o que você publica ao que você construiu.' },
];

/* ---------- Fluxo de uma venda ------------------------------------------ */
export const FLUXO_VENDA = [
  { momento: '1. Oferta', acao: 'Exibir produto, serviço, preço, condições e política de compra.', dono: 'Cliente' },
  { momento: '2. Checkout', acao: 'Criar sessão, preferência ou cobrança no provedor.', dono: 'IMAKERS' },
  { momento: '3. Pagamento', acao: 'Provedor processa Pix, boleto ou cartão.', dono: 'Provedor' },
  { momento: '4. Webhook', acao: 'Receber, validar, persistir e normalizar o evento.', dono: 'IMAKERS' },
  { momento: '5. Pedido', acao: 'Atualizar status do pedido e liberar a próxima ação.', dono: 'IMAKERS' },
  { momento: '6. Entrega', acao: 'Liberar material, agenda, acesso ou instrução de atendimento.', dono: 'Cliente e IMAKERS' },
  { momento: '7. Recebimento', acao: 'Provedor libera o valor na conta do cliente.', dono: 'Provedor e cliente' },
  { momento: '8. Conciliação', acao: 'Comparar venda, taxa, saldo líquido, repasse e extrato.', dono: 'IMAKERS e contador' },
];

/* ---------- Provedores de pagamento ------------------------------------- */
export const PROVEDORES = [
  {
    nome: 'Asaas',
    papel: 'Integração padrão recomendada',
    uso: 'Pequenos negócios brasileiros, serviços, produtos digitais, Pix, boleto e recorrência.',
    fortes: 'API, checkout, Pix, boleto, cartão, cobrança recorrente, webhooks, sandbox e recursos de gestão.',
    cuidados: 'Taxas e condições variam por conta; validar antecipação, parcelamento e limites.',
  },
  {
    nome: 'Mercado Pago',
    papel: 'Alternativa para implantação rápida',
    uso: 'Lançamento rápido, checkout hospedado e público brasileiro familiarizado com a marca.',
    fortes: 'Checkout Pro, Checkout Transparente e Bricks; Pix, boleto, cartão e webhooks com assinatura secreta.',
    cuidados: 'O checkout hospedado pode tirar o comprador do site; conferir tarifas e regras de liberação.',
  },
  {
    nome: 'Stripe',
    papel: 'Assinaturas sofisticadas e operação internacional',
    uso: 'SaaS, produtos com ciclo de vida complexo e cobrança fora do Brasil.',
    fortes: 'Checkout, Billing, assinaturas, webhooks, antifraude e documentação ampla.',
    cuidados: 'Disponibilidade e custo do Pix precisam ser confirmados antes de prometê-lo como padrão.',
  },
  {
    nome: 'Pagar.me',
    papel: 'Volume maior e casos de plataforma',
    uso: 'Operações com integração avançada e casos que podem demandar split.',
    fortes: 'Pix via API, webhooks, estorno e split conforme documentação.',
    cuidados: 'Exige avaliação comercial e técnica; não deve ser escolhido só pela taxa anunciada.',
  },
];

/* ---------- FAQ --------------------------------------------------------- */
export const FAQ = [
  {
    q: 'A IMAKERS administra meu Instagram ou YouTube?',
    a: 'Não. Você continua responsável pela sua voz, pelo seu estilo e pela publicação nas redes. A IMAKERS constrói o site, os ativos próprios, as ferramentas e os destinos para onde você pode conduzir sua audiência.',
  },
  {
    q: 'Eu preciso já ter uma grande audiência?',
    a: 'Não. O ponto de partida pode ser uma audiência pequena, uma oferta em construção ou uma oportunidade clara. O Discovery ajuda a entender o que faz sentido construir agora, sem começar por uma estrutura maior do que o negócio consegue sustentar.',
  },
  {
    q: 'A IMAKERS cria os conteúdos para as redes?',
    a: 'Não operamos redes sociais nem produzimos artes para publicação. Podemos criar a ponte editorial: temas, textos de apoio, chamadas, CTAs, links e conteúdos próprios que ajudam a aprofundar o que você publica.',
  },
  {
    q: 'Que tipos de conteúdo podem ser construídos?',
    a: 'A operação pode incluir blog, quizzes, e-books, guias, checklists, avaliações, páginas, newsletters, bibliotecas de conteúdo e ferramentas de captura. A escolha depende da oportunidade e da jornada do negócio.',
  },
  {
    q: 'A IMAKERS pode integrar pagamentos?',
    a: 'Sim, quando o projeto envolve vendas. O checkout e o recebimento ficam vinculados à conta do cliente no provedor escolhido. A IMAKERS constrói e acompanha a integração, os pedidos, os eventos e os relatórios conforme o escopo contratado.',
  },
  {
    q: 'Como funciona o preço?',
    a: 'A IMAKERS trabalha com uma ativação inicial e uma recorrência compatível com a complexidade da operação. A ativação cobre Discovery, Launch e implantação. A recorrência cobre o Engine, a manutenção, os ativos próprios, os dados e as melhorias previstas no escopo.',
  },
  {
    q: 'O que é o Engine?',
    a: 'É a operação contínua do ecossistema próprio: atualização e criação de ativos, melhorias no site, acompanhamento de dados, manutenção de ferramentas e, quando aplicável, acompanhamento de pedidos, pagamentos, assinaturas e conciliação operacional.',
  },
  {
    q: 'Posso começar apenas com um blog?',
    a: 'Sim. A operação pode começar com uma estrutura simples e evoluir para captura, venda ou recorrência quando o negócio estiver pronto.',
  },
];

/* ---------- Opcoes do formulario ---------------------------------------- */
export const MOMENTOS = [
  'Tenho audiência, mas ainda não tenho um site estruturado.',
  'Tenho um site, mas ele ainda não gera oportunidades.',
  'Tenho conteúdos e quero criar uma base própria.',
  'Quero vender produtos ou serviços pelo site.',
  'Quero trabalhar com assinaturas ou recorrência.',
  'Ainda estou entendendo qual estrutura faz sentido.',
];
