import Link from 'next/link';

export default function NewsPagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const href = (number: number) => `${number === 1 ? '/noticias' : `/noticias?pagina=${number}`}#listado-noticias`;
  const linkClass = 'rounded-xl border border-brand-blue/20 bg-white px-4 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue';
  return (
    <nav aria-label="Paginación de noticias" className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
      {page > 1 && <Link href={href(page - 1)} rel="prev" className={linkClass}>← Anterior</Link>}
      <span aria-current="page" className="text-sm text-text-secondary">Página {page} de {totalPages}</span>
      {page < totalPages && <Link href={href(page + 1)} rel="next" className={linkClass}>Siguiente →</Link>}
    </nav>
  );
}
