// =============================================================================
// NewsPreview — Sección de Noticias/Blog del Home
// =============================================================================
// Muestra las últimas noticias del club en cards con imagen, categoría,
// título, fecha y extracto. Cada noticia es editable desde constants.ts.
// =============================================================================

import { NEWS_ARTICLES } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Button from '@/components/ui/Button';

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

  return (
    <section id="noticias" className="section-padding bg-white">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Noticias del Club"
          subtitle="Resultados, entrenamientos y novedades de nuestra comunidad"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Noticia destacada (grande) */}
          <Card hover className="group overflow-hidden p-0">
            {/* Imagen */}
            <div className="overflow-hidden">
              <ImagePlaceholder
                text={featured.imagePlaceholder || 'Sube la imagen de la noticia aquí'}
                aspectRatio="aspect-[16/10]"
                className="rounded-none rounded-t-2xl group-hover:scale-[1.02] transition-transform duration-500"
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
                  <div className="sm:w-40 sm:min-w-[160px] overflow-hidden">
                    <ImagePlaceholder
                      text={article.imagePlaceholder || 'Imagen'}
                      aspectRatio="aspect-video sm:aspect-square"
                      className="rounded-none rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl h-full group-hover:scale-[1.02] transition-transform duration-500"
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
          <Button variant="outline" href="#">
            Ver todas las noticias
          </Button>
        </div>
      </div>
    </section>
  );
}
