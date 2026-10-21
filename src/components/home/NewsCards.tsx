import Link from 'next/link';
import type { NewsArticle } from '@/types';
import NewsImageCarousel from '@/components/noticias/NewsImageCarousel';
import { getNewsImages } from '@/lib/news-images';

const fallbackImage = '/images/equipo-running.jpg';

export function formatNewsDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`);
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
export function getNewsCategory(category: NewsArticle['category']) {
  const styles: Record<NewsArticle['category'], { label: string; className: string }> = {
    resultados: { label: 'Resultados', className: 'bg-[#f6ebd9] text-[#7a5722]' },
    noticias: { label: 'Noticias', className: 'bg-[#e9edf2] text-[#485b70]' },
    entrenamiento: { label: 'Entrenamiento', className: 'bg-[#e7f0e9] text-[#41644e]' },
    comunidad: { label: 'Comunidad', className: 'bg-[#efe7f0] text-[#745574]' },
  };

  return styles[category];
}

function NewsMeta({ article, includeDate = true }: { article: NewsArticle; includeDate?: boolean }) {
  const category = getNewsCategory(article.category);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${category.className}`}>{category.label}</span>
      {includeDate && (
        <time dateTime={article.date} className="text-xs text-text-muted">
          {formatNewsDate(article.date)}
        </time>
      )}
    </div>
  );
}

export default function NewsCards({ articles }: { articles: NewsArticle[] }) {
  const featured = articles[0];
  const rest = articles.slice(1);
  if (!featured) return null;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
      <article
        className="group self-start overflow-hidden rounded-lg border border-white/70 bg-white/90 text-left shadow-xl shadow-brand-blue/10 ring-1 ring-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transform-none focus-within:ring-2 focus-within:ring-brand-blue sm:rounded-2xl"
      >
          <NewsImageCarousel images={getNewsImages(featured).length ? getNewsImages(featured) : [fallbackImage]} title={featured.title} variant="featured" href={`/noticias/${featured.id}`} />
          <Link href={`/noticias/${featured.id}`} className="block p-5 outline-none sm:p-6">
            <NewsMeta article={featured} />
            <h3 className="mt-3 break-words text-lg font-bold leading-tight text-text-primary sm:text-xl lg:text-2xl">
              {featured.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">{featured.excerpt}</p>
          </Link>
      </article>

      <div className="flex flex-col gap-4 sm:gap-6">
        {rest.map((article) => (
          <article
            key={article.id}
            className="group flex w-full flex-col self-start overflow-hidden rounded-lg border border-white/70 bg-white/90 text-left shadow-xl shadow-brand-blue/10 ring-1 ring-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transform-none focus-within:ring-2 focus-within:ring-brand-blue sm:min-h-40 sm:flex-row sm:rounded-2xl"
          >
              <div className="relative w-full min-w-0 sm:w-40 sm:shrink-0">
                <NewsImageCarousel images={getNewsImages(article).length ? getNewsImages(article) : [fallbackImage]} title={article.title} variant="compact" href={`/noticias/${article.id}`} />
              </div>
              <Link href={`/noticias/${article.id}`} className="block min-w-0 flex-1 p-4 outline-none sm:p-5">
                <NewsMeta article={article} includeDate={false} />
                <h3 className="mb-2 mt-3 break-words text-base font-bold leading-tight text-text-primary">
                  {article.title}
                </h3>
                <time dateTime={article.date} className="text-xs text-text-muted">
                  {formatNewsDate(article.date)}
                </time>
              </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
