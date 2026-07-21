import { readUploadedImage } from '@/lib/uploads';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  { params }: RouteContext<'/api/uploads/[folder]/[fileName]'>,
) {
  const { folder, fileName } = await params;
  const image = await readUploadedImage([folder, fileName]);

  if (!image) {
    return new Response(null, { status: 404 });
  }

  return new Response(image.file, {
    headers: {
      'Content-Type': image.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
