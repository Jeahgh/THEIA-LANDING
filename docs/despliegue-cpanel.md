# Despliegue de Theia en cPanel

Esta es la unica guia vigente para cPanel. La estrategia evita las operaciones
que estaban fallando bajo los limites de CloudLinux: instalar todo el arbol de
desarrollo, descargar motores Prisma, generar el cliente y compilar Next.js.

## 1. Arquitectura de despliegue

El flujo de publicación es:

```text
Codigo fuente
  -> Docker local (Linux + Node 22)
  -> deploy/cpanel (Next standalone)
  -> GitHub main
  -> Git Version Control de cPanel
  -> server.js bajo Passenger
```

Docker solo interviene en el equipo de desarrollo: mantiene PostgreSQL local y
crea un artefacto Linux reproducible. cPanel no ejecuta Docker. En producción,
Passenger ejecuta Node.js y se conecta al PostgreSQL configurado en el panel.

Los entornos son independientes:

- `.env.development.local` contiene únicamente variables locales y usa
  `localhost:5433`.
- `.env.production-ops.local` contiene únicamente la conexión que usan los
  comandos deliberados de migración productiva.
- Las variables runtime de producción se configuran exclusivamente en
  **Setup Node.js App** de cPanel.

Nunca copies variables de producción a `.env.local` ni a
`.env.development.local`.

El `server.js` de la raiz solo arranca `deploy/cpanel/server.js`. No importa
Next desde el `node_modules` de cPanel y no contiene un segundo servidor custom.

## 2. Preparar una version localmente

Requisitos: Node 22.12+, Docker Desktop iniciado y variables locales válidas.

```bash
npm ci
npm run db:generate
npm run db:validate
npm run lint
npm run db:up
npm run db:status
npm run build:cpanel
```

`npm ci` solo es necesario después de clonar o cuando cambie
`package-lock.json`; no es un paso diario. `db:status` está protegido para
consultar PostgreSQL local. `build:cpanel` utiliza Docker y nunca debe compilar
contra una base productiva.

`build:cpanel` construye dentro de Debian Linux, comprueba que exista Sharp para
Linux, rechaza binarios de Windows/macOS y reemplaza `deploy/cpanel` solo cuando
el build termino correctamente.

Antes de publicar revisa:

```bash
git status --short
git diff --check
```

El commit debe incluir el codigo fuente, `package-lock.json` y todo
`deploy/cpanel`. Nunca copies un `.next` generado directamente en Windows.

## 3. Migraciones

Las migraciones no se ejecutan en cPanel ni durante el build. Se aplican desde
un equipo confiable antes de activar una versión que dependa de ellas.

1. Crea el archivo local de operaciones, que está ignorado por Git:

   ```powershell
   Copy-Item .env.production-ops.example .env.production-ops.local
   ```

2. Completa únicamente `THEIA_PRODUCTION_DATABASE_URL`. No copies ese valor a
   `DATABASE_URL` ni a ningún archivo de desarrollo.
3. Consulta el estado sin modificar la base:

   ```bash
   npm run db:status:production
   ```

4. Revisa todos los SQL pendientes en `prisma/migrations` y confirma que el
   respaldo productivo esté disponible.
5. Aplica las migraciones con la confirmación literal obligatoria:

   ```bash
   npm run db:deploy:production -- --confirm-production
   ```

6. Verifica nuevamente:

   ```bash
   npm run db:status:production
   ```

El repositorio contiene actualmente **8 migraciones**. El seed es una acción
separada y nunca se ejecuta automáticamente en producción. Los comandos
locales `db:status`, `db:migrate` y `db:seed` rechazan conexiones que no sean
locales; tampoco existe un comando genérico para desplegar migraciones.

## 4. Configurar Setup Node.js App

En cPanel abre **Setup Node.js App** y configura:

- Node.js version: rama 22, como minimo 22.12.
- Application mode: `Production`.
- Application root: la carpeta donde Git descarga este repositorio.
- Application URL: el dominio o subdominio definitivo.
- Application startup file: `cpanel-app.cjs`.

No pulses **Run NPM Install** para esta arquitectura. El artefacto ya incluye
solo las dependencias runtime necesarias.

Si existe una aplicacion anterior con cientos de MiB en su entorno `nodevenv`,
primero respalda los uploads. Si el despliegue anterior guardo archivos en
`public/uploads`, fusiona ese contenido con `deploy/cpanel/public/uploads` antes
de cambiar el arranque. Luego puedes eliminar/recrear solo la aplicacion Node
desde cPanel para liberar la instalacion parcial antigua. No borres la carpeta
del repositorio ni ningun upload sin respaldo.

Los uploads nuevos de la aplicacion quedan ignorados por Git para que no vuelvan
`dirty` el repositorio administrado por cPanel. No los agregues manualmente al
repositorio.

## 5. Variables de entorno

Configura las variables de producción directamente en **Setup Node.js App** de
cPanel, sin comillas envolventes:

