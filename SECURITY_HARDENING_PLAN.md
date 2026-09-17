# Plan de hardening de TheiaSport (histórico)

> Este plan fue redactado para el despliegue anterior en cPanel. Se conserva
> como registro de seguridad; las instrucciones de publicación vigentes están
> en `docs/despliegue-servidor.md`.

**Derivado de:** `SECURITY_AUDIT.md`  
**Fecha:** 2026-08-21

## Principios de ejecución

- Cambios pequeños, revisables y reversibles; una categoría de riesgo por commit cuando sea posible.
- No retirar funcionalidades para “resolver” un hallazgo.
- No ejecutar `npm audit fix --force` ni actualizaciones mayores en bloque.
- Antes de cada deploy: tests, lint, build standalone, validación Prisma, audit y smoke tests.
- El artefacto `deploy/cpanel` se genera **solo después** de aprobar source y lockfile.
- Credenciales y cambios de proveedor se coordinan fuera de Git y nunca se registran en tickets/logs.
- Las pruebas ofensivas se realizan únicamente en local/laboratorio.

## Criterios globales de salida

Un cambio queda listo para producción cuando:

1. tiene test de regresión proporcional al riesgo;
2. `npm run test:auth` y/o suite de seguridad aprueba;
3. `npm run lint` aprueba;
4. `npm run db:validate` aprueba si toca datos;
5. `npm run build` y `npm run build:cpanel` aprueban si toca runtime;
6. `npm audit --omit=dev` no conserva vulnerabilidades corregibles del cambio;
7. se prueba login Credentials, Google, perfil, admin, uploads y contacto según corresponda;
8. source, lockfile, manifest y `deploy/cpanel` apuntan al mismo commit;
9. existe rollback documentado y smoke check post-deploy;
10. no se sobrescriben los seis cambios visuales preexistentes de la rama.

## Estado de implementación al 2026-08-21

**Completado en source/lockfile:**

- guard propio en las 13 páginas admin y test de regresión;
- Next 16.3.2, Auth.js beta.32/core 0.41.3, adapter 2.11.3 y Prisma 7.9.1;
- Nodemailer 9.0.5 para el SMTP de TheiaSport, con timeouts y acceso file/URL deshabilitado;
- headers defensivos iniciales y banner desactivado;
- Compose base ligado a loopback, Compose/plantilla de laboratorio;
- allowlist HTTPS para URLs de inscripción;
- 20 tests de seguridad, lint, Prisma y build aprobados.

**Mitigación parcial, requiere la solución definitiva del plan:**

- rate limiter: límites cuenta/IP y fail-closed, pero todavía por proceso;
- contacto: body/campos/tasa/timeouts locales, pero falta proxy/WAF/store compartido/cola;
- uploads: firma/tamaño/tasa/retención acotada, pero falta decode/reencode, píxeles y storage externo;
- dependencias: 0 critical; quedan 7 high sin fix compatible en peers Auth.js y tooling Prisma.

**Pendiente externo/operacional:**

- rotación y eliminación segura de secretos;
- redirect HTTPS/HSTS;
- comprobar TLS/rol/pool/firewall de PostgreSQL;
- CI, SBOM, manifest y promoción atómica;
- MFA/step-up, tokens fuera de URL y logging durable;
- reconstruir `deploy/cpanel`. Docker Desktop estaba detenido; el artefacto versionado continúa viejo.

## Fase A — Críticas

### A1. Rotar secretos potencialmente vigentes (SEC-001)

**Responsable:** propietario de TheiaSport + cPanel/proveedores.  
**No automatizable desde el repositorio.**

Orden seguro:

1. inventariar, sin copiar valores, DB, Auth.js, Google OAuth, SMTP y Resend;
2. comprobar cuál sigue vigente y dónde se usa;
3. crear credencial nueva con privilegio mínimo;
4. actualizar cPanel y servicios consumidores;
5. reiniciar y verificar login/correo/DB;
6. revocar la anterior;
7. revisar logs desde la primera fecha posible;
8. con autorización, eliminar de forma segura `.env.backup*` y migrar a gestor de secretos.

