# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS deps

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM deps AS builder

COPY . .

# Prisma exige una URL al cargar prisma.config.ts, aunque `generate` y el build
# no se conectan a esta base ficticia. El valor no se copia al artefacto final.
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build?schema=public

RUN npm run db:generate
RUN npm run build -- --webpack

# El servidor standalone no copia estos directorios por defecto.
RUN mkdir -p .next/standalone/public \
  && cp -R public/. .next/standalone/public/ \
  && mkdir -p .next/standalone/.next \
  && cp -R .next/static .next/standalone/.next/static \
  && find .next/standalone -maxdepth 1 -type f -name '.env*' -delete \
  && mkdir -p /app/cpanel-artifact \
  && cp -aL .next/standalone/. /app/cpanel-artifact/

# Salida exportable con `docker build --target cpanel-artifact --output ...`.
FROM scratch AS cpanel-artifact
COPY --from=builder /app/cpanel-artifact/ /

FROM deps AS migrator

COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build?schema=public
RUN npm run db:generate

CMD ["sh", "-c", "npm run db:deploy && npm run db:seed"]

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node --from=builder /app/.next/standalone ./

RUN mkdir -p public/uploads \
  && chown -R node:node public/uploads .next

USER node

EXPOSE 3000

CMD ["node", "server.js"]
