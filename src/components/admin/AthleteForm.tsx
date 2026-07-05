import type { Athlete } from '@prisma/client';
import ImageUploadField from '@/components/admin/ImageUploadField';

interface AthleteFormProps {
  action: (formData: FormData) => Promise<void>;
  athlete?: Athlete;
  submitLabel: string;
}

const fieldClasses =
  'w-full rounded-lg border border-border-subtle bg-white px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10';

export default function AthleteForm({ action, athlete, submitLabel }: AthleteFormProps) {
  const achievementsValue = athlete?.achievements.join('\n') ?? '';

  return (
    <form action={action} className="rounded-lg p-4 theia-card-glow sm:rounded-2xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-text-primary">{athlete ? 'Editar atleta' : 'Nuevo atleta'}</h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          Estos atletas se muestran en la pagina de inicio y en la seccion Equipo Theia.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input name="name" defaultValue={athlete?.name} className={fieldClasses} placeholder="Nombre del atleta" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Rol o especialidad</label>
          <input name="role" defaultValue={athlete?.role} className={fieldClasses} placeholder="Triatleta, Runner, Elite..." required />
        </div>
        <div className="md:col-span-2">
          <ImageUploadField
            name="imageUrl"
            label="Foto del atleta"
            folder="athletes"
            defaultValue={athlete?.imageUrl ?? ''}
            helper="Puedes subir una foto del atleta. Si no hay foto, se mostrara la inicial."
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripcion</label>
        <textarea
          name="bio"
          defaultValue={athlete?.bio}
          className={`${fieldClasses} min-h-28 resize-y`}
          placeholder="Describe su proceso, disciplina principal, objetivos o logro destacado."
          required
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Logros o etiquetas</label>
        <textarea
          name="achievements"
          defaultValue={achievementsValue}
          className={`${fieldClasses} min-h-28 resize-y font-mono text-sm leading-relaxed`}
          placeholder={'Ironman 70.3\nMaraton\nSeleccion regional'}
        />
        <p className="mt-1.5 text-xs text-text-muted">Escribe un logro o etiqueta por linea.</p>
      </div>

      <label className="mt-5 flex items-center gap-2 text-sm font-semibold text-text-primary">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={athlete?.isActive ?? true}
          className="h-4 w-4 rounded border-border-subtle text-brand-blue"
        />
        Mostrar atleta en la web
      </label>

      <button className="mt-6 w-full rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-colors hover:bg-brand-blue-vivid sm:w-auto sm:rounded-xl">
        {submitLabel}
      </button>
    </form>
  );
}
