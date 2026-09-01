/** Construtores de JSON-LD reaproveitados pelas paginas. */
import { SITE } from '../config';

const ORG = { '@id': `${new URL(SITE.url).origin}/#organization` };

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offers?: string[];
}) {
  const url = new URL(opts.path, SITE.url).href;
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    provider: ORG,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: url },
    ...(opts.offers?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: opts.name,
            itemListElement: opts.offers.map((o) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: o },
            })),
          },
        }
      : {}),
  };
}

export function howToSchema(opts: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function itemListSchema(name: string, items: { name: string; url: string; description?: string }[]) {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: new URL(it.url, SITE.url).href,
      ...(it.description ? { description: it.description } : {}),
    })),
  };
}
