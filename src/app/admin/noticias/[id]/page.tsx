import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import NewsForm from '@/components/admin/NewsForm';
import { updateNewsPost } from '../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar noticia',
};

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Noticias</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Editar noticia</h1>
      </div>
      <NewsForm action={updateNewsPost.bind(null, post.id)} post={post} submitLabel="Guardar cambios" />
    </div>
  );
}
