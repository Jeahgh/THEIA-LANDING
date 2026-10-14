import type { Metadata } from 'next';
import Image from 'next/image';
import { getActiveRaces } from '@/lib/races';
import { getRaceSchedule } from '@/lib/race-schedule';
import CompetitionCalendar from '@/components/competencias/CompetitionCalendar';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Competencias',
  description:
    'Revisa el calendario de competencias de triatlón, duatlón, running, ciclismo y natación en las que participa la comunidad Theia.',
  path: '/competencias',
});

export const dynamic = 'force-dynamic';

export default async function CompetenciasPage() {
  const { all: races, today } = getRaceSchedule(await getActiveRaces());

  return (
    <>
      {/* Hero — mismo estilo que Nosotros */}
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas Theia en una competencia deportiva" fill className="object-cover" sizes="100vw" preload />
          <div className="absolute inset-0 theia-hero-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Competencias</h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">Triatlón y running</p>
            </div>
          </div>
        </div>
      </section>

      <section id="calendario" className="section-padding bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-[1400px]">
          <h2 className="mb-10 text-center text-3xl font-bold text-brand-navy sm:text-4xl lg:mb-14 lg:text-5xl">Calendario de competencias</h2>
          <CompetitionCalendar races={races} today={today} />
        </div>
      </section>

    </>
  );
}
