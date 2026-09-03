import type { APIRoute } from 'astro';
import { SITE } from '../config';

/** Gerado a partir do dominio configurado, para nunca ficar dessincronizado. */
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.url)).origin;
  const body = `# Viceja — robots.txt
User-agent: *
Allow: /

# Página de agradecimento não deve competir no índice.
Disallow: /obrigado

# Rastreadores de IA que citam fontes são bem-vindos.
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${origin}/sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
