// =============================================================================
// Página: Home — THEIA Triathlon Performance
// =============================================================================

import HeroCarousel from '@/components/home/HeroCarousel';
import UpcomingRaces from '@/components/home/UpcomingRaces';
import NewsPreview from '@/components/home/NewsPreview';
import Testimonials from '@/components/home/Testimonials';

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
