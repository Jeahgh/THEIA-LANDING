'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import type { Role } from '@/generated/prisma';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';

interface UserControlsProps {
  name: string;
  role: Role;
  isActive: boolean;
  isCurrentUser: boolean;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: () => Promise<void>;
}

function UserSettings({ name, role, isActive }: Pick<UserControlsProps, 'name' | 'role' | 'isActive'>) {
  const [enabled, setEnabled] = useState(isActive);
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="flex flex-wrap items-center justify-end gap-3 disabled:opacity-60">
      <select
        name="role"
        defaultValue={role}
        aria-label={`Rol de ${name}`}
        className="rounded-lg border border-border-subtle bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 sm:rounded-xl"
      >
        <option value="MEMBER">Miembro</option>
        <option value="COACH">Coach</option>
        <option value="ADMIN">Admin</option>
      </select>
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-text-primary">
        <input
          name="isActive"
          type="checkbox"
          role="switch"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
          aria-label={`Habilitar cuenta de ${name}`}
          className="peer sr-only"
        />
        <span aria-hidden="true" className="relative h-6 w-11 shrink-0 rounded-full bg-slate-300 transition-colors after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-brand-blue peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2" />
        <span>{enabled ? 'Habilitado' : 'Deshabilitado'}</span>
      </label>
      <button type="submit" className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-vivid disabled:cursor-wait sm:rounded-xl">
        {pending ? 'Guardando…' : 'Guardar'}
      </button>
    </fieldset>
  );
}

export default function UserControls({ name, role, isActive, isCurrentUser, updateAction, deleteAction }: UserControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <form action={updateAction}>
        <UserSettings name={name} role={role} isActive={isActive} />
      </form>
      {isCurrentUser ? (
        <span className="text-xs font-semibold text-text-muted">Tu cuenta</span>
      ) : (
        <ConfirmDeleteButton action={deleteAction} itemName={`al usuario "${name}"`}>
          Borrar
        </ConfirmDeleteButton>
      )}
    </div>
  );
}
