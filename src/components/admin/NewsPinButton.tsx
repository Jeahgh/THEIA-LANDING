'use client';

import { useState, useTransition } from 'react';
import { unstable_rethrow } from 'next/navigation';
import { PinIcon } from './AdminActionIcons';

export default function NewsPinButton({ pinned, title, action }: { pinned: boolean; title: string; action: () => Promise<void> }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function togglePin() {
    setError('');
    startTransition(async () => {
      try { await action(); }
      catch (cause) {
        unstable_rethrow(cause);
        setError('No se pudo cambiar la noticia fijada. Inténtalo de nuevo.');
      }
    });
  }

  return <div className="shrink-0">
    <button type="button" aria-label={pinned ? `Desfijar ${title}` : `Fijar ${title} en Inicio`} aria-pressed={pinned} disabled={pending} onClick={togglePin} title={pinned ? 'Quitar de Inicio' : 'Fijar en Inicio'} className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 disabled:cursor-wait disabled:opacity-50 ${pinned ? 'bg-slate-100 text-slate-950' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}>
      <PinIcon filled={pinned} />
    </button>
    {error && <span role="alert" className="mt-1 block max-w-48 text-xs text-red-600">{error}</span>}
  </div>;
}
