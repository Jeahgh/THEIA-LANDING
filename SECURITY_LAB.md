# Laboratorio aislado de seguridad de TheiaSport

## Objetivo y límites

Este laboratorio permite estudiar TheiaSport desde Kali Linux sin tocar `theiasport.cl`, el servidor productivo ni datos reales. Todos los ejercicios ofensivos deben apuntar únicamente a las IP privadas asignadas por usted al laboratorio.

```text
Kali Linux VM (192.168.56.10)
          ↓ red VirtualBox Host-Only: 192.168.56.0/24
TheiaSport Lab VM (192.168.56.20)
          ↓ Docker network privada
Next.js :3000 ───────── PostgreSQL :5432 interno
          └─ opcional de práctica: 192.168.56.20:5433 → db:5432
```

Nunca:

- importe un dump, `.env`, cookie, email o fotografía de producción;
- apunte Nmap, Burp, sqlmap o un script al dominio/IP del hosting;
- use credenciales reutilizadas;
- conecte la interfaz vulnerable a modo Bridge;
- publique 3000/5433 en `0.0.0.0`;
- introduzca una vulnerabilidad deliberada en la rama de producción.

## Requisitos

- VirtualBox actualizado.
- Una VM Kali y una VM Ubuntu/Debian de laboratorio.
- Docker Engine + Compose v2 en la VM TheiaSport.
- Git y Node 22 solo si también se ejecutarán tests fuera de Docker.
- Al menos 4 GiB RAM para TheiaSport Lab, 2 CPU y 20 GiB de disco libre.
- Snapshot limpio de ambas VMs antes de practicar.

## 1. Crear la red privada de VirtualBox

En VirtualBox:

1. abra **Tools → Network → Host-only Networks**;
2. cree una red `vboxnet0`/`VirtualBox Host-Only Ethernet Adapter`;
3. use `192.168.56.1/24`;
4. desactive DHCP o reserve IPs fijas;
5. conecte el **Adapter 2** de ambas VMs a esa red Host-Only;
6. use NAT solo como Adapter 1 para actualizaciones salientes;
7. nunca use Bridged para el objetivo vulnerable.

Direcciones sugeridas:

| Equipo | Interfaz host-only | IP |
| --- | --- | --- |
| Kali | Adapter 2 | `192.168.56.10/24` |
| TheiaSport Lab | Adapter 2 | `192.168.56.20/24` |

En Linux con NetworkManager, adapte el nombre de la interfaz (`enp0s8` es solo ejemplo):

```bash
sudo nmcli con add type ethernet ifname enp0s8 con-name theia-hostonly \
  ipv4.method manual ipv4.addresses 192.168.56.20/24 ipv6.method disabled
sudo nmcli con up theia-hostonly
```

En Kali use la misma operación con `192.168.56.10/24`. Compruebe desde Kali:

```bash
ping -c 3 192.168.56.20
```

La red Host-Only no debe tener una ruta por defecto. La ruta por defecto continúa por NAT.

## 2. Preparar una copia sin datos reales

En la VM TheiaSport Lab:

```bash
git clone <URL_DEL_REPOSITORIO_DE_LAB> theia-security-lab
cd theia-security-lab
git switch -c lab/security-training
```

Revise antes de levantar:

```bash
git status --short
git ls-files | grep -E '(^|/)(\.env|.*\.pem|.*\.key)$' && echo 'REVISAR' || true
find public/uploads -type f 2>/dev/null
```

Use únicamente el seed sintético del repositorio. Si algún archivo de `public/uploads` representa una persona real, retírelo de **la copia de laboratorio** y reemplácelo por una imagen sintética; no reescriba el repositorio compartido desde este paso.

No copie ninguno de estos archivos desde la estación de desarrollo:

```text
.env.backup
.env.backup.local
.env.development.local
.env.production-ops.local
dumps SQL
backups de public/uploads
```

## 3. Variables exclusivas del laboratorio

Genere valores nuevos que no se reutilicen:

```bash
openssl rand -base64 32
openssl rand -hex 16
```

Cree un `.env.security-lab` ignorado por Git con permisos 600:

```dotenv
THEIA_LAB_BIND_IP=192.168.56.20
POSTGRES_DB=theia_lab
POSTGRES_USER=theia_lab_app
POSTGRES_PASSWORD=SOLO_LAB_VALOR_ALEATORIO
AUTH_SECRET=SOLO_LAB_SECRETO_ALEATORIO
AUTH_URL=http://192.168.56.20:3000
NEXT_PUBLIC_APP_URL=http://192.168.56.20:3000
AUTH_GOOGLE_ID=lab-google-disabled
AUTH_GOOGLE_SECRET=lab-google-disabled
NEXT_TELEMETRY_DISABLED=1
```

```bash
chmod 600 .env.security-lab
git check-ignore .env.security-lab
```

