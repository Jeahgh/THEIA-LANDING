# Auditoría integral de seguridad de TheiaSport (histórica)

> Este documento conserva evidencia del despliegue anterior en cPanel. Sus
> secciones de infraestructura y publicación ya no describen producción. Para
> el flujo vigente consulta `docs/despliegue-servidor.md`.

**Fecha de corte:** 2026-08-21  
**Rama auditada:** `codex/admin-listas-sin-fondo`  
**Commit base observado:** `dce0678`  
**Dominio:** `theiasport.cl`

## Resumen ejecutivo

TheiaSport es una aplicación monolítica Next.js 16 (App Router) con React 19, Auth.js, Prisma y PostgreSQL. El código contiene controles importantes y bien implementados: Prisma evita SQL concatenado, las contraseñas se almacenan con bcrypt, los tokens de correo se guardan hasheados, Google OAuth exige correo verificado, las sesiones se revalidan contra la base y las mutaciones administrativas vuelven a comprobar el rol. No se confirmó SQL injection, command injection, SSRF, traversal, XSS directo ni IDOR horizontal en el perfil.

La postura actual, sin embargo, **no es apta para considerar cerrada la revisión de seguridad**. Los riesgos más urgentes son:

1. existen respaldos locales ignorados por Git con credenciales que parecen operativas; su vigencia debe verificarse y las credenciales activas deben rotarse;
2. el runtime instalado contiene vulnerabilidades críticas conocidas en Auth.js y vulnerabilidades altas en Next.js/Nodemailer;
3. las páginas de lectura del panel confían en un `layout` para autorizar, aunque Next.js 16 no vuelve a renderizar layouts en cada navegación parcial;
4. el limitador de intentos es local al proceso, confía en headers de proxy no formalizados y borra todas las restricciones al llenarse;
5. contacto y uploads permiten abuso de CPU, correo, disco e inodos;
6. HTTP responde contenido sin redirigir obligatoriamente a HTTPS;
7. producción ejecuta un artefacto manual versionado en `deploy/cpanel`, no el código de `src`; no hay CI que demuestre que ambos corresponden al mismo commit.

La exploración externa se limitó a solicitudes HTTP pasivas y DNS. No se escanearon puertos, no se probaron credenciales, no se hizo brute force y no se atribuyeron a TheiaSport los servicios compartidos observados en la IP del proveedor.

| ID | Severidad | Vulnerabilidad | Componente | Estado |
| -- | --------- | -------------- | ---------- | ------ |
| SEC-001 | CRITICAL | Credenciales potencialmente activas en respaldos locales | Secretos/operación | Abierto; rotación externa requerida |
| SEC-002 | CRITICAL | Auth.js vulnerable | Autenticación/dependencias | Mitigado en source/lock; artefacto pendiente |
| SEC-003 | HIGH | Next.js y Nodemailer vulnerables | Runtime/dependencias | Mitigación parcial; riesgo peer residual |
| SEC-004 | HIGH | Lecturas admin autorizadas solo por un layout persistente | Autorización | Mitigado en source + test |
| SEC-005 | HIGH | Rate limiting eludible y fail-open | Autenticación/abuso | Mitigación parcial; store compartido pendiente |
| SEC-006 | HIGH | DoS y abuso de correo en contacto público | API/correo | Mitigación parcial en source |
| SEC-007 | HIGH | Agotamiento de disco e image-bomb por avatares | Uploads | Mitigación parcial en source |
| SEC-008 | HIGH | HTTP no redirige obligatoriamente a HTTPS | Transporte | Proveedor/operador |
| SEC-009 | HIGH | Artefacto productivo desincronizable del código | Deployment/integridad | Abierto |
| SEC-010 | MEDIUM | Validación débil de imágenes administrativas | Uploads | Mitigación parcial: firma/tasa |
| SEC-011 | MEDIUM | Cabeceras HTTP defensivas ausentes | Configuración web | Mitigado en source; artefacto pendiente |
| SEC-012 | MEDIUM | Tokens bearer se propagan en URLs | Recuperación/verificación | Abierto |
| SEC-013 | MEDIUM | Enumeración de cuentas y estados | Registro/login | Mitigación temporal parcial |
| SEC-014 | MEDIUM | Sin MFA/step-up y política de contraseña incompleta | Autenticación | Abierto |
| SEC-015 | MEDIUM | Avatares públicos y uploads personales en Git/artefacto | Privacidad/storage | Caché de perfiles mitigada; migración pendiente |
| SEC-016 | MEDIUM | TLS, privilegios y pooling de PostgreSQL no verificables | Base de datos | Pendiente de cPanel/proveedor |
| SEC-017 | MEDIUM | Docker publica web y PostgreSQL en todas las interfaces | Docker local | Mitigado en Compose base |
| SEC-018 | MEDIUM | Supply chain sin CI, SBOM ni imágenes inmutables | CI/CD | Dependencias parciales; CI/SBOM pendiente |
| SEC-019 | MEDIUM | Lectura completa de imágenes y consultas públicas dinámicas | Disponibilidad | Abierto |
| SEC-020 | LOW | Carreras en tokens de un uso y último administrador | Consistencia/autorización | Abierto |
| SEC-021 | LOW | URLs de inscripción sin allowlist de protocolo | Contenido administrado | Mitigado en source + test |
| SEC-022 | LOW | Route Handlers con estado sin comprobación explícita de Origin | CSRF hardening | Condicional |
| SEC-023 | LOW | Logging sensible en desarrollo y baja trazabilidad | Logging/monitorización | Mitigación parcial |

## Correcciones aplicadas en esta rama

Estas correcciones se realizaron **después de documentar la auditoría inicial**:

| Área | Cambio aplicado | Verificación |
| --- | --- | --- |
| Auth.js | `next-auth` beta.32, adapter 2.11.3 y `@auth/core` 0.41.3 | tests auth y build |
| Next.js | 16.2.6 → 16.3.2; herramientas Next alineadas | build 16.3.2 |
| Prisma | 7.8.0 → 7.9.1 | generate/validate/build |
| Correo | TheiaSport importa Nodemailer 9.0.5 mediante alias; timeouts, `disableFileAccess` y `disableUrlAccess` | test de transporte |
| Admin | las 13 páginas ejecutan `requireAdmin` antes de Prisma/redirect | test estructural |
| Headers | CSP mínima, DENY, nosniff, Referrer/Permissions Policy y banner desactivado | test + `curl` local |
| Login | límites separados por cuenta/IP y dummy bcrypt para email inexistente | suite de rate limit/build |
| Rate limit | ya no ejecuta `store.clear()`; al saturarse falla cerrado; IP válida y último XFF | test con 10.000 claves |
| Contacto | JSON streaming acotado a 24 KiB, máximos, Content-Type, 429, timeout de correo y log de contenido redactado | tests + 415/400 local |
| Uploads | firma JPEG/PNG/WebP, rechazo vacío, límite/tasa, avatar estable por usuario/formato y perfiles `private, no-store` | tests de firmas/build |
| Docker | Compose base ligado a `127.0.0.1`; Compose y plantilla separados para lab Host-Only | `docker compose config --quiet` |
| URLs | inscripción solo acepta HTTPS absoluto sin credenciales | test unitario |

Riesgo residual importante:

