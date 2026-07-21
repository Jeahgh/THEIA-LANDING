import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/ui/SectionTitle';
import EmptyState from '@/components/ui/EmptyState';

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  } catch {
    return [];
  }
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  const carouselItems = testimonials.length > 1
    ? Array.from({ length: Math.max(4, testimonials.length) }, (_, index) => testimonials[index % testimonials.length])
    : testimonials;

  return (
    <section id="testimonials" className="section-padding theia-night-section">
      <div className="content-shell">
        <SectionTitle title="Lo que dicen nuestros atletas" subtitle="Testimonios de quienes viven la experiencia Theia" dark />

        {testimonials.length === 0 ? (
          <EmptyState tone="dark" className="mx-auto max-w-3xl">
            No hay testimonios activos por ahora.
          </EmptyState>
        ) : (
          <div className={`${testimonials.length > 1 ? 'testimonial-marquee -mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8' : ''}`}>
            <div className={`${testimonials.length > 1 ? 'testimonial-marquee-track flex w-max' : 'flex justify-center'} py-4`}>
              {[0, 1].map((copy) => (
                <div key={copy} className={`${testimonials.length > 1 ? 'flex gap-16 pr-16 sm:gap-24 sm:pr-24' : copy === 0 ? 'flex' : 'hidden'}`} aria-hidden={copy === 1}>
                  {carouselItems.map((testimonial, itemIndex) => (
                    <article key={`${testimonial.id}-${copy}-${itemIndex}`} className="flex w-[320px] shrink-0 flex-col items-center text-center sm:w-[400px]">
                      <div className="relative mx-auto mb-7 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white text-2xl font-bold text-brand-blue ring-4 ring-white/15 sm:h-32 sm:w-32">
                        {testimonial.imageUrl ? (
                          <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover" sizes="128px" />
                        ) : (
                          testimonial.name.charAt(0)
                        )}
                      </div>
                      <blockquote className="text-lg leading-relaxed text-white/90 sm:text-xl">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                      <p className="mt-6 text-lg font-semibold text-brand-blue-light">{testimonial.name}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
