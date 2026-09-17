# THEIA Triathlon Performance

Sitio administrable de Theia construido con Next.js 16, React 19, Auth.js,
Prisma 7 y PostgreSQL.

La aplicación necesita un proceso Node.js y PostgreSQL: autenticación, panel
administrativo, contenido dinámico, APIs y uploads no funcionan como un sitio
HTML estático.

## Arquitectura

| Entorno | Aplicación | Base de datos |
| --- | --- | --- |
| Desarrollo | Next.js en `localhost:3000` | PostgreSQL Docker en `localhost:5433` |
| Producción | Contenedor standalone detrás de Nginx y Cloudflare | PostgreSQL privado del servidor |

El repositorio contiene una imagen multi-stage de producción. Los artefactos
generados no se versionan: el servidor o el pipeline construye la imagen desde
el commit que se desea publicar.

## Requisitos locales

- Node.js 22.12 o superior dentro de la rama 22.
- Docker Desktop para PostgreSQL local y builds de contenedor.
- Credenciales OAuth de desarrollo si se probará Google.

## Primera configuración

1. Crea el entorno local:

   ```powershell
   Copy-Item .env.example .env.development.local
   ```

2. Completa únicamente valores de desarrollo. La URI de retorno local de
   Google es `http://localhost:3000/api/auth/callback/google`.

3. Instala dependencias y genera Prisma:

   ```bash
   npm ci
   npm run db:generate
   ```

No copies credenciales productivas a `.env.development.local`. Los comandos
locales rechazan conexiones PostgreSQL fuera de loopback.

## Desarrollo

```bash
npm run dev
```

Este comando inicia PostgreSQL, aplica migraciones locales pendientes y levanta
Next.js. `npm run dev:web` inicia solo la aplicación cuando la base ya está
disponible.

Comandos principales:

| Comando | Función |
| --- | --- |
| `npm run db:up` | Inicia PostgreSQL local |
| `npm run db:stop` | Detiene PostgreSQL local sin borrar datos |
| `npm run db:status` | Consulta migraciones locales |
| `npm run db:migrate` | Crea o aplica migraciones de desarrollo |
| `npm run db:seed` | Carga datos iniciales locales |
| `npm run db:studio` | Abre Prisma Studio |
| `npm run lint` | Ejecuta ESLint |
| `npm run test:security` | Ejecuta pruebas de seguridad |
| `npm run test:seo` | Ejecuta comprobaciones SEO |
| `npm run build` | Verifica el build local |

## Contenedores

El `Dockerfile` incluye:

- `runner`: imagen standalone para la aplicación;
- `migrator`: migraciones y seed dentro de la red Docker;
- `builder`: etapa interna de compilación.

`docker-compose.yml` es para desarrollo local. La configuración productiva de
Nginx, dominios, certificados, volúmenes y secretos pertenece al servidor y no
se versiona en este repositorio.

Consulta [docs/despliegue-servidor.md](docs/despliegue-servidor.md) antes de
publicar.

## Uploads

Los archivos administrados se guardan en `public/uploads` y se sirven mediante
`/api/uploads`. En producción esa carpeta debe montarse en un volumen
persistente y respaldarse antes de reemplazar contenedores.
