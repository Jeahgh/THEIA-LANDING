'use client';

import { useEffect, useState } from 'react';

type ToastTone = 'success' | 'error' | 'info';

const toneClasses: Record<ToastTone, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-sky-200 bg-blue-50 text-blue-700',
};

export default function ToastMessage({
  message,
  tone = 'success',
  duration = 4000,
}: {
  message: string;
  tone?: ToastTone;
  duration?: number;
}) {
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);
  const isVisible = dismissedMessage !== message;

  useEffect(() => {
    const timeout = window.setTimeout(() => setDismissedMessage(message), duration);
    return () => window.clearTimeout(timeout);
  }, [duration, message]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed right-4 top-24 z-[120] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-2xl shadow-brand-navy/15 sm:right-6 ${toneClasses[tone]}`}
      role="status"
    >
      <span className="min-w-0 flex-1 leading-relaxed">{message}</span>
      <button
        type="button"
        onClick={() => setDismissedMessage(message)}
        className="shrink-0 rounded-md px-1 text-lg leading-none opacity-60 transition-opacity hover:opacity-100"
        aria-label="Cerrar mensaje"
      >
        x
      </button>
    </div>
  );
}
