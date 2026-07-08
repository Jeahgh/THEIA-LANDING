import { createHash, randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

export function createVerificationToken() {
  return randomBytes(32).toString('hex');
}

export function hashVerificationToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function getEmailVerificationIdentifier(email: string) {
  return `email-verification:${email.toLowerCase().trim()}`;
}

export function getPasswordResetIdentifier(email: string) {
  return `password-reset:${email.toLowerCase().trim()}`;
}

export function getTrustedAppOrigin() {
  const configuredOrigin = process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL;

  if (configuredOrigin) {
    return configuredOrigin;
  }

  return process.env.NODE_ENV === 'production' ? null : 'http://localhost:3000';
}

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
  logLabel: string;
  devUrl: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, text, logLabel, devUrl, replyTo }: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? 'Theia <onboarding@resend.dev>';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT ?? '587');
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number.isFinite(smtpPort) ? smtpPort : 587,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({ from, to, subject, html, text, replyTo });
    return true;
  }

  if (apiKey) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html, text, reply_to: replyTo }),
    });

    if (!response.ok) {
      console.error(`[${logLabel}] Error enviando email:`, await response.text());
      throw new Error('email_send_failed');
    }

    return true;
  }

  console.info(`[${logLabel}] Enlace para ${to}: ${devUrl}`);
  return false;
}

function renderLinkEmail({
  title,
  greeting,
  body,
  buttonLabel,
  url,
  footer,
}: {
  title: string;
  greeting: string;
  body: string;
  buttonLabel: string;
  url: string;
  footer: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="margin:0 0 12px">${title}</h1>
      <p>${greeting}</p>
      <p>${body}</p>
      <p>
        <a href="${url}" style="color:#2563eb;text-decoration:underline;font-weight:700">
          ${buttonLabel}
        </a>
      </p>
      <p style="font-size:13px;color:#64748b">${footer}</p>
    </div>
  `;
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
  const displayName = name?.trim() || 'deportista';

  return sendEmail({
    to,
    subject: 'Verifica tu cuenta Theia',
    html: renderLinkEmail({
      title: 'Verifica tu cuenta',
      greeting: `Hola ${displayName},`,
      body: 'Confirma tu correo para activar tu cuenta en Theia.',
      buttonLabel: 'Verificar cuenta',
      url: verificationUrl,
      footer: 'Este enlace vence en 24 horas.',
    }),
    text: `Hola ${displayName}, verifica tu cuenta en Theia: ${verificationUrl}`,
    logLabel: 'email-verification',
    devUrl: verificationUrl,
  });
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name?: string | null;
  resetUrl: string;
}) {
  const displayName = name?.trim() || 'deportista';

  return sendEmail({
    to,
    subject: 'Restablece tu contrasena Theia',
    html: renderLinkEmail({
      title: 'Restablece tu contrasena',
      greeting: `Hola ${displayName},`,
      body: 'Recibimos una solicitud para cambiar la contrasena de tu cuenta Theia.',
      buttonLabel: 'Cambiar contrasena',
      url: resetUrl,
      footer: 'Este enlace vence en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo.',
    }),
    text: `Hola ${displayName}, cambia tu contrasena en Theia: ${resetUrl}`,
    logLabel: 'password-reset',
    devUrl: resetUrl,
  });
}
