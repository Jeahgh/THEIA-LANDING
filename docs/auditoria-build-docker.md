# Auditoría de build Docker y separación del seed

Fecha: 14 de octubre de 2026. Rama: `codex/optimizar-despliegue-docker`.
Pruebas locales con Node.js 22 y Next.js 16.3.2; Docker Desktop ejecutando
contenedores Linux Debian Bookworm. No son mediciones del servidor Ubuntu.

## Hallazgo principal

El layout importaba Montserrat y Nunito mediante `next/font/google`.
Ese mecanismo descarga CSS de `fonts.googleapis.com` y fuentes de
`fonts.gstatic.com` durante la compilación, aunque luego las sirve localmente
al navegador. El código instalado en
`node_modules/next/dist/compiled/@next/font/dist/google/fetch-resource.js`
usa `const timeout = isDev ? 3000 : undefined`: no establece timeout en
producción. Hay reintentos, pero solo ocurren si la petición inicial devuelve
un error; una petición que queda esperando puede bloquear la compilación.

Una espera de red, DNS, proxy o TLS es por tanto una causa probable del build
de más de dos horas con CPU casi inactiva. No se reprodujo ese bloqueo localmente
ni se inspeccionó el servidor: no se puede afirmar que sea su causa definitiva.
Otras posibilidades a comprobar allí son I/O del disco, recursos del builder,
memoria/swap y procesos atascados. No se modificó nada en el servidor.

Referencias primarias:

- https://nextjs.org/docs/app/api-reference/components/font
- Documentación instalada de Next.js 16.3.2:
  `node_modules/next/dist/docs/01-app/03-api-reference/08-turbopack.md`.
- Documentación instalada de standalone:
  `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md`.

## Revisión del proyecto

- No hay configuración Webpack personalizada ni loaders que exijan Webpack.
  Turbopack es el compilador por defecto de esta versión; `--webpack` era una
  elección del Dockerfile, no una necesidad demostrada del código.
- No hay `generateStaticParams`. Inicio, planes, equipo, noticias, competencias,
  perfil, administración y sitemap son dinámicos. Sus consultas se ejecutan al
  atender peticiones, no para generar páginas estáticas en el build.
- Los `fetch` del navegador son para interacción. El `fetch` a Resend está
  dentro del envío de correo y no se llama durante la compilación. No se cambió
  correo, OAuth ni PostgreSQL.
- Los módulos Prisma se importan al preparar rutas, pero el build probado no
  necesitó una base disponible. El Dockerfile utiliza una URL ficticia loopback;
  no se inyectó ninguna credencial productiva.
- `.dockerignore` ya excluía `.env*`, `.git`, `.next` y `node_modules`.
  Faltaba excluir los uploads persistentes y el cliente Prisma generado en el
  host: podían aumentar el contexto y romper la caché por cambios ajenos al
  código. Ahora ambos se excluyen; Prisma se regenera dentro de Linux.
- `output: 'standalone'` y la copia de `public` y `.next/static` se conservan.

## Cambios y evidencia

1. Se incorporaron las mismas familias variables Montserrat/Nunito Latin y sus
   licencias OFL al repositorio, usando `next/font/local`. Se conservan sus
   variables CSS y pesos. El build ya no descarga fuentes.
2. El paso de compilación Docker se ejecuta con `RUN --network=none`. Esto
   demuestra que no necesita servicios externos ni PostgreSQL y hará fallar
   una futura dependencia accidental de red. `npm ci`, APT y la descarga de
   imágenes base siguen necesitando red; no se presenta todo el build como offline.
3. Se retiró `--webpack` solo después de que `npm run build` y la imagen candidata
   Turbopack terminaran, y de comprobar que su servidor standalone funcionaba.
4. `migrator` ejecuta solo `prisma migrate deploy` y no contiene `seed.mjs`.
   `seeder` es un target separado y exige `--confirm-seed`. El contenido y la
   lógica del seed y todas las migraciones existentes se conservaron.

## Mediciones

Una ejecución por variante, en la misma máquina. No son benchmarks con caché
controlada ni una estimación garantizada para Ubuntu.

| Prueba | Tiempo total | Resultado |
| --- | ---: | --- |
| `npm run build -- --webpack`, código original | 36,8 s | Correcto |
| `npm run build`, código original | 13,8 s | Correcto |
| `npm run build`, fuentes locales | 11,0 s | Correcto |
| Paso Docker original `build:container -- --webpack` | 30,5 s | Correcto |
| Paso Docker candidato `build:container`, fuentes locales, sin red | 11,9 s | Correcto |
| Paso Docker final `build:container`, fuentes locales, sin red | 9,8 s | Correcto |

La compilación Docker bajó unos 18,6 segundos (aproximadamente 61 %) en esta
prueba. La imagen completa original tardó 107,7 segundos, incluyendo descarga
de base e instalación; la candidata tardó 32,7 segundos con dependencias ya
cacheadas. Estos dos tiempos completos **no** permiten atribuir toda la mejora
al compilador. Las más de dos horas observadas en Ubuntu no se reprodujeron.
La imagen final completa tardó 45,3 segundos, incluyendo una nueva instalación
de dependencias al cambiar el script de pruebas en `package.json`. El tiempo
del paso Next.js final fue 9,8 segundos; no debe confundirse con ese total.

## Validación y límites

- Cinco pruebas de los comandos del contenedor: migración sin seed, confirmación
  obligatoria, seed ausente en migrator, propagación de errores y guard Docker.
- Imágenes `migrator` y `seeder` construidas. Se verificó físicamente la ausencia
  del seed en migrator y se probaron ambas negativas sin red ni base de datos.
- Standalone Linux arrancado como usuario `node`, sin red, secretos productivos
  ni base. Respuestas 200 de Inicio, Nosotros, Planes, Competencias, Noticias,
  Contacto, Login, robots, sitemap, imagen y sesión anónima. Admin redirigió a
  login. JavaScript, CSS, ambas fuentes locales y la optimización de imágenes
  se sirvieron correctamente, también en la imagen final.
- Esta prueba valida arranque y rutas/artefactos, no escritura en base, OAuth,
  envío de correo ni comportamiento con datos reales. Esas integraciones no
  fueron modificadas ni ejercitadas contra producción.
- No se ejecutaron migraciones ni seed en ninguna base durante la auditoría.

## Riesgos operativos

- Las imágenes antiguas siguen teniendo su CMD de migración + seed: hay que
  reconstruir y usar una etiqueta nueva. Cambiar el repositorio no cambia una
  imagen que ya está construida.
- Ejecutar manualmente el seed puede sobrescribir planes y noticias y reemplazar
  sus características. Requiere respaldo y elección explícita del destino.
- Se mantiene el guard que exige host Docker `db`. La configuración real del
  servidor no está en el repositorio: los comandos documentados deben utilizar
  su red y archivo de variables existentes. No se cambió ese guard ni PostgreSQL.
- `node:22-bookworm-slim` es una etiqueta móvil. Los tiempos y digest pueden
  variar al reconstruir; no se cambió su política de versiones en esta tarea.
- Las fuentes locales son Latin, adecuado para español. Si se incorporan otros
  alfabetos, habrá que añadir sus fuentes/subconjuntos y licencias.
- La red bloqueada se aplica al paso de compilación, no al contenedor en uso.
  No sustituye un timeout externo del pipeline para fallos de I/O o del builder.

Ver los comandos exactos de migración y seed manual en
[despliegue-servidor.md](despliegue-servidor.md).