- Auth.js todavía declara Nodemailer 8.0.11 como peer opcional. TheiaSport no configura el provider Email de Auth.js y su propio correo usa 9.0.5, pero `npm audit` conserva el aviso hasta que Auth.js acepte Nodemailer 9.
- Prisma 7.9.1 conserva un aviso de `deepmerge-ts` en tooling/config; npm solo propone un downgrade mayor/inadecuado a Prisma 6.12.0.
- El rate limiter continúa en memoria por proceso: la mitigación elimina el fail-open, no sustituye Redis/DB/WAF.
- La firma de imagen no equivale a decode/reencode ni limita píxeles; esa parte sigue en el plan.
- Los secretos no fueron rotados/eliminados porque requieren autoridad y coordinación externa.
- HTTP→HTTPS, DB productiva, firewall, WAF y HSTS siguen dependiendo de cPanel/proveedor.
- `deploy/cpanel` **no se regeneró**: Docker Desktop estaba detenido. `npm run start` sigue ejecutando el artefacto viejo y no representa el source corregido.

## Alcance y metodología

- Revisión estática completa de rutas, Server Actions, autenticación, autorización, Prisma, uploads, correo, Docker y scripts.
- Búsqueda de secretos en el árbol de trabajo y comparación segura de valores configurados contra el historial Git, sin imprimirlos.
- `npm audit --json`, inventario de versiones, lockfile y lifecycle scripts.
- Tests locales existentes y pruebas unitarias controladas del rate limiter; no se ejecutó fuerza bruta.
- Solicitudes pasivas `HEAD/GET` a HTTP/HTTPS de producción para observar redirect, caché, cookies y headers.
- Revisión del artefacto standalone `deploy/cpanel` y del procedimiento documentado de cPanel.

Limitaciones:

- No hay acceso al panel cPanel, logs del proveedor, reglas LiteSpeed/ModSecurity, firewall ni variables productivas.
- No se puede confirmar desde Git el host, puerto, TLS o privilegios del PostgreSQL productivo.
- Una IP de hosting compartido puede publicar servicios de otros clientes o del proveedor; no se atribuyen a TheiaSport.

## Mapa lógico de arquitectura

```text
Internet
  ↓
DNS theiasport.cl                         [PROVEEDOR / OPERADOR]
  ↓
TLS + LiteSpeed/Apache + posible caché   [INFRAESTRUCTURA DEL PROVEEDOR]
  ↓
Passenger / Setup Node.js App            [PROVEEDOR + OPERADOR]
  ↓
cpanel-app.cjs → scripts/cpanel-entry.cjs
  ↓
deploy/cpanel/server.js
  ↓
Next.js 16 standalone / React 19         [APLICACIÓN]
  ├─ Server Components y Server Actions
  ├─ Route Handlers /api/*
  ├─ Auth.js: Google OAuth + Credentials
  ├─ PrismaPg → PostgreSQL
  ├─ filesystem public/uploads
  └─ SMTP o Resend                       [TERCEROS]
```

No se encontró CDN configurado, service worker, PWA, Nginx propio, `.htaccess` versionado ni reverse proxy administrado por el repositorio. LiteSpeed/Apache/Passenger se infieren de la respuesta y la documentación de cPanel, y pertenecen al hosting.

## Inventario técnico

| Área | Implementación verificada |
| --- | --- |
| Lenguaje | TypeScript/JavaScript, SQL generado por migraciones Prisma, shell de cPanel |
| Frontend/backend | Next.js 16.2.6 App Router, React 19.2.4, servidor Node 22 |
| Arquitectura | Monolito SSR/RSC con Route Handlers y Server Actions |
| Autenticación | Auth.js `next-auth` beta; Google OAuth y Credentials; sesión JWT |
| Autorización | Roles `ADMIN`, `COACH`, `MEMBER`; `getCurrentUser`/`requireAdmin` |
| ORM/DB | Prisma 7 + adapter-pg + PostgreSQL; no se encontró SQL raw |
| Storage | `public/uploads` servido por `/api/uploads/...` |
| Correo | Nodemailer SMTP o Resend HTTPS |
| APIs externas | Google OAuth, SMTP o Resend; Google avatar permitido en imágenes |
| Panel | `/admin/**`, con acciones de usuarios, planes, equipo, noticias, carreras y testimonios |
| Build | `next build` standalone; build cPanel dentro de Docker |
| Deploy | artefacto Git `deploy/cpanel` + `.cpanel.yml` + Passenger |
| CI/CD | no existe workflow automatizado en el repositorio |
| Caché | caché propia de Next, estáticos hasheados, posible LiteSpeed/navegador |

### Superficies públicas y privadas

| Superficie | Acceso esperado | Controles observados |
| --- | --- | --- |
| `/`, `/nosotros`, `/planes`, `/competencias`, noticias | Público | lectura Prisma; varias rutas `force-dynamic` |
| `/login`, `/registro`, recuperación/verificación | Público | Auth.js, tokens por correo, rate limiter en memoria |
| `POST /api/contact` | Público | validación mínima y escape HTML; sin máximos/rate limit |
| `GET /api/uploads/:folder/:file` | Público | regex de path/extensión; caché pública de un año |
| `/perfil`, avatar, revocar sesiones | Usuario activo | lookup DB y `sessionVersion`; avatar sin cuota |
| `/admin/**` | `ADMIN` activo | layout protegido; acciones protegidas; páginas hoja sin guard propio |
| `POST /api/admin/uploads` | `ADMIN` activo | rol comprobado; validación de imagen insuficiente |

## Puertos y servicios realmente atribuibles

| Contexto | Web | PostgreSQL | Host/binding | Conclusión |
| --- | ---: | ---: | --- | --- |
| `npm run dev` | `3000` | `5433` | `localhost` | flujo diario local |
| Red Compose | `3000` | `5432` | servicio `db` | comunicación interna entre contenedores |
| Host Compose | `3000 → 3000` | `5433 → 5432` | sin IP explícita, normalmente `0.0.0.0` | exposición local/LAN innecesaria |
| cPanel | variable `PORT` | proviene de `DATABASE_URL` | asignado por cPanel | no fijar el puerto local de desarrollo |
| Internet producción | 80/443 | desconocido | hosting compartido | no atribuir PostgreSQL escaneado a TheiaSport |

`5433` **no es el puerto interno de PostgreSQL ni hay evidencia de que sea producción**. Es el puerto del host local que Docker redirige a `db:5432`. Un respaldo histórico ignorado apunta a un host no-loopback por 5432, pero no prueba la configuración productiva vigente.

## Flujo de build y deployment

```text
src + package-lock.json
  ↓ npm run build:cpanel
Docker local (Node 22/Debian)
  ↓ next build output=standalone
deploy/cpanel
  ↓ commit manual de source + artefacto
GitHub main
  ↓ cPanel “Update from Remote”
  ↓ cPanel “Deploy HEAD Commit”
.cpanel.yml copia _next/static y toca tmp/restart.txt
  ↓ Passenger reinicia
LiteSpeed / caché Next / navegador
  ↓
https://theiasport.cl
```

`.cpanel.yml` no instala, no compila y no ejecuta migraciones. Solo verifica que exista algún artefacto, copia estáticos y solicita un reinicio. Por eso un cambio en `src` no llega a producción hasta regenerar y versionar `deploy/cpanel`.

