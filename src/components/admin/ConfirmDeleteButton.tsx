'use client';

import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import AdminModal, { useAdminModal } from './AdminModal';

interface ConfirmDeleteButtonProps {
  action?: () => Promise<void>;
  onConfirm?: () => void;
  itemName?: string;
  children?: ReactNode;
  className?: string;
}

function DeleteControls({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus();
  const modal = useAdminModal();
  useEffect(() => { modal?.setBusy(pending); }, [modal, pending]);
  return <div className="mt-6 grid grid-cols-2 gap-3"><button type="button" disabled={pending} onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-60">Cancelar</button><button type="submit" disabled={pending} className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60">{pending ? 'Eliminando…' : 'Eliminar'}</button></div>;
}

export default function ConfirmDeleteButton({
  action,
  onConfirm,
  itemName = 'este elemento',
  children = 'Eliminar',
  className = 'w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 sm:w-auto',
}: ConfirmDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  function confirmClientAction() {
    onConfirm?.();
    setIsOpen(false);
  }

  return <>
    <button type="button" onClick={() => setIsOpen(true)} className={className}>{children}</button>
    {isOpen && <AdminModal title="Confirmar eliminación" onClose={closeDialog} compact>
      <p className="text-sm leading-relaxed text-slate-600">¿Seguro que quieres eliminar {itemName}? Esta acción no se puede deshacer.</p>
      {action ? <form action={action}><DeleteControls onCancel={closeDialog} /></form> : <div className="mt-6 grid grid-cols-2 gap-3">
        <button type="button" onClick={closeDialog} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">Cancelar</button>
        <button type="button" onClick={confirmClientAction} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700">Eliminar</button>
      </div>}
    </AdminModal>}
  </>;
}