**Verificación:** el secreto anterior falla, el nuevo funciona, Git/history/artifact no contienen ninguno y Apache local devuelve 403/404 para `.env*`.

### A2. Actualizar Auth.js (SEC-002)

**Cambio acotado:** beta.31 → beta.32 o posterior que resuelva `@auth/core >=0.41.3`.

Pruebas obligatorias:

- login correcto/incorrecto y usuario inexistente;
- usuario inactivo y `sessionVersion` revocada;
- error temporal de DB falla cerrado y luego recupera;
- Google con `email_verified=false` rechazado;
- emails Unicode/case normalization sin colisión;
- callback externo bloqueado;
- cookies `HttpOnly`, `Secure`, `SameSite=Lax` en HTTPS;
- logout y revocación de todas las sesiones.

**Rollback:** lockfile anterior + artefacto anterior, nunca mezclar uno con otro.

## Fase B — Altas

### B1. Autorizar en cada página administrativa (SEC-004)

- Añadir `await requireAdmin('/ruta')` antes de la primera consulta en cada `admin/**/page.tsx`.
- Mantener el guard del layout como UX/defensa adicional.
- Mantener autorización independiente en cada Server Action/Route Handler.
- Añadir test estructural inmediato y E2E posterior de navegación parcial tras revocación.

**Aceptación:** un admin revocado en una segunda sesión no puede leer otra hoja mediante `<Link>`, request RSC directo ni refresh; no aparece PII en HTML/RSC.

### B2. Sustituir el rate limiter (SEC-005)

**Mitigación inmediata:** no ejecutar `store.clear()`; compactar expirados/LRU sin desbloquear claves activas; documentar trust proxy y límites separados por cuenta/IP.

**Solución productiva:** Redis, tabla PostgreSQL atómica o WAF del proveedor:

| Flujo | Cuenta | IP | Global sugerido |
| --- | --- | --- | --- |
| Login | 5/15 min + backoff | 30/15 min | alarma por tasa |
| Registro | 3/h | 10/h | cuota correo |
| Reset/verificación | 3/h | 10/h | cuota correo |
| Contacto | n/a | 5/10 min | cuota SMTP |
| Avatar | 5/10 min | 20/h | cuota storage |
| Upload admin | 30/h por admin | 60/h | alerta |

Los números deben ajustarse con métricas reales. No confiar en `X-Real-IP`/XFF hasta que el proveedor confirme que elimina valores del cliente y reconstruye el header.

**Aceptación:** dos workers comparten el contador; reinicio no lo borra; spoofing de header no cambia la identidad; presión de claves no abre límites previos.

### B3. Acotar contacto público (SEC-006)

- `Content-Type` estricto y lectura streaming con límite de bytes.
- Máximos de nombre 80, email 254 y mensaje 5.000 caracteres.
- Límite de cuerpo también en LiteSpeed/ModSecurity.
- Rate limit compartido, CAPTCHA adaptativo y cuota de proveedor.
- Timeout/cola de correo; no registrar mensaje completo.

**Aceptación:** 413 para cuerpo grande, 400 para campos largos, 429 tras cuota; proveedor bloqueado termina dentro del timeout.

### B4. Normalizar y limitar avatares (SEC-007)

- Rechazar vacío, MIME falso, imagen corrupta y dimensiones/píxeles excesivos.
- Decodificar, rotar y re-encodear en servidor eliminando metadata.
- Nombre estable o borrado seguro del objeto anterior.
- Cuota por usuario, tasa y cuota global de disco/inodos.
- Mover storage fuera del checkout; alertar al 70/85/95 %.

