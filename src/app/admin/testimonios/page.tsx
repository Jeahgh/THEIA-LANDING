import type { Metadata } from 'next';
import Image from 'next/image';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import ContentActions from '@/components/admin/ContentActions';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import TestimonialForm from '@/components/admin/TestimonialForm';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import ContentFilters from '@/components/admin/ContentFilters';
import { filterAdminItems, readAdminFilters, visibilityFilter, type AdminSearchParams } from '@/lib/admin-filters';
import { createTestimonial, deleteTestimonial, updateTestimonial } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Atletas',
};

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams?: Promise<AdminSearchParams>;
}) {
  await requireAdmin('/admin/testimonios');
  const params = await searchParams;
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
  const fields = [visibilityFilter];
  const filters = readAdminFilters(params, fields);
  const visibleTestimonials = filterAdminItems(testimonials, filters, (athlete) => ({ text: `${athlete.name} ${athlete.quote}`, values: { visibility: athlete.isActive ? 'visible' : 'hidden' } }));

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Atletas</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Atletas</h1>
      </div>

      <CreateContentPanel closedLabel="Agregar" title="Nuevo atleta">
        <TestimonialForm action={createTestimonial} submitLabel="Crear atleta" />
      </CreateContentPanel>

      <AdminActionStatus saved={typeof params?.guardado === 'string' ? params.guardado : undefined} deleted={typeof params?.eliminado === 'string' ? params.eliminado : undefined} />
      <ContentFilters label="atletas" placeholder="Nombre o testimonio" fields={fields} {...filters} />

      {visibleTestimonials.length === 0 ? (
        <EmptyState tone="admin">{testimonials.length ? 'No hay atletas que coincidan con los filtros.' : 'No hay atletas creados.'}</EmptyState>
      ) : (
        <div className="overflow-hidden">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Atletas existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center ${testimonial.isActive ? '' : 'bg-slate-50/70'}`}
              >
                <div className={`flex min-w-0 gap-4 transition-opacity ${testimonial.isActive ? '' : 'opacity-45 grayscale-[0.5]'}`}>
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-lg font-bold text-brand-blue">
                    {testimonial.imageUrl ? (
                      <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      testimonial.name.charAt(0)
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-text-primary">{testimonial.name}{!testimonial.isActive && <span className="sr-only"> (Oculto)</span>}</h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-muted">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                </div>
                <ContentActions name={testimonial.name} title="Editar atleta" deleteAction={deleteTestimonial.bind(null, testimonial.id)}>
                  <TestimonialForm action={updateTestimonial.bind(null, testimonial.id)} testimonial={testimonial} submitLabel="Guardar cambios" />
                </ContentActions>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
