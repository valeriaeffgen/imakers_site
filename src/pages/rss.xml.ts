import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE } from '../config';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: 'Blog Viceja',
    description: 'Ideias para transformar atenção em operação própria.',
    site: context.site ?? SITE.url,
    trailingSlash: false,
    customData: '<language>pt-BR</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
    })),
  });
};
