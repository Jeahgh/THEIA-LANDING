'use client';

import { useState, useTransition } from 'react';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import ImageUploadField from '@/components/admin/ImageUploadField';
import {
  createHeroSlide,
  deleteHeroSlide,
  reorderHeroSlides,
  setHeroSlideActive,
  updateHeroSlide,
} from '@/app/admin/home/actions';

export interface AdminHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  ctaText: string | null;
  ctaHref: string | null;
  buttonVariant: string;
  isActive: boolean;
  sortOrder: number;
}

type EditorMode = { type: 'create' } | { type: 'edit'; id: string } | null;

const fieldClasses =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10';

function GripIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" />
    </svg>
  );
}

function TextField({
  name,
  label,
  defaultValue,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        required={required}
        className={fieldClasses}
      />
    </div>
  );
}

function SlideFields({ slide }: { slide?: AdminHeroSlide }) {
  return (
    <div className="grid gap-4">
      <TextField
        name="title"
        label="Titulo"
        defaultValue={slide?.title}
        placeholder="Entrena con proposito. Compite con confianza."
        required
      />

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Subtitulo</label>
        <textarea
          name="subtitle"
          defaultValue={slide?.subtitle ?? ''}
          rows={4}
          placeholder="Escribe el mensaje que acompana a este slide."
          required
          className={fieldClasses}
        />
      </div>

      <ImageUploadField
        name="imageUrl"
        label="Foto del slide"
        folder="home"
        defaultValue={slide?.imageUrl}
        helper="Sube una foto horizontal desde el PC."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <TextField name="ctaText" label="Texto del boton" defaultValue={slide?.ctaText} placeholder="Unete al club" />
        <TextField name="ctaHref" label="Destino del boton" defaultValue={slide?.ctaHref} placeholder="/registro" />
      </div>

      <label className="flex w-fit items-center gap-2 text-sm font-semibold text-slate-700">
        <input name="isActive" type="checkbox" defaultChecked={slide?.isActive ?? true} className="h-4 w-4 accent-brand-blue" />
        Publicar en el inicio
      </label>
    </div>
  );
}

