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
    <section id="testimonials" className="section-padding bg-brand-blue-pale">
      <div className="content-shell">
        <SectionTitle title="Lo que dicen nuestros atletas" subtitle="Testimonios de quienes viven la experiencia Theia" />

        {testimonials.length === 0 ? (
          <div className="mx-auto max-w-3xl rounded-lg border border-border-subtle bg-white p-6 text-center text-text-secondary shadow-sm sm:rounded-2xl sm:p-10">
            No hay testimonios activos por ahora.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="rounded-lg border border-border-subtle bg-white p-5 text-center shadow-sm sm:rounded-2xl sm:p-6">
                <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-xl font-bold text-brand-blue">
                  {testimonial.imageUrl ? (
                    <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover" sizes="80px" />
                  ) : (
                    testimonial.name.charAt(0)
                  )}
                </div>
                <blockquote className="text-text-primary leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <p className="mt-5 font-semibold text-brand-blue">{testimonial.name}</p>
                <p className="text-sm text-text-muted">{testimonial.role}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
