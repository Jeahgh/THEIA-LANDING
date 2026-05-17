// =============================================================================
// NewsPreview — Sección de Noticias/Blog del Home
// =============================================================================
// Muestra las últimas noticias del club en cards con imagen, categoría,
// título, fecha y extracto. Cada noticia es editable desde constants.ts.
// =============================================================================

import Image from 'next/image';
import { NEWS_ARTICLES, SOCIAL_LINKS } from '@/lib/constants';
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
    resultados: { label: 'Resultados', className: 'bg-green-50 text-green-700' },
    noticias: { label: 'Noticias', className: 'bg-blue-50 text-brand-blue' },
    entrenamiento: { label: 'Entrenamiento', className: 'bg-amber-50 text-amber-700' },
    comunidad: { label: 'Comunidad', className: 'bg-purple-50 text-purple-700' },
  };
  return styles[category] || { label: category, className: 'bg-gray-50 text-gray-600' };
}

export default function NewsPreview() {
  // Tomar las primeras 4 noticias para el Home
  const latestNews = NEWS_ARTICLES.slice(0, 4);
  // La primera noticia es la destacada
  const featured = latestNews[0];
  const rest = latestNews.slice(1);
  const instagramUrl = SOCIAL_LINKS.find((s) => s.platform === 'instagram')?.url ?? 'https://www.instagram.com/teamtheia/';

  return (
    <section id="noticias" className="section-padding bg-bg-warm">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Momentos Theia"
          subtitle="Entrenamientos, carreras y vida de equipo"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Noticia destacada (grande) */}
          <Card hover className="group overflow-hidden p-0">
            {/* Imagen */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={NEWS_IMAGES[featured.id]}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryStyle(featured.category).className}`}>
                  {getCategoryStyle(featured.category).label}
                </span>
                <span className="text-text-muted text-xs">{formatDate(featured.date)}</span>
              </div>
              <h3 className="text-text-primary font-bold text-xl lg:text-2xl mb-3 group-hover:text-brand-blue transition-colors leading-tight">
                {featured.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {featured.excerpt}
              </p>
            </div>
          </Card>

          {/* Noticias secundarias (columna derecha) */}
          <div className="flex flex-col gap-6">
            {rest.map((article) => (
              <Card key={article.id} hover className="group p-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Imagen lateral */}
                  <div className="relative aspect-video overflow-hidden sm:w-40 sm:min-w-[160px] sm:aspect-square">
                    <Image
                      src={NEWS_IMAGES[article.id]}
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

        <div className="text-center mt-12">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border-2 border-brand-blue px-6 py-3 text-base font-semibold text-brand-blue transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white"
          >
            Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