function SlideEditor({
  mode,
  slide,
  onClose,
}: {
  mode: Exclude<EditorMode, null>;
  slide?: AdminHeroSlide;
  onClose: () => void;
}) {
  const isEdit = mode.type === 'edit';

  if (isEdit && !slide) return null;

  const action = isEdit && slide ? updateHeroSlide.bind(null, slide.id) : createHeroSlide;

  return (
    <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-5 sm:px-5">
      <form action={action} className="grid gap-5">
        <SlideFields slide={slide} />
        <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button className="rounded-lg bg-brand-navy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-vivid">
            {isEdit ? 'Guardar cambios' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

function reorder(items: AdminHeroSlide[], fromId: string, toId: string) {
  const fromIndex = items.findIndex((item) => item.id === fromId);
  const toIndex = items.findIndex((item) => item.id === toId);

  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return items;
  }

  const nextItems = [...items];
  const [moved] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, moved);
  return nextItems;
}

export default function HeroSlidesManager({ slides }: { slides: AdminHeroSlide[] }) {
  const stateKey = slides.map((slide) => `${slide.id}:${slide.isActive}:${slide.sortOrder}`).join('|');

  return <HeroSlidesWorkspace key={stateKey} slides={slides} />;
}

function HeroSlidesWorkspace({ slides }: { slides: AdminHeroSlide[] }) {
  const [orderedSlides, setOrderedSlides] = useState(slides);
  const [editorMode, setEditorMode] = useState<EditorMode>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [isPersisting, startPersisting] = useTransition();

  function handleDrop(targetId: string) {
    if (!draggedId) return;

    const nextSlides = reorder(orderedSlides, draggedId, targetId);
    setDraggedId(null);
    setDropTargetId(null);

    if (nextSlides === orderedSlides) return;

    setOrderedSlides(nextSlides);
    startPersisting(() => {
      void reorderHeroSlides(nextSlides.map((slide) => slide.id));
    });
  }

  function toggleSlide(slideId: string, isActive: boolean) {
    setOrderedSlides((current) =>
      current.map((slide) => (slide.id === slideId ? { ...slide, isActive } : slide))
    );
    startPersisting(() => {
      void setHeroSlideActive(slideId, isActive);
    });
  }

  return (
    <div className="grid gap-5">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setEditorMode((current) => (current?.type === 'create' ? null : { type: 'create' }))}
          className="w-full rounded-lg border border-emerald-700 bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:border-emerald-800 hover:bg-emerald-800 sm:w-auto"
        >
          Agregar
        </button>
      </div>

      {editorMode?.type === 'create' && (
        <div className="overflow-hidden rounded-lg theia-card-glow">
          <SlideEditor mode={editorMode} onClose={() => setEditorMode(null)} />
        </div>
      )}

      {orderedSlides.length === 0 && (
        <div className="rounded-lg border border-dashed border-brand-blue-soft bg-white/80 p-6 text-center text-slate-500 shadow-lg shadow-brand-blue/8">
          No hay slides creados todavia.
        </div>
      )}

      <div className={`grid gap-2 pr-1 ${editorMode?.type === 'edit' ? '' : 'max-h-[56vh] overflow-y-auto'}`}>
        {orderedSlides.map((slide) => {
          const isEditing = editorMode?.type === 'edit' && editorMode.id === slide.id;
          const isDragging = draggedId === slide.id;
          const isDropTarget = dropTargetId === slide.id && draggedId !== slide.id;

          return (
            <article
              key={slide.id}
              draggable={!isPersisting}
              onDragStart={() => {
                if (isPersisting) return;
                setDraggedId(slide.id);
              }}
              onDragEnd={() => {
                setDraggedId(null);
                setDropTargetId(null);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDropTargetId(slide.id);
              }}
              onDrop={() => handleDrop(slide.id)}
              className={`overflow-hidden rounded-lg border transition-colors ${
                slide.isActive ? 'bg-white' : 'border-slate-300 bg-slate-200'
              } ${
                isDropTarget ? 'border-brand-blue ring-2 ring-brand-blue/10' : slide.isActive ? 'border-slate-200' : ''
              } ${isDragging ? 'opacity-40' : ''}`}
            >
              <div className="grid gap-3 px-4 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 cursor-grab items-center justify-center rounded-lg active:cursor-grabbing ${
                      slide.isActive ? 'text-slate-400' : 'text-slate-600'
                    }`}
                    aria-hidden="true"
                  >
                    <GripIcon />
                  </span>
                  <input
                    type="checkbox"
                    checked={slide.isActive}
                    onChange={(event) => toggleSlide(slide.id, event.currentTarget.checked)}
                    disabled={isPersisting}
                    className="h-5 w-5 cursor-pointer rounded border-slate-300 accent-brand-blue"
                    aria-label={slide.isActive ? 'Ocultar slide' : 'Publicar slide'}
                    title={slide.isActive ? 'Visible en inicio' : 'Oculto en inicio'}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setEditorMode(isEditing ? null : { type: 'edit', id: slide.id })}
                  className="min-w-0 cursor-pointer text-left"
                >
                  <h3 className={`truncate text-base font-semibold ${slide.isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                    {slide.title}
                  </h3>
                  <p className={`mt-1 line-clamp-1 text-sm ${slide.isActive ? 'text-slate-500' : 'text-slate-500'}`}>
                    {slide.subtitle}
                  </p>
                </button>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setEditorMode(isEditing ? null : { type: 'edit', id: slide.id })}
                    className="rounded-lg border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    Editar
                  </button>
                  <ConfirmDeleteButton action={deleteHeroSlide.bind(null, slide.id)} itemName={`el slide "${slide.title}"`} />
                </div>
              </div>

              {isEditing && (
                <SlideEditor mode={editorMode} slide={slide} onClose={() => setEditorMode(null)} />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
