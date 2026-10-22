'use client';

import { type FormEvent, useCallback, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { unstable_rethrow } from 'next/navigation';
import AdminModal, { useAdminModal } from './AdminModal';
import ToastMessage from '@/components/ui/ToastMessage';
import type { CreateUserResult } from '@/lib/admin-user-types';

type CreateUserAction = (formData: FormData) => Promise<CreateUserResult>;
const fieldClass = 'w-full rounded-xl border border-border-subtle bg-white px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10';

function CreateUserForm({ action, onCreated }: { action: CreateUserAction; onCreated: (result: CreateUserResult) => void }) {
  const modal = useAdminModal();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError('');
    modal?.setBusy(true);
    startTransition(async () => {
      try {
        const result = await action(data);
        if (result.created) onCreated(result);
        else setError(result.error ?? 'No se pudo crear el usuario.');
      } catch (cause) {
        unstable_rethrow(cause);
        setError('No se pudo crear el usuario. Inténtalo nuevamente.');
      } finally {
        modal?.setBusy(false);
      }
    });
  }

  return <form onSubmit={submit} aria-busy={pending}>
    <fieldset disabled={pending} className="grid min-w-0 gap-4">
      <label className="block text-sm">Nombre<input name="name" autoComplete="name" minLength={2} maxLength={80} required className={`${fieldClass} mt-1.5`} /></label>
      <label className="block text-sm">Correo<input name="email" type="email" autoComplete="email" maxLength={254} required className={`${fieldClass} mt-1.5`} /></label>
      <label className="block text-sm">Teléfono de contacto<input name="phone" type="tel" autoComplete="tel" maxLength={40} className={`${fieldClass} mt-1.5`} /></label>
      <label className="block text-sm">Rol<select name="role" defaultValue="MEMBER" className={`${fieldClass} mt-1.5`}><option value="MEMBER">Miembro</option><option value="COACH">Coach</option><option value="ADMIN">Admin</option></select></label>
    </fieldset>
    <p className="mt-4 text-sm leading-relaxed text-text-secondary">Recibirá un correo para establecer su contraseña.</p>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    <footer className="mt-6 flex gap-3">
      <button type="button" disabled={pending} onClick={modal?.onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60">Cancelar</button>
      <button type="submit" disabled={pending} className="flex-1 rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue-vivid disabled:opacity-60">{pending ? 'Creando…' : 'Crear usuario'}</button>
    </footer>
  </form>;
}

export default function CreateUserPanel({ action }: { action: CreateUserAction }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<CreateUserResult | null>(null);
  const router = useRouter();
  const close = useCallback(() => setOpen(false), []);
  const onCreated = useCallback((created: CreateUserResult) => {
    setResult(created);
    setOpen(false);
    router.refresh();
  }, [router]);

  return <div>
    <div className="flex justify-end"><button type="button" onClick={() => { setResult(null); setOpen(true); }} className="w-full rounded-lg border border-emerald-700 bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-emerald-800 hover:bg-emerald-800 sm:w-auto">Crear usuario</button></div>
    {open && <AdminModal title="Crear usuario" onClose={close} compact><CreateUserForm action={action} onCreated={onCreated} /></AdminModal>}
    {result?.message && <ToastMessage message={result.message} tone={result.tone ?? 'success'} />}
  </div>;
}
