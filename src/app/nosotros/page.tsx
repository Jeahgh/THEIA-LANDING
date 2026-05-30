import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia y equipo de Theia Triathlon Performance.',
};

async function getCoaches() {
  try {
    return await prisma.coach.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  } catch {
    return [];
  }
}

export default async function NosotrosPage() {
  const coaches = await getCoaches();

  return (
    <>
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Equipo Theia en entrenamiento" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/70 via-brand-blue/50 to-bg-warm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="accent-line mx-auto mb-6" />
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Nosotros</h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">Contenido institucional editable desde el panel admin</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-bg-warm via-white to-brand-blue-pale/70">
        <div className="content-shell">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 rounded-lg border border-border-subtle bg-white p-6 text-center text-text-secondary shadow-xl shadow-brand-blue/10 sm:rounded-2xl sm:p-10 lg:order-1">
              No hay imagen institucional activa.
            </div>
            <div className="order-1 lg:order-2">
              <div className="accent-line mb-6" />
              <h2 className="mb-4 text-2xl font-bold leading-tight text-text-primary sm:mb-6 sm:text-4xl">Nuestra Historia</h2>
              <p className="mb-6 text-base leading-relaxed text-text-secondary sm:mb-8 sm:text-lg">
                No hay historia institucional publicada por ahora.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {['Atletas activos', 'Entrenadores', 'Competencias'].map((label) => (
                  <div key={label} className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-brand-blue sm:text-3xl">-</p>
                    <p className="text-text-muted text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-brand-navy via-brand-blue to-brand-blue-vivid">
        <div className="content-shell">
          <SectionTitle title="Mision y Vision" subtitle="Pendiente de contenido editable" dark />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {['Nuestra Mision', 'Nuestra Vision'].map((title) => (
              <div key={title} className="rounded-lg bg-white p-6 shadow-lg sm:rounded-2xl sm:p-8">
                <div className="w-12 h-1 bg-gradient-to-r from-swim to-brand-blue rounded-full mb-4" />
                <h3 className="text-text-primary font-bold text-xl mb-3">{title}</h3>
                <p className="text-text-secondary leading-relaxed">No hay contenido publicado por ahora.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-brand-blue-pale via-bg-section to-white">
        <div className="content-shell">
          <SectionTitle title="Equipo Theia" subtitle="Entrenadores activos publicados desde el panel admin" gradient />
          {coaches.length === 0 ? (
            <div className="rounded-lg border border-border-subtle bg-white p-6 text-center text-text-secondary shadow-lg shadow-brand-blue/8 sm:rounded-2xl sm:p-10">
              No hay entrenadores activos por ahora.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {coaches.map((coach) => (
                <Card key={coach.id} hover className="text-center">
                  <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-2xl font-bold text-brand-blue ring-4 ring-brand-blue-pale ring-offset-4 ring-offset-white">
                    {coach.imageUrl ? (
                      <Image src={coach.imageUrl} alt={coach.name} fill className="object-cover" sizes="112px" />
                    ) : (
                      coach.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-text-primary font-bold text-lg mb-1">{coach.name}</h3>
                  <p className="text-brand-blue text-sm font-medium mb-3">{coach.role}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{coach.bio}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {coach.specialties.map((specialty) => (
                      <span key={specialty} className="text-xs bg-brand-blue-pale text-brand-blue px-2 py-0.5 rounded-full">{specialty}</span>
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
