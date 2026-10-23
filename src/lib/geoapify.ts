export type LocationSuggestion = { id: string; label: string };

export function readLocationSuggestions(payload: unknown): LocationSuggestion[] {
  if (!payload || typeof payload !== 'object' || !('results' in payload) || !Array.isArray(payload.results)) return [];
  const suggestions: LocationSuggestion[] = [];
  for (const item of payload.results) {
    if (typeof item?.place_id !== 'string' || typeof item?.formatted !== 'string') continue;
    const id = item.place_id.trim();
    const label = item.formatted.trim();
    if (!id || !label || suggestions.some((suggestion) => suggestion.id === id)) continue;
    suggestions.push({ id, label: label.slice(0, 500) });
    if (suggestions.length === 5) break;
  }
  return suggestions;
}

export async function searchGeoapifyLocations(query: string, apiKey: string, fetcher: typeof fetch = fetch): Promise<LocationSuggestion[]> {
  const url = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
  url.search = new URLSearchParams({ text: query, lang: 'es', bias: 'countrycode:cl', format: 'json', limit: '5', apiKey }).toString();
  const response = await fetcher(url.toString(), {
    headers: { Accept: 'application/json' },
    redirect: 'error',
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('geoapify_unavailable');
  return readLocationSuggestions(await response.json());
}