En la rama auditada había seis cambios visuales sin commit y ningún cambio en `deploy/cpanel`. Por tanto, esos cambios no podían aparecer en la producción documentada desde `main`.

Razones respaldadas para “producción sigue vieja”, en orden práctico:

1. cambio sin commit o en una rama distinta de `main`;
2. `deploy/cpanel` no fue reconstruido;
3. el artefacto fue omitido del commit;
4. no se hizo merge/push a `main`;
5. se omitió una acción manual de cPanel;
6. la ruta absoluta apunta a otro checkout o acepta un artefacto anterior;
7. Passenger no reinició o el App Root/Startup File no coincide;
8. estáticos nuevos y proceso viejo quedaron mezclados durante el deploy;
9. caché LiteSpeed/navegador;
10. update falló por espacio/inodos del hosting.

No hay evidencia de service worker o CDN propio; no deben usarse como explicación sin nueva evidencia.

## Hallazgos detallados

### SEC-001 — Credenciales potencialmente activas en respaldos locales

**Severidad:** CRITICAL  
**Componente:** Gestión de secretos  
**Archivo:** `.env.backup`, `.env.backup.local`, `.env.development.local`  
**Línea:** múltiples; valores deliberadamente omitidos  
**OWASP:** A02 Cryptographic Failures

**Descripción**

Hay archivos ignorados por Git que contienen URL de base de datos, secreto de Auth.js, OAuth y SMTP con apariencia no-placeholder. El historial Git visible no contiene los valores configurados actuales y `.dockerignore` excluye `.env*`, pero mantener copias en texto plano dentro de un webroot de desarrollo aumenta el impacto de malware, backup inseguro, publicación accidental o una regla Apache incorrecta.

**Evidencia**

Se compararon hashes/valores exactos contra todos los commits disponibles y no hubo coincidencias. No se imprimió ningún valor. La vigencia no puede verificarse sin consultar los proveedores.

**Escenario de explotación**

Un atacante que obtenga lectura del equipo, de un backup o de una ruta `.env*` mal servida podría autenticarse contra servicios aún vigentes.

**Impacto**

Acceso a datos, secuestro de sesiones/OAuth, envío de correo y exposición de usuarios.

**Probabilidad**

Media hasta confirmar la vigencia; impacto crítico.

**Corrección recomendada**

Inventariar qué credenciales siguen activas; rotar DB, Auth, Google y SMTP/Resend; revisar logs; después eliminar las copias de forma segura con autorización; usar un gestor de secretos. Verificar desde Apache local que `.env*` devuelve 403/404.

**Código actual**

```dotenv
DATABASE_URL="***REDACTED***"
AUTH_SECRET="***REDACTED***"
AUTH_GOOGLE_SECRET="***REDACTED***"
SMTP_PASS="***REDACTED***"
```

**Código corregido**

```dotenv
# En el repositorio solo quedan placeholders.
AUTH_SECRET="REEMPLAZAR_EN_EL_GESTOR_DE_SECRETOS"
# Los valores reales viven únicamente en cPanel/secret manager.
```

### SEC-002 — Auth.js vulnerable

**Severidad:** CRITICAL  
**Componente:** Auth.js / autenticación  
**Archivo:** `package.json`, `package-lock.json`  
**Línea:** dependencias `next-auth`, `@auth/core`, `@auth/prisma-adapter`  
**OWASP:** A06 Vulnerable and Outdated Components; A07 Identification and Authentication Failures

**Descripción**

`next-auth 5.0.0-beta.31` resuelve `@auth/core 0.41.2`, afectado por avisos críticos de checks fail-open ante errores de configuración y normalización Unicode de correo, además de avisos high/moderate.

**Evidencia**

`npm audit` del 2026-08-21 identificó GHSA-8fpg-xm3f-6cx3, GHSA-7rqj-j65f-68wh, GHSA-xmf8-cvqr-rfgj y GHSA-x445-f3h2-j279. El artefacto cPanel contiene las mismas versiones.

**Escenario de explotación**

Según la ruta y configuración afectada, un error tratado como sesión truthy o una identidad Unicode normalizada de forma inconsistente puede romper una decisión de autenticación.

**Impacto**

Bypass de autenticación o vinculación incorrecta de identidad.

**Probabilidad**

Media. TheiaSport revalida usuario/estado/rol en DB, lo que reduce el primer caso, pero no elimina el riesgo de componentes vulnerables.

**Corrección recomendada**

Actualizar de forma controlada a `next-auth` beta.32 o posterior que resuelva `@auth/core >=0.41.3`; ejecutar tests de Credentials, Google, usuario inactivo, sesión revocada, Unicode y errores de DB; reconstruir `deploy/cpanel`.

**Código actual**

```json
"next-auth": "^5.0.0-beta.31"
```

**Código corregido**

```json
"next-auth": "5.0.0-beta.32"
```

### SEC-003 — Next.js y Nodemailer vulnerables

**Severidad:** HIGH  
**Componente:** Runtime y correo  
**Archivo:** `package.json`, `package-lock.json`  
**Línea:** `next`, `@next/env`, `eslint-config-next`, `nodemailer`  
**OWASP:** A06 Vulnerable and Outdated Components

**Descripción**

Next 16.2.6 está afectado por avisos high relacionados con proxy/middleware, Server Actions, SSRF, DoS, rewrites y caché. Nodemailer 7.0.13 está afectado por avisos de SMTP injection, TLS y opciones capaces de leer/solicitar recursos. La app no entrega opciones `raw` o transporte al usuario, por lo que parte del riesgo de Nodemailer no es directamente alcanzable.

**Evidencia**

`npm audit`: 19 paquetes afectados (3 critical, 12 high, 3 moderate, 1 low); en runtime, 16 (3 critical, 10 high, 3 moderate). El audit propuso Next 16.3.2 y Nodemailer 9.0.5.

**Escenario de explotación**

Una request especialmente construida contra una ruta afectada puede agotar workers o forzar un fetch inesperado. Una configuración de correo futura que exponga opciones vulnerables ampliaría el alcance.

**Impacto**

Indisponibilidad, SSRF o abuso del servidor/correo.

**Probabilidad**

Media para Next; baja-media para las ramas de Nodemailer hoy no expuestas.

**Corrección recomendada**

Actualizar Next a una versión corregida y Nodemailer en un cambio separado; revisar breaking changes del salto 7→9; probar standalone, imágenes, Server Actions, SMTP y Resend.

**Código actual**

```json
"next": "16.2.6",
"nodemailer": "^7.0.13"
```

**Código corregido**

```json
"next": "16.3.2",
"nodemailer": "9.0.5"
```

### SEC-004 — Lecturas admin autorizadas solo por un layout persistente

**Severidad:** HIGH  
**Componente:** Autorización del panel  
**Archivo:** `src/app/admin/layout.tsx`, `src/app/admin/**/page.tsx`  
**Línea:** layout 4-5; ejemplo usuarios 38-79  
**OWASP:** A01 Broken Access Control

**Descripción**

El layout ejecuta `requireAdmin`, pero las páginas hoja consultan datos sin repetirlo. Next.js 16 advierte que los layouts no se re-renderizan en cada transición cliente; el check debe vivir junto al acceso a datos.

**Evidencia**

