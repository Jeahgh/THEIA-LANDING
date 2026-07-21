import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import NewsForm from '@/components/admin/NewsForm';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import { createNewsPost, deleteNewsPost } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Noticias',
};

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ guardado?: string; eliminado?: string }>;
}) {
  const params = await searchParams;
  const posts = await prisma.newsPost.findMany({
    orderBy: [{ sortOrder: 'asc' }, { date: 'desc' }],
  });
  const athletes = await prisma.athlete.findMany({
    where: { isActive: true, role: 'Atleta' },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    select: { name: true },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Noticias</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Noticias del club</h1>
      </div>

      <CreateContentPanel closedLabel="Crear noticia">
        <NewsForm action={createNewsPost} submitLabel="Crear noticia" athleteOptions={athletes.map((athlete) => athlete.name)} />
      </CreateContentPanel>

      <AdminActionStatus saved={params?.guardado} deleted={params?.eliminado} />

      {posts.length === 0 ? (
        <EmptyState tone="admin">No hay noticias creadas.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-lg theia-card-glow sm:rounded-2xl">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Noticias existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {posts.map((post) => (
              <div key={post.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-text-primary">{post.title}</h3>
                    <span className="rounded-full bg-brand-blue-pale px-2 py-0.5 text-xs font-semibold text-brand-blue">{post.category}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{post.date.toLocaleDateString('es-CL')}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <Link href={`/admin/noticias/${post.id}`} className="rounded-lg border border-brand-blue px-4 py-2 text-center text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white">
                    Editar
                  </Link>
                  <ConfirmDeleteButton action={deleteNewsPost.bind(null, post.id)} itemName={`la noticia "${post.title}"`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
