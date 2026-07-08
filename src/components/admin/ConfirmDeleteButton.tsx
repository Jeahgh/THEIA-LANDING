'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';
import { useDismissableLayer } from '@/hooks/useDismissableLayer';

interface ConfirmDeleteButtonProps {
  action?: () => Promise<void>;
  onConfirm?: () => void;
  itemName?: string;
  children?: ReactNode;
  className?: string;
}

export default function ConfirmDeleteButton({
  action,
  onConfirm,
  itemName = 'este elemento',
  children = 'Eliminar',
  className = 'w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 sm:w-auto',
}: ConfirmDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  useDismissableLayer({
    enabled: isOpen,
    refs: [dialogRef],
    onDismiss: closeDialog,
  });

  function confirmClientAction() {
    onConfirm?.();
    setIsOpen(false);
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-6">
          <div ref={dialogRef} className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl shadow-slate-950/20">
            <h2 className="text-lg font-bold text-slate-900">Confirmar eliminacion</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              ¿Seguro que quieres eliminar {itemName}? Esta accion no se puede deshacer.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Cancelar
              </button>

              {action ? (
                <form action={action}>
                  <button className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                    Eliminar
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={confirmClientAction}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
