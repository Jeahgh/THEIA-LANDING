import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireActiveUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import PasswordResetButton from '@/components/profile/PasswordResetButton';
import AvatarUpload from '@/components/profile/AvatarUpload';
import ToastMessage from '@/components/ui/ToastMessage';
import { updateProfile } from './actions';
import { PRIVATE_ROBOTS } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Mi perfil',
  robots: PRIVATE_ROBOTS,
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; error?: string }>;
}) {
  const currentUser = await requireActiveUser('/perfil');

  const [params, user] = await Promise.all([
    searchParams,
    prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        name: true,
        email: true,
        image: true,
        phone: true,
        createdAt: true,
      },
    }),
  ]);

  if (!user) redirect('/login');

  let toast: { message: string; tone?: 'success' | 'error' | 'info' } | null = null;

  if (params.updated) {
    toast = { message: 'Perfil actualizado.' };
  } else if (params.error) {
    toast = { message: 'Revisa los datos ingresados.', tone: 'error' };
  }

  return (
    <section className="theia-light-section min-h-screen px-6 pb-16 pt-32 sm:px-8 lg:px-12">
      {toast && <ToastMessage message={toast.message} tone={toast.tone} />}
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
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
                  <dt className="text-text-muted">Miembro desde</dt>
                  <dd className="font-semibold text-text-primary">{user.createdAt.toLocaleDateString('es-CL')}</dd>
                </div>
              </dl>
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
                </div>
              </div>

              <button className="mt-7 rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-vivid">
                Guardar datos
              </button>
            </form>

            <div className="my-8 border-t border-border-subtle" />

            <PasswordResetButton />
          </div>
        </div>
      </div>
    </section>
  );
}