Las trece páginas `admin/**/page.tsx` carecen de guard propio. `/admin/usuarios` consulta y renderiza ID, nombre, email, rol, estado y fecha. Las Server Actions sí reautorizan, por lo que el defecto es de lectura.

**Escenario de explotación**

Un admin abre el panel, otra sesión lo desactiva/demueve y, sin recargar, navega mediante `<Link>` a otra hoja. El layout puede permanecer y la hoja ejecutar su consulta sin validar el nuevo estado.

**Impacto**

Exposición de PII y contenido administrativo después de revocación.

**Probabilidad**

Media-alta durante sesiones administrativas activas.

**Corrección recomendada**

Ejecutar `await requireAdmin()` en cada página antes de consultar; evolucionar a un DAL `server-only` que autorice y devuelva DTO mínimo; mantener el check independiente en cada Action.

**Código actual**

```tsx
export default async function UsersPage() {
  const users = await prisma.user.findMany(/* ... */);
```

**Código corregido**

```tsx
export default async function UsersPage() {
  await requireAdmin('/admin/usuarios');
  const users = await prisma.user.findMany(/* ... */);
```

### SEC-005 — Rate limiting eludible y fail-open

**Severidad:** HIGH  
**Componente:** Login, registro, recuperación  
**Archivo:** `src/lib/rate-limit.ts`, `src/auth.ts`  
**Línea:** rate-limit 14-42; auth 54-68  
**OWASP:** A07 Identification and Authentication Failures; A04 Insecure Design

**Descripción**

Los contadores viven en un `Map` por proceso, una clave de login combina email+IP, se aceptan headers proxy sin una trust boundary y, al llegar a 10.000 claves, se ejecuta `store.clear()`. Reinicios o workers múltiples fragmentan los límites.

**Evidencia**

Pruebas locales controladas confirmaron que cambiar email o header cambia el cupo y que llenar 10.000 claves desbloquea una clave antes bloqueada. No se atacó producción.

**Escenario de explotación**

Un actor rota emails/IP declaradas o distribuye requests entre workers para password spraying. Muchas claves únicas fuerzan el borrado global; un email válido además consume bcrypt cost 12.

**Impacto**

Credential stuffing, spam de emails y CPU DoS.

**Probabilidad**

Alta si LiteSpeed no sanea headers o Passenger usa varios workers.

**Corrección recomendada**

Store compartido y atómico (Redis/DB/WAF), límites independientes por cuenta, IP y global, configuración explícita de proxies confiables, LRU/expiración que nunca borre límites activos y métricas 429.

**Código actual**

```ts
if (store.size >= 10_000) store.clear();
consumeRateLimit({ identifiers: [email, getClientAddress(headers)] });
```

**Código corregido**

```ts
await limiter.consume(`account:${hash(email)}`);
await limiter.consume(`ip:${trustedClientIp(request)}`);
// Store compartido; no hay clear global fail-open.
```

### SEC-006 — DoS y abuso de correo en contacto público

**Severidad:** HIGH  
**Componente:** `POST /api/contact`  
**Archivo:** `src/app/api/contact/route.ts`  
**Línea:** 26-83  
**OWASP:** A04 Insecure Design

**Descripción**

`request.json()` materializa el cuerpo antes de imponer límites; los campos solo tienen mínimos, el contenido se duplica en HTML/text/log y el envío de correo se espera dentro del request. No hay rate limit.

**Evidencia**

No existen máximos de nombre/email/mensaje, chequeo de `Content-Length`, lectura acotada ni cuota de correo.

**Escenario de explotación**

Requests anónimas grandes o concurrentes ocupan memoria/workers y agotan la cuota SMTP/Resend o llenan el buzón.

**Impacto**

Indisponibilidad y costes/abuso de correo.

**Probabilidad**

Alta: endpoint público y barato de descubrir.

**Corrección recomendada**

Limitar cuerpo en LiteSpeed y aplicación; leer stream hasta un máximo; límites 80/254/5000; rate limit persistente; timeout/cola de correo; CAPTCHA adaptativo.

**Código actual**

```ts
const body = await request.json();
const message = cleanField(body.message);
await sendEmail(/* contenido sin máximo */);
```

**Código corregido**

```ts
const body = await readJsonWithLimit(request, 8 * 1024);
assertMaxLength(body.message, 5_000);
await enforceRateLimit('contact', trustedIp);
```

### SEC-007 — Agotamiento de disco e image-bomb por avatares

**Severidad:** HIGH  
**Componente:** Avatar de perfil  
**Archivo:** `src/app/api/profile/avatar/route.ts`  
**Línea:** 17-43  
**OWASP:** A04 Insecure Design; A08 Software and Data Integrity Failures

**Descripción**

Cada upload crea un nombre con timestamp, nunca borra el anterior y confía en `File.type`. El recorte de cliente se puede omitir llamando la API. No hay cuota, frecuencia, magic bytes, decode ni límite de píxeles.

**Evidencia**

Un usuario activo puede repetir archivos únicos de hasta 2 MiB. Next Image/Sharp puede procesar después imágenes de dimensiones extremas.

**Escenario de explotación**

Una cuenta registrada llena disco/inodos o sube una imagen comprimida de dimensiones enormes para consumir CPU/memoria.

**Impacto**

Caída de la app compartida, pérdida de uploads o bloqueo por cuota.

**Probabilidad**

Alta sin controles del proveedor.

**Corrección recomendada**

Rate limit/cuota por usuario, reencode server-side con límite de píxeles, rechazo de vacío/corrupto, nombre estable o eliminación segura del anterior, storage externo con cuotas y alertas.

**Código actual**

```ts
const fileName = `${user.id}-${Date.now()}.${extension}`;
await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));
```

**Código corregido**

```ts
const normalized = await normalizeImage(file, { maxPixels: 12_000_000 });
await replaceUserAvatarAtomically(user.id, normalized);
```

### SEC-008 — HTTP no redirige obligatoriamente a HTTPS

**Severidad:** HIGH  
**Componente:** Transporte  
**Archivo:** configuración no versionada de LiteSpeed/cPanel  
**Línea:** no aplicable  
**OWASP:** A02 Cryptographic Failures; A05 Security Misconfiguration

**Descripción**

Una comprobación pasiva mostró `http://theiasport.cl/` con `200`, no `301/308` a HTTPS. La página de login y credenciales podrían ser solicitadas por HTTP antes de que una cookie `Secure` proteja la sesión.

**Evidencia**

HTTPS responde, pero no hay redirect obligatorio ni HSTS observado. Las cookies de Auth.js observadas en HTTPS sí incluían `HttpOnly`, `Secure` y `SameSite=Lax`.

**Escenario de explotación**

En una red hostil, un usuario que escriba el dominio sin esquema puede recibir/modificar contenido HTTP y entregar credenciales a una página alterada.

**Impacto**

Robo de credenciales o manipulación del sitio.

**Probabilidad**

Media; depende de hábitos y red del usuario.

**Corrección recomendada**

Configurar redirect 308 en LiteSpeed/Apache/cPanel; verificar todos los hosts; después añadir HSTS progresivo. Esta corrección pertenece principalmente al proveedor/operador, no debe simularse confiando ciegamente en `X-Forwarded-Proto`.

**Código actual**

