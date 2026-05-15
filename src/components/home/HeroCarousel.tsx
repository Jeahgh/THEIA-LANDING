'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '@/lib/constants';
import Button from '@/components/ui/Button';

const SLIDE_IMAGES: Record<string, string> = {
  '1': '/images/equipo-running.jpg',
  '2': '/images/atletas-collage.jpg',
  '3': '/images/equipo-running.jpg',
  '4': '/images/atletas-collage.jpg',
};

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="pt-20 lg:pt-24">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-10 lg:py-16 bg-gradient-to-b from-bg-warm via-white to-brand-blue-pale">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Lado izquierdo: Texto */}
          <div className="order-2 lg:order-1">
            {/* Título con transición suave */}
            <h1
              key={slide.id}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight mb-5 animate-fade-in"
            >
              {slide.title}
            </h1>

            <p
              key={`sub-${slide.id}`}
              className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-lg animate-fade-in"
            >
              {slide.subtitle}
            </p>

            {/* Un solo botón por slide */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="primary" size="lg" href={slide.ctaHref}>
                {slide.ctaText}
              </Button>
            </div>

            {/* Mini estadísticas — difuminado sutil de abajo hacia arriba */}
            <div className="relative pt-6 border-t border-border-subtle overflow-hidden">
              {/* Difuminado azul sutil de abajo hacia arriba */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-pale/60 via-brand-blue-pale/20 to-transparent rounded-xl pointer-events-none" />
              <div className="relative flex gap-10">
                <div>
                  <p className="text-3xl font-bold text-brand-blue">+30</p>
                  <p className="text-text-muted text-xs mt-0.5">Atletas activos</p>
                </div>
                <div className="border-l border-border-subtle pl-10">
                  <p className="text-3xl font-bold text-accent-warm">Todos</p>
                  <p className="text-text-muted text-xs mt-0.5">los niveles</p>
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
                    priority={index === 0}
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
