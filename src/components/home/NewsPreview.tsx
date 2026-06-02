// =============================================================================
// NewsPreview — Sección de Noticias/Blog del Home
// =============================================================================
// Muestra las últimas noticias del club en cards con imagen, categoría,
// título, fecha y extracto. Cada noticia es editable desde constants.ts.
// =============================================================================

import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/constants';
import { getPublishedNews } from '@/lib/news';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';

const NEWS_IMAGES: Record<string, string> = {
  '1': '/images/equipo-running.jpg',
  '2': '/images/atletas-collage.jpg',
  '3': '/images/equipo-jersey.png',
  '4': '/images/equipo-running.jpg',
};

/**
 * Formatea fecha ISO a formato legible en español.
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

/**
 * Devuelve el estilo del badge de categoría.
 */
function getCategoryStyle(category: string): { label: string; className: string } {
  const styles: Record<string, { label: string; className: string }> = {
    resultados: { label: 'Resultados', className: 'bg-brand-blue-pale text-brand-blue' },
    noticias: { label: 'Noticias', className: 'bg-brand-blue-pale text-brand-blue' },
    entrenamiento: { label: 'Entrenamiento', className: 'bg-swim-light text-brand-navy' },
    comunidad: { label: 'Comunidad', className: 'bg-bg-section text-brand-blue-vivid' },
  };
  return styles[category] || { label: category, className: 'bg-gray-50 text-gray-600' };
}

export default async function NewsPreview() {
  const latestNews = await getPublishedNews();
  const featured = latestNews[0];
  const rest = latestNews.slice(1);
  const instagramUrl = SOCIAL_LINKS.find((s) => s.platform === 'instagram')?.url ?? 'https://www.instagram.com/teamtheia/';

  if (!featured) {
    return (
      <section id="noticias" className="section-padding theia-light-section">
        <div className="content-shell">
          <SectionTitle title="Noticias del Equipo" subtitle="Pronto compartiremos nuevas historias del equipo" />
          <div className="rounded-lg p-6 text-center text-text-secondary theia-card-glow sm:rounded-2xl sm:p-10">
            No hay noticias publicadas por ahora.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="section-padding theia-light-section">
      <div className="content-shell">
        <SectionTitle
          title="Noticias del Equipo"
          subtitle="Entrenamientos, carreras y vida de equipo"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          {/* Noticia destacada (grande) */}
          <Card hover className="group overflow-hidden p-0">
            {/* Imagen */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={featured.imageUrl ?? NEWS_IMAGES[featured.id] ?? '/images/equipo-running.jpg'}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Content */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryStyle(featured.category).className}`}>
                  {getCategoryStyle(featured.category).label}
                </span>
                <span className="text-text-muted text-xs">{formatDate(featured.date)}</span>
              </div>
              <h3 className="mb-3 text-lg font-bold leading-tight text-text-primary transition-colors group-hover:text-brand-blue sm:text-xl lg:text-2xl">
                {featured.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {featured.excerpt}
              </p>
            </div>
          </Card>

          {/* Noticias secundarias (columna derecha) */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {rest.map((article) => (
              <Card key={article.id} hover className="group p-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Imagen lateral */}
                  <div className="relative aspect-video overflow-hidden sm:w-40 sm:min-w-[160px] sm:aspect-square">
                    <Image
                      src={article.imageUrl ?? NEWS_IMAGES[article.id] ?? '/images/equipo-running.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 160px"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-4 sm:p-5 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryStyle(article.category).className}`}>
                        {getCategoryStyle(article.category).label}
                      </span>
                    </div>
                    <h3 className="text-text-primary font-bold text-base mb-2 group-hover:text-brand-blue transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-text-muted text-xs">{formatDate(article.date)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border-2 border-brand-blue px-6 py-3 text-base font-semibold text-brand-blue transition-all duration-200 hover:bg-brand-blue hover:text-white sm:w-auto sm:hover:-translate-y-0.5"
          >
            Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