```text
GET http://theiasport.cl/ → 200 OK
```

**Código corregido**

```text
GET http://theiasport.cl/* → 308 Location: https://theiasport.cl/*
Strict-Transport-Security: max-age=...   # después de validar subdominios
```

### SEC-009 — Artefacto productivo desincronizable del código

**Severidad:** HIGH  
**Componente:** Build/deployment  
**Archivo:** `scripts/build-cpanel.cjs`, `.cpanel.yml`, `deploy/cpanel`  
**Línea:** build 70-108; cpanel 4+  
**OWASP:** A08 Software and Data Integrity Failures

**Descripción**

Producción ejecuta un artefacto de ~139 MiB versionado manualmente. El build no genera un manifest commit→lockfile→BUILD_ID; `.cpanel.yml` acepta cualquier artefacto existente y el deploy no es atómico. No hay CI.

**Evidencia**

El artefacto contiene 2.259 archivos, incluidos 1.984 runtime `node_modules`. Los cambios visuales actuales no están reconstruidos en él. El `BUILD_ID` corresponde a un commit anterior.

**Escenario de explotación**

Un commit fuente revisado puede desplegar binarios viejos o un artefacto no revisado; estáticos y proceso pueden quedar de builds distintos.

**Impacto**

Parches de seguridad ausentes en producción, rollback confuso e integridad no demostrable.

**Probabilidad**

Alta: el flujo es manual y ya explica el síntoma observado.

**Corrección recomendada**

CI desde árbol limpio con `npm ci`, tests, lint, build, audit y manifest firmado/checksum; artefacto inmutable; validación del commit/BUILD_ID servido; staging y promoción/rollback atómicos cuando cPanel lo permita.

**Código actual**

```yaml
- test -f deploy/cpanel/server.js
- cp -a deploy/cpanel/.next/static/. public_html/_next/static/
```

**Código corregido**

```yaml
- verify-manifest --commit "$DEPLOYED_COMMIT" --lock package-lock.json
- promote-artifact-atomically deploy/cpanel
- smoke-check --expected-build-id "$BUILD_ID"
```

### SEC-010 — Validación débil de imágenes administrativas

**Severidad:** MEDIUM  
**Componente:** `POST /api/admin/uploads`  
**Archivo:** `src/app/api/admin/uploads/route.ts`  
**Línea:** 21-53  
**OWASP:** A08 Software and Data Integrity Failures

**Descripción**

La ruta verifica rol, carpeta, MIME declarado y tamaño, pero no firma, dimensiones, integridad ni metadata. Guarda bytes originales. El multipart ya fue materializado cuando se mide.

**Evidencia**

No se permiten SVG/HTML/JS, el nombre es generado y no hay traversal; no se confirmó RCE. El riesgo es archivo corrupto/polyglot, EXIF y consumo de recursos.

**Escenario de explotación**

Un admin comprometido o request alterada carga una imagen corrupta/extrema que luego procesa el runtime.

**Impacto**

CPU/memoria, filtración de EXIF y contenido inconsistente.

**Probabilidad**

Media-baja por requerir admin.

**Corrección recomendada**

Validador único: magic/decode, límite de píxeles, rotate/reencode, metadata eliminada y límite de multipart en proxy.

**Código actual**

```ts
if (!allowedTypes.includes(file.type)) return badRequest();
await writeFile(target, Buffer.from(await file.arrayBuffer()));
```

**Código corregido**

```ts
const image = await decodeAndNormalize(file, limits);
await writeFile(target, image.bytes);
```

### SEC-011 — Cabeceras HTTP defensivas ausentes

**Severidad:** MEDIUM  
**Componente:** Next.js/LiteSpeed  
**Archivo:** `next.config.ts`, `deploy/cpanel/.next/routes-manifest.json`  
**Línea:** config 3-27; manifest `headers: []`  
**OWASP:** A05 Security Misconfiguration

**Descripción**

No se configura CSP, `frame-ancestors`/X-Frame-Options, nosniff, Referrer-Policy ni Permissions-Policy; `X-Powered-By: Next.js` está activo. Producción tampoco presentó estas defensas.

**Evidencia**

Inspección del config, artefacto y respuestas pasivas. No se detectó XSS actual, por lo que son defensa en profundidad ante fallos futuros y clickjacking.

**Escenario de explotación**

Un sitio externo enmarca formularios o un futuro upload/XSS obtiene mayor capacidad por falta de restricciones.

**Impacto**

Clickjacking, MIME sniffing y mayor impacto de inyección.

**Probabilidad**

Media para clickjacking; condicionada para XSS.

**Corrección recomendada**

Desactivar banner; añadir headers seguros; comenzar CSP mínima o Report-Only, verificar Google/Next y endurecer por etapas. HSTS solo después de SEC-008.

**Código actual**

```ts
const nextConfig = { output: 'standalone' };
```

**Código corregido**

```ts
const nextConfig = {
  poweredByHeader: false,
  async headers() { return securityHeaders; },
};
```

### SEC-012 — Tokens bearer se propagan en URLs

**Severidad:** MEDIUM  
**Componente:** Verificación y recuperación de contraseña  
**Archivo:** rutas/actions de `verify-email` y `recuperar-contrasena`  
**Línea:** verify 24-32, 105-108; reset 60-67, 102-104  
**OWASP:** A02 Cryptographic Failures

**Descripción**

Tokens de hasta 24 h/1 h aparecen en query strings y se reinyectan en redirects de éxito/error. Pueden quedar en historial, request logs y Referer same-origin.

**Evidencia**

Los tokens son 32 bytes aleatorios y se guardan SHA-256, lo cual es correcto; el problema es el transporte/repropagación de la copia bearer.

**Escenario de explotación**

Alguien con acceso a historial o logs reutiliza el enlace antes de su consumo/expiración.

**Impacto**

Toma de cuenta o verificación no autorizada.

**Probabilidad**

Media-baja, dependiendo de logs y dispositivo compartido.

**Corrección recomendada**

Intercambiar el token una sola vez por cookie HttpOnly/Secure/SameSite o fragmento+POST, limpiar URL inmediatamente, `Cache-Control: no-store`, `Referrer-Policy: no-referrer` y redacción de logs.

**Código actual**

```ts
redirect(`/recuperar-contrasena?token=${token}&error=...`);
```

**Código corregido**

```ts
await exchangeTokenForHttpOnlyFlowCookie(token);
redirect('/recuperar-contrasena');
```

### SEC-013 — Enumeración de cuentas y estados

**Severidad:** MEDIUM  
**Componente:** Registro/login  
**Archivo:** `src/app/api/auth/register/route.ts`, `src/auth.ts`  
**Línea:** register 54-65, 139-145; auth 64-68  
**OWASP:** A07 Identification and Authentication Failures

**Descripción**

Registro diferencia cuenta verificada/OAuth mediante 409 y textos distintos; login omite bcrypt en usuarios inexistentes/no válidos, generando un canal temporal.

**Evidencia**

Las respuestas y ramas son distintas. Recuperación, positivamente, usa mensaje genérico.

**Escenario de explotación**

Un actor consulta correos candidatos y prioriza cuentas reales para phishing o credential stuffing.

**Impacto**

Privacidad y aumento de eficacia de ataques de cuenta.

**Probabilidad**

Media.

**Corrección recomendada**

