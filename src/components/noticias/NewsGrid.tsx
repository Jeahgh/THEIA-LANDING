import Link from 'next/link';
import type { NewsArticle } from '@/types';
import NewsImageCarousel from './NewsImageCarousel';
import { NewsMeta } from '@/components/home/NewsCards';
import { getNewsImages } from '@/lib/news-images';

export default function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const images = getNewsImages(article);
        return (
          <article key={article.id} className="group overflow-hidden rounded-2xl border border-brand-blue/10 bg-white shadow-lg shadow-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-brand-blue motion-reduce:transform-none">
            <NewsImageCarousel images={images.length ? images : ['/images/equipo-running.jpg']} title={article.title} variant="card" href={`/noticias/${article.id}`} />
            <Link href={`/noticias/${article.id}`} className="block p-5 outline-none sm:p-6">
              <NewsMeta article={article} />
              <h2 className="mt-3 break-words text-xl font-bold leading-snug text-brand-navy">{article.title}</h2>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
