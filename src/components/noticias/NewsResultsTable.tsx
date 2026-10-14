import type { NewsResult } from '@/types';

export default function NewsResultsTable({ title, results }: { title: string; results: NewsResult[] }) {
  if (!results.length) return null;

  return (
    <section aria-labelledby="resultados-heading" className="mt-10">
      <h2 id="resultados-heading" className="text-2xl font-bold text-brand-navy">Resultados de atletas</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption className="sr-only">Resultados asociados a {title}</caption>
          <thead className="border-b border-slate-300/70 text-xs uppercase tracking-wide text-text-muted">
            <tr>
              <th scope="col" className="pb-3 pr-5 font-semibold">Posición</th>
              <th scope="col" className="pb-3 pr-5 font-semibold">Atleta</th>
              <th scope="col" className="pb-3 pr-5 font-semibold">Distancia</th>
              <th scope="col" className="pb-3 text-right font-semibold">Tiempo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {results.map((result) => (
              <tr key={result.id}>
                <td className="py-5 pr-5 font-bold tabular-nums text-brand-navy">{result.position}</td>
                <td className="py-5 pr-5 font-semibold text-brand-navy">{result.athleteName}</td>
                <td className="py-5 pr-5 text-text-secondary">{result.distance}</td>
                <td className="whitespace-nowrap py-5 text-right tabular-nums text-text-secondary">{result.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
