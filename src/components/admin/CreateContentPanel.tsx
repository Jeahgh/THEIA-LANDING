'use client';

import { type ReactNode, useCallback, useState } from 'react';
import AdminModal from './AdminModal';

export default function CreateContentPanel({
  children,
  closedLabel,
  title = closedLabel,
}: {
  children: ReactNode;
  closedLabel: string;
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closePanel = useCallback(() => setIsOpen(false), []);


  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full rounded-lg border border-emerald-700 bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:border-emerald-800 hover:bg-emerald-800 sm:w-auto"
        >
          {closedLabel}
        </button>
      </div>

      {isOpen && <AdminModal title={title} onClose={closePanel}>{children}</AdminModal>}
    </div>
  );
}
