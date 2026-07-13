# Despliegue de Theia en cPanel

Esta es la unica guia vigente para cPanel. La estrategia evita las operaciones
que estaban fallando bajo los limites de CloudLinux: instalar todo el arbol de
desarrollo, descargar motores Prisma, generar el cliente y compilar Next.js.

## 1. Arquitectura de despliegue

El flujo es:

```text
Codigo fuente
  -> Docker local (Linux + Node 22)
  -> deploy/cpanel (Next standalone)
  -> GitHub main
  -> Git Version Control de cPanel
  -> server.js bajo Passenger
```

El `server.js` de la raiz solo arranca `deploy/cpanel/server.js`. No importa
Next desde el `node_modules` de cPanel y no contiene un segundo servidor custom.

## 2. Preparar una version localmente

Requisitos: Node 22.12+, Docker Desktop iniciado y variables locales validas.

```bash
npm ci
npm run db:generate
npm run db:validate
npm run lint
npm run db:status
npm run build:cpanel
```

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

Las migraciones no se ejecutan en cPanel. Se aplican desde un entorno confiable
antes de activar una version que dependa de ellas:

```bash
npm run db:status
npm run db:deploy
npm run db:status
```

`db:deploy` modifica PostgreSQL; revisa primero los SQL nuevos en
`prisma/migrations`. El seed es una accion separada y nunca se ejecuta
automaticamente en produccion.

Para la version auditada el repositorio contiene 6 migraciones y la base estaba
al dia al momento de preparar esta guia.

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

Configura en cPanel, sin comillas envolventes:

```text
DATABASE_URL
AUTH_SECRET
AUTH_URL
NEXT_PUBLIC_APP_URL
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
EMAIL_FROM
```

Para correo configura uno de estos grupos:

```text
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
```

o:

```text
RESEND_API_KEY
```

`AUTH_URL` y `NEXT_PUBLIC_APP_URL` deben usar la URL HTTPS publica. `DIRECT_URL`
solo hace falta donde se ejecutan migraciones; no es obligatoria para el runtime
de cPanel. cPanel administra `PORT` y no debes fijarlo manualmente.

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

No ejecutes `db:generate`, `db:deploy`, `build`, `build:cpanel` ni instaladores
manuales dentro de cPanel.

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
