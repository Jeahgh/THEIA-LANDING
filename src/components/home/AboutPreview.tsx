import Image from 'next/image';
import { CLUB_INFO } from '@/lib/constants';

export default function AboutPreview() {
  return (
    <section id="about-preview" className="theia-light-section w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div className="accent-line mb-6" />
          <h2 className="mb-4 text-2xl font-bold leading-tight text-text-primary sm:text-4xl">
            Entrenar se siente distinto cuando hay equipo
          </h2>
          <p className="mb-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            {CLUB_INFO.description}
          </p>
          <div className="mb-8 grid max-w-lg grid-cols-3 gap-2 sm:gap-4">
            {[
              { value: '+30', label: 'atletas' },
              { value: '3', label: 'disciplinas' },
              { value: 'Todos', label: 'los niveles' },
            ].map((item) => (
              <div key={item.label} className="border-t border-brand-blue/15 pt-3">
                <p className="text-xl font-bold leading-none text-brand-blue sm:text-2xl">{item.value}</p>
                <p className="mt-1 text-xs text-text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-xl shadow-2xl shadow-brand-blue/20 ring-1 ring-white/70 sm:rounded-2xl">
            <Image
              src="/images/atletas-collage.jpg"
              alt="Atletas Theia entrenando y compitiendo"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 40vw, 22vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl shadow-brand-blue/15 ring-1 ring-white/70 sm:rounded-2xl">
            <Image
              src="/images/equipo-jersey.png"
              alt="Jersey Theia de competencia"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 40vw, 22vw"
            />
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-white/85 shadow-xl shadow-brand-blue/10 ring-1 ring-white/80 sm:block">
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
