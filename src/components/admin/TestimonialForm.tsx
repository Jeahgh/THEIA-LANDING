import type { Testimonial } from '@/generated/prisma';
import AdminToggle from '@/components/admin/AdminToggle';
import AdminForm, { AdminFormHeading } from '@/components/admin/AdminForm';
import ImageUploadField from '@/components/admin/ImageUploadField';

interface TestimonialFormProps {
  action: (formData: FormData) => Promise<void>;
  testimonial?: Testimonial;
  submitLabel: string;
}

const fieldClasses =
  'w-full rounded-lg border border-border-subtle bg-white px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10';

export default function TestimonialForm({ action, testimonial, submitLabel }: TestimonialFormProps) {
  return (
    <AdminForm action={action} submitLabel={submitLabel}>
      <AdminFormHeading><div className="mb-5">
        <h2 className="text-lg font-bold text-text-primary">
          {testimonial ? 'Editar atleta' : 'Nuevo atleta'}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          La foto y experiencia del atleta se muestran en la página de inicio.
        </p>
      </div></AdminFormHeading>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input
            name="name"
            defaultValue={testimonial?.name}
            className={fieldClasses}
            placeholder="Nombre del atleta"
            required
          />
        </div>
        <div>
          <ImageUploadField
            name="imageUrl"
            label="Foto del atleta"
            folder="testimonials"
            defaultValue={testimonial?.imageUrl ?? ''}
            helper="Puedes subir una foto. Si no hay foto, se mostrara la inicial del nombre."
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Testimonio</label>
        <textarea
          name="quote"
          defaultValue={testimonial?.quote}
          className={`${fieldClasses} min-h-32 resize-y`}
          placeholder="Cuenta brevemente su experiencia entrenando con Theia."
          required
        />
      </div>

      <AdminToggle name="isActive" label="Mostrar atleta en la web" defaultChecked={testimonial?.isActive ?? true} />

    </AdminForm>
  );
}
