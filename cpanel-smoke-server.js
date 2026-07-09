const http = require('http');

const port = Number.parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOST || '127.0.0.1';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('THEIA_CPanel_Node_OK\n');
});

server.listen(port, hostname, () => {
  console.log(`Smoke server running on http://${hostname}:${port}`);
});
