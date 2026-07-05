import type { Plan, PlanFeature } from '@prisma/client';

type EditablePlan = Plan & {
  features?: Pick<PlanFeature, 'text' | 'sortOrder'>[];
};

interface PlanFormProps {
  action: (formData: FormData) => Promise<void>;
  plan?: EditablePlan;
  submitLabel: string;
}

const fieldClasses =
  'w-full rounded-lg border border-border-subtle bg-white px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10';

export default function PlanForm({ action, plan, submitLabel }: PlanFormProps) {
  const featureValue =
    plan?.features
      ?.slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((feature) => feature.text)
      .join('\n') ?? '';

  return (
    <form action={action} className="rounded-lg p-4 theia-card-glow sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-text-primary">{plan ? 'Editar plan' : 'Nuevo plan'}</h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          Completa los datos principales del plan. El orden, estado y enlace interno se manejan automaticamente.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input name="name" defaultValue={plan?.name} className={fieldClasses} placeholder="Plan Running Base" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Categoria</label>
          <select name="category" defaultValue={plan?.category ?? 'RUNNING'} className={fieldClasses}>
            <option value="RUNNING">Running</option>
            <option value="TRIATLON">Triatlon</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Modalidad</label>
          <input name="modality" defaultValue={plan?.modality} className={fieldClasses} placeholder="Online, presencial, mensual..." required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Precio CLP</label>
          <div className="flex rounded-lg border border-border-subtle bg-white focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/10">
            <span className="flex items-center border-r border-border-subtle px-4 text-sm font-bold text-text-secondary">CLP</span>
            <input
              name="price"
              defaultValue={plan?.price ? plan.price.toLocaleString('es-CL') : ''}
              inputMode="numeric"
              className="w-full rounded-r-lg px-4 py-3 text-text-primary outline-none placeholder:text-text-muted"
              placeholder="45.000"
              required
            />
          </div>
          <p className="mt-1.5 text-xs text-text-muted">Ingresa el valor en pesos chilenos, sin decimales.</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripcion</label>
        <textarea
          name="excerpt"
          defaultValue={plan?.excerpt}
          className={`${fieldClasses} min-h-28 resize-y`}
          placeholder="Describe para quien es el plan, que incluye y que objetivo ayuda a lograr."
          required
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Ideal para</label>
        <textarea
          name="idealFor"
          defaultValue={plan?.idealFor ?? ''}
          className={`${fieldClasses} min-h-24 resize-y`}
          placeholder="Ej: Deportistas que quieren preparar una carrera objetivo con seguimiento cercano."
          required
        />
        <p className="mt-1.5 text-xs text-text-muted">Este texto aparece en la tarjeta publica del plan.</p>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Caracteristicas</label>
        <textarea
          name="features"
          defaultValue={featureValue}
          className={`${fieldClasses} min-h-36 resize-y font-mono text-sm leading-relaxed`}
          placeholder={'Planificacion personalizada\nFeedback semanal\nEvaluaciones periodicas'}
          required
        />
        <p className="mt-1.5 text-xs text-text-muted">Escribe una caracteristica por linea.</p>
      </div>

      <button className="mt-6 w-full rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-colors hover:bg-brand-blue-vivid sm:w-auto">
        {submitLabel}
      </button>
    </form>
  );
}
