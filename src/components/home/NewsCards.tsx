import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/types';

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
    resultados: { label: 'Resultados', className: 'bg-brand-blue-pale text-brand-blue' },
    noticias: { label: 'Noticias', className: 'bg-brand-blue-pale text-brand-blue' },
    entrenamiento: { label: 'Entrenamiento', className: 'bg-swim-light text-brand-navy' },
    comunidad: { label: 'Comunidad', className: 'bg-bg-section text-brand-blue-vivid' },
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

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
      <Link
        href={`/noticias/${featured.id}`}
        className="group overflow-hidden rounded-lg border border-white/70 bg-white/90 text-left shadow-xl shadow-brand-blue/10 ring-1 ring-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-soft hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:rounded-2xl"
      >
        <article>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={featured.imageUrl ?? fallbackImage}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="p-5 sm:p-6">
            <NewsMeta article={featured} />
            <h3 className="mt-3 text-lg font-bold leading-tight text-text-primary transition-colors group-hover:text-brand-blue sm:text-xl lg:text-2xl">
              {featured.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">{featured.excerpt}</p>
          </div>
        </article>
      </Link>

      <div className="flex flex-col gap-4 sm:gap-6">
        {rest.map((article) => (
          <Link
            key={article.id}
            href={`/noticias/${article.id}`}
            className="group overflow-hidden rounded-lg border border-white/70 bg-white/90 text-left shadow-xl shadow-brand-blue/10 ring-1 ring-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-soft hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:rounded-2xl"
          >
            <article className="flex flex-col sm:flex-row">
              <div className="relative aspect-video overflow-hidden sm:aspect-square sm:w-40 sm:min-w-[160px]">
                <Image
                  src={article.imageUrl ?? fallbackImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 160px"
                />
              </div>
              <div className="flex-1 p-4 sm:p-5">
                <NewsMeta article={article} includeDate={false} />
                <h3 className="mb-2 mt-3 text-base font-bold leading-tight text-text-primary transition-colors group-hover:text-brand-blue">
                  {article.title}
                </h3>
                <time dateTime={article.date} className="text-xs text-text-muted">
                  {formatNewsDate(article.date)}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
