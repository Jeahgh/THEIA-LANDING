'use client';

import { createContext, type ReactNode, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';

type ModalContext = { onClose: () => void; setBusy: (busy: boolean) => void };
const Context = createContext<ModalContext | null>(null);
export const useAdminModal = () => useContext(Context);

export default function AdminModal({ title, onClose, children, compact = false }: { title: string; onClose: () => void; children: ReactNode; compact?: boolean }) {
  const titleId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const context = useMemo(() => ({ onClose, setBusy }), [onClose]);

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus();
    };
  }, []);

  return <dialog ref={ref} aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget && !busy) onClose(); }} className={`fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] ${compact ? 'max-w-md' : 'max-w-3xl'} overflow-y-auto overscroll-contain rounded-2xl border-0 bg-white p-0 text-left text-text-primary shadow-2xl backdrop:bg-slate-950/55 backdrop:backdrop-blur-sm`}>
    <Context.Provider value={context}>
      <div className="p-5 sm:p-7">
        <header className="mb-6 flex items-start justify-between gap-4"><h2 id={titleId} className="text-2xl font-bold text-brand-navy">{title}</h2><button type="button" aria-label={`Cerrar ${title.toLowerCase()}`} disabled={busy} onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 hover:bg-slate-200 disabled:opacity-40">×</button></header>
        {children}
      </div>
    </Context.Provider>
  </dialog>;
}
