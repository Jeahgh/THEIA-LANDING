// =============================================================================
// Página: Home — THEIA Triathlon Performance
// =============================================================================

import HeroCarousel from '@/components/home/HeroCarousel';
import AboutPreview from '@/components/home/AboutPreview';
import UpcomingRaces from '@/components/home/UpcomingRaces';
import NewsPreview from '@/components/home/NewsPreview';
import FeaturedAthletes from '@/components/home/FeaturedAthletes';
import Testimonials from '@/components/home/Testimonials';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <AboutPreview />
      <UpcomingRaces />
      <NewsPreview />
      <FeaturedAthletes />
      <Testimonials />
    </>
  );
}
