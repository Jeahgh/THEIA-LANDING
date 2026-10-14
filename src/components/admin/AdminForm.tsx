'use client';

import { type FormEvent, type ReactNode, useState, useTransition } from 'react';
import { unstable_rethrow } from 'next/navigation';
import { useAdminModal } from './AdminModal';

export function AdminFormHeading({ children }: { children: ReactNode }) {
  const modal = useAdminModal();
  return modal ? null : children;
}

export default function AdminForm({ action, submitLabel, children }: { action: (formData: FormData) => Promise<void>; submitLabel: string; children: ReactNode }) {
  const modal = useAdminModal();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    if (!modal) return;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set('_dialog', 'on');
    setError('');
    modal.setBusy(true);
    startTransition(async () => {
      try {
        await action(data);
        modal.onClose();
      } catch (cause) {
        unstable_rethrow(cause);
        setError('No se pudieron guardar los cambios. Revisa los datos e inténtalo de nuevo.');
      } finally {
        modal.setBusy(false);
      }
    });
  }

  return <form action={action} onSubmit={modal ? submit : undefined} className={modal ? '' : 'rounded-lg p-4 theia-card-glow sm:rounded-2xl sm:p-6'} aria-busy={pending}>
    <fieldset disabled={pending} className="min-w-0">{children}</fieldset>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    <footer className={`mt-6 flex gap-3 ${modal ? 'justify-end' : ''}`}>
      {modal && <button type="button" disabled={pending} onClick={modal.onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60 sm:flex-none">Cancelar</button>}
      <button type="submit" disabled={pending} className="flex-1 rounded-xl bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-vivid disabled:cursor-wait disabled:opacity-60 sm:flex-none">{pending ? 'Guardando…' : submitLabel}</button>
    </footer>
  </form>;
}
