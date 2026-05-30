'use client';

import { useId, useRef, useState } from 'react';

interface ImageUploadFieldProps {
  name: string;
  label: string;
  folder?: string;
  defaultValue?: string | null;
  helper?: string;
}

export default function ImageUploadField({
  name,
  label,
  folder = 'home',
  defaultValue,
  helper,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue ?? '');
  const [preview, setPreview] = useState(defaultValue ?? '');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [isUploading, setIsUploading] = useState(false);

  async function uploadImage(file: File) {
    setIsUploading(true);
    setStatusType('success');
    setStatus('Subiendo imagen...');

    const body = new FormData();
    body.append('file', file);
    body.append('folder', folder);

    const response = await fetch('/api/admin/uploads', {
      method: 'POST',
      body,
    });

    const data = (await response.json()) as { success?: boolean; imageUrl?: string; message?: string };

    if (!response.ok || !data.success || !data.imageUrl) {
      throw new Error(data.message ?? 'No se pudo subir la imagen.');
    }

    setValue(data.imageUrl);
    setPreview(data.imageUrl);
    setStatusType('success');
    setStatus('Imagen cargada correctamente.');
  }

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>
      <input name={name} type="hidden" value={value} />

      <div className="grid grid-cols-[132px_1fr] gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-[160px_1fr] sm:gap-4 sm:p-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 text-left transition-colors hover:border-brand-blue hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
          aria-label={preview ? 'Cambiar imagen' : 'Cargar imagen'}
        >
          {preview ? (
            <>
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url("${preview}")` }}
                aria-label="Vista previa de imagen"
              />
              <span className="absolute inset-x-2 bottom-2 rounded-md bg-slate-950/80 px-2 py-1.5 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                Cambiar foto
              </span>
            </>
          ) : (
            <span className="px-3 text-center text-xs font-semibold leading-relaxed text-slate-500">
              Cargar foto
            </span>
          )}
        </button>

        <div className="flex flex-col justify-center">
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;

              try {
                await uploadImage(file);
              } catch (error) {
                setStatusType('error');
                setStatus(error instanceof Error ? error.message : 'No se pudo subir la imagen.');
              } finally {
                setIsUploading(false);
                event.target.value = '';
              }
            }}
          />

          <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
            {isUploading ? 'Subiendo la imagen...' : helper ?? 'Haz clic en el recuadro para cargar una imagen.'}
          </p>
          {status && (
            <p className={`mt-2 text-sm font-semibold ${statusType === 'error' ? 'text-red-700' : 'text-green-700'}`}>
              {status}
            </p>
          )}
          {value && <p className="mt-2 hidden break-all text-xs text-slate-400 sm:block">{value}</p>}
        </div>
      </div>
    </div>
  );
}
