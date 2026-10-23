# Auditoría de optimización y seguridad — THEIA

Actualización posterior: [correcciones del 23 de octubre](correcciones-seguridad-2026-10-23.md).
Los recuentos y versiones siguientes corresponden a la revisión original.

Fecha: 21 de octubre de 2026. Rama: `fix/optimizacion-infraestructura`.
Base: `2f9cef3`, conservada en `fix/perfil-foto-ux`. No se integró en
`develop` ni `main`, ni se publicó en GitHub o en producción.

## 1. Alcance y resultado

Se revisaron las entradas de Next.js, componentes, consultas Prisma, caché,
autenticación, autorización, formularios, uploads, correo, imágenes, documentos,
dependencias, Docker y comandos de desarrollo y despliegue.

El proyecto ya utilizaba standalone, fuentes locales, consultas públicas con
caché de cinco minutos e invalidación al editar, imágenes optimizadas por Next.js
y ejecución del servidor como usuario sin privilegios. Se conservaron estas
medidas. No se cambió el diseño, las reglas de los planes, los filtros, los roles,
los flujos de correo, el calendario ni los datos de la base.

Se corrigieron dependencias vulnerables con versiones compatibles, la lectura
sin límite efectivo de algunos cuerpos HTTP, carga anticipada innecesaria de
galerías, código inaccesible y archivos de usuarios que seguían en Git.

La revisión no equivale a una prueba de penetración ni certifica seguridad
total. No se inspeccionó el servidor Ubuntu, Nginx, Cloudflare, certificados,
backups o permisos reales de PostgreSQL. No se inspeccionaron ni modificaron
archivos `.env` ni se expusieron secretos;
no se ejecutaron migraciones, seed, envíos de correo ni escrituras en la base.

## 2. Cambios realizados

| Área | Hallazgo | Cambio |
| --- | --- | --- |
| Dependencias | Next.js 16.3.2 tenía avisos nuevos, incluidos críticos | Next.js, `@next/env` y `eslint-config-next` alineados en 16.3.8 |
| Prisma | Avisos indirectos en herramientas/configuración | Cliente, adaptador PostgreSQL y CLI alineados en 7.10.1; cliente regenerado, sin migraciones |
| Dependencias indirectas | Avisos con correcciones compatibles disponibles | Actualizados `brace-expansion`, `fast-uri`, `js-yaml` y `source-map-js` dentro de sus rangos admitidos |
| Galerías | Se montaban todas las imágenes, incluso ocultas | Se montan la activa y hasta dos adyacentes cuando el carrusel está visible; conserva transición, controles, tamaño y avance cada 3,5 s |
| Actividad en segundo plano | El temporizador seguía despertando en pestañas ocultas | Se detiene mientras la pestaña está oculta; respeta movimiento reducido y pausa al interactuar |
| Ajuste de fotos | El editor de recorte se importaba al cargar perfil/formularios | Carga mediante `next/dynamic` al seleccionar una foto; mismo componente y comportamiento |
| Uploads | `Content-Length` era la única comprobación previa a `formData()` | Límite efectivo durante la recepción, aunque falte la cabecera o sea falsa; se cancela el stream excedido |
| Registro | Se aceptaba JSON de tamaño ilimitado | Límite de 8 KiB, comprobación de tipo, error controlado para JSON inválido y email limitado a 254 caracteres |
| Código sin uso | Editor del antiguo carrusel inicial sin ninguna pantalla que lo importe | Eliminados `HeroSlidesManager.tsx` y `admin/home/actions.ts`: 454 líneas. Se mantiene `/admin/home` y su redirección protegida |
| Archivos temporales | Podían entrar en el análisis de TypeScript/ESLint | Excluidos `tmp`, artefactos y standalone del análisis que no les corresponde; se conservan tipos de rutas de Next |
| Docker | `COPY . .` incluía entradas que el build no necesita | Copia explícita de código, configuración y activos; excluidas herramientas privadas, `.npmrc`, documentación y pruebas del contexto |
| Instalación Docker | Cada nueva capa dependía de descargar paquetes | Caché BuildKit para npm; se mantiene `npm ci` y el lockfile |
| Datos subidos | 12 fotos, 24.585.329 bytes, seguían rastreadas pese a `.gitignore` | Retiradas únicamente del índice de Git; archivos locales intactos y uploads ya excluidos de Docker |
| Seed | El contenedor exigía confirmación, pero la ejecución directa/local no | El propio seed también exige `--confirm-seed`; contenido intacto |
| Verificación | No había un comando único para todas las pruebas | Añadido `npm test`, más pruebas de límites HTTP y confirmación del seed |

