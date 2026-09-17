import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import type { NewsArticle } from '@/types';
import { PUBLIC_CACHE_TAGS, PUBLIC_CONTENT_REVALIDATE_SECONDS } from '@/lib/cache-tags';
import { prisma } from '@/lib/prisma';

const categoryMap = {
  RESULTADOS: 'resultados',
  NOTICIAS: 'noticias',
  ENTRENAMIENTO: 'entrenamiento',
  COMUNIDAD: 'comunidad',
} as const;

const publicNewsSelect = {
  id: true,
  title: true,
  excerpt: true,
  date: true,
  category: true,
  imageUrl: true,
  updatedAt: true,
  results: {
    orderBy: { sortOrder: 'asc' as const },
    select: {
      id: true,
      athleteName: true,
      position: true,
      distance: true,
      time: true,
    },
  },
} as const;

async function queryPublishedNews(take?: number) {
  return prisma.newsPost.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { date: 'desc' }],
    ...(take ? { take } : {}),
    select: publicNewsSelect,
  });
}
type PublicNewsRecord = Awaited<ReturnType<typeof queryPublishedNews>>[number];

function mapNewsPost(post: PublicNewsRecord): NewsArticle {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date.toISOString().slice(0, 10),
    updatedAt: post.updatedAt.toISOString(),
    category: categoryMap[post.category],
    imageUrl: post.imageUrl ?? undefined,
    results: post.results.map((result) => ({
      id: result.id,
      athleteName: result.athleteName,
      position: result.position,
      distance: result.distance,
      time: result.time,
    })),
  };
}

const getCachedLatestNews = unstable_cache(
  async () => (await queryPublishedNews(4)).map(mapNewsPost),
  ['latest-published-news'],
  {
    tags: [PUBLIC_CACHE_TAGS.news],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

const getCachedAllNews = unstable_cache(
  async () => (await queryPublishedNews()).map(mapNewsPost),
  ['all-published-news'],
  {
    tags: [PUBLIC_CACHE_TAGS.news],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

const getCachedNewsPost = unstable_cache(
  async (id: string) => {
    const post = await prisma.newsPost.findFirst({
      where: { id, published: true },
      select: publicNewsSelect,
    });

    return post ? mapNewsPost(post) : null;
  },
  ['published-news-post'],
  {
    tags: [PUBLIC_CACHE_TAGS.news],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

const getCachedNewsSitemapEntries = unstable_cache(
  async () =>
    prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, updatedAt: true },
    }),
  ['published-news-sitemap'],
  {
    tags: [PUBLIC_CACHE_TAGS.news],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

export async function getPublishedNews(): Promise<NewsArticle[]> {
  try {
    return await getCachedLatestNews();
  } catch {
    return [];
  }
}

export async function getAllPublishedNews(): Promise<NewsArticle[]> {
  try {
    return await getCachedAllNews();
  } catch {
    return [];
  }
}

export const getPublishedNewsPost = cache(async (id: string): Promise<NewsArticle | null> => {
  try {
    return await getCachedNewsPost(id);
  } catch {
    return null;
  }
});

export async function getPublishedNewsSitemapEntries() {
  try {
    return await getCachedNewsSitemapEntries();
  } catch {
    return [];
  }
}