**Aceptación:** el segundo avatar no aumenta objetos retenidos; corrupto/extremo devuelve 415/422; N requests terminan en 429/cuota.

### B5. Forzar HTTPS con el proveedor (SEC-008)

1. redirect 308 de todos los hosts HTTP al HTTPS canónico;
2. comprobar OAuth callback y assets sin loops;
3. iniciar HSTS corto (`max-age=300`), observar;
4. aumentar gradualmente; `includeSubDomains/preload` solo tras auditar subdominios.

**Aceptación:** ningún endpoint responde contenido por HTTP; cookies auth siempre Secure; no hay mixed content.

### B6. Integridad de build/deploy (SEC-009)

- CI construye desde commit limpio con Node 22 y `npm ci`.
- Manifest dentro del artefacto: commit, hash lockfile, BUILD_ID, fecha y versiones; sin secretos.
- Un solo artefacto inmutable promovido; checksum/SBOM y, si es viable, firma.
- `.cpanel.yml` verifica manifest y hace staging/promoción antes de restart.
- Endpoint/archivo de versión no sensible para smoke check autenticado u operacional.
- Rollback a artefacto completo conocido, no copia parcial.

**Aceptación:** deploy falla si source/lock/artifact no coinciden; producción devuelve el BUILD_ID esperado; prueba post-restart automática.

### B7. Actualizar Next.js y Nodemailer (SEC-003)

Secuencia:

1. Next/@next/env/eslint-config-next a la misma versión corregida;
2. tests + build local + standalone + imágenes + Server Actions;
3. Nodemailer 9 en commit separado;
4. probar SMTP TLS válido/inválido, timeouts, reply-to y Resend;
5. regenerar artefacto una vez aprobados.

No ampliar `remotePatterns`, `allowedOrigins` ni opciones SMTP para hacer pasar tests.

## Fase C — Medias

### C1. Cabeceras web por etapas (SEC-011)

Etapa segura inicial:

