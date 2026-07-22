import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verificar correo',
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const params = await searchParams;
  const email = String(params.email ?? '').toLowerCase().trim();
  const token = String(params.token ?? '').trim();
  const canConfirm = Boolean(email && token);

  return (
    <section className="theia-light-section min-h-screen px-4 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32">
      <div className="mx-auto max-w-md rounded-2xl p-6 text-center theia-card-glow sm:p-8">
        <div className="accent-line mx-auto mb-5" />
        <h1 className="text-3xl font-bold text-text-primary">Confirma tu correo</h1>
        <p className="mt-3 text-text-secondary">
          {canConfirm
            ? 'Pulsa el botón para verificar tu correo y elegir tu contraseña.'
            : 'El enlace de verificación está incompleto.'}
        </p>

        {canConfirm && (
          <form action="/api/auth/verify-email" method="post" className="mt-7">
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="token" value={token} />
            <button className="w-full rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-vivid">
              Verificar y crear contraseña
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