Mismo status/body para cuenta nueva/existente/inactiva/OAuth, aviso out-of-band y dummy bcrypt de coste comparable; telemetría interna sin variar la respuesta.

**Código actual**

```ts
return NextResponse.json({ message: 'Ya existe...' }, { status: 409 });
```

**Código corregido**

```ts
return NextResponse.json(GENERIC_REGISTRATION_RESPONSE, { status: 202 });
```

### SEC-014 — Sin MFA/step-up y política de contraseña incompleta

**Severidad:** MEDIUM  
**Componente:** Cuentas y acciones sensibles  
**Archivo:** `src/auth.ts`, `src/app/perfil/actions.ts`, `src/app/admin/usuarios/actions.ts`  
**Línea:** perfil 45-67; usuarios 14-52  
**OWASP:** A07 Identification and Authentication Failures

**Descripción**

No hay MFA. Un usuario OAuth sin password puede fijar una con una sesión actual sin reautenticar Google/correo. Acciones de rol no exigen autenticación reciente. Password solo exige 8 caracteres, sin máximo de 72 bytes de bcrypt.

**Evidencia**

El esquema no contiene factores; bcrypt cost 12 y salts son positivos. bcrypt trunca después de 72 bytes, por lo que sufijos distintos pueden equivaler.

**Escenario de explotación**

Una cookie robada de admin se convierte en persistencia mediante nueva contraseña o cambio de privilegios.

**Impacto**

Toma persistente de cuenta y administración.

**Probabilidad**

Media-baja, pero de alto valor para admin.

**Corrección recomendada**

WebAuthn/TOTP obligatorio para ADMIN, `auth_time`/step-up de 5–10 minutos, reauth Google/enlace de correo al crear password, máximo explícito en bytes o migración a Argon2id y chequeo de passwords comprometidas.

**Código actual**

```ts
if (newPassword.length < 8) return error;
const hash = await bcrypt.hash(newPassword, 12);
```

**Código corregido**

```ts
await requireRecentMfa(currentUser);
validatePasswordBytes(newPassword, { min: 12, max: 72 });
```

### SEC-015 — Avatares públicos y uploads personales en Git/artefacto

**Severidad:** MEDIUM  
**Componente:** Privacidad y almacenamiento  
**Archivo:** `public/uploads`, `deploy/cpanel/public/uploads`, ruta GET de uploads  
**Línea:** uploads route 5-20; `.gitignore` 43-46  
**OWASP:** A01 Broken Access Control; A02 Cryptographic Failures

**Descripción**

La descarga no exige sesión y usa caché pública inmutable de un año, incluso para `profiles`. Hay doce uploads ya rastreados y duplicados en el artefacto, incluida una imagen de perfil.

**Evidencia**

`.gitignore` impide nuevos archivos pero no retira los rastreados. Una URL conocida sigue siendo pública y puede persistir en caché.

**Escenario de explotación**

Clones, artefactos o cachés conservan fotografías tras cambiarlas/desactivar la cuenta.

**Impacto**

Retención no controlada y exposición de PII.

**Probabilidad**

Media; depende de si el producto declara avatares públicos.

**Corrección recomendada**

Definir política de privacidad; separar editorial de perfiles; `private, no-store` o autorización para perfiles; storage fuera del checkout; migrar y purgar historial solo con procedimiento coordinado.

**Código actual**

```ts
'Cache-Control': 'public, max-age=31536000, immutable'
```

**Código corregido**

```ts
const cache = folder === 'profiles' ? 'private, no-store' : 'public, max-age=31536000, immutable';
```

### SEC-016 — TLS, privilegios y pooling de PostgreSQL no verificables

**Severidad:** MEDIUM  
**Componente:** PostgreSQL/Prisma  
**Archivo:** `src/lib/prisma.ts`, variable runtime `DATABASE_URL`  
**Línea:** prisma 53  
**OWASP:** A02 Cryptographic Failures; A05 Security Misconfiguration

**Descripción**

El código entrega solo `connectionString` a `PrismaPg`; SSL, CA, timeouts, pool y rol dependen de la URL/defaults. Git no contiene el runtime de cPanel. Un respaldo histórico no-loopback no mostró `sslmode`, pero no prueba producción.

**Evidencia**

No hay parámetros explícitos ni documentación del rol mínimo. Ocho migraciones Prisma existen; no hay SQL raw.

**Escenario de explotación**

Si DB cruza una red no confiable sin validación TLS o usa un superusuario, una filtración/compromiso de app tiene impacto ampliado.

**Impacto**

Intercepción de datos o control excesivo de DB.

**Probabilidad**

Desconocida hasta revisar cPanel/proveedor.

**Corrección recomendada**

Verificar host/puerto real, CA y `sslmode`, rol no-superuser con privilegios mínimos, pool/timeouts y firewall. No añadir `sslmode=require` ciegamente sin validar certificados/soporte.

**Código actual**

```ts
new PrismaPg({ connectionString: process.env.DATABASE_URL });
```

**Código corregido**

```ts
new PrismaPg({
  connectionString: validatedDatabaseUrl,
  max: validatedPoolLimit,
  connectionTimeoutMillis: 10_000,
});
```

### SEC-017 — Docker publica web y PostgreSQL en todas las interfaces

**Severidad:** MEDIUM  
**Componente:** Docker Compose local  
**Archivo:** `docker-compose.yml`  
**Línea:** 18 y 50  
**OWASP:** A05 Security Misconfiguration

**Descripción**

Mappings sin IP (`5433:5432` y el mapping web) normalmente escuchan en `0.0.0.0`. PostgreSQL local usa superusuario y contraseña conocida apropiada solo para un entorno aislado.

**Evidencia**

Configuración Compose. El daemon estaba detenido durante la revisión, por lo que no se afirma que los sockets estuvieran activos.

**Escenario de explotación**

Otro equipo de la LAN accede al Postgres de desarrollo o a la web si el firewall lo permite.

**Impacto**

Datos locales y estación de trabajo expuestos.

**Probabilidad**

Media en redes compartidas.

**Corrección recomendada**

Bind a loopback en desarrollo; para el laboratorio crear un override explícito que bindee solo a la IP de la red privada de VirtualBox.

**Código actual**

```yaml
- "5433:5432"
- "3000:3000"
```

**Código corregido**

```yaml
- "127.0.0.1:5433:5432"
- "127.0.0.1:3000:3000"
```

### SEC-018 — Supply chain sin CI, SBOM ni imágenes inmutables

**Severidad:** MEDIUM  
**Componente:** Supply chain/CI  
**Archivo:** `Dockerfile`, `docker-compose.yml`, ausencia de `.github/workflows`  
**Línea:** Dockerfile 1, 3, 13; Compose 13  
**OWASP:** A08 Software and Data Integrity Failures

**Descripción**

Lockfile v3 y `npm ci` son controles positivos. Sin embargo, imágenes usan tags mutables, apt no fija versiones y no hay CI, SBOM, firma, attestation ni escaneo de imagen. El build usa `npm ci --no-audit` sin gate posterior.

**Evidencia**

Tags `docker/dockerfile:1`, `node:22-bookworm-slim`, `postgres:16-alpine`; lifecycle scripts esperables de Prisma, Sharp y `unrs-resolver`; no se encontraron dependencias Git/HTTP sospechosas.

