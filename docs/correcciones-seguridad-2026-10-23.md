# Actualización de seguridad — 23 de octubre de 2026

Complementa la auditoría del 21 de octubre. Los recuentos de aquella revisión
son históricos; no describen los avisos que devuelve actualmente el registro npm.

## Cambios

- Next.js, `@next/env` y `eslint-config-next`: 16.3.8 → 16.4.3. Se conservan
  Turbopack, standalone y el build Docker sin red. El lockfile incluye `sharp`
  0.35.5, con el parche del optimizador de imágenes.
- El correo transaccional utiliza Nodemailer 10.0.10 mediante el alias
  `nodemailer-smtp`, en lugar del alias 9.0.5. Se mantienen SMTP/Resend,
  remitentes, credenciales, timeouts, plantillas y las restricciones de acceso a
  archivos/URLs. No se cambió ningún `.env` ni se enviaron correos reales.
- Se retira Nodemailer 8 de las dependencias directas. npm todavía lo resuelve
  como peer opcional de Auth.js; no se sustituyó por una versión incompatible.
  El login sigue usando únicamente Google y Credentials. El proveedor Email de
  Auth.js no está configurado y la app importa exclusivamente el alias corregido
  para sus envíos.
- Next.js actualizó automáticamente el encabezado de su bloque en `AGENTS.md`;
  se conserva para evitar que cada inicio de desarrollo deje cambios pendientes.

## Fotos y cambios de rama en desarrollo

La rama de UX anterior aún versiona doce fotos que infraestructura retiró del
índice. Cambiar desde una rama que las rastrea hacia una que ya no las rastrea
puede hacer que Git retire esas copias del disco, aunque uploads esté ignorado.
Durante esta revisión se repusieron las doce copias desde la rama de origen y se
compararon sus hashes Git: coinciden y continúan fuera del seguimiento en la
rama de infraestructura. No se modificaron referencias en la base de datos.

Antes de alternar ramas con reglas de seguimiento distintas, conservar un
respaldo local de uploads. En producción se mantiene el volumen persistente y
su respaldo; las imágenes subidas no deben depender del contenido del checkout.

## Avisos restantes

La consulta de `npm audit` pasó de cinco paquetes señalados (uno crítico y cuatro
altos) a cuatro altos y cero críticos. Los cuatro restantes pertenecen a la misma
cadena: `nodemailer` 8.0.11 → `@auth/core` → `next-auth` / `@auth/prisma-adapter`.
No son cuatro fallos independientes confirmados en la aplicación.

El transporte que utiliza la aplicación ya está actualizado. El aviso del peer
opcional no se da por resuelto: queda pendiente que Auth.js admita una versión
corregida o una decisión de dependencias validada específicamente. No se usó
`npm audit fix --force`, overrides incompatibles ni una degradación de Auth.js.
Los riesgos operativos de la auditoría anterior siguen pendientes.

## Comprobación

- 123 pruebas correctas en la rama de infraestructura; lint sin errores, con el
  aviso previo de `_previous` sin uso.
- Transporte SMTP probado contra un servidor ficticio en `127.0.0.1`, con
  direcciones `.test`; no sale correo a Internet. Se comprueba la entrega MIME
  además de los límites y opciones defensivas del transporte.
- Imagen Docker construida correctamente; compilación Next.js con red desactivada.
- Standalone probado en un contenedor `--network none`, sin base de datos:
  páginas públicas, robots, sitemap, logo, optimización de imágenes y PDF con
  respuesta 200; admin/perfil redirigen a login. No se aplicaron migraciones ni seed.
- El inicio OAuth y la entrega SMTP con credenciales reales requieren una prueba
  operativa posterior. Esta comprobación local no los certifica.

## Referencias

- [Next.js: optimización de imágenes en Linux](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw).
- [Next.js: denegación de servicio en Server Actions](https://github.com/vercel/next.js/security/advisories/GHSA-p3m5-59mp-jv5r).
- [Next.js: funciones use cache](https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr).

No se ha publicado ninguna imagen, integrado en `develop`/`main` ni desplegado
esta actualización. Se conserva el flujo de migración sin seed.
