import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Panel de administracion de Theia Triathlon Performance.',
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-bg-warm via-white to-brand-blue-pale/70 px-6 pb-16 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="accent-line mb-6" />
        <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">Panel admin</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Desde aqui se administraran noticias, planes y contenido editable. La proteccion por rol ya esta activa.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link href="/admin/noticias" className="rounded-2xl border border-border-subtle bg-white p-6 shadow-lg shadow-brand-blue/8 transition-all hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-text-primary">Noticias</h2>
            <p className="mt-3 text-text-secondary">Crear y modificar noticias que aparecen en el inicio.</p>
          </Link>
          <Link href="/admin/planes" className="rounded-2xl border border-border-subtle bg-white p-6 shadow-lg shadow-brand-blue/8 transition-all hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-text-primary">Planes</h2>
            <p className="mt-3 text-text-secondary">Crear, editar, activar y desactivar planes de entrenamiento.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
