# Roadmap de Sprints - THEIA Landing

## Objetivo

Ordenar el avance del proyecto en metas pequenas, realistas y faciles de revisar.

Stack actual:

- Next.js 16 + React 19 + TypeScript.
- Tailwind CSS v4.
- Prisma + PostgreSQL.
- Auth.js / NextAuth.
- Supabase como base de datos cloud.

## Estado actual

Ya existe:

- Sitio publico con paginas principales.
- Componentes base de interfaz.
- Login y registro preparados.
- Roles `ADMIN`, `COACH` y `MEMBER`.
- Prisma configurado.
- Modelos de base de datos creados.
- Panel admin protegido por rol.
- Supabase configurado localmente en `.env` y `.env.local`.

Pendiente inmediato:

- Conectarse a Supabase desde una red que permita PostgreSQL.
- Ejecutar migraciones.
- Ejecutar seed.
- Probar login, registro, planes y admin.

## Sprint 1 - Supabase y base de datos

Tiempo estimado: 1 a 3 dias.

Objetivo:

Conectar el proyecto local a Supabase y dejar la base comun funcionando.

Tareas:

- Probar conexion fuera de la red de la universidad.
- Ejecutar `npm.cmd run db:generate`.
- Ejecutar `npm.cmd run db:migrate`.
- Ejecutar `npm.cmd run db:seed`.
- Revisar tablas en Supabase.
- Revisar datos con Prisma Studio.

Cierre:

- Las tablas existen en Supabase.
- Los planes y noticias iniciales estan cargados.
- La app local usa Supabase como base de datos.

## Sprint 2 - Autenticacion y roles

Tiempo estimado: 2 a 4 dias.

Objetivo:

Validar que usuarios, sesiones y roles funcionen correctamente.

Tareas:

- Probar registro.
- Probar login.
- Crear usuario admin.
- Probar acceso a `/admin`.
- Confirmar que usuarios normales no entren al admin.

Cierre:

- Registro funciona.
- Login funciona.
- Rol `ADMIN` protege el panel.

## Sprint 3 - Admin de planes

Tiempo estimado: 1 a 2 semanas.

Objetivo:

Permitir editar planes desde el panel admin.

Tareas:

- Listar planes.
- Crear plan.
- Editar plan.
- Activar/desactivar plan.
- Editar precio y caracteristicas.

Cierre:

- Un admin puede cambiar un plan.
- El cambio se refleja en `/planes`.

## Sprint 4 - Contacto y mensajes

Tiempo estimado: 3 a 5 dias.

Objetivo:

Guardar mensajes de contacto en la base de datos.

Tareas:

- Activar guardado en `ContactMessage`.
- Ver mensajes en admin.
- Marcar mensajes como leidos.

Cierre:

- Los mensajes enviados desde `/contacto` quedan guardados.
- Admin puede revisarlos.

## Sprint 5 - Interfaz y contenido

Tiempo estimado: 1 semana.

Objetivo:

Pulir la experiencia visual y el contenido.

Tareas:

- Revisar mobile.
- Ajustar textos.
- Revisar imagenes.
- Mejorar tarjetas de planes y competencias.
- Revisar estados de error y carga.

Cierre:

- La web se ve bien en movil y escritorio.
- No hay textos cortados ni secciones confusas.

## Sprint 6 - Seguridad basica

Tiempo estimado: 3 a 5 dias.

Objetivo:

Preparar el proyecto para publicarse con buenas practicas minimas.

Tareas:

- Rotar password de Supabase antes de produccion.
- Generar `AUTH_SECRET` seguro.
- Confirmar que `.env` y `.env.local` no estan en Git.
- Revisar permisos de admin.
- Evitar errores sensibles visibles al usuario.

Cierre:

- No hay secretos en el repositorio.
- Las rutas privadas validan sesion y rol.

## Sprint 7 - Primer despliegue

Tiempo estimado: 2 a 5 dias.

Objetivo:

Publicar una primera version accesible en internet.

Opcion recomendada:

- Vercel para la app.
- Supabase para la base de datos.

Tareas:

- Crear proyecto en Vercel.
- Configurar variables de entorno.
- Conectar repositorio.
- Probar build.
- Probar login, planes y admin en produccion.

Cierre:

- La app esta publicada.
- Supabase funciona en produccion.

## Sprint 8 - Dominio y Cloudflare

Tiempo estimado: 2 a 5 dias.

Objetivo:

Conectar un dominio real.

Tareas:

- Comprar o configurar dominio.
- Configurar DNS.
- Apuntar dominio al hosting.
- Verificar HTTPS.

Cierre:

- El dominio carga la web correctamente.

## Sprint 9 - Docker

Tiempo estimado: 3 a 7 dias.

Objetivo:

Preparar el proyecto para correr de forma consistente en otra maquina.

Recomendacion:

No hacerlo antes de terminar Supabase, auth y primer despliegue.

Usarlo si:

- Se hostea en laptop de un amigo.
- Se hostea en VPS.
- Se quiere aprender infraestructura.

Cierre:

- La app puede correr en contenedor.
- El contenedor se conecta a Supabase.

## Sprint 10 - Pagos y suscripciones

Tiempo estimado: 2 a 4 semanas.

Objetivo:

Agregar pagos o control de mensualidades.

Recomendacion:

Dejarlo para despues de tener:

- Supabase estable.
- Auth estable.
- Admin basico.
- Despliegue funcionando.

## Orden recomendado

1. Supabase.
2. Auth y roles.
3. Admin de planes.
4. Contacto en base de datos.
5. Pulido visual.
6. Seguridad.
7. Despliegue.
8. Dominio.
9. Docker si aplica.
10. Pagos.

## Estimacion general

Primera version funcional:

4 a 6 semanas.

Version mas completa con admin, despliegue y seguridad:

8 a 12 semanas.

Version con pagos:

10 a 16 semanas.

## Siguiente paso

Terminar Sprint 1:

- Cambiar de red.
- Ejecutar migraciones.
- Ejecutar seed.
- Confirmar Supabase funcionando.
