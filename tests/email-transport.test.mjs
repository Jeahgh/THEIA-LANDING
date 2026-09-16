import assert from 'node:assert/strict';
import test from 'node:test';
import nodemailer from 'nodemailer-v9';

import { sendEmail } from '../src/lib/email-verification.ts';

test('SMTP transport has timeouts and blocks file/URL attachment access', async () => {
  const originalCreateTransport = nodemailer.createTransport;
  const previousEnvironment = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  };
  let transportOptions;
  let messageOptions;

  nodemailer.createTransport = (options) => {
    transportOptions = options;
    return {
      async sendMail(message) {
        messageOptions = message;
        return { accepted: ['recipient@example.com'] };
      },
    };
  };

  process.env.SMTP_HOST = 'smtp.example.test';
  process.env.SMTP_PORT = '587';
  process.env.SMTP_USER = 'sender@example.test';
  process.env.SMTP_PASS = 'test-only-password';
  delete process.env.RESEND_API_KEY;

  try {
    const sent = await sendEmail({
      to: 'recipient@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
      text: 'Test',
      logLabel: 'test',
      devUrl: 'redacted',
    });

    assert.equal(sent, true);
    assert.equal(transportOptions.connectionTimeout, 10_000);
    assert.equal(transportOptions.greetingTimeout, 10_000);
    assert.equal(transportOptions.socketTimeout, 15_000);
    assert.equal(messageOptions.disableFileAccess, true);
    assert.equal(messageOptions.disableUrlAccess, true);
  } finally {
    nodemailer.createTransport = originalCreateTransport;
    for (const [key, value] of Object.entries(previousEnvironment)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
