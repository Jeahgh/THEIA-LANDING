export function getSafeExternalHttpsUrl(value: unknown) {
  const rawValue = String(value ?? '').trim();
  if (!rawValue) return null;

  try {
    const url = new URL(rawValue);

    if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
