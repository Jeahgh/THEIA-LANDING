'use client';

import { type ReactNode, useCallback, useState } from 'react';
import AdminModal from './AdminModal';
import ConfirmDeleteButton from './ConfirmDeleteButton';
import { deleteIconButtonClass, editIconButtonClass, PencilIcon, TrashIcon } from './AdminActionIcons';

export default function ContentActions({ name, title, deleteAction, children }: { name: string; title: string; deleteAction: () => Promise<void>; children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const close = useCallback(() => setEditing(false), []);
  return <div className="flex items-center justify-end gap-2">
    <button type="button" aria-label={`Editar ${name}`} title={title} onClick={() => setEditing(true)} className={editIconButtonClass}><PencilIcon /></button>
    <ConfirmDeleteButton action={deleteAction} itemName={`"${name}"`} className={deleteIconButtonClass}><span className="sr-only">Eliminar {name}</span><TrashIcon /></ConfirmDeleteButton>
    {editing && <AdminModal title={title} onClose={close}>{children}</AdminModal>}
  </div>;
}
