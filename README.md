# THEIA Triathlon Performance

Sitio administrable del equipo Theia, construido con Next.js 16, React 19,
Auth.js, Prisma 7 y PostgreSQL.

No es un sitio HTML estatico: el login, el panel de administracion, las rutas
API, el contenido de PostgreSQL y los uploads necesitan un proceso Node.js.

## Requisitos

- Node.js 22.12 o superior dentro de la rama 22.
- PostgreSQL accesible desde la aplicacion.
- Docker Desktop solo para generar el artefacto Linux de cPanel.

## Desarrollo local

1. Copia `.env.example` como `.env.local` y completa los valores.
2. Instala exactamente lo definido en el lockfile:

   ```bash
   npm ci
   ```

3. Genera el cliente Prisma:

   ```bash
   npm run db:generate
   ```

4. Comprueba las migraciones y levanta el servidor:

   ```bash
   npm run db:status
   npm run dev
   ```

La aplicacion queda disponible en `http://localhost:3000`.

## Prisma: que hace cada comando

| Comando | Funcion | Modifica la base |
| --- | --- | --- |
| `npm run db:generate` | Genera codigo del cliente desde `schema.prisma` | No |
| `npm run db:validate` | Valida el esquema local | No |
| `npm run db:status` | Consulta el estado de migraciones | No |
| `npm run db:deploy` | Aplica migraciones pendientes en produccion | Si |
| `npm run db:migrate` | Crea/aplica migraciones de desarrollo | Si |
| `npm run db:seed` | Inserta o actualiza datos iniciales | Si |

Las fotografias no participan en `prisma generate`. PostgreSQL guarda sus
rutas y los archivos viven en `public/uploads`.

## Calidad y build

```bash
npm run lint
npm run build
```

## Despliegue en cPanel

cPanel ejecuta un artefacto standalone ya construido en Linux. No debe ejecutar
`npm install`, `prisma generate` ni `next build` en el hosting compartido.

La guia completa y el procedimiento de diagnostico estan en
[`docs/despliegue-cpanel.md`](docs/despliegue-cpanel.md).

Para regenerar el artefacto localmente:

```bash
npm run build:cpanel
```

El resultado queda en `deploy/cpanel` y se versiona de forma intencional.

## Docker local

```bash
docker compose up --build
```

La web queda en `http://localhost:3001` y PostgreSQL en `localhost:5433`.
El servicio `migrate` aplica migraciones y seed antes de iniciar la web.

## Uploads

En cPanel, los nuevos archivos quedan en `deploy/cpanel/public/uploads`. Deben
respaldarse antes de recrear la aplicacion o reemplazar todo el directorio. A
largo plazo conviene moverlos a almacenamiento persistente externo.