Para practicar login sin depender de Google, use cuentas sintéticas creadas por el seed o por la herramienta local de administración. No habilite un OAuth client productivo.

## 4. Compose del laboratorio

La opción más segura es un archivo Compose separado que exija la IP Host-Only. Si el repositorio contiene `docker-compose.security-lab.yml`, levántelo así:

```bash
docker compose \
  --env-file .env.security-lab \
  -f docker-compose.security-lab.yml \
  config
```

Antes de `up`, confirme en la salida que los dos únicos bindings son:

```text
192.168.56.20:3000 → web:3000
192.168.56.20:5433 → db:5432     # solo mientras se estudia PostgreSQL
```

Nunca continúe si aparece `0.0.0.0` o una IP de la interfaz NAT.

Levante y observe estado:

```bash
docker compose \
  --env-file .env.security-lab \
  -f docker-compose.security-lab.yml \
  up -d --build

docker compose \
  --env-file .env.security-lab \
  -f docker-compose.security-lab.yml \
  ps
```

El servicio `migrate` ejecuta migraciones y el seed sintético antes de habilitar `web`. Compruebe que terminó correctamente:

```bash
docker compose \
  --env-file .env.security-lab \
  -f docker-compose.security-lab.yml \
  logs migrate
```

Para repetir migración+seed después de vaciar la base sintética:

```bash
docker compose \
  --env-file .env.security-lab \
  -f docker-compose.security-lab.yml \
  run --rm migrate
```

No improvise un comando contra una URL externa. Verifique primero con `docker compose ... config` que el hostname de `DATABASE_URL` sea `db`.

## 5. Firewall del objetivo

En la VM TheiaSport Lab, permita solo Kali por la red Host-Only:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow in on enp0s8 from 192.168.56.10 to 192.168.56.20 port 3000 proto tcp
sudo ufw allow in on enp0s8 from 192.168.56.10 to 192.168.56.20 port 5433 proto tcp
sudo ufw enable
sudo ufw status numbered
```

Adapte `enp0s8`. No abra los puertos en la interfaz NAT. Cuando no estudie PostgreSQL, retire la regla 5433 y el mapping del Compose.

## 6. Comprobación básica desde Kali

Primero delimite el target en una variable para evitar errores:

```bash
export THEIA_LAB_TARGET=192.168.56.20
test "$THEIA_LAB_TARGET" = '192.168.56.20' || exit 1
```

Descubrimiento controlado:

```bash
nmap -Pn -sT -sV -p 3000,5433 "$THEIA_LAB_TARGET"
curl -i "http://$THEIA_LAB_TARGET:3000/"
curl -i "http://$THEIA_LAB_TARGET:3000/login"
```

Resultado esperado:

- 3000 abierto mientras web está activa;
- 5433 abierto solo durante el módulo de PostgreSQL;
- no aparecen 80/443/mail/MariaDB del hosting real porque este es otro sistema.

No use rangos fuera de `192.168.56.0/24` y no active scripts NSE intrusivos contra sistemas que no sean su VM.

## 7. Burp Suite

1. Abra Burp en Kali.
2. Proxy listener: `127.0.0.1:8080`.
3. Use el navegador integrado o configure Firefox con ese proxy.
4. Visite `http://192.168.56.20:3000`.
5. Cree cuentas sintéticas MEMBER y ADMIN distintas.
6. Guarde un project file dentro de un volumen cifrado o elimínelo al terminar; puede contener cookies.

Ejercicios seguros:

- observar `HttpOnly`, `SameSite` y expiración de cookies;
- modificar IDs únicamente en la copia local para buscar IDOR;
- repetir una request de Action/Route Handler y confirmar 401/403;
- cambiar `Origin` contra los Route Handlers locales;
- enviar MIME declarado incorrecto a uploads con archivos inofensivos;
- comprobar máximos de campos y respuestas 413/429;
- revocar el admin desde una segunda sesión y navegar sin refresh;
- verificar que callback URLs externas se normalizan a una ruta interna.

No realice brute force. Para rate limiting, reduzca temporalmente el límite **solo en la rama de laboratorio** y haga 3–6 requests manuales.

## 8. Módulo PostgreSQL

Use una contraseña exclusiva del lab:

```bash
psql "host=192.168.56.20 port=5433 dbname=theia_lab user=theia_lab_app sslmode=disable"
```

`sslmode=disable` es aceptable únicamente en esta red Host-Only aislada para observar tráfico. Luego practique la variante TLS local y compare.

Comprobaciones de aprendizaje:

```sql
SELECT current_user, current_database();
\du
\dn+
\dp
```

El rol de aplicación no debería ser superuser, crear roles/bases ni acceder a otras bases. Para demostrar mínimo privilegio, intente una operación administrativa inocua y espere `permission denied`; no destruya el esquema.

Cuando termine:

