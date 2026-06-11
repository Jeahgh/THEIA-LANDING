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
    title: 'Triatlón',
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

const getShortPlanName = (name: string) => name.replace(/^Plan\s+/i, '');

const getPlanLevel = (plan: TrainingPlan) => {
  const key = `${plan.id} ${plan.name} ${plan.modality}`.toLowerCase();

  if (key.includes('pro') || key.includes('rendimiento')) return 'Nivel competitivo';
  if (key.includes('plus') || key.includes('mixto')) return 'Nivel avanzado';
  if (key.includes('presencial')) return 'Nivel intermedio';
  return 'Nivel inicial';
};

const getIdealFor = (plan: TrainingPlan) => {
  const key = `${plan.id} ${plan.name} ${plan.modality}`.toLowerCase();

  if (key.includes('pro') || key.includes('rendimiento')) return 'Objetivos exigentes y calendario competitivo.';
  if (key.includes('plus') || key.includes('mixto')) return 'Deportistas que buscan seguimiento más cercano.';
  if (key.includes('presencial')) return 'Quienes quieren técnica, grupo y guía presencial.';
  return 'Atletas autónomos que necesitan estructura.';
};

const isRecommendedPlan = (plan: TrainingPlan) =>
  Boolean(plan.highlighted) || plan.id.toLowerCase().includes('plus') || plan.modality.toLowerCase().includes('mixto');

function PlanCard({ plan, canViewPrice }: { plan: TrainingPlan; canViewPrice: boolean }) {
  const visibleFeatures = plan.features.slice(0, 3);
  const recommended = isRecommendedPlan(plan);

  return (
    <article
      className={`group relative flex h-full min-h-[410px] flex-col rounded-[1.6rem] border bg-white p-5 shadow-lg shadow-brand-navy/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-navy/15 sm:p-6 ${
        recommended ? 'border-brand-blue-vivid ring-1 ring-brand-blue-vivid/30' : 'border-brand-navy/10'
      }`}
      style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
    >
      {recommended && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-brand-navy px-4 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-navy/25">
          Recomendado
        </span>
      )}

      <div className="flex flex-1 flex-col">
        <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-brand-navy">
          {getShortPlanName(plan.name)}
        </h3>

        <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-brand-blue-vivid">{getPlanLevel(plan)}</p>

        <p className="mt-5 text-sm leading-relaxed text-text-secondary">{plan.excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-navy px-3 py-1 text-[11px] font-bold text-white">Mensual</span>
          <span className="rounded-full border border-brand-navy/15 bg-brand-navy/5 px-3 py-1 text-[11px] font-bold text-brand-navy">
            {plan.modality}
          </span>
        </div>

        <div className="mt-5">
          {canViewPrice ? (
            <p className="text-[2rem] font-black leading-none tracking-[-0.06em] text-brand-blue-vivid sm:text-[2.25rem]">
              {getPriceLabel(plan.price)}
              <span className="ml-1 text-sm font-bold tracking-normal text-text-secondary">/mes</span>
            </p>
          ) : (
            <p className="rounded-2xl bg-brand-blue-pale px-4 py-3 text-sm font-bold text-brand-navy">
              Inicia sesión para ver precio
            </p>
          )}
        </div>

        {visibleFeatures.length > 0 && (
          <ul className="mt-6 divide-y divide-brand-navy/10 text-sm text-text-secondary">
            {visibleFeatures.map((feature) => (
              <li key={feature} className="flex gap-3 py-3">
                <span className="mt-0.5 text-brand-blue-vivid">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <p className="mb-4 rounded-2xl bg-brand-navy/5 px-4 py-3 text-xs leading-relaxed text-text-secondary">
            <span className="font-black text-brand-navy">Ideal para:</span> {getIdealFor(plan)}
          </p>
          {canViewPrice ? (
            <a
              href={getWhatsAppHref(plan.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-navy px-5 py-3 text-sm font-black uppercase tracking-tight text-white shadow-md shadow-brand-navy/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-vivid hover:shadow-lg hover:shadow-brand-blue/30"
            >
              Contratar
            </a>
          ) : (
            <Button
              variant="primary"
              size="sm"
              href={`/login?callbackUrl=${encodeURIComponent('/planes')}`}
              className="w-full rounded-full py-3 font-black uppercase tracking-tight"
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
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
          <Image src="/images/atletas-collage.jpg" alt="Atletas Theia en accion" fill className="object-cover" priority />
          <div className="absolute inset-0 theia-hero-overlay" />
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
                ? 'theia-light-section'
                : 'theia-light-section'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(10,132,255,0.10),transparent_35%),radial-gradient(circle_at_82%_70%,rgba(88,178,255,0.12),transparent_38%)]" />
            <div className="relative w-full px-6 sm:px-8 lg:px-12">
              <SectionTitle title={category.title} gradient />

              {plans.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} canViewPrice={canViewPrice} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl p-10 text-center text-text-secondary theia-card-glow">
                  No hay planes publicados en esta categoria.
                </div>
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
