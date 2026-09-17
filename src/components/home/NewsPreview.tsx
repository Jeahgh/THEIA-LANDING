import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/constants';
import { getPublishedNews } from '@/lib/news';
import NewsCards from '@/components/home/NewsCards';
import SectionTitle from '@/components/ui/SectionTitle';
import EmptyState from '@/components/ui/EmptyState';

export default async function NewsPreview() {
  const latestNews = await getPublishedNews();
  const instagramUrl = SOCIAL_LINKS.find((social) => social.platform === 'instagram')?.url ?? 'https://www.instagram.com/teamtheia/';

  if (latestNews.length === 0) {
    return (
      <section id="noticias" className="section-padding theia-light-section">
        <div className="content-shell">
          <SectionTitle title="Noticias del Equipo" subtitle="Pronto compartiremos nuevas historias del equipo" />
          <EmptyState>No hay noticias publicadas por ahora.</EmptyState>
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="section-padding theia-light-section">
      <div className="content-shell">
        <SectionTitle title="Noticias del Equipo" subtitle="Entrenamientos, carreras y vida de equipo" />

        <NewsCards articles={latestNews} />

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:mt-12 sm:flex-row">
          <Link
            href="/noticias"
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-blue px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-brand-blue-vivid sm:w-auto sm:hover:-translate-y-0.5"
          >
            Ver todas las noticias
          </Link>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border-2 border-brand-blue px-6 py-3 text-base font-semibold text-brand-blue transition-all duration-200 hover:bg-brand-blue hover:text-white sm:w-auto sm:hover:-translate-y-0.5"
          >
            Seguir a Theia en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
