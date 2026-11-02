import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import type { NewsArticle } from '@/types';
import { PUBLIC_CACHE_TAGS, PUBLIC_CONTENT_REVALIDATE_SECONDS } from '@/lib/cache-tags';
import { prisma } from '@/lib/prisma';
import { getNewsImages } from '@/lib/news-images';

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
  imageUrls: true,
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

async function queryPublishedNews(pinnedOnly = false) {
  return prisma.newsPost.findMany({
    where: { published: true, ...(pinnedOnly ? { pinned: true } : {}) },
    orderBy: pinnedOnly
      ? [{ sortOrder: 'asc' }, { date: 'desc' }, { id: 'desc' }]
      : [{ date: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
    select: publicNewsSelect,
  });
}
type PublicNewsRecord = Awaited<ReturnType<typeof queryPublishedNews>>[number];

function mapNewsPost(post: PublicNewsRecord): NewsArticle {
  const imageUrls = getNewsImages(post);
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date.toISOString().slice(0, 10),
    updatedAt: post.updatedAt.toISOString(),
    category: categoryMap[post.category],
    imageUrl: imageUrls[0],
    imageUrls,
    results: post.results.map((result) => ({
      id: result.id,
      athleteName: result.athleteName,
      position: result.position,
      distance: result.distance,
      time: result.time,
    })),
  };
}

const getCachedPinnedNews = unstable_cache(
  async () => (await queryPublishedNews(true)).map(mapNewsPost),
  ['pinned-published-news'],
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

export const NEWS_PAGE_SIZE = 6;

const getCachedNewsPage = unstable_cache(
  async (requestedPage: number) => {
    const total = await prisma.newsPost.count({ where: { published: true } });
    const totalPages = Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE));
    const page = Math.min(requestedPage, totalPages);
    const posts = await prisma.newsPost.findMany({
      where: { published: true },
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
      skip: (page - 1) * NEWS_PAGE_SIZE,
      take: NEWS_PAGE_SIZE,
      select: publicNewsSelect,
    });
    return { articles: posts.map(mapNewsPost), page, total, totalPages };
  },
  ['published-news-page'],
  {
    tags: [PUBLIC_CACHE_TAGS.news],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

export async function getPublishedNewsPage(value?: string | string[]) {
  const parsed = typeof value === 'string' && /^[1-9]\d*$/.test(value) ? Number(value) : 1;
  const page = Number.isSafeInteger(parsed) ? parsed : 1;
  return getCachedNewsPage(page);
}

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

export async function getPinnedPublishedNews(): Promise<NewsArticle[]> {
  try {
    return await getCachedPinnedNews();
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
