'use client';

import { useEffect, useId, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { AdminFilterField } from '@/lib/admin-filters';

const fieldClasses = 'w-full min-w-0 rounded-xl border border-brand-blue/15 bg-white px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

export default function ContentFilters({ label, placeholder, fields, query, values, searchLabel = 'Buscar' }: {
  label: string;
  placeholder: string;
  fields: AdminFilterField[];
  query: string;
  values: Record<string, string>;
  searchLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(query);
  const [selected, setSelected] = useState(values);
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const activeCount = Object.values(selected).filter(Boolean).length;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef({ query, values });
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function apply(next: typeof latest.current) {
    if (timer.current) clearTimeout(timer.current);
    const params = new URLSearchParams();
    if (next.query.trim()) params.set('q', next.query.trim());
    for (const field of fields) if (next.values[field.name]) params.set(field.name, next.values[field.name]);
    startTransition(() => router.replace(`${pathname}${params.size ? `?${params}` : ''}`, { scroll: false }));
  }

  return (
    <div>
      <form role="search" aria-label={`Filtros de ${label}`} aria-busy={pending}
        onSubmit={(event) => { event.preventDefault(); apply(latest.current); }}
        className="grid grid-cols-1 items-start gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex min-w-0 items-end gap-3">
        <label className="min-w-0 flex-1">
          <span className="mb-1 block text-sm font-semibold text-text-primary">{searchLabel}</span>
          <input type="search" name="q" value={search} placeholder={placeholder} className={fieldClasses} onChange={(event) => {
            const value = event.target.value;
            setSearch(value);
            latest.current = { ...latest.current, query: value };
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => apply(latest.current), 350);
          }} />
        </label>
        <button type="button" aria-expanded={expanded} aria-controls={panelId} aria-label={expanded ? 'Ocultar filtros' : 'Mostrar filtros'}
          onClick={() => setExpanded(!expanded)}
          className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-brand-blue/15 bg-white px-3 text-sm font-semibold text-text-secondary focus-visible:outline-2 focus-visible:outline-brand-blue md:hidden">
          Filtros{activeCount > 0 && <span className="rounded-full bg-slate-100 px-1.5 text-xs text-slate-700">{activeCount}</span>}
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}><path d="m5 7.5 5 5 5-5" /></svg>
        </button>
        </div>
        <div id={panelId} className={`${expanded ? 'grid' : 'hidden'} grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:items-start`}>
        {fields.map((field) => (
          <label key={field.name} className="min-w-0 md:w-40">
            <span className="mb-1 block text-sm font-semibold text-text-primary">{field.label}</span>
            <select name={field.name} value={selected[field.name] ?? ''} className={fieldClasses} onChange={(event) => {
              const next = { ...latest.current.values, [field.name]: event.target.value };
              setSelected(next);
              latest.current = { ...latest.current, values: next };
              apply(latest.current);
            }}>
              <option value="">{field.allLabel}</option>
              {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        ))}
        </div>
      </form>
      {(search || activeCount > 0) && <div className="mt-3 text-right">
        <button type="button" className="rounded text-sm font-semibold text-brand-blue hover:text-brand-blue-vivid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue" onClick={() => {
          const empty = Object.fromEntries(fields.map((field) => [field.name, '']));
          setSearch(''); setSelected(empty);
          latest.current = { query: '', values: empty };
          apply(latest.current);
        }}>Limpiar filtros</button>
      </div>}
    </div>
  );
}
