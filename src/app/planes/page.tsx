import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { getTrainingPlans } from '@/lib/training-plans';
import type { TrainingPlan } from '@/types';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Planes de entrenamiento',
  description:
    'Compara los planes de entrenamiento de running y triatlón de Theia, con alternativas online, presenciales y de alto rendimiento en Chile.',
  path: '/planes',
});

const planCategories = [
  {
    id: 'running',
    title: 'Running',
  },
  {
    id: 'triatlon',
    title: 'Triatlón',
  },
] as const;

const getPriceLabel = (price: string) => {
  if (price.toUpperCase().startsWith('CLP')) return price;
  return price.replace(/^\$\s*/, 'CLP ');
};

const getShortPlanName = (name: string) => name.replace(/^Plan\s+/i, '');

const isRecommendedPlan = (plan: TrainingPlan) =>
  Boolean(plan.highlighted) ||
  plan.name.toLowerCase().includes('performance') ||
  plan.id.toLowerCase().includes('plus') ||
  plan.modality.toLowerCase().includes('mixto');

function PlanCard({ plan, canViewPrice }: { plan: TrainingPlan; canViewPrice: boolean }) {
  const visibleFeatures = plan.features.slice(0, 4);
  const recommended = isRecommendedPlan(plan);
  const planHref = canViewPrice ? '/contacto' : '/login?callbackUrl=%2Fplanes';
  const priceLabel = getPriceLabel(plan.price);

  return (
    <article
      className={`relative grid grid-rows-subgrid gap-y-6 rounded-xl border bg-white p-5 shadow-sm shadow-brand-navy/5 transition-colors duration-200 lg:p-7 ${canViewPrice ? 'row-span-5' : 'row-span-4'} ${
        recommended ? 'border-brand-blue-vivid ring-1 ring-brand-blue-vivid/25' : 'border-brand-navy/10 hover:border-brand-blue/35'
      }`}
      style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
    >
      <div className="flex min-h-12 flex-wrap content-start items-start justify-between gap-2">
        <h3 className="min-w-40 flex-1 text-center text-xl font-extrabold uppercase leading-tight text-brand-navy sm:text-2xl">
          {getShortPlanName(plan.name)}
        </h3>
        {recommended && (
          <span className="ml-auto inline-flex shrink-0 items-center rounded-full bg-brand-blue-vivid px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
            Mejor valor
          </span>
        )}
      </div>

      {canViewPrice && (
        <div>
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-brand-navy">
            {priceLabel.startsWith('CLP') && <span className="text-sm font-semibold tracking-normal text-text-secondary">CLP</span>}
            <span className="text-[2.5rem] font-semibold leading-none tracking-tight sm:text-[2.75rem]">
              {priceLabel.replace(/^CLP\s*/, '')}
            </span>
            <span className="text-sm font-medium tracking-normal text-text-secondary">/mes</span>
          </p>
        </div>
      )}

      <p className="text-justify text-[15px] leading-relaxed text-text-secondary">{plan.excerpt}</p>

      <ul className="space-y-3 text-sm leading-relaxed text-text-secondary">
        {visibleFeatures.map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-navy" />
            <span className="min-w-0 flex-1 text-justify">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={planHref}
        className="inline-flex w-full items-center justify-center self-end rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold uppercase text-white transition-colors duration-200 hover:bg-brand-blue-vivid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        {canViewPrice ? 'Contratar' : 'Cotizar plan'}
      </Link>
    </article>
  );
}

export default async function PlanesPage() {
  const [session, trainingPlans] = await Promise.all([auth(), getTrainingPlans()]);
  const canViewPrice = Boolean(session?.user?.id && session.user.isActive);

  return (
    <>
      <section className="relative overflow-hidden pt-20">
        <div className="relative h-[350px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas Theia en entrenamiento de running y triatlón" fill className="object-cover" sizes="100vw" preload />
          <div className="absolute inset-0 theia-hero-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Planes de entrenamiento</h1>
              <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">Entrenamiento de running y triatlon para objetivos reales</p>
            </div>
          </div>
        </div>
      </section>

      {planCategories.map((category, index) => {
        const plans = trainingPlans.filter((plan) => plan.category === category.id);
        return (
          <section
            key={category.id}
            className={`section-padding ${index % 2 === 0 ? 'bg-bg-warm' : 'bg-white'}`}
          >
            <div className="w-full px-6 sm:px-8 lg:px-12">
              <div className="mb-8 text-center sm:mb-12">
                <p className="mb-3 text-xs font-bold tracking-[0.45em] text-brand-navy sm:text-sm">THEIA</p>
                <h2 className="text-4xl font-bold text-black sm:text-5xl lg:text-6xl">{category.title}</h2>
              </div>

              {plans.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} canViewPrice={canViewPrice} />
                  ))}
                </div>
              ) : (
                <EmptyState>
                  No hay planes publicados en esta categoria.
                </EmptyState>
              )}

              {index === 0 && (
                <div className="mt-10 rounded-[1.6rem] bg-brand-navy px-6 py-7 text-white shadow-xl shadow-brand-blue/20 sm:px-8 lg:px-10">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <h2 className="mb-2 text-2xl font-black">¿No sabes qué plan elegir?</h2>
                      <p className="max-w-3xl text-sm leading-relaxed text-white/75">
                        Te orientamos según tu nivel, tiempo disponible y carrera objetivo.
                      </p>
                    </div>
                    <Button variant="white" href="/contacto">
                      Pedir orientación
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
