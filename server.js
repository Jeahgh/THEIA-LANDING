/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const next = require('next');

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (process.env.NODE_ENV === 'production' && fs.existsSync(standaloneServer)) {
  process.env.HOSTNAME = process.env.HOSTNAME || process.env.HOST || '127.0.0.1';
  process.chdir(path.dirname(standaloneServer));
  require(standaloneServer);
  return;
}

const dev = process.env.NODE_ENV !== 'production';
const port = Number.parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOST || '127.0.0.1';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, hostname, () => {
    console.log(`Theia running on http://${hostname}:${port}`);
  });
});