**Escenario de explotación**

El mismo commit puede resolver una base distinta o desplegar dependencias vulnerables sin que falle el proceso.

**Impacto**

Build no reproducible y riesgo de dependencia/imagen comprometida.

**Probabilidad**

Media.

**Corrección recomendada**

CI con lockfile, audit/SCA, escaneo de imagen, SBOM CycloneDX/SPDX, digests actualizados por bot y manifest de procedencia.

**Código actual**

```dockerfile
FROM node:22-bookworm-slim
```

**Código corregido**

```dockerfile
FROM node:22-bookworm-slim@sha256:<digest-aprobado>
```

### SEC-019 — Lectura completa de imágenes y consultas públicas dinámicas

**Severidad:** MEDIUM  
**Componente:** Disponibilidad  
**Archivo:** `src/lib/uploads.ts`, páginas públicas y helpers de datos  
**Línea:** uploads 30; varias páginas `force-dynamic`  
**OWASP:** A04 Insecure Design

**Descripción**

Cada GET de imagen usa `readFile`, copiando el archivo completo a memoria. Varias páginas públicas fuerzan render dinámico y consultan PostgreSQL por visita; algunos errores de DB se silencian.

**Evidencia**

No hay streaming/stat máximo/ETag propio ni caché de datos públicos. Los límites de escritura no cubren archivos manuales existentes.

**Escenario de explotación**

Requests concurrentes a imágenes y páginas amplifican memoria, I/O y conexiones DB.

**Impacto**

Indisponibilidad en hosting con recursos limitados.

**Probabilidad**

Media.

**Corrección recomendada**

Servir activos desde LiteSpeed/object storage o streaming con `stat`; ETag; cache/revalidate de contenido público; pool/timeouts y métricas.

**Código actual**

```ts
const file = await readFile(path);
export const dynamic = 'force-dynamic';
```

**Código corregido**

```ts
// Asset server/object storage + respuesta condicional.
export const revalidate = 300;
```

### SEC-020 — Carreras en tokens de un uso y último administrador

**Severidad:** LOW  
**Componente:** Consistencia transaccional  
**Archivo:** recuperación/verificación y `admin/usuarios/actions.ts`  
**Línea:** reset 107-157; usuarios 27-52  
**OWASP:** A04 Insecure Design

**Descripción**

El token se lee antes de la transacción que actualiza/borrar; dos requests concurrentes pueden validarlo. El conteo de admins y la democión ocurren fuera de una transacción serializable, permitiendo que dos admins se demuevan mutuamente.

**Evidencia**

Patrón check-then-act sin lock/conditional delete.

**Escenario de explotación**

Dos POST simultáneos usan el mismo token o dejan cero administradores.

**Impacto**

Último password gana o bloqueo operativo del panel.

**Probabilidad**

Baja, requiere concurrencia precisa.

**Corrección recomendada**

Consumir token condicionalmente dentro de transacción y exigir `count=1`; transacción serializable/advisory lock para último admin con retry.

**Código actual**

```ts
const token = await prisma.passwordResetToken.findUnique(...);
await prisma.$transaction([updateUser, deleteManyTokens]);
```

**Código corregido**

```ts
await prisma.$transaction(async (tx) => {
  const consumed = await tx.passwordResetToken.deleteMany({ where: validToken });
  if (consumed.count !== 1) throw new InvalidTokenError();
  await tx.user.update(/* ... */);
}, { isolationLevel: 'Serializable' });
```

### SEC-021 — URLs de inscripción sin allowlist de protocolo

**Severidad:** LOW  
**Componente:** Competencias  
**Archivo:** `src/app/admin/competencias/actions.ts`, `EventCard.tsx`, `UpcomingRaces.tsx`  
**Línea:** action 13-23; render 55-60/81-87  
**OWASP:** A03 Injection

**Descripción**

`type=url` solo valida en UI; el Action guarda cualquier string y luego se usa como `href`. React 19 bloquea `javascript:` y se usa `noopener noreferrer`, por lo que no se confirmó XSS, pero quedan esquemas inesperados/phishing.

**Evidencia**

No hay `new URL` ni allowlist `https:` en servidor.

**Escenario de explotación**

Un admin equivocado/comprometido publica `data:`, `file:` o un dominio de phishing.

**Impacto**

Redirección del usuario a contenido no confiable.

**Probabilidad**

Baja, requiere privilegios admin.

**Corrección recomendada**

Aceptar solo HTTPS (y HTTP solo si existe necesidad documentada), opcionalmente dominios permitidos.

**Código actual**

```ts
registrationUrl: String(formData.get('registrationUrl') ?? '').trim() || null
```

**Código corregido**

```ts
registrationUrl: parseAllowedExternalUrl(value, ['https:'])
```

### SEC-022 — Route Handlers con estado sin comprobación explícita de Origin

**Severidad:** LOW  
**Componente:** Avatar, upload admin, revoke  
**Archivo:** tres Route Handlers `POST`  
**Línea:** avatar 10-45; admin upload 10-55; revoke 5-17  
**OWASP:** A01 Broken Access Control / CSRF

**Descripción**

Estas rutas autentican por cookie pero no comprueban `Origin`. `SameSite=Lax` mitiga sitios cross-site normales, pero no necesariamente un subdominio sibling comprometido. Las Server Actions no se incluyen: Next 16 compara Origin/Host automáticamente.

**Evidencia**

No hay helper same-origin en Route Handlers. No se confirmó un subdominio no confiable.

**Escenario de explotación**

Un origen same-site comprometido envía un POST con cookies del usuario.

**Impacto**

Revocación de sesiones o escritura de archivo según rol.

**Probabilidad**

Baja y condicional.

**Corrección recomendada**

Comprobar Origin contra un origen canónico configurado, no contra Host arbitrario; token CSRF si se admiten orígenes múltiples.

**Código actual**

```ts
export async function POST(request: Request) {
  const user = await getCurrentUser();
```

**Código corregido**

```ts
assertCanonicalSameOrigin(request);
const user = await getCurrentUser();
```

### SEC-023 — Logging sensible en desarrollo y baja trazabilidad

**Severidad:** LOW  
**Componente:** Logging/monitorización  
**Archivo:** `src/lib/email-verification.ts`, contacto, helpers de contenido  
**Línea:** email 91-93, 157, 186; contact 82  
**OWASP:** A09 Security Logging and Monitoring Failures

**Descripción**

En desarrollo se imprimen URLs completas con tokens y mensajes/PII. En producción algunos errores se silencian y no hay audit log estructurado para cambios admin, uploads, bloqueos o revocaciones.

**Evidencia**

El logging sensible está condicionado a `NODE_ENV !== 'production'`, control positivo, pero sigue exponiendo bearer tokens en terminales/CI locales.

**Escenario de explotación**

Un tercero con acceso a logs de desarrollo reutiliza un token; un incidente productivo no puede atribuirse por falta de actor/target/request-id.

**Impacto**

Toma de cuenta local y baja capacidad de respuesta.

**Probabilidad**

Baja-media.

**Corrección recomendada**

Mailpit/MailHog para desarrollo o redacción; eventos estructurados con actor, acción, target, resultado y request-id; nunca password/token/body completo; retención y acceso mínimos.

**Código actual**

