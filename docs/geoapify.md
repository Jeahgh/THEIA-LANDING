# Sugerencias de ubicación con Geoapify Free

Crear/Editar competencia utiliza Geoapify Address Autocomplete. Se retiró Google
Places; el login con Google y sus credenciales OAuth conservan su configuración.

## 1. Crear la clave gratuita

1. Registrarse en [Geoapify MyProjects](https://myprojects.geoapify.com/).
2. Mantener el plan **Free**, sin añadir tarjeta ni contratar pagos.
3. Crear un proyecto, por ejemplo `THEIA`, y abrir **API Keys**. Se genera una
   clave automáticamente; se pueden crear claves diferenciadas para local y
   producción dentro de ese mismo proyecto.
4. Restringir cada clave a la IP pública de salida del entorno correspondiente:
   conexión a Internet de tu PC para local y salida de Ubuntu para producción.
   Las peticiones salen del backend; no usar restricciones de origen/referrer,
   `localhost`, una IP privada de Docker ni la IP de Cloudflare. Si cambia la IP
   pública local, actualizarla en MyProjects.
5. Copiar la clave directamente al archivo de variables, sin pegarla en chats,
   capturas, documentación o Git.

Free publica 3.000 créditos diarios sin tarjeta y permite uso comercial con
atribución. Autocomplete consume un crédito por petición. Las claves comparten
la cuota de la cuenta; no crear cuentas/proyectos para eludir límites.

## 2. Local, con Next.js fuera de Docker

Añadir a `.env.development.local`, conservando todas sus variables existentes:

```dotenv
GEOAPIFY_API_KEY=TU_CLAVE_LOCAL
```

Es una variable privada: nunca usar `NEXT_PUBLIC_`. `.env.example` incluye el
nombre vacío como referencia. Sin clave se mantiene la escritura manual.

Esta versión añade `20261023000000_add_location_search_usage`, que crea un contador
sin búsquedas ni datos personales. En una instalación local ya configurada,
detener el servidor anterior y ejecutar:

```bash
npm run db:generate
npm run dev
```

`dev` inicia PostgreSQL local, aplica migraciones pendientes y levanta Next.js;
no ejecuta seed. Si ya están aplicadas, basta reiniciar con `npm run dev:web`.
No sobrescribir `.env.development.local` con la plantilla.

## 3. Local con Docker

El Compose local ya carga `.env.development.local`. Para instalar esta versión:

```bash
docker compose build migrate web
docker compose up -d --wait db
docker compose run --rm --no-deps migrate
docker compose up -d --no-deps --force-recreate web
```

Después de cambiar solamente la clave, basta el último comando. `restart` no
incorpora cambios de variables al contenedor. Conservar todos los volúmenes.

## 4. Ubuntu / producción

Cuando se publique esta rama, construir la nueva imagen y aplicar las migraciones
con [despliegue-servidor.md](despliegue-servidor.md), sin seed. La migración del
contador es necesaria antes de usar las sugerencias. Si falta o la base falla,
el backend no consulta Geoapify y la ubicación permite texto manual.

Añadir `GEOAPIFY_API_KEY=TU_CLAVE_DE_PRODUCCION` al archivo que el servicio web ya
recibe mediante `env_file` o su gestor de secretos. La variable tiene que entrar
al contenedor, no quedar solamente en el shell. Mantener ese archivo fuera de Git.

Recrear únicamente web usando el Compose real. Si el servicio se llama `web` y
`THEIA_PRODUCTION_COMPOSE_FILE` apunta al archivo correcto:

```bash
docker compose -f "$THEIA_PRODUCTION_COMPOSE_FILE" up -d --no-deps --force-recreate web
```

Cambiar la clave no requiere recompilar ni otra migración. No usar el Compose
local ni cambiar PostgreSQL, Nginx o Cloudflare para esta configuración. Esta
revisión no despliega ni activa facturación.

## 5. Probar

1. Iniciar sesión con una cuenta administradora existente.
2. Abrir **Competencias → Crear competencia → Ubicación**.
3. Escribir tres caracteres o más, por ejemplo `Valdivia` o `Santiago`.
4. Seleccionar una sugerencia con clic o con flechas y Enter.
5. Comprobar que se puede corregir o escribir el texto libremente. No hace falta
   guardar una competencia de prueba.

Sin clave se indica que las sugerencias están pendientes de activar. Una clave
inválida, cuota agotada o fallo de red deja disponible la escritura manual.
No se imprimen detalles del proveedor ni la URL que contiene la clave.

## 6. Límites y privacidad

- Solo ADMIN puede consultar el endpoint; la clave no llega al navegador.
- Espera de 350 ms tras escribir, cinco sugerencias en español y preferencia
  por Chile, permitiendo también búsquedas en otros países.
- Máximo 60 consultas/minuto por administrador y cuatro/segundo por proceso.
- Tope propio fijo de **500 intentos por fecha UTC y por base de datos**. Se
  comparte entre administradores y réplicas mediante incremento atómico en
  PostgreSQL y persiste tras reinicios. También cuenta intentos fallidos: un
  timeout podría haber sido contabilizado por el proveedor.
- Al agotarlo se detienen las consultas externas y se permite texto manual.
  Cerrar y abrir el modal después del cambio de día permite volver a consultar.
- Local y producción con bases separadas tienen contadores separados. El tope
  no mide otros servicios ni llamadas fuera de THEIA. Revisar el consumo de la
  cuenta en MyProjects y mantener las claves dedicadas a esta integración.
- No se guardan búsquedas ni claves en el contador. No hay caché de resultados;
  se guarda solo la ubicación confirmada al guardar la competencia, como antes.
- Se muestra la atribución de Geoapify y OpenStreetMap junto al campo.

## Verificación de esta versión

137 pruebas correctas, TypeScript y lint sin errores (un aviso previo sin uso).
Build Docker y standalone aislado correctos. La migración se aplicó solamente en
local. En un PostgreSQL temporal separado, 510 reservas concurrentes permitieron
exactamente 500 consultas; reconectar no reinició el tope y el día siguiente sí.
El contenedor temporal se eliminó. Las respuestas de Geoapify se probaron con
fixtures: la prueba real del proveedor queda pendiente de configurar una clave.

## Referencias

- [Plan Free](https://www.geoapify.com/pricing/).
- [Créditos por petición](https://www.geoapify.com/pricing-details/).
- [Autocomplete y claves](https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/).
- [Atribución y condiciones](https://www.geoapify.com/terms-and-conditions/).
