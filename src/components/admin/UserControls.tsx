'use client';

import Image from 'next/image';
import AdminToggle from '@/components/admin/AdminToggle';
import { useActionState, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EditableUser, UserActionState } from '@/lib/admin-user-types';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import { adminIconButtonClass, editIconButtonClass, deleteIconButtonClass, PencilIcon, TrashIcon } from './AdminActionIcons';

interface UserControlsProps {
  user: EditableUser;
  isCurrentUser: boolean;
  updateAction: (previous: UserActionState, formData: FormData) => Promise<UserActionState>;
  recoveryAction: (previous: UserActionState) => Promise<UserActionState>;
  deleteAction: () => Promise<void>;
}

const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';


function ActionMessage({ state }: { state: UserActionState }) {
  if (!state.error && !state.success) return null;
  return <p role={state.error ? 'alert' : 'status'} className={`mt-3 rounded-xl px-4 py-3 text-sm ${state.error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'}`}>{state.error ?? state.success}</p>;
}

function UserEditor({ user, updateAction, recoveryAction, onClose }: Omit<UserControlsProps, 'isCurrentUser' | 'deleteAction'> & { onClose: () => void }) {
  const router = useRouter();
  const titleId = useId();
  const saveFormId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [saveState, saveAction, saving] = useActionState(updateAction, {});
  const [emailState, emailAction, sending] = useActionState(recoveryAction, {});
  const [role, setRole] = useState(user.role);
  const [enabled, setEnabled] = useState(user.isActive);
  const pending = saving || sending;
  const dirty = role !== user.role || enabled !== user.isActive;
  const displayValue = (value: string | null) => value?.trim() || '—';

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    if (saveState.success) { onClose(); router.refresh(); }
  }, [saveState.success, onClose, router]);

  return (
    <dialog ref={dialogRef} aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); if (!pending) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget && !pending) onClose(); }} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-0 text-left text-text-primary shadow-2xl backdrop:bg-slate-950/55 backdrop:backdrop-blur-sm">
      <div className="p-5 sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {user.image && <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100"><Image src={user.image} alt={user.name || 'Foto del usuario'} fill sizes="56px" className="object-cover" /></div>}
            <div><p className="text-xs font-bold uppercase tracking-widest text-text-muted">Usuarios y roles</p><h2 id={titleId} className="mt-2 text-2xl font-bold text-brand-navy">Ficha de usuario</h2></div>
          </div>
          <button type="button" aria-label="Cerrar edición de usuario" onClick={onClose} disabled={pending} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 hover:bg-slate-200 disabled:opacity-40">×</button>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div><dt className="text-xs text-text-muted">Nombre</dt><dd className="mt-1 break-words text-base font-medium text-text-primary">{displayValue(user.name)}</dd></div>
          <div><dt className="text-xs text-text-muted">Teléfono de contacto</dt><dd className="mt-1 text-base font-medium text-text-primary">{displayValue(user.phone)}</dd></div>
          <div className="sm:col-span-2"><dt className="text-xs text-text-muted">Correo</dt><dd className="mt-1 break-words text-base font-medium text-text-primary">{displayValue(user.email)}</dd></div>
          <div className="sm:col-span-2"><dt className="text-xs text-text-muted">Fecha de registro</dt><dd className="mt-1 text-sm text-text-secondary"><time dateTime={user.createdAt}>{new Date(user.createdAt).toLocaleDateString('es-CL', { timeZone: 'America/Santiago' })}</time></dd></div>
        </dl>

        <form id={saveFormId} action={saveAction} className="mt-6">
          <label className="block"><span className="mb-1.5 block text-sm font-semibold">Rol</span><select name="role" value={role} disabled={pending} onChange={(event) => setRole(event.target.value as EditableUser['role'])} className={`${fieldClass} disabled:opacity-60`}><option value="MEMBER">Miembro</option><option value="COACH">Coach</option><option value="ADMIN">Admin</option></select></label>
        </form>

        <section className="mt-5" aria-label="Gestión de contraseña">
          <h3 className="mb-2 text-sm font-semibold">Contraseña</h3>
          <form action={emailAction}>
            <button type="submit" disabled={pending || dirty || !user.isActive || !user.email} className="rounded-lg px-0 py-1 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-vivid hover:underline disabled:cursor-not-allowed disabled:opacity-50">{sending ? 'Enviando…' : 'Enviar correo de recuperación'}</button>
          </form>
          {dirty && <p className="mt-2 text-xs text-text-secondary">Guarda los cambios antes de enviar el correo.</p>}
          {!user.isActive && <p className="mt-2 text-xs text-text-secondary">Habilita y guarda la cuenta para enviar el correo.</p>}
          <ActionMessage state={emailState} />
        </section>
        <AdminToggle name="isActive" label="Cuenta habilitada" form={saveFormId} checked={enabled} disabled={pending} onChange={(event) => setEnabled(event.target.checked)} />
        <ActionMessage state={saveState} />
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={onClose} disabled={pending} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60">Cancelar</button>
          <button type="submit" form={saveFormId} disabled={pending} className="flex-1 rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-vivid disabled:cursor-wait disabled:opacity-60">{saving ? 'Guardando…' : 'Guardar cambios'}</button>
        </div>
      </div>
    </dialog>
  );
}

export default function UserControls({ user, isCurrentUser, updateAction, recoveryAction, deleteAction }: UserControlsProps) {
  const [editing, setEditing] = useState(false);
  const closeEditor = useCallback(() => setEditing(false), []);
  const name = user.name ?? user.email ?? 'Sin nombre';

  return (
    <div className="flex items-center justify-end gap-2">
      <button type="button" aria-label={`Editar usuario ${name}`} title="Ver ficha de usuario" onClick={() => setEditing(true)} className={editIconButtonClass}><PencilIcon /></button>
      {isCurrentUser ? <button type="button" disabled aria-label="No puedes borrar tu propia cuenta" title="No puedes borrar tu propia cuenta" className={`${adminIconButtonClass} border-slate-200 text-slate-400`}><TrashIcon /></button> : (
        <ConfirmDeleteButton action={deleteAction} itemName={`al usuario "${name}"`} className={deleteIconButtonClass}><span className="sr-only">Borrar usuario {name}</span><TrashIcon /></ConfirmDeleteButton>
      )}
      {editing && <UserEditor user={user} updateAction={updateAction} recoveryAction={recoveryAction} onClose={closeEditor} />}
    </div>
  );
}
