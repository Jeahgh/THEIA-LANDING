export class RequestBodyTooLargeError extends Error {
  constructor() {
    super('Request body exceeds the configured limit.');
    this.name = 'RequestBodyTooLargeError';
  }
}

export class InvalidJsonBodyError extends Error {
  constructor() {
    super('Request body is not valid JSON.');
    this.name = 'InvalidJsonBodyError';
  }
}

export class InvalidFormDataBodyError extends Error {
  constructor() {
    super('Request body is not valid multipart form data.');
    this.name = 'InvalidFormDataBodyError';
  }
}

async function readBodyBytesWithLimit(
  request: Request,
  maxBytes: number,
) {
  const declaredLength = Number(request.headers.get('content-length'));

  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new RequestBodyTooLargeError();
  }

  if (!request.body) {
    return new Uint8Array(0);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytesRead = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      bytesRead += value.byteLength;
      if (bytesRead > maxBytes) {
        await reader.cancel();
        throw new RequestBodyTooLargeError();
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(bytesRead);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return bytes;
}

export async function readFormDataWithLimit(request: Request, maxBytes: number): Promise<FormData> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.split(';', 1)[0].trim().toLowerCase() !== 'multipart/form-data') {
    throw new InvalidFormDataBodyError();
  }
  // Comprueba el tamaño al recibir los datos, también sin Content-Length.
  const bytes = await readBodyBytesWithLimit(request, maxBytes);
  try {
    return await new Response(bytes, { headers: { 'Content-Type': contentType } }).formData();
  } catch {
    throw new InvalidFormDataBodyError();
  }
}

export async function readJsonBodyWithLimit(request: Request, maxBytes: number): Promise<Record<string, unknown>> {
  const bytes = await readBodyBytesWithLimit(request, maxBytes);

  try {
    const parsed = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new InvalidJsonBodyError();
    }

    return parsed as Record<string, unknown>;
  } catch (error) {
    if (error instanceof InvalidJsonBodyError) throw error;
    throw new InvalidJsonBodyError();
  }
}
