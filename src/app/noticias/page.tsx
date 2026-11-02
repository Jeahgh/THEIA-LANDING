import type { Metadata } from 'next';
import Image from 'next/image';
import EmptyState from '@/components/ui/EmptyState';
import SectionTitle from '@/components/ui/SectionTitle';
import NewsGrid from '@/components/noticias/NewsGrid';
import NewsPagination from '@/components/noticias/NewsPagination';
import { getPublishedNewsPage } from '@/lib/news';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Noticias',
  description:
    'Noticias, resultados, entrenamientos y actividades de la comunidad Theia de triatlón y running en Chile.',
  path: '/noticias',
});

export default async function NoticiasPage({ searchParams }: {
  searchParams: Promise<{ pagina?: string | string[] }>;
}) {
  const { pagina } = await searchParams;
  const { articles, page, totalPages } = await getPublishedNewsPage(pagina);

  return (
    <>
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image
            src="/images/atletas-collage.jpg"
            alt="Atletas del equipo Theia en Chile"
            fill
            className="object-cover"
            sizes="100vw"
            preload
          />
          <div className="absolute inset-0 theia-hero-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-6 text-center">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Noticias de Theia</h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">
                Entrenamientos, competencias, resultados y vida de equipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="listado-noticias" className="section-padding theia-light-section scroll-mt-24">
        <div className="content-shell">
          <SectionTitle
            title="Últimas noticias"
            subtitle="Actualidad deportiva y novedades de la comunidad Theia"
          />
          {articles.length > 0 ? (
            <>
              <NewsGrid articles={articles} />
              <NewsPagination page={page} totalPages={totalPages} />
            </>
          ) : (
            <EmptyState>No hay noticias publicadas por ahora.</EmptyState>
          )}
        </div>
      </section>
    </>
  );
}
