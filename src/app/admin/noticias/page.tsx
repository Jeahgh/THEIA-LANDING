import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import NewsForm from '@/components/admin/NewsForm';
import TimedStatusMessage from '@/components/admin/TimedStatusMessage';
import { createNewsPost, deleteNewsPost } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Noticias',
};

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ eliminado?: string }>;
}) {
  const params = await searchParams;
  const posts = await prisma.newsPost.findMany({
    orderBy: [{ sortOrder: 'asc' }, { date: 'desc' }],
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Noticias</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Noticias del club</h1>
      </div>

      <CreateContentPanel closedLabel="Crear noticia">
        <NewsForm action={createNewsPost} submitLabel="Crear noticia" />
      </CreateContentPanel>

      {params?.eliminado && <TimedStatusMessage message="Se ha borrado correctamente." />}

      <div className="overflow-hidden rounded-lg border border-border-subtle bg-white shadow-lg shadow-brand-blue/8 sm:rounded-2xl">
        <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-text-primary sm:text-xl">Noticias existentes</h2>
        </div>
        <div className="divide-y divide-border-subtle">
          {posts.length === 0 && <p className="px-4 py-5 text-text-muted sm:px-6">No hay noticias creadas.</p>}
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
    </div>
  );
}
