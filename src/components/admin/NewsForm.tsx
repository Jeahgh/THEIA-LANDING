import type { NewsPost } from '@prisma/client';
import ImageUploadField from '@/components/admin/ImageUploadField';

interface NewsFormProps {
  action: (formData: FormData) => Promise<void>;
  post?: NewsPost;
  submitLabel: string;
}

export default function NewsForm({ action, post, submitLabel }: NewsFormProps) {
  const date = post?.date ? post.date.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="rounded-lg border border-border-subtle bg-white p-4 shadow-lg shadow-brand-blue/8 sm:rounded-2xl sm:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-text-primary">Titulo</label>
          <input name="title" defaultValue={post?.title} className="w-full rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Fecha</label>
          <input name="date" type="date" defaultValue={date} className="w-full rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Categoria</label>
          <select name="category" defaultValue={post?.category ?? 'NOTICIAS'} className="w-full rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl">
            <option value="RESULTADOS">Resultados</option>
            <option value="NOTICIAS">Noticias</option>
            <option value="ENTRENAMIENTO">Entrenamiento</option>
            <option value="COMUNIDAD">Comunidad</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <ImageUploadField
            name="imageUrl"
            label="Imagen de la noticia"
            folder="news"
            defaultValue={post?.imageUrl ?? ''}
            helper="Puedes subir una imagen desde tu PC. Si la noticia no necesita imagen, puedes dejar este campo vacio."
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripcion</label>
        <textarea name="excerpt" defaultValue={post?.excerpt} className="min-h-28 w-full rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" required />
      </div>

      <button className="mt-6 w-full rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-colors hover:bg-brand-blue-vivid sm:w-auto sm:rounded-xl">
        {submitLabel}
      </button>
    </form>
  );
}
