import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog VOCIRE.
 * Cada artigo declara os metadados que alimentam o SEO da pagina, o card do
 * indice, o RSS e o JSON-LD de Article — em um lugar so.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70, 'O title tag deve caber no resultado de busca'),
    /** Usado em <h1> quando precisa ser mais longo ou mais humano que o title. */
    headline: z.string().optional(),
    description: z.string().min(70).max(158),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['Estratégia', 'Ativos próprios', 'Operação', 'Pagamentos']),
    tags: z.array(z.string()).default([]),
    /** Minutos de leitura; se ausente, é estimado a partir do texto. */
    readingTime: z.number().optional(),
    og: z.string().default('/og/blog.png'),
    draft: z.boolean().default(false),
    /** Perguntas que viram FAQPage no fim do artigo. */
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { blog };
