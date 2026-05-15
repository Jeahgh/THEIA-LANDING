// =============================================================================
// Testimonials — Tema Claro, Cálido
// =============================================================================

'use client';

import { useState } from 'react';
import { TESTIMONIALS } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-brand-blue-pale">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Lo que dicen nuestros atletas"
          subtitle="Testimonios de quienes viven la experiencia Theia"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Testimonial card */}
          <div className="bg-white rounded-2xl shadow-sm border border-border-subtle p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Decorative quote */}
            <div className="absolute top-4 left-6 text-brand-blue/10 text-8xl font-serif leading-none select-none">
              &ldquo;
            </div>

            {/* Avatar */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-brand-blue-pale ring-offset-4 ring-offset-white">
              <ImagePlaceholder
                text="Foto"
                aspectRatio="aspect-square"
                className="w-full h-full rounded-full"
              />
            </div>

            {/* Quote */}
            <blockquote className="text-text-primary text-lg sm:text-xl leading-relaxed mb-6 relative z-10">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Name */}
            <p className="text-brand-blue font-semibold text-lg">{testimonial.name}</p>
            <p className="text-text-muted text-sm">{testimonial.role}</p>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex ? 'w-8 h-2 bg-brand-blue' : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-14 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-border-subtle rounded-full flex items-center justify-center text-text-muted hover:text-brand-blue hover:border-brand-blue-soft shadow-sm transition-all duration-200"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-14 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-border-subtle rounded-full flex items-center justify-center text-text-muted hover:text-brand-blue hover:border-brand-blue-soft shadow-sm transition-all duration-200"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
