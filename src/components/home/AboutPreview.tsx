import Image from 'next/image';
import { CLUB_INFO } from '@/lib/constants';

export default function AboutPreview() {
  return (
    <section id="about-preview" className="w-full px-6 sm:px-8 lg:px-12 py-16 sm:py-20 bg-gradient-to-br from-white via-bg-warm to-brand-blue-pale/70">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
        <div>
          <div className="accent-line mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Entrenar se siente distinto cuando hay equipo
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            {CLUB_INFO.description}
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg">
            {[
              { value: '+30', label: 'atletas' },
              { value: '3', label: 'disciplinas' },
              { value: 'Todos', label: 'los niveles' },
            ].map((item) => (
              <div key={item.label} className="border-t border-border-subtle pt-3">
                <p className="text-2xl font-bold leading-none text-brand-blue">{item.value}</p>
                <p className="mt-1 text-xs text-text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg shadow-brand-blue/10">
            <Image
              src="/images/atletas-collage.jpg"
              alt="Atletas Theia entrenando y compitiendo"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 40vw, 22vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-brand-blue/10">
            <Image
              src="/images/equipo-jersey.png"
              alt="Jersey Theia de competencia"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 40vw, 22vw"
            />
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-white/70 shadow-lg shadow-brand-blue/10 ring-1 ring-brand-blue/5 sm:block">
            <Image
              src="/images/logo-theia.png"
              alt="Logo Theia"
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 40vw, 22vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
