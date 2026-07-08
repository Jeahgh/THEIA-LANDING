This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

Para levantar la app junto con PostgreSQL:

```bash
docker compose up --build
```

La aplicacion queda en [http://localhost:3001](http://localhost:3001). PostgreSQL queda disponible desde tu maquina en `localhost:5433` con usuario `postgres`, password `postgres` y base `theia`.

El servicio `migrate` ejecuta:

```bash
npx prisma migrate deploy
node prisma/seed.mjs
```

Para detener los contenedores:

```bash
docker compose down
```

Para borrar tambien la base de datos local de Docker y partir desde cero:

```bash
docker compose down -v
```

Docker conviene para probar el proyecto completo o desplegarlo en un servidor. Para desarrollo diario en Windows, `npm run dev` suele ser mas rapido.

## Email transaccional

La app envia correos para verificar cuenta y recuperar contrasena. Puedes usar SMTP de cPanel o Resend.

Variables minimas:

```env
AUTH_URL="https://theiasport.cl"
NEXT_PUBLIC_APP_URL="https://theiasport.cl"
EMAIL_FROM="Theia <contacto@theiasport.cl>"
```

Para SMTP/cPanel:

```env
SMTP_HOST="mail.theiasport.cl"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="contacto@theiasport.cl"
SMTP_PASS="password-del-correo"
```

Correos oficiales visibles del sitio:

- contacto@theiasport.cl
- finanzas@theiasport.cl
- administracion@theiasport.cl

Para Resend:

```env
RESEND_API_KEY="re_..."
```

En desarrollo, si no configuras SMTP ni Resend, la app imprime el enlace de verificacion/recuperacion en la consola del servidor.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