Las versiones de correo se mantienen: actualizar a otra versión mayor sin
validar la entrega real y los peers de Auth.js introduciría un riesgo adicional.
No se utilizó `npm audit fix --force` ni los downgrades que propone npm.

## 3. Medición local de Docker

Una ejecución por variante en Docker Desktop Linux, misma máquina y misma
imagen base disponible. No es un benchmark controlado ni una medición de Ubuntu.

| Medición | Antes | Después |
| --- | ---: | ---: |
| Construcción completa de `runner` | 68,3 s | 52,6 s |
| Compilación que informa Next.js | 4,7 s | 4,6 s |
| Tamaño de imagen Docker sin comprimir | 141.697.122 bytes | 141.507.438 bytes |
| Avisos de paquetes en `npm audit` | 19: 1 crítico, 18 altos | 9 altos, 0 críticos |
| Pruebas automáticas | 108 correctas | 119 correctas |

El total del build bajó 15,7 s en esta ejecución, pero influyen cachés, descargas
y los paquetes nuevos. La compilación es prácticamente igual: no hay evidencia
para prometer una mejora grande de compilación o de velocidad en producción.
El contexto transferido fue 501,87 kB frente a 356,40 kB; BuildKit puede transferir
solo diferencias, por lo que estas cifras tampoco son el tamaño total del código.

La mejora de carga de galerías es acotada y concreta: una noticia con diez fotos
deja de montar las diez a la vez y monta como máximo tres. Al recorrerla se siguen
descargando las fotos necesarias. No se comprimieron ni borraron las fotos.
La carga diferida del editor evita incluirlo en la carga inicial del formulario.
No se realizó una medición Lighthouse ni de FPS de scroll: no se atribuye una
mejora porcentual a la experiencia del navegador.

El build sigue usando Turbopack, sin forzar Webpack, y su paso Next.js conserva
`--network=none`. No se observó un bloqueo de compilación como el investigado en
[la auditoría anterior](auditoria-build-docker.md).

## 4. Inventario y limpieza prudente

El análisis de imports cubrió 129 archivos de TypeScript/JavaScript, excluido el
cliente generado de Prisma. Los únicos módulos de aplicación inaccesibles eran
los dos del editor antiguo. Tras retirarlos quedan 127; las declaraciones
ambientales `.d.ts` no se consideran código sobrante.

Los activos de `public`, sin uploads, suman 22.492.742 bytes. No se encontraron
duplicados idénticos por SHA-256. Los candidatos sin referencia literal en
código/configuración/seed son:

| Archivo | Bytes | Decisión |
| --- | ---: | --- |
| `images/enzo-podio.jpg` | 7.357.413 | Conservar: podría estar referenciado en la base |
| `images/hero-podium.jpg` | 7.354.423 | Conservar: podría estar referenciado en la base |
| `images/jesus.png` | 511.073 | Conservar: posible foto de equipo/noticia |
| `images/jean.jpg` | 386.207 | Conservar: posible foto de equipo/noticia |
| `images/site-icon.png` | 25.278 | Conservar hasta comprobar enlaces externos/uso operativo |

