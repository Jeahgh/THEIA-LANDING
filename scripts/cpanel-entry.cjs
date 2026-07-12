/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

console.log('THEIA cPanel entry: deploy/cpanel (v2)');

// cPanel/Passenger ejecuta este archivo. La aplicacion real es el artefacto
// standalone construido en Linux y versionado en deploy/cpanel.
const standaloneServer = path.join(__dirname, 'deploy', 'cpanel', 'server.js');

if (!fs.existsSync(standaloneServer)) {
  console.error('Falta deploy/cpanel/server.js.');
  console.error('Ejecuta npm run build:cpanel localmente y publica el artefacto generado.');
  process.exit(1);
}

process.env.NODE_ENV = 'production';
// El HOSTNAME del sistema puede ser el nombre publico del servidor y no una
// interfaz valida para listen(). cPanel puede definir HOST; si no, usa loopback.
process.env.HOSTNAME = process.env.HOST || '127.0.0.1';

// Las rutas de uploads usan process.cwd(); mantenerlo dentro del artefacto
// hace que public/uploads sea unico y predecible en cPanel.
process.chdir(path.dirname(standaloneServer));
require(standaloneServer);
