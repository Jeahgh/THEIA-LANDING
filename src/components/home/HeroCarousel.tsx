'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '@/lib/constants';
import Button from '@/components/ui/Button';

const SLIDE_IMAGES: Record<string, string> = {
  '1': '/images/equipo-running.jpg',
  '2': '/images/atletas-collage.jpg',
  '3': '/images/equipo-running.jpg',
  '4': '/images/atletas-collage.jpg',
};

const ATHLETES_COUNT = 30;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [athletesCount, setAthletesCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasCountedRef = useRef(false);
  const counterAnimationRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

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

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="pt-20 lg:pt-24">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-10 lg:py-16 bg-gradient-to-b from-bg-warm via-white to-brand-blue-pale">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Lado izquierdo: Texto */}
          <div className="order-2 lg:order-1">
            {/* Zona de copy con alto reservado para que el CTA y las stats no salten */}
            <div className="mb-8 min-h-[15.5rem] sm:min-h-[16rem] lg:min-h-[17.5rem] xl:min-h-[18.5rem]">
              <h1
                key={slide.id}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight mb-5 animate-fade-in"
              >
                {slide.title}
              </h1>

              <p
                key={`sub-${slide.id}`}
                className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-lg animate-fade-in"
              >
                {slide.subtitle}
              </p>
            </div>

            {/* Un solo botón por slide */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="primary" size="lg" href={slide.ctaHref} className="w-full sm:w-64">
                {slide.ctaText}
              </Button>
            </div>

            {/* Mini estadísticas */}
            <div ref={statsRef} className="relative max-w-md pt-7 border-t border-border-subtle/80">
              <div className="absolute left-0 top-0 h-px w-36 bg-gradient-to-r from-brand-blue via-accent-teal to-transparent" />
              <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-white/35 ring-1 ring-brand-blue/5">
                <div className="px-4 py-3.5 sm:px-5">
                  <p
                    className="flex min-w-20 items-baseline text-4xl font-bold leading-none tracking-normal text-brand-blue tabular-nums"
                    aria-label={`Mas de ${ATHLETES_COUNT} atletas activos`}
                  >
                    <span className="mr-0.5 text-2xl leading-none text-brand-blue-light">+</span>
                    {athletesCount}
                  </p>
                  <p className="mt-2 text-sm leading-none text-text-muted">Atletas activos</p>
                </div>
                <div className="border-l border-border-subtle/80 px-4 py-3.5 sm:px-5">
                  <p className="text-4xl font-bold leading-none tracking-normal text-accent-warm">Todos</p>
                  <p className="mt-2 text-sm leading-none text-text-muted">los niveles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado derecho: Carrusel de imágenes compacto */}
          <div
            className="order-1 lg:order-2 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Imagen principal del carrusel */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-blue/15 aspect-[4/3]">
              {HERO_SLIDES.map((s, index) => (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={SLIDE_IMAGES[s.id] || '/images/equipo-running.jpg'}
                    alt={s.title}
                    fill
                    className="object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
              ))}

              {/* Sutil overlay en la parte baja para el texto */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Indicador de slide dentro de la imagen */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {HERO_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Elemento decorativo detrás de la imagen */}
            <div className="hidden lg:block absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-swim/20 to-brand-blue/20" />
            <div className="hidden lg:block absolute -z-20 -top-8 -right-8 w-full h-full rounded-2xl bg-gradient-to-br from-run/10 to-accent-warm/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
