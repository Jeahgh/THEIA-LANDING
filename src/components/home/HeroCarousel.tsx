import { prisma } from '@/lib/prisma';
import HeroCarouselClient, { type HeroSlideView } from './HeroCarouselClient';

async function getHeroSlides(): Promise<HeroSlideView[]> {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return slides.map((slide) => ({
      id: slide.id,
      title: slide.title,
      subtitle: slide.subtitle,
      imageUrl: slide.imageUrl,
      ctaText: slide.ctaText,
      ctaHref: slide.ctaHref,
      buttonVariant: slide.buttonVariant,
    }));
  } catch {
    return [];
  }
}

export default async function HeroCarousel() {
  const slides = await getHeroSlides();
  return <HeroCarouselClient slides={slides} />;
}
