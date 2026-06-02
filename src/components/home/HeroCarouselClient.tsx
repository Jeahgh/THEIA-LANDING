'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroSlideView {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  ctaText: string | null;
  ctaHref: string | null;
  buttonVariant: string;
}

const heroPhotos = [
  {
    id: 'trisuit-collage',
    src: '/images/theia-hero-collage.jpeg',
    alt: 'Atletas Theia en triatlón',
    position: 'center center',
  },
  {
    id: 'running-pack',
    src: '/images/hero-running-pack.jpg',
    alt: 'Atletas corriendo en competencia urbana',
    position: 'center center',
  },
  {
    id: 'bike-team',
    src: '/images/hero-bike-team.jpg',
    alt: 'Equipo Theia con bicicletas y bandera',
    position: 'center 62%',
  },
  {
    id: 'team-finish',
    src: '/images/hero-team-finish.jpg',
    alt: 'Equipo Theia celebrando después de una carrera',
    position: 'center center',
  },
  {
    id: 'podium',
    src: '/images/hero-podium.jpg',
    alt: 'Atleta Theia celebrando en podio',
    position: 'center 30%',
  },
];

export default function HeroCarouselClient({ slides }: { slides: HeroSlideView[] }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasManagedSlides = slides.length > 0;

  const nextPhoto = useCallback(() => {
    setCurrentPhoto((photo) => (photo + 1) % heroPhotos.length);
  }, []);

  useEffect(() => {
    if (isPaused || heroPhotos.length <= 1) return;

    const interval = window.setInterval(nextPhoto, 3000);
    return () => window.clearInterval(interval);
  }, [isPaused, nextPhoto]);

  return (
    <section
      id="hero"
      className="bg-brand-navy pt-16 lg:pt-20"
      aria-label={hasManagedSlides ? 'Hero principal con fondo editorial' : 'Hero principal de Theia'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden border-b border-white/10 px-4 py-16 text-white sm:px-6 lg:min-h-[calc(100vh-5rem)] lg:px-12">
        {heroPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentPhoto ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              style={{ objectPosition: photo.position }}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              quality={100}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-brand-navy/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.22),transparent_27%),radial-gradient(circle_at_52%_44%,rgba(10,132,255,0.2),transparent_34%),linear-gradient(180deg,rgba(7,20,38,0.14)_0%,rgba(7,20,38,0.9)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="absolute inset-x-8 bottom-10 hidden h-px bg-white/10 sm:block lg:inset-x-40" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl translate-y-6 flex-col items-center text-center sm:translate-y-8 lg:translate-y-10">
          <p className="mb-7 text-[10px] font-black uppercase tracking-[0.52em] text-brand-blue-light sm:text-xs">
            Club de triatlón · Santiago, Chile
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Nada.
            <span className="block text-brand-blue">Pedalea.</span>
            Corre.
          </h1>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/72 sm:text-base">
            Entrenamiento de triatlón con planificación real, equipo y objetivos de competencia.
          </p>

          <div className="mt-14 flex w-full max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:mt-20">
            <Link
              href="/planes"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-blue px-8 py-4 text-xs font-black uppercase tracking-tight text-white shadow-lg shadow-brand-blue/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-vivid sm:w-auto sm:min-w-64"
            >
              Ver planes de entrenamiento
            </Link>
            <Link
              href="/competencias"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-brand-blue sm:w-auto sm:min-w-64"
            >
              Entrenar para competir
            </Link>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {heroPhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setCurrentPhoto(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentPhoto ? 'h-2 w-8 bg-white' : 'h-2 w-2 bg-white/45 hover:bg-white/75'
                }`}
                aria-label={`Mostrar foto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
