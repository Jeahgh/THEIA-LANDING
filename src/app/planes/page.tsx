import type { Metadata } from 'next';
import Image from 'next/image';
import { auth } from '@/auth';
import { SOCIAL_LINKS } from '@/lib/constants';
import { getTrainingPlans } from '@/lib/training-plans';
import type { TrainingPlan } from '@/types';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Planes',
  description: 'Planes de running y triatlon de Theia Triathlon Performance, con modalidad online, presencial, plus y pro.',
};

const planCategories = [
  {
    id: 'running',
    title: 'Running',
  },
  {
    id: 'triatlon',
    title: 'Triatlon',
  },
] as const;

const getWhatsAppHref = (planName: string) => {
  const whatsappUrl = SOCIAL_LINKS.find((social) => social.platform === 'whatsapp')?.url ?? '/contacto';
  if (!whatsappUrl.startsWith('https://wa.me/')) return '/contacto';

  const [baseUrl] = whatsappUrl.split('?');
  const message = encodeURIComponent(`Hola! Quiero mas informacion sobre el ${planName}.`);
  return `${baseUrl}?text=${message}`;
};

const getPriceLabel = (price: string) => {
  if (price.toUpperCase().startsWith('CLP')) return price;
  return price.replace(/^\$\s*/, 'CLP ');
};

function PlanCard({ plan, canViewPrice }: { plan: TrainingPlan; canViewPrice: boolean }) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-lg shadow-brand-blue/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue/14"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-blue-pale">
        {plan.imageUrl ? (
          <>
            <Image
              src={plan.imageUrl}
              alt={plan.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-blue-pale via-bg-section to-white px-6 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-brand-blue/70">
              {plan.category === 'running' ? 'Running' : 'Triatlon'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-w-0 text-xl font-bold leading-tight text-text-primary">{plan.name}</h3>
          {canViewPrice && (
            <span className="shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-slate-700">
              {getPriceLabel(plan.price)}
            </span>
          )}
        </div>

        <div className="mt-3 mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-blue-pale px-3 py-1 text-xs font-semibold text-brand-blue">
            {plan.modality}
          </span>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-text-secondary">{plan.excerpt}</p>

        <div className="mt-auto flex justify-center">
          {canViewPrice ? (
            <a
              href={getWhatsAppHref(plan.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-56 items-center justify-center rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-vivid hover:shadow-lg hover:shadow-brand-blue/30"
            >
              Consultar plan
            </a>
          ) : (
            <Button
              variant="primary"
              size="sm"
              href={`/login?callbackUrl=${encodeURIComponent('/planes')}`}
              className="w-full max-w-64 py-3"
            >
              Iniciar sesion o crear cuenta
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function PlanesPage() {
  const [session, trainingPlans] = await Promise.all([auth(), getTrainingPlans()]);
  const canViewPrice = Boolean(session?.user);

  return (
    <>
      <section className="relative overflow-hidden pt-20">
        <div className="relative h-[350px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas Theia en accion" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/70 via-brand-blue/50 to-bg-warm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="accent-line mx-auto mb-6" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Planes</h1>
              <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">Entrenamiento de running y triatlon para objetivos reales</p>
            </div>
          </div>
        </div>
      </section>

      {planCategories.map((category, index) => {
        const plans = trainingPlans.filter((plan) => plan.category === category.id);
        const isTriathlon = category.id === 'triatlon';

        return (
          <section
            key={category.id}
            className={`section-padding relative overflow-hidden ${
              isTriathlon
                ? 'bg-gradient-to-br from-brand-blue-pale via-bg-section to-white'
                : 'bg-gradient-to-br from-white via-bg-warm to-run-light/60'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_82%_70%,rgba(16,185,129,0.08),transparent_38%)]" />
            <div className="relative w-full px-6 sm:px-8 lg:px-12">
              <SectionTitle title={category.title} gradient />

              {plans.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} canViewPrice={canViewPrice} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border-subtle bg-white p-10 text-center text-text-secondary shadow-lg shadow-brand-blue/8">
                  No hay planes publicados en esta categoria.
                </div>
              )}

              {index === 0 && (
                <div className="mt-12 rounded-2xl bg-brand-navy px-6 py-8 text-white shadow-xl shadow-brand-blue/20 sm:px-8 lg:px-10">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold">No sabes que plan elegir?</h2>
                      <p className="max-w-3xl text-white/75">
                        Podemos ayudarte a decidir segun tu experiencia, tiempo disponible y carrera objetivo. La idea es entrenar fuerte, pero tambien entrenar con sentido.
                      </p>
                    </div>
                    <Button variant="white" href="/contacto">
                      Pedir orientacion
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