```ts
console.info(`[email] ${devUrl}`);
```

**Código corregido**

```ts
securityLogger.info({ event: 'email.generated', purpose, recipientHash });
```

## Dependencias vulnerables

| Paquete/componente | Versión observada | Severidad | Aviso/riesgo resumido | Objetivo corregido | Breaking change |
| --- | --- | --- | --- | --- | --- |
| `next-auth` / `@auth/core` | beta.31 / 0.41.2 | CRITICAL | checks fail-open, Unicode email, Bearer/OAuth cookies | beta.32+ / core 0.41.3+ | beta; probar todos los flujos |
| `next` | 16.2.6 | HIGH | proxy bypass, Server Action DoS/SSRF, rewrite/cache issues | 16.2.11 mínimo; audit propone 16.3.2 | minor; revisar docs 16 y standalone |
| `nodemailer` | 7.0.13 | HIGH | SMTP injection/TLS/opciones de lectura/SSRF | 9.0.5 | sí, major |
| Prisma toolchain | 7.8.0 | HIGH/MEDIUM transitivo | tooling/build transitivo | 7.9.1 | patch, regenerar cliente |
| `sharp` | 0.34.5 transitivo | HIGH | avisos del procesamiento de imágenes | versión resuelta por Next corregido / 0.35+ | probar binario Linux |
| `nanoid`, PostCSS y transitivas | según lockfile | HIGH/MODERATE/LOW | avisos transitivos | resolver mediante padres | variable |

No se ejecutará `npm audit fix --force`. Cada grupo debe actualizarse y probarse separadamente. El artefacto cPanel debe reconstruirse al final; cambiar solo el lockfile no parchea producción.

### Estado posterior a la remediación controlada

| Paquete/uso | Versión final en source | Estado |
| --- | --- | --- |
| `next` / tooling Next | 16.3.2 | avisos de Next eliminados del audit |
| `next-auth` / `@auth/core` | beta.32 / 0.41.3 | avisos críticos iniciales eliminados; high residual heredado de peer mail |
| `@auth/prisma-adapter` | 2.11.3 | actualizado; hereda peer residual |
| Prisma client/adapter/CLI | 7.9.1 | actualizado; high de config/tooling residual |
| SMTP usado por TheiaSport | alias `nodemailer-v9` 9.0.5 | corregido y endurecido |
| Peer opcional de Auth.js | `nodemailer` 8.0.11 | residual; provider Email de Auth.js no configurado |

`npm audit fix` sin `--force` corrigió transitivas seguras (`js-yaml`, `brace-expansion`, Babel y otras). Resultado final completo y runtime: **0 critical, 7 high, 0 moderate, 0 low**. Los siete high corresponden a las cadenas Auth.js→Nodemailer peer y Prisma config→deepmerge; no existe una corrección compatible publicada en el árbol actual. No se aceptó el downgrade/`--force` sugerido por npm.

## Controles positivos y falsos positivos descartados

- Prisma se usa mediante APIs parametrizadas; no se encontró `$queryRaw`, `$executeRaw` ni SQL concatenado alcanzable.
- No se encontró `exec`, `eval`, shell dinámico desde requests, template injection ni deserialización insegura.
- No se encontró `dangerouslySetInnerHTML`; React escapa contenido y los templates de email usan escape HTML.
- No se confirmó SSRF: hosts de correo son configuración, Resend es fijo y Next Image limita host remoto a Google; IP local remota no está habilitada.
- Escritura de uploads genera nombre/carpeta controlados y excluye SVG/HTML/JS; regex de lectura bloquea traversal.
- Google exige `email_verified`; callback URL se reduce a rutas internas y tiene tests contra `https:`, `//`, backslash y `javascript:`.
- Tokens de email: 32 bytes aleatorios, SHA-256 almacenado y expiración; no necesitan salt por su entropía.
- Passwords: bcrypt con salt y cost 12; nunca plaintext.
- Sesión JWT se revalida contra DB, estado y `sessionVersion`; los errores de DB fallan cerrados y existen 9 tests.
- Perfil usa el ID de la sesión; no se encontró IDOR horizontal.
- Todas las Server Actions administrativas reejecutan `requireAdmin`; ocultar botones no es el control usado.
- Auth.js maneja cookies con `HttpOnly`, `Secure` en HTTPS y `SameSite=Lax`; se observaron flags seguros sin registrar valores.
- Server Actions de Next 16 comparan Origin/Host; SEC-022 aplica solo a Route Handlers propios.
- Runner Docker usa `USER node`; `.dockerignore` excluye `.env*`; source maps productivos están desactivados.

## Responsabilidades separadas

### Aplicación/repositorio TheiaSport

- dependencias, validación, autorización y rate limiting de aplicación;
- Dockerfile/Compose, lockfile y scripts;
- construcción e integridad de `deploy/cpanel`;
- headers que pueda emitir Next.js;
- almacenamiento lógico y retención de uploads;
- parámetros de conexión admitidos, migraciones y usuario mínimo solicitado;
- tests, logging de seguridad, CI/SBOM/provenance.

### Operador de TheiaSport en cPanel

- merge/push de `main` y regeneración del artefacto;
- App Root, Startup File y variables runtime;
- rotación de secretos, migraciones y backups;
- restart, purga de caché disponible y verificación de BUILD_ID;
- comprobar host/puerto/SSL/rol de PostgreSQL sin revelar la URL;
- revisar logs y coordinar purga de uploads/historial.

### INFRAESTRUCTURA DEL PROVEEDOR

- DNS/TLS, redirect HTTP→HTTPS si se configura en el servidor y HSTS en edge;
- LiteSpeed/Apache/Passenger, WAF/ModSecurity y saneamiento de headers proxy;
- firewall y exposición real de PostgreSQL;
- certificados/red del servicio PostgreSQL;
- límites de procesos, memoria, disco, inodos y correo;
- servicios compartidos HTTP, mail, MariaDB o PostgreSQL observados en la IP;
- caché del hosting y logs de acceso del servidor.

Estos servicios no deben atribuirse a TheiaSport sin confirmación del proveedor.

## Estado de validación final de la rama

- `npm run test:security`: 20/20 aprobados.
- `npm run lint`: aprobado.
- `npm run db:generate`: cliente Prisma 7.9.1 generado.
- `npm run db:validate`: aprobado.
- `npm run build`: aprobado con Next.js 16.3.2.
- `npm ls nodemailer nodemailer-v9 --all`: árbol válido; app en 9.0.5 y peer Auth en 8.0.11.
- `npm audit`: 0 critical, 7 high, 0 moderate, 0 low (antes 3/12/3/1).
- `npm audit --omit=dev`: 0 critical, 7 high, 0 moderate, 0 low (antes 3/10/3/0 aproximadamente según reporte inicial).
- `docker compose ... config --quiet`: Compose base y laboratorio válidos; solo apareció una advertencia de acceso al config local de Docker dentro del sandbox.
- Smoke local del source: `/login` 200 con headers y sin `X-Powered-By`; contacto 415/400; admin 307; avatar sin sesión 401.
- Verificación visual en navegador integrado: no disponible en esta sesión; se compensó con build, tests y requests HTTP locales.
- `deploy/cpanel`: pendiente de reconstrucción Linux/Docker; producción no queda parchada hasta completar ese paso.
