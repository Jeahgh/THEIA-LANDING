import type { Metadata } from 'next';
import HeroSlidesManager, { type AdminHeroSlide } from '@/components/admin/HeroSlidesManager';
import TimedStatusMessage from '@/components/admin/TimedStatusMessage';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Gestión del contenido principal de Theia.',
};

async function getHeroSlides() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return {
      slides: slides.map<AdminHeroSlide>((slide) => ({
        id: slide.id,
        title: slide.title,
        subtitle: slide.subtitle,
        imageUrl: slide.imageUrl,
        ctaText: slide.ctaText,
        ctaHref: slide.ctaHref,
        buttonVariant: slide.buttonVariant,
        isActive: slide.isActive,
        sortOrder: slide.sortOrder,
      })),
      dbReady: true,
    };
  } catch {
    return { slides: [] as AdminHeroSlide[], dbReady: false };
  }
}

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams?: Promise<{ guardado?: string; eliminado?: string }>;
}) {
  const { slides, dbReady } = await getHeroSlides();
  const params = await searchParams;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 text-center sm:mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Inicio</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Contenido principal</h1>
      </div>

      {!dbReady && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
          Todavia no se puede leer la tabla de slides. Ejecuta la migracion de Prisma contra PostgreSQL antes de guardar cambios.
        </div>
      )}

      {params?.guardado && (
        <TimedStatusMessage message="Cambios guardados correctamente." />
      )}

      {params?.eliminado && (
        <TimedStatusMessage message="Se ha borrado correctamente." />
      )}

      <HeroSlidesManager slides={slides} />
    </div>
  );
}
