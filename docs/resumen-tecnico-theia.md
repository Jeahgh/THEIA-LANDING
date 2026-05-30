# Resumen técnico del proyecto Theia

Documento informativo sencillo para presentar el estado técnico general del sitio web y su panel de administración.

## 1. Objetivo del proyecto

Theia es una plataforma web para presentar información del club, planes, noticias, competencias y contenido principal del sitio. Además, incluye un panel de administración para que usuarios autorizados puedan gestionar contenido sin modificar directamente el código.

## 2. Stack principal

- Frontend: Next.js, React y Tailwind CSS.
- Backend: Next.js con funciones del servidor y rutas API.
- Base de datos: PostgreSQL administrado mediante Prisma.
- Autenticación: NextAuth con inicio de sesión por Google y credenciales.
- Lenguaje principal: TypeScript.
- Gestión de estilos: Tailwind CSS.

## 3. Base de datos y contenido dinámico

El proyecto utiliza una base de datos PostgreSQL. Prisma se encarga de conectar la aplicación con la base de datos y definir los modelos principales.

Actualmente el contenido administrable incluye:

- Slides principales del inicio.
- Planes de entrenamiento.
- Noticias.
- Competencias.
- Usuarios y roles.
- Mensajes de contacto.

Cuando un administrador crea, edita o elimina contenido desde el panel, el cambio queda guardado en la base de datos y puede verse de forma global en el sitio. No es necesario hacer un nuevo despliegue para cambios de contenido.

## 4. Panel de administración

El panel de administración permite gestionar secciones del sitio desde una interfaz privada. La idea es que tareas como agregar una noticia, editar un plan o actualizar un slide puedan realizarse directamente desde el navegador.

Esto es una práctica viable y común en sitios modernos, siempre que existan permisos, validaciones y control de acceso adecuados.

## 5. Seguridad

El proyecto cuenta con autenticación de usuarios y control por roles. El rol de administrador permite acceder al panel privado.

Medidas consideradas:

- Inicio de sesión mediante NextAuth.
- Contraseñas validadas con hash seguro.
- Separación de usuarios por roles.
- Rutas de administración protegidas.
- Variables sensibles guardadas en archivos de entorno.

Antes de producción, se recomienda reforzar validaciones en todas las acciones críticas del administrador y revisar permisos en cada operación de creación, edición y eliminación.

## 6. Infraestructura recomendada

Para publicar el proyecto se recomienda usar:

- Hosting para Next.js, por ejemplo Vercel, Railway, Render u otro proveedor compatible.
- Base de datos PostgreSQL en Supabase u otro servicio administrado.
- Almacenamiento de imágenes en un servicio externo, como Supabase Storage, para evitar depender de archivos locales del servidor.
- Variables de entorno configuradas directamente en el proveedor de hosting.

El hosting puede mejorar la experiencia si está bien configurado, pero la velocidad también depende de la base de datos, ubicación del servidor, consultas realizadas, imágenes y optimización general del sitio.

## 7. Diferencia entre código y contenido

Los cambios de código requieren despliegue. Ejemplos:

- Cambios de diseño.
- Nuevas funcionalidades.
- Cambios en la estructura del panel.
- Correcciones internas del sistema.

Los cambios de contenido no deberían requerir despliegue. Ejemplos:

- Crear una noticia.
- Editar un plan.
- Agregar una competencia.
- Cambiar un slide del inicio.

Estos cambios se guardan en la base de datos y se reflejan en el sitio.

## 8. Próximos puntos importantes

Antes de una publicación definitiva, se recomienda revisar:

- Seguridad de todas las acciones del panel admin.
- Validación de formularios.
- Manejo definitivo de imágenes.
- Optimización de rendimiento.
- Revisión responsive para celulares.
- Pruebas de creación, edición y eliminación de contenido.
- Configuración correcta de variables de entorno en producción.

## 9. Resumen ejecutivo

El proyecto tiene una base moderna y escalable para un sitio administrable. La arquitectura permite separar los cambios de contenido de los cambios de código, lo que facilita que un administrador actualice información sin depender de despliegues constantes.

La siguiente etapa recomendada es preparar el entorno de producción, reforzar seguridad y definir el sistema definitivo de almacenamiento de imágenes.
