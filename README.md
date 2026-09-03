# Site Viceja

Site institucional da Viceja — *transformamos sua presença digital em negócio*.
Construído em [Astro](https://astro.build) como site estático, com foco em SEO técnico,
performance e acessibilidade.

---

## Começando

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o dist/ localmente
npm run og       # regenera as imagens sociais e os ícones
```

Requer Node 20 ou superior.

---

## O que já está pronto

**14 páginas públicas + blog**

| Rota | O que é |
| --- | --- |
| `/` | Landing page completa (diagnóstico, fronteira, pilares, método, perfis, FAQ) |
| `/metodo` | Visão geral do circuito Discovery → Launch → Engine |
| `/discovery` `/launch` `/engine` | Uma página por etapa, com entregas e critérios |
| `/solucoes` | As cinco faixas de complexidade + matriz de escopo |
| `/ativos-proprios` | Catálogo de ativos editoriais e funcionais |
| `/pagamentos` | Checkout, webhooks, fluxo de venda, provedores e RACI |
| `/para-quem-e` | Quatro perfis + para quem a Viceja **não** é |
| `/autoleitura` | Quiz de diagnóstico que recomenda uma faixa |
| `/contato` | Formulário de solicitação de Discovery |
| `/blog` + `/blog/*` | Blog com quatro artigos iniciais |
| `/politica-de-privacidade` `/termos-de-uso` | Páginas institucionais (LGPD) |
| `/obrigado` `/404` | Confirmação de envio e erro (fora do índice) |

**A autoleitura** (`/autoleitura`) é o ativo interativo do próprio site: seis perguntas,
pontuação por faixa e um resultado que leva a pessoa ao formulário já com o contexto
preenchido (`/contato?faixa=capture&origem=autoleitura`). Roda 100% no navegador —
nenhuma resposta é enviada ou salva.

---

## Antes de publicar

Três coisas precisam ser preenchidas em **`src/config.ts`**:

```ts
url:    'https://viceja.com',   // domínio real — alimenta canonical, sitemap, RSS e og:image
email:  'contato@viceja.com',   // e-mail de contato exibido no site
social: { instagram: '', linkedin: '', youtube: '' },  // vira `sameAs` no JSON-LD
```

Opcionais no mesmo arquivo:

- `whatsapp` — só dígitos, formato internacional.
- `formEndpoint` — deixe vazio para usar **Netlify Forms**; preencha com uma URL
  (Formspree, Basin, n8n, API própria) para trocar o destino do formulário.
- `googleSiteVerification` — ativa a meta tag do Google Search Console.

Depois de trocar o domínio, rode `npm run og` para as imagens sociais
mostrarem o endereço certo (ou defina `SITE_DOMAIN` no ambiente).

---

## Deploy

O site é estático: qualquer host serve. Já vêm configurados:

- **Netlify** — `netlify.toml` + `public/_headers` (segurança e cache). O formulário
  funciona sem back-end via Netlify Forms.
- **Vercel** — `vercel.json` com `cleanUrls`.

Em outro host, publique a pasta `dist/`. Duas exigências: servir `/contato` a partir de
`contato.html` (extensionless) e não adicionar barra no final — o site usa
`trailingSlash: 'never'`, e os canonical seguem esse formato.

O domínio também pode vir do ambiente:

```bash
SITE_URL=https://viceja.com npm run build
```

---

## O que foi feito de SEO

- **Metadados por página** — title, description, canonical e `robots` gerados em um
  único componente (`src/components/Seo.astro`). Todos os títulos cabem em 60
  caracteres e as descriptions em 158.
- **Dados estruturados (JSON-LD)** — um grafo por página com `Organization`,
  `WebSite`, `WebPage`/`Article` e, conforme a página, `Service`, `HowTo`, `FAQPage`,
  `BreadcrumbList` e `ItemList`. Os construtores ficam em `src/data/schema.ts`.
- **Open Graph e Twitter Card** — imagem 1200×630 própria por página, gerada por
  `scripts/generate-og.mjs` e versionada em `public/og/`.
- **`sitemap.xml` e `robots.txt`** — gerados no build, com prioridades por tipo de
  página e o domínio sempre em sincronia com a configuração.
- **RSS** em `/rss.xml`.
- **HTML semântico** — um `<h1>` por página, hierarquia de headings correta, `<table>`
  com `<th scope>`, breadcrumbs, `lang="pt-BR"`.
- **Links internos** — cada página aponta para as vizinhas relevantes; os artigos do
  blog linkam para as páginas de serviço.
- **`llms`-friendly** — GPTBot, PerplexityBot e ClaudeBot liberados no `robots.txt`.

### Performance

Primeiro carregamento da home: **~130 KB** (HTML com CSS inlinado + duas fontes),
com **2 KB de JavaScript** — só o prefetch do Astro. Nenhuma imagem no HTML: a
identidade visual é SVG inline.

- Fontes **auto-hospedadas** (Figtree e Inter variáveis, subset latino) com `preload`
  e `font-display: swap`. Nada de Google Fonts: menos uma conexão no caminho crítico e
  nenhum IP de visitante enviado a terceiros — o que também simplifica a LGPD.
- CSS crítico inlinado pelo Astro; zero framework de UI.
- Animações via CSS + um único `IntersectionObserver`, com fallback: sem JavaScript
  o conteúdo aparece normalmente (a classe `.js` no `<html>` é que ativa o estado
  inicial escondido).

### Acessibilidade

Skip link, foco visível com `:focus-visible`, `prefers-reduced-motion` respeitado,
contraste conferido, formulário com labels reais e `fieldset`/`legend`, quiz navegável
por teclado e com `aria-live` no resultado, tabelas largas roláveis e anunciadas.

---

## Estrutura

```
src/
  config.ts            # marca, navegação, CTAs, endpoint do formulário
  content.config.ts    # schema do blog (valida title, description, categoria, FAQ)
  data/
    content.ts         # todo o conteúdo estruturado (faixas, método, FAQ, tabelas)
    quiz.ts            # perguntas, pontuação e resultados da autoleitura
    schema.ts          # construtores de JSON-LD
  components/
    Seo.astro          # metadados + JSON-LD
    Logo.astro         # a marca: texto real + a seta em SVG
    Squiggle.astro     # a seta ondulada da marca (motivo de todo o site)
    Bridge.astro       # o diagrama da promessa, no hero
    Header / Footer / Faq / CtaBand / SectionHead / PageHero / Arrow
  layouts/Base.astro   # <head>, fontes, header, footer, observer de animação
  pages/               # uma página por rota
  content/blog/        # artigos em markdown
  styles/
    fonts.css          # @font-face das fontes auto-hospedadas
    global.css         # tokens e sistema de design
scripts/
  generate-og.mjs      # imagens sociais e ícones (npm run og)
  remark-reading-time.mjs
  rehype-wrap-tables.mjs
public/
  fonts/ og/ favicon.svg site.webmanifest _headers
```

### Como o design funciona

Tudo sai de dois elementos da logo: o **grafite** da tipografia (`--ink: #202126`) e o
**magenta** da seta (`--magenta: #ec1b8d`). As variáveis ficam em `:root`; qualquer
bloco com `data-theme="dark"` redefine as mesmas variáveis e todos os componentes
dentro dele se adaptam sem CSS adicional.

A seta ondulada da marca é um único componente (`Squiggle.astro`) reaproveitado no
logo, nos divisores, no diagrama do hero, no rodapé e nas imagens sociais — é o mesmo
desenho em todos os lugares, inclusive no gerador de OG.

---

## Publicando um artigo

Crie um `.md` em `src/content/blog/`. O nome do arquivo vira a URL.

```yaml
---
title: "Título curto — cabe em 60 caracteres"
headline: "O <h1> da página, se precisar ser diferente do title"
description: "Entre 70 e 158 caracteres. O build falha se passar disso."
date: 2026-09-10
category: "Estratégia"        # Estratégia | Ativos próprios | Operação | Pagamentos
tags: ["tema", "outro tema"]
og: "/og/blog-slug.png"        # opcional; sem isso usa /og/blog.png
faq:                           # opcional — vira FAQPage no Google
  - q: "Pergunta"
    a: "Resposta."
---
```

Para uma imagem social própria do artigo, adicione uma entrada em `PAGES` dentro de
`scripts/generate-og.mjs` e rode `npm run og`.

O tempo de leitura é calculado a partir do texto, e o sumário lateral é montado com os
`##` do artigo — nada disso precisa ser escrito à mão.

---

## Pendências conhecidas

- **Preços não estão publicados.** Os documentos de origem tratam os valores como
  hipóteses internas ainda não aprovadas, e a copy aprovada da landing page responde
  preço de forma qualitativa. As páginas seguem essa decisão. Para publicar valores,
  o lugar natural é `src/data/content.ts` (array `FAIXAS`) e a FAQ.
- **Sem cases nem depoimentos**, porque não havia material real. Quando houver, a
  estrutura pede uma página `/cases` com `ItemList` no JSON-LD.
- **Redes sociais vazias** em `src/config.ts`: preencher ativa o `sameAs` do JSON-LD e
  ajuda o Google a ligar o site aos perfis da marca.
