'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { LocationSuggestion } from '@/lib/google-places';

export default function LocationSearchField({ defaultValue = '', googleEnabled = false, className }: {
  defaultValue?: string;
  googleEnabled?: boolean;
  className: string;
}) {
  const id = useId();
  const listId = `${id}-suggestions`;
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [highlighted, setHighlighted] = useState(-1);
  const [loadingQuery, setLoadingQuery] = useState('');
  const [result, setResult] = useState<{ query: string; suggestions: LocationSuggestion[]; message?: string } | null>(null);
  const query = value.trim();
  const suggestions = result?.query === query ? result.suggestions : [];
  const showSuggestions = focused && value !== selectedValue && suggestions.length > 0;
  const message = focused && result?.query === query ? result.message : undefined;

  useEffect(() => {
    if (!googleEnabled || !focused || query.length < 3 || query.length > 200 || value === selectedValue) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoadingQuery(query);
      try {
        const response = await fetch('/api/admin/locations', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }), signal: controller.signal,
        });
        const data = await response.json() as { suggestions?: LocationSuggestion[]; message?: string };
        if (controller.signal.aborted) return;
        setResult({ query, suggestions: response.ok ? data.suggestions ?? [] : [], message: response.ok ? undefined : data.message ?? 'No pudimos consultar Google. Puedes escribir la ubicación.' });
      } catch {
        if (!controller.signal.aborted) setResult({ query, suggestions: [], message: 'No pudimos consultar Google. Puedes escribir la ubicación.' });
      } finally {
        if (!controller.signal.aborted) setLoadingQuery('');
      }
    }, 350);
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [googleEnabled, focused, query, value, selectedValue]);

  function select(suggestion: LocationSuggestion) {
    setValue(suggestion.label);
    setSelectedValue(suggestion.label);
    setHighlighted(-1);
    input.current?.focus();
  }

  return <div onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold text-text-primary">Ubicación</label>
    <div className="relative">
      <input ref={input} id={id} name="location" value={value} required maxLength={500} autoComplete="off" placeholder="Ciudad, recinto o dirección" className={className}
        role="combobox" aria-autocomplete="list" aria-expanded={showSuggestions} aria-controls={showSuggestions ? listId : undefined}
        aria-activedescendant={showSuggestions && highlighted >= 0 ? `${listId}-${highlighted}` : undefined}
        aria-describedby={!googleEnabled || message ? `${id}-help` : undefined}
        onFocus={() => setFocused(true)}
        onChange={(event) => { setValue(event.target.value); setSelectedValue(''); setHighlighted(-1); setFocused(true); }}
        onKeyDown={(event) => {
          if (!showSuggestions) return;
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlighted((current) => event.key === 'ArrowDown' ? (current + 1) % suggestions.length : (current <= 0 ? suggestions.length : current) - 1);
          } else if (event.key === 'Enter' && highlighted >= 0) {
            event.preventDefault(); select(suggestions[highlighted]);
          } else if (event.key === 'Escape') {
            event.preventDefault(); event.stopPropagation(); setFocused(false);
          }
        }} />
      {showSuggestions && <div className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <ul id={listId} role="listbox" aria-label="Ubicaciones sugeridas por Google" className="max-h-60 overflow-y-auto overscroll-contain">
          {suggestions.map((suggestion, index) => <li role="presentation" key={suggestion.id}>
            <button id={`${listId}-${index}`} type="button" role="option" aria-selected={highlighted === index} tabIndex={-1}
              onClick={() => select(suggestion)} onMouseEnter={() => setHighlighted(index)}
              className={`w-full break-words px-4 py-3 text-left text-sm text-text-primary hover:bg-slate-100 ${highlighted === index ? 'bg-slate-100' : ''}`}>{suggestion.label}</button>
          </li>)}
        </ul>
        <div className="border-t border-slate-100 px-4 py-2 text-right"><span translate="no" className="whitespace-nowrap font-sans text-xs font-normal not-italic tracking-normal text-[#5E5E5E]">Google Maps</span></div>
      </div>}
    </div>
    {!googleEnabled && <p id={`${id}-help`} className="mt-1.5 text-xs text-text-secondary">Puedes escribir la ubicación. Las sugerencias de Google están pendientes de activar.</p>}
    {message && <p id={`${id}-help`} role="status" className="mt-1.5 text-xs text-text-secondary">{message}</p>}
    {focused && googleEnabled && loadingQuery === query && <p role="status" className="mt-1.5 text-xs text-text-secondary">Buscando ubicaciones…</p>}
  </div>;
}
