import type { Race } from '@/generated/prisma';

interface RaceFormProps {
  action: (formData: FormData) => Promise<void>;
  race?: Race;
  submitLabel: string;
}

const fieldClasses = 'w-full rounded-lg border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 sm:rounded-xl';

export default function RaceForm({ action, race, submitLabel }: RaceFormProps) {
  const date = race?.date.toISOString().slice(0, 10) ?? '';

  return (
    <form action={action} className="rounded-lg p-4 theia-card-glow sm:rounded-2xl sm:p-6">
      <h2 className="text-lg font-bold text-text-primary sm:text-xl">{race ? 'Editar competencia' : 'Nueva competencia'}</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input name="name" defaultValue={race?.name} placeholder="Nombre de la competencia" className={fieldClasses} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Ubicación</label>
          <input name="location" defaultValue={race?.location} placeholder="Ciudad, recinto o dirección" className={fieldClasses} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Fecha</label>
          <input name="date" type="date" defaultValue={date} className={fieldClasses} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Distancia</label>
          <input name="distance" defaultValue={race?.distance ?? ''} placeholder="Ej: 51.50 km" className={fieldClasses} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Tipo</label>
          <select name="type" defaultValue={race?.type ?? 'TRIATLON'} className={fieldClasses}>
            <option value="TRIATLON">Triatlón</option>
            <option value="DUATLON">Duatlón</option>
            <option value="ACUATLON">Acuatlón</option>
            <option value="RUNNING">Running</option>
            <option value="CICLISMO">Ciclismo</option>
            <option value="NATACION">Natación</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Estado</label>
          <select name="status" defaultValue={race?.status ?? 'UPCOMING'} className={fieldClasses}>
            <option value="UPCOMING">Próximamente</option>
            <option value="REGISTRATION_OPEN">Inscripciones abiertas</option>
            <option value="REGISTRATION_CLOSED">Inscripciones cerradas</option>
            <option value="FINISHED">Finalizada</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-text-primary">Enlace de inscripción</label>
          <input name="registrationUrl" type="url" defaultValue={race?.registrationUrl ?? ''} placeholder="https://..." className={fieldClasses} />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripción</label>
        <textarea name="description" defaultValue={race?.description ?? ''} placeholder="Información importante sobre la competencia" className={`${fieldClasses} min-h-28 resize-y`} />
      </div>
      <label className="mt-5 flex items-center gap-2 text-sm font-semibold text-text-primary">
        <input name="isActive" type="checkbox" defaultChecked={race?.isActive ?? true} className="h-4 w-4 rounded border-border-subtle text-brand-blue" />
        Mostrar competencia en la web
      </label>
      <button className="mt-6 w-full rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-vivid sm:w-auto sm:rounded-xl">
        {submitLabel}
      </button>
    </form>
  );
}
