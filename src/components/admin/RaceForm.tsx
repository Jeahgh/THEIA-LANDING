import type { Race } from '@/generated/prisma';
import AdminToggle from '@/components/admin/AdminToggle';
import AdminForm, { AdminFormHeading } from '@/components/admin/AdminForm';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { getClubDate } from '@/lib/race-schedule';
import LocationSearchField from '@/components/admin/LocationSearchField';

interface RaceFormProps {
  action: (formData: FormData) => Promise<void>;
  race?: Race;
  submitLabel: string;
}

const fieldClasses = 'w-full rounded-lg border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 sm:rounded-xl';

export default function RaceForm({ action, race, submitLabel }: RaceFormProps) {
  const date = race?.date.toISOString().slice(0, 10) ?? '';

  return (
    <AdminForm action={action} submitLabel={submitLabel}>
      <AdminFormHeading><h2 className="text-lg font-bold text-text-primary sm:text-xl">{race ? 'Editar competencia' : 'Nueva competencia'}</h2></AdminFormHeading>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input name="name" defaultValue={race?.name} placeholder="Nombre de la competencia" className={fieldClasses} required />
        </div>
        <LocationSearchField defaultValue={race?.location} searchEnabled={Boolean(process.env.GEOAPIFY_API_KEY?.trim())} className={fieldClasses} />
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Fecha</label>
          <input name="date" type="date" defaultValue={date} className={fieldClasses} required />
        </div>
        <div>
          <label htmlFor="race-season" className="mb-1 block text-sm font-semibold text-text-primary">Temporada</label>
          <input id="race-season" name="season" type="number" min="1000" max="9999" step="1" defaultValue={race?.season ?? Number((date || getClubDate()).slice(0, 4))} className={fieldClasses} required />
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
        <div className="md:col-span-2">
          <label htmlFor="race-url" className="mb-1 block text-sm font-semibold text-text-primary">Enlace de la competencia</label>
          <input id="race-url" name="registrationUrl" type="url" defaultValue={race?.registrationUrl ?? ''} placeholder="https://..." className={fieldClasses} />
        </div>
      </div>
      <div className="mt-4">
        <ImageUploadField name="imageUrl" label="Imagen de la competencia" folder="competitions" defaultValue={race?.imageUrl} helper="Selecciona una imagen relacionada con esta competencia." />
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripción</label>
        <textarea name="description" defaultValue={race?.description ?? ''} placeholder="Información importante sobre la competencia" className={`${fieldClasses} min-h-28 resize-y`} />
      </div>
      <AdminToggle name="isActive" label="Mostrar competencia en la web" defaultChecked={race?.isActive ?? true} />
    </AdminForm>
  );
}
