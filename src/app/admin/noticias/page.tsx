import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import NewsPinButton from '@/components/admin/NewsPinButton';
import ContentActions from '@/components/admin/ContentActions';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import NewsForm from '@/components/admin/NewsForm';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import { createNewsPost, deleteNewsPost, updateNewsPost, setNewsPostPinned } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Noticias',
};

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ guardado?: string; eliminado?: string }>;
}) {
  await requireAdmin('/admin/noticias');
  const params = await searchParams;
  const posts = await prisma.newsPost.findMany({
    orderBy: [{ pinned: 'desc' }, { sortOrder: 'asc' }, { date: 'desc' }],
    include: { results: { orderBy: { sortOrder: 'asc' } } },
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
        <div className="overflow-hidden">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Noticias existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {posts.map((post) => (
              <div key={post.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <NewsPinButton pinned={post.pinned} title={post.title} action={setNewsPostPinned.bind(null, post.id, !post.pinned)} />
                    <h3 className="font-bold text-text-primary">{post.title}</h3>
                    <span className="rounded-full bg-brand-blue-pale px-2 py-0.5 text-xs font-semibold text-brand-blue">{{ RESULTADOS: 'Resultados', NOTICIAS: 'Noticias', ENTRENAMIENTO: 'Entrenamiento', COMUNIDAD: 'Comunidad' }[post.category]}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{post.date.toLocaleDateString('es-CL')}</p>
                </div>
                <ContentActions name={post.title} title="Editar noticia" deleteAction={deleteNewsPost.bind(null, post.id)}>
                  <NewsForm action={updateNewsPost.bind(null, post.id)} post={post} athleteOptions={athletes.map((athlete) => athlete.name)} submitLabel="Guardar cambios" />
                </ContentActions>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
