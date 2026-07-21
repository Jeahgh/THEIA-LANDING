'use client';

import { useState } from 'react';
import type { NewsPost, NewsResult } from '@/generated/prisma';
import ImageUploadField from '@/components/admin/ImageUploadField';

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
    <form action={action} className="rounded-lg p-4 theia-card-glow sm:rounded-2xl sm:p-6">
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
          <ImageUploadField
            name="imageUrl"
            label="Imagen de la noticia"
            folder="news"
            defaultValue={post?.imageUrl ?? ''}
            helper="Puedes subir una imagen desde tu PC. Si la noticia no necesita imagen, puedes dejar este campo vacío."
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold text-text-primary">Descripción</label>
        <textarea name="excerpt" defaultValue={post?.excerpt} className={`${fieldClasses} min-h-28`} required />
      </div>

      {category === 'RESULTADOS' && (
        <section className="mt-6 rounded-xl border border-brand-blue/15 bg-brand-blue-pale/45 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-text-primary">Resultados de atletas</h3>
              <p className="text-sm text-text-muted">Agrega una fila por cada atleta que participó.</p>
            </div>
            <button
              type="button"
              onClick={() => setResults((current) => [...current, emptyResult()])}
              className="rounded-lg border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
            >
              Agregar atleta
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {results.map((result, index) => (
              <div key={result.key} className="grid grid-cols-1 gap-3 rounded-xl border border-brand-blue/10 bg-white/75 p-3 md:grid-cols-[1fr_0.5fr_0.6fr_0.65fr_auto] md:items-end">
                <div>
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
                  className="rounded-lg border border-red-200 px-3 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  aria-label={`Quitar resultado ${index + 1}`}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <button className="mt-6 w-full rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-colors hover:bg-brand-blue-vivid sm:w-auto sm:rounded-xl">
        {submitLabel}
      </button>
    </form>
  );
}
