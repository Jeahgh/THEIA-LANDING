import { createHash } from 'node:crypto';

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitEntry>;

const globalForRateLimit = globalThis as typeof globalThis & {
  theiaRateLimitStore?: RateLimitStore;
};

const store = globalForRateLimit.theiaRateLimitStore ?? new Map<string, RateLimitEntry>();
globalForRateLimit.theiaRateLimitStore = store;

function buildKey(scope: string, identifiers: string[]) {
  return createHash('sha256')
    .update([scope, ...identifiers].join('\u0000'))
    .digest('hex');
}

function compactStore(now: number) {
  if (store.size < 5_000) return;

  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }

  if (store.size >= 10_000) store.clear();
}

export function getClientAddress(headers: Pick<Headers, 'get'>) {
  const directAddress = headers.get('x-real-ip')?.trim();
  const forwardedAddress = headers
    .get('x-forwarded-for')
    ?.split(',')
    .at(-1)
    ?.trim();
  const address = directAddress || forwardedAddress || 'unknown';

  return address.slice(0, 80);
}

export function consumeRateLimit({
  scope,
  identifiers,
  limit,
  windowMs,
  now = Date.now(),
}: {
  scope: string;
  identifiers: string[];
  limit: number;
  windowMs: number;
  now?: number;
}) {
  compactStore(now);

  const key = buildKey(scope, identifiers);
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  current.count += 1;

  return {
    allowed: current.count <= limit,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
  };
}

export function clearRateLimit(scope: string, identifiers: string[]) {
  store.delete(buildKey(scope, identifiers));
}
