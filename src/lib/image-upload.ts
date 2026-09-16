const imageFormats = {
  'image/jpeg': { extension: 'jpg' },
  'image/png': { extension: 'png' },
  'image/webp': { extension: 'webp' },
} as const;

export class InvalidImageUploadError extends Error {
  constructor(message = 'Uploaded file is not a supported image.') {
    super(message);
    this.name = 'InvalidImageUploadError';
  }
}

function hasBytes(bytes: Uint8Array, offset: number, expected: number[]) {
  return expected.every((value, index) => bytes[offset + index] === value);
}

export function detectImageContentType(bytes: Uint8Array) {
  if (hasBytes(bytes, 0, [0xff, 0xd8, 0xff])) return 'image/jpeg' as const;

  if (hasBytes(bytes, 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return 'image/png' as const;
  }

  if (
    hasBytes(bytes, 0, [0x52, 0x49, 0x46, 0x46]) &&
    hasBytes(bytes, 8, [0x57, 0x45, 0x42, 0x50])
  ) {
    return 'image/webp' as const;
  }

  return null;
}

export function validateImageUpload(
  bytes: Uint8Array,
  claimedContentType: string,
  maxBytes: number,
) {
  if (bytes.byteLength === 0 || bytes.byteLength > maxBytes) {
    throw new InvalidImageUploadError('Uploaded image has an invalid size.');
  }

  if (!(claimedContentType in imageFormats)) {
    throw new InvalidImageUploadError();
  }

  const detectedContentType = detectImageContentType(bytes);

  if (!detectedContentType || detectedContentType !== claimedContentType) {
    throw new InvalidImageUploadError('Image signature does not match its declared type.');
  }

  return {
    bytes,
    contentType: detectedContentType,
    extension: imageFormats[detectedContentType].extension,
  };
}
