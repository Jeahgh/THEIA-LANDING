import type { MetadataRoute } from 'next';
import { getPublishedNewsSitemapEntries } from '@/lib/news';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const publicPages: MetadataRoute.Sitemap = [
  { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
  { url: absoluteUrl('/planes'), changeFrequency: 'weekly', priority: 0.9 },
  { url: absoluteUrl('/nosotros'), changeFrequency: 'monthly', priority: 0.8 },
  { url: absoluteUrl('/competencias'), changeFrequency: 'weekly', priority: 0.8 },
  { url: absoluteUrl('/noticias'), changeFrequency: 'weekly', priority: 0.8 },
  { url: absoluteUrl('/contacto'), changeFrequency: 'yearly', priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedNewsSitemapEntries();

  return [
    ...publicPages,
    ...posts.map((post) => ({
      url: absoluteUrl(`/noticias/${post.id}`),
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}

