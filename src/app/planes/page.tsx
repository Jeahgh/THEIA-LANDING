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
  description: 'Planes de running y triatlon de Theia Triathlon Performance, con modalidad a distancia, base, performance y pro.',
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

const getIdealFor = (plan: TrainingPlan) => {
  if (plan.idealFor?.trim()) return plan.idealFor.trim();

  const key = `${plan.id} ${plan.name} ${plan.modality}`.toLowerCase();

  if (key.includes('pro')) return 'Proyecto deportivo avanzado, temporada y competencias prioritarias.';
  if (key.includes('performance') || key.includes('plus')) return 'Marca personal, 21K/42K, 70.3, Ironman o mejora competitiva.';
  if (key.includes('base') || key.includes('presencial')) return 'Deportistas en desarrollo que quieren feedback y equipo.';
  if (key.includes('distancia')) return 'Atletas autonomos que necesitan estructura profesional.';

  if (key.includes('pro') || key.includes('rendimiento')) return 'Objetivos exigentes y calendario competitivo.';
  if (key.includes('plus') || key.includes('mixto')) return 'Deportistas que buscan seguimiento más cercano.';
  if (key.includes('presencial')) return 'Quienes quieren técnica, grupo y guía presencial.';
  return 'Atletas autónomos que necesitan estructura.';
};

const isRecommendedPlan = (plan: TrainingPlan) =>
  Boolean(plan.highlighted) ||
  plan.name.toLowerCase().includes('performance') ||
  plan.id.toLowerCase().includes('plus') ||
  plan.modality.toLowerCase().includes('mixto');

function PlanCard({ plan, canViewPrice }: { plan: TrainingPlan; canViewPrice: boolean }) {
  const visibleFeatures = plan.features.slice(0, 4);
  const recommended = isRecommendedPlan(plan);

  return (
    <article
      className={`relative flex h-full min-h-[360px] flex-col rounded-2xl border bg-white p-4 shadow-md shadow-brand-navy/6 transition-colors duration-200 sm:p-5 ${
        recommended ? 'border-brand-blue-vivid ring-1 ring-brand-blue-vivid/25' : 'border-brand-navy/10 hover:border-brand-blue/35'
      }`}
      style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
    >
      {recommended && (
        <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-brand-blue-vivid px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
          Mejor valor
        </span>
      )}

      <div className="flex flex-1 flex-col">
        <h3 className={`max-w-[13rem] text-xl font-black uppercase leading-[0.95] text-brand-navy sm:text-2xl ${recommended ? 'pr-16' : ''}`}>
          {getShortPlanName(plan.name)}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-text-secondary">{plan.excerpt}</p>

        <div className="mt-5 border-y border-brand-navy/10 py-4">
          {canViewPrice ? (
            <p className="font-sans text-[2.15rem] font-black leading-none tracking-normal text-brand-blue-vivid sm:text-[2.45rem]">
              {getPriceLabel(plan.price)}
              <span className="ml-1 text-sm font-black uppercase tracking-normal text-brand-navy/65">/mes</span>
            </p>
          ) : (
            <p className="rounded-xl bg-brand-blue-pale px-4 py-3 text-sm font-bold text-brand-navy">
              Inicia sesión para ver precio
            </p>
          )}
        </div>

        {visibleFeatures.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            {visibleFeatures.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <span className="mt-0.5 text-brand-blue-vivid">-</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5">
          <p className="mb-4 rounded-xl bg-brand-navy/5 px-4 py-3 text-xs leading-relaxed text-text-secondary">
            <span className="font-black text-brand-navy">Ideal para:</span> {getIdealFor(plan)}
          </p>
          {canViewPrice ? (
            <a
              href={getWhatsAppHref(plan.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-navy px-5 py-3 text-sm font-black uppercase tracking-tight text-white shadow-sm shadow-brand-navy/15 transition-colors duration-200 hover:bg-brand-blue-vivid"
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
        return (
          <section
            key={category.id}
            className={`section-padding ${index % 2 === 0 ? 'bg-bg-warm' : 'bg-white'}`}
          >
            <div className="w-full px-6 sm:px-8 lg:px-12">
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
