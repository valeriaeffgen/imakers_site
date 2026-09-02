import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './scripts/remark-reading-time.mjs';
import { rehypeWrapTables } from './scripts/rehype-wrap-tables.mjs';

// O dominio final entra aqui (ou via a variavel de ambiente SITE_URL no deploy).
// Ele e usado para gerar canonical, sitemap.xml, RSS e as URLs absolutas das
// imagens de Open Graph — todos precisam de URL absoluta para funcionar.
const SITE = process.env.SITE_URL || 'https://vocire.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pt-BR', locales: { 'pt-BR': 'pt-BR' } },
      // Páginas noindex não entram no sitemap: listar o que se pede para não
      // indexar é um sinal contraditório para o rastreador.
      filter: (page) => !['/obrigado', '/instagram'].some((r) => page.includes(r)),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '');
        if (path === '') item.priority = 1.0;
        else if (['/contato', '/metodo', '/solucoes'].includes(path)) item.priority = 0.9;
        else if (path.startsWith('/blog/')) item.priority = 0.7;
        else item.priority = 0.8;
        item.changefreq = path.startsWith('/blog') ? 'weekly' : 'monthly';
        return item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeWrapTables],
    shikiConfig: { theme: 'github-light', wrap: true },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
