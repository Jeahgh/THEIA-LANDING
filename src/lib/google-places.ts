export type LocationSuggestion = { id: string; label: string };

export function readLocationSuggestions(payload: unknown): LocationSuggestion[] {
  if (!payload || typeof payload !== 'object' || !('suggestions' in payload) || !Array.isArray(payload.suggestions)) return [];
  const suggestions: LocationSuggestion[] = [];
  for (const item of payload.suggestions) {
    const prediction = item?.placePrediction;
    if (typeof prediction?.placeId !== 'string' || typeof prediction?.text?.text !== 'string') continue;
    const id = prediction.placeId.trim();
    const label = prediction.text.text.trim();
    if (!id || !label || suggestions.some((suggestion) => suggestion.id === id)) continue;
    suggestions.push({ id, label: label.slice(0, 500) });
    if (suggestions.length === 5) break;
  }
  return suggestions;
}

export async function searchGoogleLocations(query: string, apiKey: string, fetcher: typeof fetch = fetch): Promise<LocationSuggestion[]> {
  const response = await fetcher('https://places.googleapis.com/v1/places:autocomplete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.text.text',
    },
    body: JSON.stringify({ input: query, languageCode: 'es', regionCode: 'cl' }),
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('google_places_unavailable');
  return readLocationSuggestions(await response.json());
}
