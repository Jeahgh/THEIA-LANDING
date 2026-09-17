import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import { formatNewsDate, getNewsCategory } from '@/components/home/NewsCards';
import { getPublishedNewsPost } from '@/lib/news';
import {
  DEFAULT_OG_IMAGE,
  PRIVATE_ROBOTS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/lib/seo';

export const dynamic = 'force-dynamic';

type NewsPageProps = {
  params: Promise<{ id: string }>;
};

const getDescription = (text: string) =>
  text.length > 158 ? `${text.slice(0, 155).trimEnd()}...` : text;

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getPublishedNewsPost(id);

  if (!article) {
    return {
      title: 'Noticia no encontrada',
      robots: PRIVATE_ROBOTS,
    };
  }

  const path = `/noticias/${article.id}`;
  const description = getDescription(article.excerpt);
  const image = article.imageUrl ?? DEFAULT_OG_IMAGE;

  return {
    title: article.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: `${article.title} | Theia`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Theia`,
      description,
      images: [image],
    },
  };
}

export default async function NoticiaPage({ params }: NewsPageProps) {
  const { id } = await params;
  const article = await getPublishedNewsPost(id);

  if (!article) notFound();

  const category = getNewsCategory(article.category);
  const articlePath = `/noticias/${article.id}`;
  const image = article.imageUrl ?? DEFAULT_OG_IMAGE;
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteUrl(articlePath)}#article`,
    mainEntityOfPage: absoluteUrl(articlePath),
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(image),
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    inLanguage: 'es-CL',
    author: {
      '@type': 'SportsOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Noticias', item: absoluteUrl('/noticias') },
      { '@type': 'ListItem', position: 3, name: article.title, item: absoluteUrl(articlePath) },
    ],
  };

  return (
    <article className="theia-light-section min-h-screen px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
      <JsonLd data={[articleStructuredData, breadcrumbStructuredData]} />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-brand-blue">Inicio</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/noticias" className="hover:text-brand-blue">Noticias</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="line-clamp-1 text-text-secondary">{article.title}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${category.className}`}>{category.label}</span>
            <time dateTime={article.date} className="text-sm text-text-muted">{formatNewsDate(article.date)}</time>
          </div>
          <h1 className="text-3xl font-black leading-tight text-brand-navy sm:text-5xl">{article.title}</h1>
        </header>

        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-blue/10 shadow-xl shadow-brand-blue/10">
          <Image
            src={image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            preload
          />
        </div>

        <div className="rounded-2xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-brand-blue/10 sm:p-9">
          <p className="whitespace-pre-line text-base leading-8 text-text-secondary sm:text-lg">{article.excerpt}</p>

          {(article.results?.length ?? 0) > 0 && (
            <section aria-labelledby="resultados-heading" className="mt-10">
              <h2 id="resultados-heading" className="text-2xl font-bold text-brand-navy">Resultados de atletas</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-brand-blue/15">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <caption className="sr-only">Resultados asociados a {article.title}</caption>
                  <thead className="bg-brand-navy text-sm text-white">
                    <tr>
                      <th scope="col" className="px-4 py-3">Posición</th>
                      <th scope="col" className="px-4 py-3">Atleta</th>
                      <th scope="col" className="px-4 py-3">Distancia</th>
                      <th scope="col" className="px-4 py-3">Tiempo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-blue/10 bg-white/70">
                    {article.results?.map((result) => (
                      <tr key={result.id}>
                        <td className="px-4 py-3 font-bold text-brand-blue">{result.position}</td>
                        <td className="px-4 py-3 font-semibold text-brand-navy">{result.athleteName}</td>
                        <td className="px-4 py-3 text-text-secondary">{result.distance}</td>
                        <td className="px-4 py-3 text-text-secondary">{result.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>

        <div className="mt-8">
          <Link href="/noticias" className="font-semibold text-brand-blue hover:text-brand-blue-vivid">
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </article>
  );
}