```bash
sudo ufw delete allow in on enp0s8 from 192.168.56.10 to 192.168.56.20 port 5433 proto tcp
```

## 9. HTTPS local opcional

Para estudiar TLS, añada un reverse proxy **solo en la VM lab**. Dos opciones:

- Caddy con CA interna (`tls internal`);
- Nginx con certificado generado por `mkcert` y CA importada únicamente en Kali.

Ejemplo conceptual de Caddy:

```caddyfile
theia.lab {
  tls internal
  reverse_proxy web:3000
  request_body {
    max_size 8MB
  }
}
```

Mapee en Kali:

```text
192.168.56.20 theia.lab
```

No use Let's Encrypt ni publique el challenge en Internet. Compare HTTP→HTTPS, HSTS de prueba, TLS y cookies Secure. Borre la CA del navegador al destruir el laboratorio.

## 10. Logs y observabilidad

En el objetivo:

```bash
docker compose \
  --env-file .env.security-lab \
  -f docker-compose.security-lab.yml \
  logs -f --tail=200 web db
```

Durante ejercicios verifique que no aparezcan:

- password;
- cookie/JWT completo;
- token de verificación/reset;
- URL con token;
- cadena de conexión completa;
- mensaje de contacto completo.

Sí deberían aparecer, una vez implementado el hardening, eventos redactados de bloqueo, actor, acción, resultado y request-id.

## 11. Plan de prácticas por OWASP

| Módulo | Práctica local | Resultado seguro esperado |
| --- | --- | --- |
| A01 Access Control | MEMBER llama Action/admin y cambia IDs | 403/redirect, sin datos |
| A02 Crypto | inspeccionar cookies/TLS/tokens en URL | flags seguros; URL limpia |
| A03 Injection | caracteres SQL/HTML inofensivos en campos | Prisma/React los tratan como datos |
| A04 Design | límites de body/upload y concurrencia pequeña | 413/429 sin degradación |
| A05 Config | headers, banners, puertos/firewall | headers presentes; solo puertos previstos |
| A06 Components | `npm audit`/SBOM offline | versiones corregidas o excepción documentada |
| A07 Auth | revocación, timing y rate limit reducido | sesión cerrada y límite compartido |
| A08 Integrity | hash del artefacto/BUILD_ID | coincide con commit/lockfile |
| A09 Logging | revisar eventos de auth/admin/upload | trazabilidad sin secretos |
| A10 SSRF | URLs remotas permitidas/rechazadas | allowlist; sin acceso a IP local |

## 12. Captura de evidencia

Guarde únicamente:

- fecha/hora y commit;
- IP privada del lab;
- request/response con cookies/tokens redactados;
- comando exacto y resultado;
- screenshot sin PII;
- observación, impacto y corrección;
- test de regresión.

Formato recomendado:

```text
LAB-YYYY-NNN
Target: 192.168.56.20:3000
Commit: <hash>
Precondición: cuenta sintética MEMBER
Acción: <pasos no destructivos>
Esperado/obtenido: ...
Evidencia redactada: ...
Fix/test: ...
```

## 13. Detener, destruir y reconstruir

### Detener conservando datos sintéticos

```bash
docker compose \
  --env-file .env.security-lab \
  -f docker-compose.security-lab.yml \
  stop
```

### Destruir solo el stack y volumen del laboratorio

El siguiente comando elimina la base sintética. Antes, confirme que está en el checkout de laboratorio y que el config no contiene recursos externos:

```bash
pwd
docker compose --env-file .env.security-lab -f docker-compose.security-lab.yml config --services
docker compose --env-file .env.security-lab -f docker-compose.security-lab.yml down -v --remove-orphans
```

No ejecute `docker system prune`, no elimine volúmenes por glob y no use este comando con el Compose de otro proyecto.

### Reconstruir desde cero

```bash
git status --short
docker compose --env-file .env.security-lab -f docker-compose.security-lab.yml build --no-cache
docker compose --env-file .env.security-lab -f docker-compose.security-lab.yml up -d
docker compose --env-file .env.security-lab -f docker-compose.security-lab.yml ps
```

Vuelva a ejecutar migraciones y seed sintético. Para regresar a un estado totalmente conocido, restaure el snapshot de ambas VMs.

## Checklist antes de cada sesión

- [ ] Target escrito: `192.168.56.20`, nunca dominio/IP productiva.
- [ ] VMs en Host-Only, no Bridged.
- [ ] Datos y secretos exclusivamente sintéticos.
- [ ] Bindings solo a IP Host-Only.
- [ ] Firewall acepta únicamente Kali.
- [ ] Snapshot disponible.
- [ ] Scope y ejercicio anotados.
- [ ] Sin brute force ni payload destructivo.
- [ ] Logs/evidencia con redacción.
- [ ] 5433 cerrado al terminar el módulo DB.
- [ ] Stack destruido o detenido al terminar.
