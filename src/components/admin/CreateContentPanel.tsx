'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';
import { useDismissableLayer } from '@/hooks/useDismissableLayer';

export default function CreateContentPanel({
  children,
  closedLabel,
  openLabel = 'Cerrar formulario',
}: {
  children: ReactNode;
  closedLabel: string;
  openLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closePanel = useCallback(() => setIsOpen(false), []);

  useDismissableLayer({
    enabled: isOpen,
    refs: [panelRef],
    onDismiss: closePanel,
  });

  return (
    <div ref={panelRef} className="grid gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="w-full rounded-lg border border-emerald-700 bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:border-emerald-800 hover:bg-emerald-800 sm:w-auto"
        >
          {isOpen ? openLabel : closedLabel}
        </button>
      </div>

      {isOpen && children}
    </div>
  );
}