Los dos JPEG grandes concentran alrededor del 65 % del peso de esos activos,
pero estar en `public` no implica descargarse al visitar Inicio. Antes de
eliminarlos o sustituirlos hay que contrastar referencias de producción y enlaces
externos, generar equivalentes y verificar recorte/calidad. No se alteró ningún
registro para cambiar URLs.

Las bases `public/documentos/bases-theia-2026-2027.pdf` se conservan y su descarga
se comprobó en standalone. Las migraciones y las licencias de las fuentes se
conservan. `node_modules`, `.next` y `tmp` son herramientas/artefactos locales;
borrarlos no acelera el sitio y puede hacer más lenta la siguiente compilación.

Las fotos retiradas del índice siguen en `public/uploads`. Esto evita añadirlas
a nuevas versiones, pero no reduce el historial ni elimina copias anteriores.
No se reescribió Git. En producción los uploads deben proceder del volumen
persistente y de su respaldo, nunca de un nuevo clon del repositorio.

## 5. Seguridad: controles y pendientes

Se comprobó que las páginas administrativas reautorizan antes de leer datos y
que las mutaciones requieren el rol correspondiente. Se conservan la validación
de sesiones contra la base, revocación, bcrypt, tokens de correo hasheados,
protección del último administrador, límites de intentos, protocolos HTTPS para
enlaces externos y cabeceras defensivas. No se encontró SQL manual concatenado
en las consultas revisadas. Esto no demuestra ausencia de vulnerabilidades.

Pendientes que no conviene resolver cambiando reglas o infraestructura sin una
validación específica:

| Prioridad | Riesgo pendiente | Siguiente paso |
| --- | --- | --- |
| Alta | `nodemailer` 8.0.11 y el alias 9.0.5 conservan avisos; Auth.js declara peer 7/8. Los nueve avisos incluyen arrastres de esta cadena y de `braces`, no nueve fallos independientes demostrados | Validar una versión mayor corregida con los correos reales en un entorno de pruebas y revisar compatibilidad de peers. El provider Email de Auth.js no está configurado, pero el alias sí envía el correo de la app |
| Media | `braces` 3.0.3 afecta a la cadena ESLint → fast-glob → micromatch; el audit no ofrece una corrección compatible | Seguir el parche del proveedor. No degradar ESLint/Next a 14 ni forzar overrides incompatibles; no recibe patrones públicos en la app revisada |
| Media | Rate limit en memoria por proceso y confianza en cabeceras de proxy | Verificar normalización de IP en Nginx/Cloudflare y un store compartido antes de usar varias réplicas. No se cambió esa infraestructura |
| Media | Los uploads validan firma y bytes, pero no decodifican/reconvierten ni limitan píxeles | Añadir una validación de dimensiones y presupuesto de decodificación con pruebas de fotos reales; valorar tratamiento de metadatos |
| Media | No hay cuota total ni limpieza referencial de imágenes huérfanas | Preparar inventario con referencias de la base, simulación de limpieza y backup. No borrar archivos al eliminar una noticia si pueden estar compartidos |
| Media | `readUploadedImage` carga el archivo completo en memoria por solicitud | Evaluar streaming/validación condicional con pruebas de caché; los avatares deben mantener `private, no-store` y su actualización inmediata |
| Media | Admin consulta listas completas y envía datos de edición de cada fila | Medir con volumen real y proponer paginación/consultas filtradas sin perder los filtros ni la edición actual |
| Media | Los errores de consultas públicas se traducen a contenido vacío | Incorporar observabilidad sin datos personales para distinguir falta de contenido de una caída de la base |
| Media | Tokens de recuperación pueden utilizarse concurrentemente antes de consumirse | Probar consumo atómico y concurrencia en una base de ensayo antes de modificar el flujo |
| Operativa | La configuración productiva, backups, TLS, permisos DB y recursos del servidor no están en este repositorio | Revisarlos en el servidor con autorización operativa; no se certifican desde esta auditoría |
| Operativa | No se inspeccionó el historial completo en busca de secretos ni se rotaron credenciales | Hacer una revisión de historial dedicada y rotación coordinada si procede, sin imprimir secretos |
| Operativa | La base `node:22-bookworm-slim` es una etiqueta móvil; no se auditó el inventario de paquetes del sistema operativo | Revisar parches de Node/imagen base, obtener imágenes actualizadas y registrar digest/SBOM en el pipeline; `npm audit` no cubre el sistema operativo |

