'use client';

import { useState } from 'react';
import AdminForm from '@/components/admin/AdminForm';
import type { NewsPost, NewsResult } from '@/generated/prisma';
import { deleteIconButtonClass, TrashIcon } from './AdminActionIcons';
import NewsImageGalleryField from '@/components/admin/NewsImageGalleryField';
import { getNewsImages } from '@/lib/news-images';

type EditableNewsPost = NewsPost & { results?: NewsResult[] };

type ResultRow = {
  key: string;
  athleteName: string;
  position: string;
  distance: string;
  time: string;
};

interface NewsFormProps {
  action: (formData: FormData) => Promise<void>;
  post?: EditableNewsPost;
  submitLabel: string;
  athleteOptions: string[];
}

const fieldClasses = 'w-full rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl';

function emptyResult(): ResultRow {
  return { key: `${Date.now()}-${Math.random()}`, athleteName: '', position: '', distance: '', time: '' };
}

export default function NewsForm({ action, post, submitLabel, athleteOptions }: NewsFormProps) {
  const date = post?.date ? post.date.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  const [category, setCategory] = useState(post?.category ?? 'NOTICIAS');
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<ResultRow[]>(
    post?.results?.map((result) => ({
      key: result.id,
      athleteName: result.athleteName,
      position: result.position,
      distance: result.distance,
      time: result.time,
    })) ?? [],
  );

  function updateResult(key: string, field: 'athleteName' | 'position' | 'distance' | 'time', value: string) {
    setResults((current) => current.map((row) => (row.key === key ? { ...row, [field]: value } : row)));
  }

  return (
    <AdminForm action={action} submitLabel={submitLabel} busy={uploading}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-text-primary">Título</label>
          <input name="title" defaultValue={post?.title} className={fieldClasses} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Fecha</label>
          <input name="date" type="date" defaultValue={date} className={fieldClasses} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-text-primary">Categoría</label>
          <select
            name="category"
            value={category}
            onChange={(event) => {
              const nextCategory = event.target.value as typeof category;
              setCategory(nextCategory);
              if (nextCategory === 'RESULTADOS' && results.length === 0) setResults([emptyResult()]);
            }}
            className={fieldClasses}
          >
            <option value="RESULTADOS">Resultados</option>
            <option value="NOTICIAS">Noticias</option>
            <option value="ENTRENAMIENTO">Entrenamiento</option>
            <option value="COMUNIDAD">Comunidad</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <NewsImageGalleryField defaultImages={post ? getNewsImages(post) : []} onBusyChange={setUploading} />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripción</label>
        <textarea name="excerpt" defaultValue={post?.excerpt} className={`${fieldClasses} min-h-28`} required />
      </div>

      {category === 'RESULTADOS' && (
        <section className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-text-primary">Resultados de atletas</h3>
            </div>
            <button
              type="button"
              onClick={() => setResults((current) => [...current, emptyResult()])}
              className="rounded-lg border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
            >
              Agregar atleta
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {results.map((result, index) => (
              <div key={result.key} className="grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_auto] md:items-end">
                <div className="col-span-2 min-w-0 md:col-span-1">
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">Atleta</label>
                  <select
                    name="resultAthlete"
                    value={result.athleteName}
                    onChange={(event) => updateResult(result.key, 'athleteName', event.target.value)}
                    className={fieldClasses}
                    required
                  >
                    <option value="" disabled>Selecciona un atleta</option>
                    {athleteOptions.map((name) => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">Posición</label>
                  <input name="resultPosition" value={result.position} onChange={(event) => updateResult(result.key, 'position', event.target.value)} className={fieldClasses} placeholder="Ej: 1°" required />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">Distancia</label>
                  <input name="resultDistance" value={result.distance} onChange={(event) => updateResult(result.key, 'distance', event.target.value)} className={fieldClasses} placeholder="Ej: 10 km" required />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">Tiempo</label>
                  <input name="resultTime" value={result.time} onChange={(event) => updateResult(result.key, 'time', event.target.value)} className={fieldClasses} placeholder="Ej: 01:24:35" required />
                </div>
                <button
                  type="button"
                  onClick={() => setResults((current) => current.filter((row) => row.key !== result.key))}
                  className={`${deleteIconButtonClass} self-end justify-self-end`}
                  aria-label={`Quitar resultado ${index + 1}`}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </AdminForm>
  );
}
