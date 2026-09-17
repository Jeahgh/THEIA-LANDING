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