La instalación vigente ya no aparece afectada por los avisos de Next.js señalados
en el análisis inicial. Referencias públicas contrastadas:

- [Next.js: ejecución remota en servidores Windows, corregida desde 16.3.3](https://github.com/advisories/GHSA-p293-qw3h-jr36).
- [Next.js: SSRF en optimización de imágenes, corregida desde 16.3.8](https://github.com/advisories/GHSA-cjq9-62q9-8jv4).
- [DeepmergeTS: agotamiento de pila](https://github.com/advisories/GHSA-ggr8-5vv4-36mx).
- [Nodemailer: denegación de servicio en parser de direcciones](https://github.com/advisories/GHSA-v53p-9fqp-m79j).

## 6. Seed y migraciones

El seed no forma parte del arranque ni de la migración. `runner` no lo incluye,
`migrator` solo ejecuta `prisma migrate deploy` y `seeder` es un target manual.
Se conserva para inicializar una base de desarrollo o restaurar deliberadamente
el contenido inicial; borrarlo no reduciría la carga de páginas ni la imagen
`runner`, que ya no lo contenía.

Comando manual **local**, que puede sobrescribir planes/noticias:

```bash
npm run db:seed -- --confirm-seed
```

El comando sin confirmación y la ejecución directa sin flag se rechazan antes
de leer el entorno o crear el cliente. La separación y los comandos operativos
de migración/seed Docker están en [despliegue-servidor.md](despliegue-servidor.md).
No se ejecutó ninguna de esas operaciones sobre una base en esta revisión.

## 7. Validaciones realizadas

- `npm test`: 119 pruebas correctas, incluidas autorización, sesiones, filtros,
  contenidos, límites, multipart por streaming y confirmación del seed.
- `npm run lint`: cero errores; conserva un aviso previo de parámetro `_previous`
  sin uso en `admin/usuarios/actions.ts`.
- `tsc --noEmit`, Prisma `generate` y `validate`: correctos; no modifican datos.
- Build Docker `runner`: correcto, compilación sin red y usuario final UID 1000.
- Target Docker `seeder` construido; sus dos ejecuciones sin confirmación
  (comando protegido y archivo directo), aisladas sin red, fallan por la
  confirmación obligatoria antes de conectar a una base. No se ejecutó el seed.
- Standalone aislado sin red ni base: 200 en las siete páginas públicas probadas,
  robots, sitemap y sesión anónima; admin/perfil redirigen a login. APIs de upload
  sin sesión responden 401 y registro con JSON inválido responde 400.
- Imágenes, optimizador de Next y PDF descargable: 200. El PDF está incluido y
  no se incluye el seed ni `.env.development.local` en la imagen.
- Galería revisada con componentes reales y datos ficticios en escritorio y
  móvil de 390 px: mantiene tamaño y controles, avance automático y sin overflow
  horizontal; los controles siguen dentro de la noticia.
- `git diff --check`: correcto. No se borraron archivos locales de usuarios.

No se probaron login OAuth real, correo SMTP, recuperación con destinatarios
reales ni edición autenticada en producción. Las pruebas aisladas no sustituyen
esa validación antes de integrar y desplegar.

## 8. Continuidad

La rama queda separada para revisión. Antes de integrarla: validar correo y login
en el entorno habitual, revisar los pendientes anteriores y comprobar backups
del volumen de uploads. Para instalar esta rama en otro checkout: `npm ci`,
`npm run db:generate`, `npm test` y `npm run lint`; compilar la imagen nueva.
No utilizar `seed` como parte de esta actualización.