- `poweredByHeader: false`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` mínima;
- `frame-ancestors 'none'` + `X-Frame-Options: DENY`;
- CSP mínima `object-src 'none'; base-uri 'self'; form-action 'self'`.

Luego observar una CSP Report-Only completa, inventariar Google/Next y promover a enforcement. Una CSP con nonce fuerza render dinámico y tiene coste en hosting compartido; no adoptarla sin medir.

### C2. Validador de uploads común (SEC-010)

Una biblioteca `server-only` debe imponer firma, decode, píxeles, formato de salida, metadata, bytes y nombre. Proxy y aplicación deben limitar multipart. Agregar corpus de JPEG/PNG/WebP válido, truncado, MIME falso y dimensiones extremas.

### C3. Limpiar tokens de URL (SEC-012)

Intercambio único token→cookie de flujo, URL limpia, no-store/no-referrer y redacción. Mantener GET no mutante para evitar consumo por scanners de email; la confirmación continúa por POST.

### C4. Respuestas anti-enumeración (SEC-013)

Unificar status/body y coste aproximado, notificar por correo al dueño y registrar internamente. No degradar UX revelando datos a un tercero.

### C5. MFA y autenticación reciente (SEC-014)

- WebAuthn/TOTP para ADMIN, códigos de recuperación hasheados.
- Step-up para rol/estado/password y acciones destructivas.
- Contraseñas: mínimo razonable, máximo por bytes de bcrypt o Argon2id, passwords comprometidas.
- Proceso de recuperación de MFA y auditoría.

### C6. Separar uploads runtime (SEC-015)

- Migrar perfiles y contenido editorial fuera de Git/artefacto.
- Definir si perfiles son públicos; si no, autorización + no-store.
- Política de retención, borrado y backup.
- Purga de historial solo coordinada: reescribe Git y afecta a todo el equipo.

### C7. PostgreSQL (SEC-016)

Checklist en cPanel/proveedor, sin copiar URL:

- host privado/local preferido y puerto real;
- TLS con certificado validado;
- rol de aplicación sin superuser/createdb/createrole;
- permisos mínimos sobre schema/tablas/secuencias;
- rol distinto para migraciones si es viable;
- pool acorde al límite Passenger, connection/query timeout;
- firewall sin exposición pública innecesaria;
- backups cifrados y restauración probada.

### C8. Bindings Docker (SEC-017)

Bind loopback en Compose base. El laboratorio usa un override deliberado y una red `host-only`, nunca NAT/bridge público sin firewall.

### C9. Disponibilidad de assets/datos (SEC-019)

Mover entrega de archivos al servidor estático/object storage, usar ETag/range/streaming y máximo por `stat`. Cachear contenido público con `revalidate` y conservar páginas privadas dinámicas/no-store.

## Fase D — Hardening

### D1. Supply chain (SEC-018)

- Digests de imágenes gestionados por Renovate/Dependabot.
- SBOM CycloneDX/SPDX, escaneo OS/dependencias y provenance.
- Protección de `main`, revisión obligatoria y commits/tags firmados cuando sea viable.
- Falla CI si aparecen `.env*`, claves privadas o archivos en `public/uploads/profiles`.

### D2. Atomicidad (SEC-020)

Transacción serializable/conditional delete para tokens y lock/retry para el último admin. Tests concurrentes con `Promise.all` deben dejar exactamente un éxito y al menos un admin.

### D3. URLs administradas (SEC-021)

Helper server-side que acepte `https:` y opcional allowlist por proveedor de inscripción. Tests para `javascript:`, `data:`, `file:`, relativa y credenciales embebidas.

### D4. CSRF de Route Handlers (SEC-022)

Helper same-origin basado en `AUTH_URL`/origen canónico validado. Política explícita para requests sin Origin. No duplicar ni reemplazar la protección propia de Server Actions/Auth.js.

### D5. Observabilidad (SEC-023)

Eventos estructurados y redactados:

- login success/fail/rate-limit;
- reset/verify solicitado y consumido, sin token;
- cambio de rol/estado/password y revocación;
- upload aceptado/rechazado con bytes/dimensiones, sin contenido;
- contacto aceptado/rate-limited;
- deploy commit/BUILD_ID y health check.

Definir retención, acceso, alertas y request-id. No registrar passwords, cookies, tokens, query strings sensibles ni cuerpos completos.

## Orden de commits propuesto

1. `docs(security): auditoría, plan y laboratorio`
2. `fix(authz): guardias en páginas admin + test`
3. `fix(web): headers y límites de contacto + tests`
4. `fix(upload): validación/cuota/retención + tests`
5. `fix(dev): binds Docker loopback`
6. `fix(content): allowlist URL externa + tests`
7. `fix(deps): Auth.js y Next corregidos`
8. `fix(mail): Nodemailer 9`
9. `ci(security): gates, manifest, SBOM y artifact`

La rotación de secretos y HTTPS pueden ocurrir en paralelo, pero deben registrarse como tareas operacionales sin incluir valores.

## Matriz de verificación posterior

| Riesgo | Test local/controlado | Comprobación productiva pasiva |
| --- | --- | --- |
| Auth/Authz | unit + integración + E2E navegación parcial | login/logout y cuenta de prueba |
| Rate limit | multi-worker, spoof, restart, presión de claves | observar 429/logs; nunca brute force |
| Contacto | bytes/campos/429/timeout | un único envío autorizado |
| Upload | corpus corrupto/extremo, cuota, reemplazo | un avatar de prueba y espacio estable |
| Headers/HTTPS | assertions + navegador | `HEAD` HTTP/HTTPS |
| DB | tests Prisma con rol de lab | revisión de config, no escaneo externo |
| Deploy | manifest/checksum/smoke | BUILD_ID/commit esperado |
| Dependencias | `npm audit`, tests, build | confirmar versiones en artefacto |
