import type { Metadata } from 'next';
import Link from 'next/link';
import PasswordInput from '@/components/auth/PasswordInput';
import { requestPasswordReset, resetPassword } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Recuperar contrasena',
  description: 'Solicita un enlace para restablecer tu contrasena de Theia.',
};

const inputClasses =
  'w-full rounded-lg border border-border-subtle bg-white px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 sm:rounded-xl';

export default async function RecoverPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
    token?: string;
    sent?: string;
    error?: string;
    verification?: string;
  }>;
}) {
  const params = await searchParams;
  const email = String(params.email ?? '').trim();
  const token = String(params.token ?? '').trim();
  const isResetMode = Boolean(email && token);

  return (
    <section className="theia-light-section min-h-screen px-4 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl text-center lg:text-left">
          <div className="accent-line mx-auto mb-6 lg:mx-0" />
          <h1 className="text-3xl font-bold text-text-primary sm:text-5xl">
            {isResetMode ? 'Crea una nueva contrasena' : 'Recupera tu acceso'}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:mt-5 sm:text-lg">
            {isResetMode
              ? 'Ingresa una contrasena nueva para volver a entrar a tu cuenta.'
              : 'Te enviaremos un enlace seguro para cambiar tu contrasena.'}
          </p>
        </div>

        <div className="w-full max-w-md rounded-lg p-4 theia-card-glow sm:rounded-2xl sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-text-primary">
              {isResetMode ? 'Nueva contrasena' : 'Enviar enlace'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {isResetMode
                ? 'El enlace es de un solo uso y vence automaticamente.'
                : 'Usa el mismo correo con el que creaste tu cuenta.'}
            </p>
          </div>

          {params.verification === 'verified' && isResetMode && (
            <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Correo verificado. Ahora elige tu contrasena.
            </p>
          )}

          {!isResetMode ? (
            <form action={requestPasswordReset} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold text-text-primary">
                  Email
                </label>
                <input id="email" name="email" type="email" className={inputClasses} autoComplete="email" required />
              </div>

              {params.sent && (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Si el correo existe, enviamos un enlace para cambiar la contrasena.
                </p>
              )}
              {params.error === 'email' && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Ingresa un email valido.</p>
              )}
              {params.error === 'send' && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  No pudimos enviar el correo. Revisa la configuracion de email.
                </p>
              )}
              {params.error === 'config' && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  Falta configurar la URL publica de la app.
                </p>
              )}
              {(params.error === 'invalid' || params.error === 'expired') && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  El enlace no es valido o ya vencio. Solicita uno nuevo.
                </p>
              )}

              <button className="w-full rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-vivid">
                Enviar enlace
              </button>
            </form>
          ) : (
            <form action={resetPassword} className="space-y-4">
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="token" value={token} />
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold text-text-primary">
                  Nueva contrasena
                </label>
                <PasswordInput
                  id="password"
                  name="password"
                  minLength={8}
                  className={inputClasses}
                  autoComplete="new-password"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold text-text-primary">
                  Confirmar nueva contrasena
                </label>
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  minLength={8}
                  className={inputClasses}
                  autoComplete="new-password"
                  required
                />
              </div>

              {params.error === 'password' && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  La contrasena debe tener al menos 8 caracteres y coincidir.
                </p>
              )}

              <button className="w-full rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-vivid">
                Cambiar contrasena
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-text-secondary">
            <Link href="/login" className="font-semibold text-brand-blue hover:text-brand-blue-vivid">
              Volver a iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
