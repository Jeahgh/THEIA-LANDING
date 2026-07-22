const CALLBACK_ORIGIN = 'https://theia.local';

export function getSafeCallbackUrl(
  value: string | null | undefined,
  fallback = '/planes',
): string {
  if (!value || !value.startsWith('/')) return fallback;

  try {
    const candidate = new URL(value, CALLBACK_ORIGIN);

    if (candidate.origin !== CALLBACK_ORIGIN) return fallback;

    return `${candidate.pathname}${candidate.search}${candidate.hash}`;
  } catch {
    return fallback;
  }
}
