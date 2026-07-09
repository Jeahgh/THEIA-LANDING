/* eslint-disable @typescript-eslint/no-require-imports */

const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = Number.parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || '127.0.0.1';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, hostname, () => {
    console.log(`Theia running on http://${hostname}:${port}`);
  });
});
