import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import { getActiveAthletes } from '@/lib/team';

export default async function FeaturedAthletes() {
  const athletes = await getActiveAthletes(4);

  if (athletes.length === 0) return null;

  return (
    <section id="nuestros-atletas" className="section-padding bg-white">
      <div className="content-shell">
        <SectionTitle
          title="Nuestros atletas"
          subtitle="Historias reales del equipo Theia, publicadas desde el panel de administracion."
          gradient
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {athletes.map((athlete) => (
            <article
              key={athlete.id}
              className="flex h-full flex-col rounded-2xl border border-brand-navy/10 bg-white p-5 text-center shadow-lg shadow-brand-blue/8 transition-colors hover:border-brand-blue/30"
            >
              <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-2xl font-black text-brand-blue ring-4 ring-brand-blue-pale ring-offset-4 ring-offset-white">
                {athlete.imageUrl ? (
                  <Image src={athlete.imageUrl} alt={athlete.imageAlt ?? athlete.name} fill className="object-cover" sizes="96px" />
                ) : (
                  athlete.name.charAt(0)
                )}
              </div>
              <h3 className="text-lg font-black text-text-primary">{athlete.name}</h3>
              <p className="mt-1 text-sm font-bold text-brand-blue">{athlete.role}</p>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-text-secondary">{athlete.bio}</p>
              {athlete.achievements.length > 0 && (
                <div className="mt-auto flex flex-wrap justify-center gap-1.5 pt-4">
                  {athlete.achievements.slice(0, 2).map((achievement) => (
                    <span key={achievement} className="rounded-full bg-brand-blue-pale px-2.5 py-1 text-xs font-semibold text-brand-blue">
                      {achievement}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/nosotros" variant="secondary">
            Ver Equipo Theia
          </Button>
        </div>
      </div>
    </section>
  );
}
