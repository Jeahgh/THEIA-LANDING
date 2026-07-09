import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const ENV_KEYS = [
  'DATABASE_URL',
  'AUTH_SECRET',
  'AUTH_URL',
  'NEXT_PUBLIC_APP_URL',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
] as const;

function hasEnv(name: string) {
  return Boolean(process.env[name]?.trim());
}

function getErrorName(error: unknown) {
  if (error instanceof Error) {
    return error.name;
  }

  return 'UnknownError';
}

function getErrorCode(error: unknown) {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === 'string' ? code : null;
  }

  return null;
}

export async function GET() {
  const env = Object.fromEntries(ENV_KEYS.map((key) => [key, hasEnv(key)]));

  try {
    await prisma.$queryRawUnsafe('SELECT 1');

    return Response.json({
      ok: true,
      env,
      db: { ok: true },
      runtime: {
        nodeEnv: process.env.NODE_ENV ?? null,
      },
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        env,
        db: {
          ok: false,
          errorName: getErrorName(error),
          errorCode: getErrorCode(error),
        },
        runtime: {
          nodeEnv: process.env.NODE_ENV ?? null,
        },
      },
      { status: 500 },
    );
  }
}
