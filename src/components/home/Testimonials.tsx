import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/ui/SectionTitle';

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

  return (
    <section id="testimonials" className="section-padding theia-night-section">
      <div className="content-shell">
        <SectionTitle title="Lo que dicen nuestros atletas" subtitle="Testimonios de quienes viven la experiencia Theia" dark />

        {testimonials.length === 0 ? (
          <div className="mx-auto max-w-3xl rounded-lg border border-white/15 bg-white/10 p-6 text-center text-white/75 shadow-xl shadow-black/20 sm:rounded-2xl sm:p-10">
            No hay testimonios activos por ahora.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="rounded-lg border border-white/15 bg-white/10 p-5 text-center shadow-xl shadow-black/15 backdrop-blur-sm sm:rounded-2xl sm:p-6">
                <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white text-xl font-bold text-brand-blue ring-4 ring-white/10">
                  {testimonial.imageUrl ? (
                    <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover" sizes="80px" />
                  ) : (
                    testimonial.name.charAt(0)
                  )}
                </div>
                <blockquote className="text-white/90 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <p className="mt-5 font-semibold text-brand-blue-light">{testimonial.name}</p>
                <p className="text-sm text-white/45">{testimonial.role}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
