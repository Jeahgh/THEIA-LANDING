import type { Metadata } from 'next';
import Image from 'next/image';
import { CLUB_INFO } from '@/lib/constants';
import { getActiveAthletes, getClubStats } from '@/lib/team';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia y equipo de Theia Triathlon Performance.',
};

export default async function NosotrosPage() {
  const [athletes, stats] = await Promise.all([getActiveAthletes(), getClubStats()]);
  const summary = [
    { value: String(stats.athletes), label: 'Atletas activos' },
    { value: String(stats.coaches), label: 'Entrenadores' },
    { value: String(stats.races), label: 'Competencias' },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Equipo Theia en entrenamiento" fill className="object-cover" priority />
          <div className="absolute inset-0 theia-hero-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="accent-line mx-auto mb-6" />
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Nosotros</h1>
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
              <div className="accent-line mb-6" />
              <h2 className="mb-4 text-2xl font-bold leading-tight text-text-primary sm:mb-6 sm:text-4xl">Nuestra Historia</h2>
              <p className="mb-6 text-base leading-relaxed text-text-secondary sm:mb-8 sm:text-lg">
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
          <SectionTitle title="Mision y Vision" subtitle="El norte que guia cada proceso deportivo de Theia" dark />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Nuestra Mision', text: CLUB_INFO.mission },
              { title: 'Nuestra Vision', text: CLUB_INFO.vision },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-white/15 bg-white/10 p-6 text-white shadow-xl shadow-black/15 backdrop-blur-sm sm:rounded-2xl sm:p-8">
                <div className="w-12 h-1 bg-gradient-to-r from-brand-blue via-brand-blue-light to-white rounded-full mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding theia-light-section">
        <div className="content-shell">
          <SectionTitle title="Equipo Theia" subtitle="Atletas activos publicados desde el panel de administracion" gradient />
          {athletes.length === 0 ? (
            <div className="rounded-lg p-6 text-center text-text-secondary theia-card-glow sm:rounded-2xl sm:p-10">
              No hay atletas publicados por ahora.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {athletes.map((athlete) => (
                <Card key={athlete.id} hover className="text-center">
                  <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-2xl font-bold text-brand-blue ring-4 ring-brand-blue-pale ring-offset-4 ring-offset-white">
                    {athlete.imageUrl ? (
                      <Image src={athlete.imageUrl} alt={athlete.imageAlt ?? athlete.name} fill className="object-cover" sizes="112px" />
                    ) : (
                      athlete.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-text-primary font-bold text-lg mb-1">{athlete.name}</h3>
                  <p className="text-brand-blue text-sm font-medium mb-3">{athlete.role}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{athlete.bio}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {athlete.achievements.map((achievement) => (
                      <span key={achievement} className="text-xs bg-brand-blue-pale text-brand-blue px-2 py-0.5 rounded-full">{achievement}</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
