import type { Athlete } from '@/generated/prisma';
import AdminToggle from '@/components/admin/AdminToggle';
import AdminForm, { AdminFormHeading } from '@/components/admin/AdminForm';
import ImageUploadField from '@/components/admin/ImageUploadField';

interface AthleteFormProps {
  action: (formData: FormData) => Promise<void>;
  athlete?: Athlete;
  submitLabel: string;
}

const fieldClasses =
  'w-full rounded-lg border border-border-subtle bg-white px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10';

export default function AthleteForm({ action, athlete, submitLabel }: AthleteFormProps) {
  return (
    <AdminForm action={action} submitLabel={submitLabel}>
      <AdminFormHeading><div className="mb-5">
        <h2 className="text-lg font-bold text-text-primary">{athlete ? 'Editar integrante' : 'Nuevo integrante'}</h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          Cada integrante se muestra con su fotografía, rol y descripción en el Equipo Theia.
        </p>
      </div></AdminFormHeading>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input name="name" defaultValue={athlete?.name} className={fieldClasses} placeholder="Nombre del integrante" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Rol</label>
          <select name="role" defaultValue={athlete?.role === 'Entrenador' ? 'Entrenador' : 'Atleta'} className={fieldClasses} required>
            <option value="Atleta">Atleta</option>
            <option value="Entrenador">Entrenador</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <ImageUploadField
            name="imageUrl"
            label="Foto del integrante"
            folder="athletes"
            defaultValue={athlete?.imageUrl ?? ''}
            helper="Puedes subir una foto del integrante. Si no hay foto, se mostrará la inicial."
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripción del integrante</label>
        <textarea
          name="bio"
          defaultValue={athlete?.bio}
          className={`${fieldClasses} min-h-28 resize-y`}
          placeholder="Describe brevemente su experiencia, función o relación con el equipo."
          required
        />
      </div>

      <AdminToggle name="isActive" label="Mostrar integrante en la web" defaultChecked={athlete?.isActive ?? true} />

    </AdminForm>
  );
}
