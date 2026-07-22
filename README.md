# THEIA Triathlon Performance

Sitio administrable del equipo Theia, construido con Next.js 16, React 19,
Auth.js, Prisma 7 y PostgreSQL.

No es un sitio HTML estático: el inicio de sesión, el panel administrativo, las
rutas API, el contenido y los uploads necesitan el proceso de Next.js y una
base PostgreSQL disponible.

## Arquitectura sin mezclar entornos

| Contexto | Aplicación | Base de datos | Docker |
| --- | --- | --- | --- |
| Desarrollo local | Next.js se ejecuta con npm en `localhost:3000` | PostgreSQL local en `localhost:5433` | Inicia únicamente la base local |
| Construcción para cPanel | `npm run build:cpanel` genera el artefacto Linux | Nunca usa la base de producción | Construye el artefacto reproducible |
| Producción | Passenger ejecuta el artefacto Node.js en cPanel | PostgreSQL configurado en cPanel | No se ejecuta en cPanel |

npm y Docker cumplen funciones diferentes. `npm run dev` ejecuta Next.js,
mientras Docker mantiene disponible su dependencia PostgreSQL local. Que la
portada cargue no demuestra que la base esté encendida: el login y el panel sí
necesitan conectarse a ella.

## Requisitos

- Node.js 22.12 o superior dentro de la rama 22.
- Docker Desktop iniciado para PostgreSQL local y para construir el artefacto.
- Credenciales OAuth de desarrollo, si se probará el acceso con Google.

`npm ci` se usa al clonar el repositorio o cuando cambia `package-lock.json`.
No hace falta ejecutar `npm install` ni `npm ci` cada día.

## Primera configuración local

1. Crea el archivo exclusivo de desarrollo:

   ```powershell
   Copy-Item .env.example .env.development.local
   ```

2. Completa sus valores de desarrollo. La URI de retorno de Google local es:

   ```text
   http://localhost:3000/api/auth/callback/google
   ```

   Usa un `AUTH_SECRET` local distinto del productivo. Si quedaron archivos
   antiguos `.env` o `.env.local`, tras rescatar solamente los valores locales
   renómbralos para que Next no los cargue:

   ```powershell
   Rename-Item .env.local .env.backup.local
   Rename-Item .env .env.backup
   ```

   Esos respaldos siguen conteniendo secretos: no los compartas y elimínalos
   cuando confirmes que `.env.development.local` funciona.

3. Instala las dependencias y genera Prisma:

   ```bash
   npm ci
   npm run db:generate
   ```

No guardes credenciales de producción en `.env.local` ni en
`.env.development.local`. En particular, `DATABASE_URL` local debe seguir
apuntando a `localhost:5433`.

## Trabajo diario

Con Docker Desktop abierto, basta con ejecutar:

```bash
npm run dev
```

Ese comando orquesta `db:up`, aplica únicamente las migraciones locales
pendientes, comprueba su estado y luego inicia Next.js en
`http://localhost:3000`. Al terminar puedes detener PostgreSQL con:

```bash
npm run db:stop
```

`npm run dev:web` inicia solamente Next.js y omite las comprobaciones. Se
reserva para diagnóstico avanzado cuando la base ya está disponible.

## Prisma y bases de datos

Los comandos habituales están protegidos para utilizar la base local:

| Comando | Función | Modifica la base local |
| --- | --- | --- |
| `npm run db:up` | Inicia PostgreSQL local con Docker | No |
| `npm run db:stop` | Detiene PostgreSQL local sin borrar sus datos | No |
| `npm run db:generate` | Genera el cliente desde `schema.prisma` | No |
| `npm run db:validate` | Valida el esquema Prisma | No |
| `npm run db:status` | Consulta las migraciones locales | No |
| `npm run db:migrate` | Crea o aplica migraciones de desarrollo | Sí |
| `npm run db:seed` | Inserta o actualiza datos iniciales locales | Sí |
| `npm run db:studio` | Abre Prisma Studio sobre desarrollo | Según las acciones realizadas |

Las operaciones de producción tienen nombres separados y requieren una
confirmación explícita. Están descritas en
[`docs/despliegue-cpanel.md`](docs/despliegue-cpanel.md). No existe un comando
genérico para desplegar migraciones.

Las fotografías no participan en `prisma generate`: PostgreSQL almacena sus
rutas y los archivos viven en `public/uploads`.

## Calidad y construcción

```bash
npm run lint
npm run build
```

`npm run build` también está protegido para usar el entorno local. Una
compilación nunca debe consultar ni modificar PostgreSQL de producción.

Para regenerar el artefacto Linux que consume cPanel:

```bash
npm run build:cpanel
```

El resultado queda en `deploy/cpanel` y se versiona intencionalmente. Docker se
usa para construirlo, pero el contenedor no se sube ni se ejecuta en cPanel.

La guía completa de despliegue está en
[`docs/despliegue-cpanel.md`](docs/despliegue-cpanel.md).

## Uploads

En cPanel, los nuevos archivos quedan en `deploy/cpanel/public/uploads`. Deben
respaldarse antes de recrear la aplicación o reemplazar el directorio. A largo
plazo conviene moverlos a almacenamiento persistente externo.
