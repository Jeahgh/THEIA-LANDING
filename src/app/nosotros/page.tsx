import type { Metadata } from 'next';
import Image from 'next/image';
import { CLUB_INFO, COACHES } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Conoce la historia, misión y cuerpo técnico de ${CLUB_INFO.name}.`,
};

export default function NosotrosPage() {
  return (
    <>
      {/* Hero with athletes collage */}
      <section className="relative pt-20 overflow-hidden">
        <div className="relative h-[350px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas Theia en acción" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/70 via-brand-blue/50 to-bg-warm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="accent-line mx-auto mb-6" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Nosotros</h1>
              <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">La historia, pasión y equipo detrás de Theia</p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-gradient-to-br from-bg-warm via-white to-brand-blue-pale/70">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl shadow-brand-blue/10">
              <Image src="/images/equipo-running.jpg" alt="Equipo Theia" width={800} height={600} className="w-full h-auto object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="accent-line mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">Nuestra Historia</h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">{CLUB_INFO.history}</p>
              <div className="flex gap-8">
                {[{ v: '80+', l: 'Atletas activos' }, { v: '4', l: 'Entrenadores' }, { v: '50+', l: 'Competencias' }].map((s) => (
                  <div key={s.l}><p className="text-3xl font-bold text-brand-blue">{s.v}</p><p className="text-text-muted text-sm">{s.l}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — on blue background */}
      <section className="section-padding bg-gradient-to-br from-brand-navy via-brand-blue to-brand-blue-vivid">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <SectionTitle title="Misión y Visión" subtitle="Los pilares que guían nuestro trabajo diario" dark />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-1 bg-gradient-to-r from-swim to-brand-blue rounded-full mb-4" />
              <h3 className="text-text-primary font-bold text-xl mb-3">Nuestra Misión</h3>
              <p className="text-text-secondary leading-relaxed">{CLUB_INFO.mission}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-1 bg-gradient-to-r from-brand-blue to-run rounded-full mb-4" />
              <h3 className="text-text-primary font-bold text-xl mb-3">Nuestra Visión</h3>
              <p className="text-text-secondary leading-relaxed">{CLUB_INFO.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="section-padding bg-gradient-to-b from-brand-blue-pale via-bg-section to-white">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <SectionTitle title="Equipo Theia" subtitle="Entrenadores que te acompañan en cada disciplina, desde la base hasta la competencia" gradient />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {COACHES.map((coach) => (
              <Card key={coach.id} hover className="text-center">
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-brand-blue-pale ring-offset-4 ring-offset-white">
                  <ImagePlaceholder text={`Foto de ${coach.name}`} aspectRatio="aspect-square" className="w-full h-full rounded-full" />
                </div>
                <h3 className="text-text-primary font-bold text-lg mb-1">{coach.name}</h3>
                <p className="text-brand-blue text-sm font-medium mb-3">{coach.role}</p>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{coach.bio}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {coach.specialties.map((s) => (
                    <span key={s} className="text-xs bg-brand-blue-pale text-brand-blue px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
