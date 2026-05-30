'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ATHLETES_COUNT = 30;

export interface HeroSlideView {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  ctaText: string | null;
  ctaHref: string | null;
  buttonVariant: string;
}

const buttonStyles: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-brand-blue to-swim text-white shadow-lg shadow-brand-blue/25 hover:-translate-y-0.5 hover:shadow-xl',
  teal:
    'bg-gradient-to-r from-accent-teal to-run text-white shadow-lg shadow-accent-teal/25 hover:-translate-y-0.5 hover:shadow-xl',
  warm:
    'bg-gradient-to-r from-accent-warm to-accent-coral text-white shadow-lg shadow-accent-warm/25 hover:-translate-y-0.5 hover:shadow-xl',
  outline:
    'border-2 border-brand-blue bg-white/70 text-brand-blue shadow-md shadow-brand-blue/10 hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white',
};

export default function HeroCarouselClient({ slides }: { slides: HeroSlideView[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [athletesCount, setAthletesCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasCountedRef = useRef(false);
  const counterAnimationRef = useRef<number | null>(null);
  const hasSlides = slides.length > 0;
  const activeIndex = hasSlides ? currentSlide % slides.length : 0;
  const slide = slides[activeIndex] ?? null;

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(interval);
  }, [isPaused, nextSlide, slides.length]);

  useEffect(() => {
    const statsElement = statsRef.current;
    if (!statsElement || hasCountedRef.current) return;

    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startCounter = () => {
      if (hasCountedRef.current) return;
      hasCountedRef.current = true;

      if (shouldReduceMotion) {
        setAthletesCount(ATHLETES_COUNT);
        return;
      }

      const duration = 1300;
      const startTime = performance.now();

      const tick = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setAthletesCount(Math.round(easedProgress * ATHLETES_COUNT));

        if (progress < 1) {
          counterAnimationRef.current = requestAnimationFrame(tick);
        }
      };

      counterAnimationRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(statsElement);

    return () => {
      observer.disconnect();
      if (counterAnimationRef.current) {
        cancelAnimationFrame(counterAnimationRef.current);
      }
    };
  }, []);

  return (
    <section id="hero" className="pt-16 lg:pt-24">
      <div className="w-full bg-gradient-to-b from-bg-warm via-white to-brand-blue-pale px-4 py-8 sm:px-6 sm:py-10 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-14">
          <div className="order-1">
            <div className="mb-6 lg:min-h-[17.5rem] xl:min-h-[18.5rem]">
              <h1 className="mb-4 text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-5xl xl:text-6xl">
                {slide?.title ?? 'Contenido principal pendiente'}
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-text-secondary sm:text-xl">
                {slide?.subtitle ?? 'Agrega slides del hero desde el panel de administracion.'}
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-4 lg:mb-10">
              {slide?.ctaText && slide.ctaHref && (
                <Link
                  href={slide.ctaHref}
                  className={`inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 sm:w-64 ${
                    buttonStyles[slide.buttonVariant] ?? buttonStyles.primary
                  }`}
                >
                  {slide.ctaText}
                </Link>
              )}
            </div>

            <div ref={statsRef} className="relative max-w-md border-t border-border-subtle/80 pt-6 lg:pt-7">
              <div className="absolute left-0 top-0 h-px w-36 bg-gradient-to-r from-brand-blue via-accent-teal to-transparent" />
              <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-white/35 ring-1 ring-brand-blue/5">
                <div className="px-3 py-3 sm:px-5 sm:py-3.5">
                  <p
                    className="flex min-w-20 items-baseline text-3xl font-bold leading-none tracking-normal text-brand-blue tabular-nums sm:text-4xl"
                    aria-label={`Mas de ${ATHLETES_COUNT} atletas activos`}
                  >
                    <span className="mr-0.5 text-2xl leading-none text-brand-blue-light">+</span>
                    {athletesCount}
                  </p>
                  <p className="mt-2 text-sm leading-none text-text-muted">Atletas activos</p>
                </div>
                <div className="border-l border-border-subtle/80 px-3 py-3 sm:px-5 sm:py-3.5">
                  <p className="text-3xl font-bold leading-none tracking-normal text-accent-warm sm:text-4xl">Todos</p>
                  <p className="mt-2 text-sm leading-none text-text-muted">los niveles</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative order-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-blue-pale shadow-2xl shadow-brand-blue/15 sm:rounded-2xl">
              {hasSlides ? (
                slides.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                    }`}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={90}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-8 text-center text-brand-blue/70">
                        Slide sin imagen.
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-brand-blue/70">
                  No hay slides activos en el hero.
                </div>
              )}

              {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {slides.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === activeIndex ? 'h-2 w-8 bg-white' : 'h-2 w-2 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Mostrar slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-2xl bg-gradient-to-br from-swim/20 to-brand-blue/20 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
