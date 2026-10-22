# Sugerencias de ubicación con Google

La integración está preparada en el campo **Ubicación** al crear o editar una
competencia. Es el único formulario actual que solicita una ubicación.
No se habilitó ningún servicio, facturación o clave de Google durante este cambio.
Sin configuración el campo sigue funcionando con escritura manual.

## Activación

1. Crear o elegir un proyecto en [Google Cloud Console](https://console.cloud.google.com/).
2. Habilitar facturación y **Places API (New)**. No hace falta Maps JavaScript API:
   las búsquedas se realizan desde el servidor, sin cargar un mapa o un SDK.
3. Crear una clave específica y restringirla a **Places API (New)**. Como es una
   clave de servidor, usar restricciones de IP con la IP pública de salida del
   servidor. Las restricciones HTTP de dominio/referrer no corresponden a este
   flujo. Para desarrollo, usar una clave/proyecto separado con su IP de salida.
4. Configurar esta variable en el entorno del proceso que ejecuta THEIA:

   ```dotenv
   GOOGLE_PLACES_API_KEY=CLAVE_DE_PLACES
   ```

   En local corresponde a `.env.development.local`. En Docker, añadirla al archivo
   de variables operativo que ya utiliza el contenedor. No subirlo a Git ni usar
   `NEXT_PUBLIC_`: la clave no debe llegar al navegador.
5. Reiniciar el servidor local o recrear el contenedor con su nuevo entorno.
   No se necesita una migración, seed ni pasar la clave al build.
6. Revisar cuotas y alertas de consumo en Google Cloud antes de utilizarlo.
   Google exige facturación habilitada y aplica sus tarifas de Autocomplete.

## Funcionamiento

- La búsqueda empieza al escribir tres caracteres, con una espera de 350 ms para
  evitar una consulta por cada pulsación. Sugiere hasta cinco ubicaciones en
  español, con región Chile, sin impedir buscar competencias en otros países.
- Se puede seleccionar con clic o con flechas y Enter. Escape cierra las
  sugerencias; el campo permite seguir escribiendo o corregir el texto.
- La lista muestra la atribución Google Maps y se mantiene dentro del modal.
- Solo un administrador autenticado puede consultar el endpoint
  `POST /api/admin/locations`. Tiene límite por usuario y timeout de cinco segundos.
- Las sugerencias no se almacenan en la base ni en una caché. Únicamente se guarda
  el texto que el administrador confirma en el campo al guardar la competencia,
  como ocurría con la ubicación escrita a mano.
- Se usa Autocomplete por petición, sin tokens de sesión ni consultas extra a
  Place Details. No se presenta este flujo como facturación por sesión.
- Si falta configuración o Google no responde, sigue disponible la entrada manual.

La clave OAuth del inicio de sesión con Google no sirve para esta API.
No se modificaron archivos `.env` ni se enviaron consultas reales en las pruebas.

## Referencias

- [Configuración oficial de Places API (New)](https://developers.google.com/maps/documentation/places/web-service/get-api-key).
- [Autocomplete (New)](https://developers.google.com/maps/documentation/places/web-service/place-autocomplete).
- [Uso y facturación](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing/).
- [Atribución y condiciones de los datos de Autocomplete](https://developers.google.com/maps/documentation/places/web-service/policies).
