import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'node:net';
import nodemailer from 'nodemailer-smtp';

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

test('the patched SMTP library delivers a multipart message to a local test server', async () => {
  const sockets = new Set();
  let delivered = '';
  let recipient = '';
  const server = createServer((socket) => {
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
    socket.setTimeout(5000, () => socket.destroy());
    socket.write('220 smtp.test ESMTP\r\n');
    let buffer = '';
    let readingData = false;
    socket.on('data', (chunk) => {
      buffer += chunk.toString();
      while (buffer.length) {
        if (readingData) {
          const end = buffer.indexOf('\r\n.\r\n');
          if (end < 0) break;
          delivered = buffer.slice(0, end);
          buffer = buffer.slice(end + 5);
          readingData = false;
          socket.write('250 Message accepted\r\n');
          continue;
        }
        const end = buffer.indexOf('\r\n');
        if (end < 0) break;
        const command = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        if (/^EHLO|^HELO/.test(command)) socket.write('250-smtp.test\r\n250 AUTH PLAIN\r\n');
        else if (command.startsWith('AUTH ')) socket.write('235 Authenticated\r\n');
        else if (command.startsWith('RCPT TO:')) { recipient = command; socket.write('250 OK\r\n'); }
        else if (command === 'DATA') { readingData = true; socket.write('354 End with a dot\r\n'); }
        else if (command === 'QUIT') socket.end('221 Bye\r\n');
        else socket.write('250 OK\r\n');
      }
    });
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const overrides = {
    SMTP_HOST: '127.0.0.1', SMTP_PORT: String(server.address().port),
    SMTP_USER: 'sender@example.test', SMTP_PASS: 'test-only-password',
    SMTP_SECURE: 'false', EMAIL_FROM: 'Theia <sender@example.test>',
  };
  const previous = Object.fromEntries(Object.keys(overrides).map((key) => [key, process.env[key]]));
  Object.assign(process.env, overrides);
  try {
    assert.equal(await sendEmail({
      to: 'recipient@example.test', subject: 'SMTP compatibility',
      html: '<p>Test message</p>', text: 'Test message', logLabel: 'test', devUrl: 'unused',
    }), true);
    assert.equal(recipient, 'RCPT TO:<recipient@example.test>');
    assert.match(delivered, /Subject: SMTP compatibility/);
    assert.match(delivered, /Content-Type: multipart\/alternative/);
    assert.match(delivered, /Test message/);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    for (const socket of sockets) socket.destroy();
    await new Promise((resolve) => server.close(resolve));
  }
});
