'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { NewsArticle } from '@/types';

const fallbackImage = '/images/equipo-running.jpg';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

function categoryStyle(category: string) {
  const styles: Record<string, { label: string; className: string }> = {
    resultados: { label: 'Resultados', className: 'bg-brand-blue-pale text-brand-blue' },
    noticias: { label: 'Noticias', className: 'bg-brand-blue-pale text-brand-blue' },
    entrenamiento: { label: 'Entrenamiento', className: 'bg-swim-light text-brand-navy' },
    comunidad: { label: 'Comunidad', className: 'bg-bg-section text-brand-blue-vivid' },
  };
  return styles[category] ?? { label: category, className: 'bg-gray-50 text-gray-600' };
}

function NewsModal({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  const category = categoryStyle(article.category);
  const hasResults = article.category === 'resultados' && (article.results?.length ?? 0) > 0;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-brand-navy/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/30 bg-[#edf6ff] shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-xl font-medium text-brand-navy shadow-md shadow-brand-navy/10 backdrop-blur-sm hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">×</button>

        <header className="border-b border-brand-blue/10 px-6 py-7 pr-20 sm:px-10 sm:py-9 sm:pr-24">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${category.className}`}>{category.label}</span>
            <span className="text-sm text-text-muted">{formatDate(article.date)}</span>
          </div>
          <h2 className="text-2xl font-black leading-tight text-brand-navy sm:text-4xl">{article.title}</h2>
        </header>

        <div className={`grid gap-8 p-6 sm:p-10 ${hasResults ? 'lg:grid-cols-[0.9fr_1.1fr]' : ''}`}>
          <section>
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl bg-brand-blue/10">
              <Image src={article.imageUrl ?? fallbackImage} alt={article.title} fill className="object-cover" sizes={hasResults ? '(max-width: 1024px) 100vw, 45vw' : '(max-width: 1024px) 100vw, 900px'} />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">Descripción</h3>
            <div className="my-4 h-1 w-14 rounded-full bg-brand-blue" />
            <p className="whitespace-pre-line text-base leading-relaxed text-text-secondary sm:text-lg">{article.excerpt}</p>
          </section>

          {hasResults && (
            <section>
              <h3 className="text-lg font-bold text-brand-navy">Resultados de atletas</h3>
              <div className="my-4 h-1 w-14 rounded-full bg-brand-blue" />
              <div className="overflow-hidden rounded-xl border border-brand-blue/15 bg-white/70">
                <div className="grid grid-cols-[0.55fr_1.25fr_0.75fr_0.8fr] gap-3 bg-brand-navy px-4 py-3 text-xs font-bold uppercase tracking-wide text-white sm:px-5">
                  <span>Posición</span><span>Atleta</span><span>Distancia</span><span>Tiempo</span>
                </div>
                <div className="divide-y divide-brand-blue/10">
                  {article.results?.map((result) => (
                    <div key={result.id} className="grid grid-cols-[0.55fr_1.25fr_0.75fr_0.8fr] gap-3 px-4 py-4 text-sm sm:px-5 sm:text-base">
                      <span className="font-bold text-brand-blue">{result.position}</span>
                      <span className="font-semibold text-brand-navy">{result.athleteName}</span>
                      <span className="text-text-secondary">{result.distance}</span>
                      <span className="text-text-secondary">{result.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function NewsMeta({ article, includeDate = true }: { article: NewsArticle; includeDate?: boolean }) {
  const category = categoryStyle(article.category);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${category.className}`}>{category.label}</span>
      {includeDate && <span className="text-xs text-text-muted">{formatDate(article.date)}</span>}
    </div>
  );
}

export default function NewsCards({ articles }: { articles: NewsArticle[] }) {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        <button type="button" onClick={() => setSelectedArticle(featured)} className="group overflow-hidden rounded-lg border border-white/70 bg-white/90 p-0 text-left shadow-xl shadow-brand-blue/10 ring-1 ring-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-soft hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:rounded-2xl">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={featured.imageUrl ?? fallbackImage} alt={featured.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="p-5 sm:p-6">
            <NewsMeta article={featured} />
            <h3 className="mt-3 text-lg font-bold leading-tight text-text-primary transition-colors group-hover:text-brand-blue sm:text-xl lg:text-2xl">{featured.title}</h3>
          </div>
        </button>

        <div className="flex flex-col gap-4 sm:gap-6">
          {rest.map((article) => (
            <button key={article.id} type="button" onClick={() => setSelectedArticle(article)} className="group overflow-hidden rounded-lg border border-white/70 bg-white/90 p-0 text-left shadow-xl shadow-brand-blue/10 ring-1 ring-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-soft hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:rounded-2xl">
              <div className="flex flex-col sm:flex-row">
                <div className="relative aspect-video overflow-hidden sm:aspect-square sm:w-40 sm:min-w-[160px]">
                  <Image src={article.imageUrl ?? fallbackImage} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 640px) 100vw, 160px" />
                </div>
                <div className="flex-1 p-4 sm:p-5">
                  <NewsMeta article={article} includeDate={false} />
                  <h3 className="mb-2 mt-3 text-base font-bold leading-tight text-text-primary transition-colors group-hover:text-brand-blue">{article.title}</h3>
                  <p className="text-xs text-text-muted">{formatDate(article.date)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </>
  );
}