```text
DATABASE_URL
AUTH_SECRET
AUTH_URL
NEXT_PUBLIC_APP_URL
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
EMAIL_FROM
```

Para que registro, recuperación de contraseña y contacto funcionen de forma
segura en producción, configura obligatoriamente uno de estos grupos:

```text
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
```

o:

```text
RESEND_API_KEY
```

`AUTH_URL` y `NEXT_PUBLIC_APP_URL` deben usar la misma URL HTTPS pública y
canónica. En Google Cloud registra exactamente esta URI de redirección:

```text
https://TU_DOMINIO/api/auth/callback/google
```

`AUTH_SECRET` debe ser largo, aleatorio y permanecer idéntico entre reinicios y
versiones; cambiarlo invalida todas las cookies de sesión existentes.
`DIRECT_URL` no se usa en el runtime de cPanel. Las migraciones externas usan
exclusivamente `THEIA_PRODUCTION_DATABASE_URL` desde
`.env.production-ops.local`; esa variable no se configura en cPanel. cPanel
administra `PORT` y no debes fijarlo manualmente.

### Primer administrador en una base vacía

Después del primer inicio con Google, confirma en la base que se crearon el
usuario y su cuenta vinculada. Desde la herramienta PostgreSQL de cPanel,
promueve únicamente tu correo real:

```sql
UPDATE "User"
SET "role" = 'ADMIN', "isActive" = true
WHERE "email" = 'TU_CORREO_REAL';
```

Comprueba que se actualizó exactamente una fila. La siguiente validación de la
sesión recogerá el rol nuevo; no insertes usuarios manualmente antes del primer
inicio con Google.

### Protección frente a abuso

La aplicación limita intentos de contraseña y solicitudes de correo por proceso
Node.js. Mantén además **ModSecurity/WAF** activo en cPanel para cubrir múltiples
procesos, reinicios y ataques distribuidos. Antes de abrir el sitio al público,
comprueba que solicitudes repetidas de registro respondan `429` y que el WAF no
bloquee el callback legítimo de Google.

## 6. Actualizar desde Git

1. Publica la version preparada en `main`.
2. En **Git Version Control**, usa **Update from Remote**.
3. Usa **Deploy HEAD Commit**. El `.cpanel.yml` valida el artefacto y copia
   solo `deploy/cpanel/.next/static` a `public_html/_next/static`, para que
   Apache entregue los CSS y JavaScript de Next.js. No ejecuta `npm install`,
   `build` ni migraciones. La raiz de **Setup Node.js App** debe seguir siendo
   la carpeta del repositorio; no la cambies a `deploy/cpanel`. Al final crea
   `tmp/restart.txt` para que Passenger descarte el proceso anterior y cargue
   el mismo build cuyos archivos estaticos acaba de publicar.

   Antes de reiniciar, el despliegue copia `scripts/cpanel-entry.cjs` sobre el
   `server.js` de la raiz. Esto evita que CloudLinux conserve un launcher viejo
   que arranque el `.next` obsoleto de la raiz en lugar de `deploy/cpanel`.
   La aplicacion usa `cpanel-app.cjs` como nombre de entrada para que LiteSpeed
   regenere el runtime y no reutilice la instancia historica de `server.js`.
4. Confirma que exista `deploy/cpanel/server.js` en el administrador de archivos.
5. En **Setup Node.js App**, pulsa **Restart Application**.

No ejecutes `db:generate`, `db:deploy:production`, `build`, `build:cpanel` ni
instaladores manuales dentro de cPanel.

## 7. Interpretar errores

| Mensaje | Causa probable | Accion |
| --- | --- | --- |
| Node incompatible | cPanel usa 20 antiguo, 21, 22.0-22.11 o 23 | Seleccionar Node 22.12+ |
| Falta `deploy/cpanel/server.js` | Git no recibio el artefacto | Regenerar localmente, commit y pull |
| Binarios Windows/macOS | Se publico un build local incorrecto | Regenerar con Docker |
| Poco disco o pocos inodos | Quedaron `nodevenv`, caches o installs parciales | Respaldar y recrear la app/contactar al hosting |
| Conexion PostgreSQL falla | URL, permisos, firewall o servicio PostgreSQL | Revisar `DATABASE_URL` y acceso desde el servidor |
| Uploads no escribibles | Permisos del directorio | Corregir permisos/propietario desde cPanel |
| Passenger muestra error generico | Fallo antes de escuchar el puerto | Copiar el Passenger log completo |

CloudLinux documenta que los comandos npm/build pueden morir por limites de
memoria del proceso. Por eso esta estrategia no compila ni instala en cPanel.

## 8. Evidencia que se debe capturar

Si el despliegue falla, comparte sin recortar:

1. Configuracion de Setup Node.js App (ocultando secretos).
2. Passenger log desde el primer error.
3. Pantalla de uso de disco/inodos y limites de recursos.
4. Estado de Git y hash del commit desplegado.

No compartas el contenido de `DATABASE_URL`, `AUTH_SECRET`, claves Google ni
credenciales SMTP.
