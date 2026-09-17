# Resumen técnico de Theia

## Producto

Theia es una plataforma pública para presentar al equipo, planes de
entrenamiento, competencias y noticias. Incluye registro, autenticación, perfil
y un panel privado para administrar contenido.

## Stack

- Next.js 16 con App Router y React 19.
- TypeScript y Tailwind CSS.
- Auth.js con Google y credenciales.
- Prisma 7 con PostgreSQL.
- Imagen Docker standalone detrás de Nginx y Cloudflare en producción.

## Contenido administrable

El panel permite administrar:

- planes de entrenamiento;
- integrantes del equipo;
- testimonios;
- noticias y resultados;
- competencias;
- usuarios y roles.

El contenido se guarda en PostgreSQL. Los cambios editoriales no requieren un
nuevo build; las acciones administrativas invalidan la caché pública asociada.

## Archivos e imágenes

Los assets incluidos con el producto viven en `public/images`. Los uploads del
panel se guardan en `public/uploads`, se sirven mediante `/api/uploads` y deben
usar un volumen persistente en producción.

## Seguridad

- Las rutas administrativas comprueban sesión y rol.
- Las páginas privadas declaran `noindex`.
- Los comandos locales rechazan una base PostgreSQL remota.
- Las migraciones productivas requieren un flujo y una confirmación separados.
- Los secretos y archivos `.env` productivos no se versionan.

## SEO y rendimiento

El sitio publica metadata por página, canonical, Open Graph, Twitter Cards,
JSON-LD, `robots.txt`, `sitemap.xml` y páginas de noticias rastreables. Las
consultas públicas usan selección explícita de campos y caché con invalidación
desde el panel. Las imágenes principales se entregan en formatos optimizados.

## Infraestructura

La configuración productiva de Cloudflare, Nginx, certificados, secretos,
backups y Compose pertenece al servidor. El repositorio contiene el Dockerfile
de la aplicación y un Compose exclusivo para desarrollo local.

Consulta [despliegue-servidor.md](despliegue-servidor.md) para el flujo y las
comprobaciones de publicación.
