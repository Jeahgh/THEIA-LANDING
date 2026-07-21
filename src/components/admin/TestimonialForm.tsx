import type { Testimonial } from '@/generated/prisma';
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
    <form action={action} className="rounded-lg p-4 theia-card-glow sm:rounded-2xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-text-primary">
          {testimonial ? 'Editar testimonio' : 'Nuevo testimonio'}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          Estos textos se muestran en la seccion de testimonios de la pagina de inicio.
        </p>
      </div>

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

      <label className="mt-5 flex items-center gap-2 text-sm font-semibold text-text-primary">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={testimonial?.isActive ?? true}
          className="h-4 w-4 rounded border-border-subtle text-brand-blue"
        />
        Mostrar testimonio en la web
      </label>

      <button className="mt-6 w-full rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-colors hover:bg-brand-blue-vivid sm:w-auto sm:rounded-xl">
        {submitLabel}
      </button>
    </form>
  );
}
