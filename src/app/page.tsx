// =============================================================================
// Página: Home — THEIA Triathlon Performance
// =============================================================================

import type { Metadata } from 'next';
import HeroCarousel from '@/components/home/HeroCarousel';
import UpcomingRaces from '@/components/home/UpcomingRaces';
import NewsPreview from '@/components/home/NewsPreview';
import Testimonials from '@/components/home/Testimonials';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Theia | Entrenamiento de triatlón y running en Chile',
  description:
    'Entrena triatlón y running con Theia en Chile. Conoce nuestros planes, equipo deportivo, competencias y comunidad para distintos niveles.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <UpcomingRaces />
      <NewsPreview />
      <Testimonials />
    </>
  );
}
