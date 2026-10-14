# Despliegue en servidor

La arquitectura productiva esperada es:

```text
Internet -> Cloudflare -> Nginx -> contenedor Next.js -> PostgreSQL
```

Este repositorio no contiene credenciales, certificados, reglas de Cloudflare
ni la configuración productiva de Nginx. Tampoco versiona builds o dependencias
generadas. La imagen debe construirse desde un commit identificado.

## Preparación

- Node.js del contenedor: rama 22, versión 22.12 o superior.
- PostgreSQL accesible solo desde la red privada correspondiente.
- Variables productivas configuradas en el servidor o secret manager.
- Volumen persistente montado en `/app/public/uploads` para no perder archivos.
- Nginx enviando `Host`, `X-Forwarded-For` y `X-Forwarded-Proto` al contenedor.

No copies al repositorio archivos `.env`, certificados, backups ni uploads.

## Flujo de publicación

1. Selecciona un commit aprobado de `develop` o el commit promovido a `main`.
2. Ejecuta pruebas, lint y build antes de construir la imagen.
3. Construye el target `runner` del `Dockerfile` con una etiqueta inmutable.
4. Ejecuta `prisma migrate deploy` con la imagen `migrator` y las variables de
   producción antes de cambiar el contenedor web.
5. Recrea únicamente el servicio web conservando el volumen de uploads.
6. Comprueba las rutas públicas, autenticación, panel, uploads y correo.
7. Conserva la etiqueta anterior para rollback.

La forma exacta de ejecutar los pasos 3 a 5 depende del Compose o del
orquestador instalado en el servidor. Esa configuración no debe improvisarse
desde el `docker-compose.yml` local porque contiene URLs y puertos de desarrollo.

## Migraciones de producción, sin seed

El target `migrator` contiene el esquema y las migraciones existentes, pero
no `prisma/seed.mjs`. Su comando por defecto ejecuta únicamente
`npm run db:deploy:container`, que llama a `prisma migrate deploy`.
No ejecuta seed ni hace un reset de la base. Las propias migraciones sí pueden
modificar datos: revisar sus SQL y disponer de respaldo antes de aplicarlas.

Desde el checkout del commit aprobado en Ubuntu:

```bash
VERSION="$(git rev-parse --short HEAD)"
docker build --target migrator -t "theia-migrator:${VERSION}" .
docker run --rm \
  --network "$THEIA_DOCKER_NETWORK" \
  --env-file "$THEIA_PRODUCTION_ENV_FILE" \
  "theia-migrator:${VERSION}"
```

`THEIA_DOCKER_NETWORK` y `THEIA_PRODUCTION_ENV_FILE` deben apuntar a la red
privada y al archivo de variables que ya utiliza el servidor. Este ejemplo no
crea ni cambia ninguna red, servicio PostgreSQL o secreto. El guard existente
exige que `DATABASE_URL` y `DIRECT_URL` usen el host Docker `db`. Si el servidor
usa otro host, ese guard rechazará la operación: no improvisar cambios de
PostgreSQL para adaptar este comando.

Si el servidor ya tiene un servicio Compose llamado `migrate` construido con
el target `migrator`, la alternativa es:

```bash
docker compose -f "$THEIA_PRODUCTION_COMPOSE_FILE" run --rm --no-deps migrate
```

La base debe estar disponible previamente. No usar `docker-compose.yml` del
repositorio para producción. Como alternativa fuera de Docker, el script
existente mantiene su confirmación explícita:

```bash
npm run db:status:production
npm run db:deploy:production -- --confirm-production
```

Estos dos comandos requieren el archivo operativo existente
`.env.production-ops.local`; no cargan el seed.

## Seed manual y excepcional

En desarrollo sigue disponible `npm run db:seed`. En Docker es necesario
construir **otro target**, `seeder`, y confirmar su ejecución:

```bash
VERSION="$(git rev-parse --short HEAD)"
docker build --target seeder -t "theia-seeder:${VERSION}" .
docker run --rm \
  --network "$THEIA_DOCKER_NETWORK" \
  --env-file "$THEIA_PRODUCTION_ENV_FILE" \
  "theia-seeder:${VERSION}" npm run db:seed:container -- --confirm-seed
```

El seed actual hace `upsert` de planes y noticias y reemplaza las características
de planes. Puede sobrescribir contenido editado en administración; no es una
operación inocua por ser repetible. Usarlo solo en una base inicial o cuando se
quiera expresamente restaurar ese contenido, con respaldo y destino verificado.
Ejecutar `theia-seeder` sin `--confirm-seed` falla antes de iniciar el seed.
Ejecutar ese comando en `migrator` también falla porque allí no existe el archivo.
No añadir `seeder` como dependencia de `web` o `migrate` en el Compose del servidor.

Las imágenes antiguas conservan su comando anterior de migración + seed.
Reconstruir `migrator` y actualizar su etiqueta antes de usar este procedimiento.

## Smoke tests mínimos

- `/` responde `200` y muestra la versión nueva.
- `/robots.txt` y `/sitemap.xml` responden `200`.
- `/_next/static/*` e imágenes responden con caché pública.
- `/login` permite credenciales y OAuth configurados.
- `/admin` exige sesión y rol administrador.
- Un upload nuevo persiste después de recrear el contenedor.
- APIs privadas y páginas de sesión no quedan cacheadas en Cloudflare.

## Reverse proxy y caché

Nginx puede comprimir contenido textual y aplicar caché larga a assets
inmutables de `/_next/static`. No debe cachear autenticación, APIs, páginas de
administración, perfil ni respuestas que dependan de cookies. Cloudflare debe
respetar esas mismas exclusiones y conservar correctamente los encabezados
`Vary` de Next.js.
