### THEIA Triathlon Performance

Sitio web del club THEIA para consultar planes, equipo, noticias y competencias,
con perfiles de usuario y un panel de administración.

Construido con Next.js 16, React 19, TypeScript, Tailwind CSS, Auth.js,
Prisma 7 y PostgreSQL. Sitio público: [theiasport.cl](https://theiasport.cl).

### Requisitos

- Git.
- Node.js 22.12 o superior dentro de la versión 22, con npm.
- Docker Desktop en Windows o macOS; Docker Engine con Compose en Linux.
- Docker en ejecución y los puertos locales 3000 y 5433 disponibles.

### Abrir el proyecto desde cero

1. Descarga la versión de desarrollo:

   ```bash
   git clone --branch develop https://github.com/Jeahgh/THEIA-LANDING.git
   cd THEIA-LANDING
   ```

   Abre esa carpeta con tu editor y utiliza su terminal para los siguientes pasos.

2. Crea tu archivo de configuración local desde la plantilla.

   En PowerShell:

   ```powershell
   Copy-Item .env.example .env.development.local
   ```

   En Linux o macOS:

   ```bash
   cp .env.example .env.development.local
   ```

   Conserva las direcciones locales de la plantilla. Genera un secreto con este
   comando y pega el resultado como valor de `AUTH_SECRET` en el nuevo archivo:

   ```bash
   node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
   ```

   La plantilla solo contiene ejemplos para desarrollo. No compartas tu archivo
   de variables ni utilices credenciales de producción.

3. Instala las dependencias, genera el cliente de la base de datos y arranca:

   ```bash
   npm ci
   npm run db:generate
   npm run dev
   ```

   El último comando inicia PostgreSQL local con Docker, aplica las migraciones
   pendientes y abre el servidor de desarrollo. Visita
   [localhost:3000](http://localhost:3000).

La base local empieza vacía. Para cargar los planes y noticias iniciales, abre
otra terminal en la misma carpeta y ejecuta, solo si quieres esos datos:

```bash
npm run db:seed -- --confirm-seed
```

El seed puede sobrescribir contenido del mismo plan o noticia; no se ejecuta
automáticamente. Las fotos cargadas desde administración no se incluyen en Git.
El panel requiere una cuenta con rol `ADMIN`; el arranque no crea administradores.

### Servicios opcionales

Puedes recorrer las páginas públicas sin configurar estos servicios:

- **Google:** completa `AUTH_GOOGLE_ID` y `AUTH_GOOGLE_SECRET` para probar ese
  inicio de sesión. El retorno local es
  `http://localhost:3000/api/auth/callback/google`.
- **Correo:** la plantilla incluye las opciones SMTP o Resend. Sin proveedor,
  los enlaces de registro y recuperación se muestran en la terminal local.
- **Ubicaciones:** `GEOAPIFY_API_KEY` activa las sugerencias del panel. Sin clave
  puedes escribir la ubicación manualmente. Consulta la
  [guía de Geoapify](docs/geoapify.md).

Reinicia el servidor cuando cambies las variables de entorno.

### Trabajo habitual

- `npm run dev`: inicia la base local, aplica migraciones y arranca la web.
- `npm run dev:web`: arranca solo la web si PostgreSQL ya está disponible.
- `npm run db:status`: comprueba las migraciones locales.
- `npm run db:stop`: detiene PostgreSQL conservando sus datos.
- `npm run lint` y `npm test`: revisan el código y ejecutan las pruebas.
- `npm run build`: compila la aplicación para comprobar el build.

Para detener la web, pulsa `Ctrl+C` en su terminal. Para incorporar cambios
nuevos, detén la web, ejecuta `git pull`, `npm ci`, `npm run db:generate` y
`npm run dev`.

### Desarrollo y producción

`develop` reúne los cambios que se están probando. `main` contiene la versión
aprobada para publicar; actualizar una rama no despliega el sitio por sí solo.

En desarrollo, Next.js funciona en `localhost:3000` y PostgreSQL en
`localhost:5433`. En producción, la aplicación utiliza una imagen Docker
standalone en Ubuntu, detrás de Nginx y Cloudflare, con PostgreSQL privado.

El archivo `docker-compose.yml` del repositorio es exclusivamente local.
Las variables y la configuración productivas se gestionan en el servidor.
Los archivos de `public/uploads` requieren un volumen persistente y respaldos.
El contenedor `migrator` aplica únicamente migraciones; el seed es manual.

El procedimiento completo está en la [guía de despliegue](docs/despliegue-servidor.md).
