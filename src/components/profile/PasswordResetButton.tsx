'use client';

import { useState, useTransition } from 'react';
import { requestProfilePasswordReset } from '@/app/perfil/actions';
import ToastMessage from '@/components/ui/ToastMessage';

export default function PasswordResetButton() {
  const [pending, startTransition] = useTransition();
  const [notice, setNotice] = useState<{ message: string; tone?: 'success' | 'error' | 'info'; key: number } | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => {
          try {
            const result = await requestProfilePasswordReset();
            setNotice((previous) => ({ ...result, key: (previous?.key ?? 0) + 1 }));
          } catch {
            setNotice((previous) => ({ message: 'No pudimos completar la solicitud. Inténtalo nuevamente.', tone: 'error', key: (previous?.key ?? 0) + 1 }));
          }
        })}
        className="rounded-xl border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition-all hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? 'Enviando correo...' : 'Cambiar contraseña'}
      </button>
      {notice && <ToastMessage key={notice.key} message={notice.message} tone={notice.tone} duration={3500} />}
    </div>
  );
}
