import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import AvatarUpload from '@/components/profile/AvatarUpload';
import { requestEmailVerification, updatePassword, updateProfile } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Mi perfil',
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; error?: string; passwordUpdated?: string; passwordError?: string; verification?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/perfil');
  }

  const [params, user] = await Promise.all([
    searchParams,
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        image: true,
        phone: true,
        emailVerified: true,
        passwordHash: true,
        createdAt: true,
      },
    }),
  ]);

  if (!user) redirect('/login');

  return (
    <section className="theia-light-section min-h-screen px-6 pb-16 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="accent-line mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">Mi perfil</h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="h-fit rounded-2xl p-6 theia-card-glow">
            <AvatarUpload image={user.image} name={user.name} />

            <div className="mt-8 border-t border-border-subtle pt-6">
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">Email</dt>
                  <dd className="font-semibold text-text-primary">{user.email}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">Verificacion email</dt>
                  <dd className={user.emailVerified ? 'font-semibold text-brand-blue' : 'font-semibold text-brand-navy'}>
                    {user.emailVerified ? 'Verificado' : 'Pendiente'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">Miembro desde</dt>
                  <dd className="font-semibold text-text-primary">{user.createdAt.toLocaleDateString('es-CL')}</dd>
                </div>
              </dl>
              {!user.emailVerified && (
                <form action={requestEmailVerification} className="mt-5">
                  <button className="w-full rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-vivid">
                    Enviar verificacion por email
                  </button>
                </form>
              )}
              {params.verification === 'sent' && <p className="mt-4 rounded-xl bg-brand-blue-pale px-4 py-3 text-sm text-brand-blue">Te enviamos un enlace para verificar tu cuenta.</p>}
              {params.verification === 'dev' && <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">Enlace generado en modo local. Revisalo en la consola del servidor.</p>}
              {params.verification === 'verified' && <p className="mt-4 rounded-xl bg-brand-blue-pale px-4 py-3 text-sm text-brand-blue">Cuenta verificada correctamente.</p>}
              {params.verification === 'expired' && <p className="mt-4 rounded-xl bg-bg-section px-4 py-3 text-sm text-brand-navy">El enlace vencio. Puedes solicitar uno nuevo.</p>}
              {(params.verification === 'invalid' || params.verification === 'send-error' || params.verification === 'error') && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">No pudimos validar el correo. Intentalo nuevamente.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl p-6 theia-card-glow sm:p-8">
            <form action={updateProfile}>
              <h2 className="text-2xl font-bold text-text-primary">Datos personales</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
                  <input id="name" name="name" defaultValue={user.name ?? ''} className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" required />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-text-primary">Telefono</label>
                  <input id="phone" name="phone" defaultValue={user.phone ?? ''} className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" placeholder="+56 9..." />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="mb-1 block text-sm font-semibold text-text-primary">Email</label>
                  <input id="email" value={user.email ?? ''} className="w-full rounded-xl border border-border-subtle bg-gray-50 px-4 py-3 text-text-muted" disabled />
                  <p className="mt-2 text-xs text-text-muted">El cambio de email requiere verificacion y queda reservado para la siguiente etapa.</p>
                </div>
              </div>

              {params.updated && <p className="mt-5 rounded-xl bg-brand-blue-pale px-4 py-3 text-sm text-brand-blue">Perfil actualizado.</p>}
              {params.error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Revisa los datos ingresados.</p>}

              <button className="mt-7 rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-vivid">
                Guardar datos
              </button>
            </form>

            <div className="my-8 border-t border-border-subtle" />

            <form action={updatePassword}>
              <div className="space-y-5">
                {user.passwordHash && (
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-text-primary">Contrasena actual</label>
                    <input name="currentPassword" type="password" className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" />
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-text-primary">Nueva contrasena</label>
                  <input name="newPassword" type="password" minLength={8} className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-text-primary">Confirmar nueva contrasena</label>
                  <input name="confirmPassword" type="password" minLength={8} className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" required />
                </div>
              </div>

              {params.passwordUpdated && <p className="mt-5 rounded-xl bg-brand-blue-pale px-4 py-3 text-sm text-brand-blue">Contrasena actualizada.</p>}
              {params.passwordError && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">No pudimos cambiar la contrasena. Revisa los datos.</p>}

              <button className="mt-7 rounded-xl border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition-all hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white">
                Cambiar contrasena
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
