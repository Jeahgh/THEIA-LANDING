import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Noticias',
};

export default async function AdminNewsPage() {
  const session = await auth();

  if (!session?.user) redirect('/login?callbackUrl=/admin/noticias');
  if (session.user.role !== 'ADMIN') redirect('/');

  return (
    <section className="min-h-screen bg-bg-warm px-6 pb-16 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border-subtle bg-white p-8 shadow-lg shadow-brand-blue/8">
        <div className="accent-line mb-6" />
        <h1 className="text-3xl font-bold text-text-primary">Administrar noticias</h1>
        <p className="mt-3 text-text-secondary">
          La base de datos ya tiene modelos para noticias editables. El siguiente paso es conectar esta vista con formularios CRUD.
        </p>
      </div>
    </section>
  );
}
