import { createHash, randomBytes } from 'crypto';

export function createVerificationToken() {
  return randomBytes(32).toString('hex');
}

export function hashVerificationToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function getEmailVerificationIdentifier(email: string) {
  return `email-verification:${email.toLowerCase().trim()}`;
}

export async function sendVerificationEmail({
  to,
  name,
  verificationUrl,
}: {
  to: string;
  name?: string | null;
  verificationUrl: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? 'Theia <onboarding@resend.dev>';
  const displayName = name?.trim() || 'deportista';

  if (!apiKey) {
    console.info(`[email-verification] Enlace para ${to}: ${verificationUrl}`);
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: 'Verifica tu cuenta Theia',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h1 style="margin:0 0 12px">Verifica tu cuenta</h1>
          <p>Hola ${displayName}, confirma tu correo para activar tu cuenta en Theia.</p>
          <p>
            <a href="${verificationUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:700">
              Verificar cuenta
            </a>
          </p>
          <p style="font-size:13px;color:#64748b">Este enlace vence en 24 horas.</p>
        </div>
      `,
      text: `Hola ${displayName}, verifica tu cuenta en Theia: ${verificationUrl}`,
    }),
  });

  if (!response.ok) {
    console.error('[email-verification] Error enviando email:', await response.text());
    throw new Error('email_send_failed');
  }

  return true;
}
