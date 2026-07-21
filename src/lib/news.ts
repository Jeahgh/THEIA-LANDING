import type { NewsArticle } from '@/types';
import { prisma } from '@/lib/prisma';

const categoryMap = {
  RESULTADOS: 'resultados',
  NOTICIAS: 'noticias',
  ENTRENAMIENTO: 'entrenamiento',
  COMUNIDAD: 'comunidad',
} as const;

export async function getPublishedNews(): Promise<NewsArticle[]> {
  try {
    const posts = await prisma.newsPost.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { date: 'desc' }],
      take: 4,
      include: { results: { orderBy: { sortOrder: 'asc' } } },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date.toISOString().slice(0, 10),
      category: categoryMap[post.category],
      imageUrl: post.imageUrl ?? undefined,
      results: post.results.map((result) => ({
        id: result.id,
        athleteName: result.athleteName,
        position: result.position,
        distance: result.distance,
        time: result.time,
      })),
    }));
  } catch {
    return [];
  }
}
