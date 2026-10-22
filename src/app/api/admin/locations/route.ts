import { getCurrentUser } from '@/lib/authz';
import { InvalidJsonBodyError, readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/http-body';
import { consumeRateLimit } from '@/lib/rate-limit';
import { searchGoogleLocations } from '@/lib/google-places';

export const runtime = 'nodejs';

function json(body: object, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store', ...headers } });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return json({ message: 'No autorizado.' }, 401);
  if (user.role !== 'ADMIN') return json({ message: 'No autorizado.' }, 403);
  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return json({ message: 'La búsqueda debe enviarse como JSON.' }, 415);
  }
  try {
    const body = await readJsonBodyWithLimit(request, 2048);
    if (typeof body.query !== 'string' || body.query.trim().length > 200) return json({ message: 'La búsqueda no es válida.' }, 400);
    const query = body.query.trim();
    if (query.length < 3) return json({ suggestions: [] });
    const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
    if (!apiKey) return json({ configured: false, message: 'Las sugerencias de Google aún no están activadas. Puedes escribir la ubicación.' }, 503);
    const limit = consumeRateLimit({ scope: 'admin-location-search', identifiers: [user.id], limit: 60, windowMs: 60 * 1000 });
    if (!limit.allowed) return json({ message: 'Espera un momento antes de buscar otra ubicación.' }, 429, { 'Retry-After': String(limit.retryAfterSeconds) });
    const suggestions = await searchGoogleLocations(query, apiKey);
    return json({ suggestions });
  } catch (cause) {
    if (cause instanceof RequestBodyTooLargeError) return json({ message: 'La búsqueda es demasiado larga.' }, 413);
    if (cause instanceof InvalidJsonBodyError) return json({ message: 'La búsqueda no es válida.' }, 400);
    return json({ message: 'No pudimos consultar Google. Puedes escribir la ubicación.' }, 503);
  }
}
