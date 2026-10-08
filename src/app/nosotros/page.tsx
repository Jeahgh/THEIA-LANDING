import type { Metadata } from 'next';
import Image from 'next/image';
import { CLUB_INFO } from '@/lib/constants';
import { getActiveAthletes, getClubStats } from '@/lib/team';
import SectionTitle from '@/components/ui/SectionTitle';
import EmptyState from '@/components/ui/EmptyState';
import TeamMemberGrid from '@/components/nosotros/TeamMemberGrid';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Equipo de triatlón y running en Chile',
  description:
    'Conoce la historia, propósito, entrenadores y atletas de Theia, una comunidad de triatlón y running en Chile.',
  path: '/nosotros',
});

export default async function NosotrosPage() {
  const [athletes, stats] = await Promise.all([getActiveAthletes(), getClubStats()]);
  const summary = [
    { value: String(stats.athletes), label: 'Atletas' },
    { value: String(stats.coaches), label: 'Entrenadores' },
    { value: String(stats.races), label: 'Competencias' },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Equipo Theia en entrenamiento de triatlón y running" fill className="object-cover" sizes="100vw" preload />
          <div className="absolute inset-0 theia-hero-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Equipo y comunidad Theia</h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">Historia, proposito y comunidad deportiva Theia</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding theia-light-section">
        <div className="content-shell">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-brand-blue/15 ring-1 ring-white/70 lg:order-1">
              <Image src="/images/equipo-running.jpg" alt="Equipo Theia despues de una competencia" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-4 text-2xl font-bold leading-tight text-text-primary sm:mb-6 sm:text-4xl">Nuestra Historia</h2>
              <p className="mb-6 text-justify text-base leading-relaxed text-text-secondary sm:mb-8 sm:text-lg">
                {CLUB_INFO.history}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {summary.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/70 bg-white/85 p-4 text-center shadow-lg shadow-brand-blue/8">
                    <p className="text-2xl font-bold text-brand-blue sm:text-3xl">{item.value}</p>
                    <p className="text-sm text-text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding theia-night-section">
        <div className="content-shell">
          <SectionTitle title="Mision y Vision" dark />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Nuestra Mision', text: CLUB_INFO.mission },
              { title: 'Nuestra Vision', text: CLUB_INFO.vision },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-white/15 bg-white/10 p-6 text-white shadow-xl shadow-black/15 backdrop-blur-sm sm:rounded-2xl sm:p-8">
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-justify text-white/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F4F5F6]">
        <div className="content-shell">
          <div className="mb-8 text-center sm:mb-12">
            <p className="mb-3 text-xs font-bold tracking-[0.45em] text-slate-900 sm:text-sm">THEIA</p>
            <h2 className="text-4xl font-bold text-black sm:text-5xl lg:text-6xl">Nuestro equipo</h2>
          </div>
          {athletes.length === 0 ? (
            <EmptyState>
              No hay integrantes publicados por ahora.
            </EmptyState>
          ) : (
            <TeamMemberGrid members={athletes} />
          )}
        </div>
      </section>
    </>
  );
}
