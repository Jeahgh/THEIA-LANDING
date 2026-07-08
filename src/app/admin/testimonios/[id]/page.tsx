import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import TestimonialForm from '@/components/admin/TestimonialForm';
import { updateTestimonial } from '../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar testimonio',
};

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Testimonios</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Editar testimonio</h1>
      </div>
      <TestimonialForm
        action={updateTestimonial.bind(null, testimonial.id)}
        testimonial={testimonial}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}
