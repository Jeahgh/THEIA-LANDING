# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS deps

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Marca interna para los comandos destructivos. BuildKit no siempre crea
# /.dockerenv durante las instrucciones RUN.
RUN mkdir -p /run && touch /run/theia-container-context

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

FROM deps AS builder

# Solo las entradas del build: documentos, pruebas y herramientas locales no
# invalidan esta capa ni pueden terminar en el artefacto por accidente.
COPY next.config.ts tsconfig.json postcss.config.mjs prisma.config.ts ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY scripts/container-tools.cjs ./scripts/container-tools.cjs
COPY src ./src
COPY public ./public

# Prisma exige una URL al cargar prisma.config.ts, aunque `generate` y el build
# no se conectan a esta base ficticia. El valor no se copia al artefacto final.
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build?schema=public
ENV THEIA_CONTAINER_CONTEXT=1

RUN npm run db:generate
# La compilación no necesita PostgreSQL, Google Fonts ni otros servicios.
# Si vuelve a introducirse una dependencia externa, debe fallar aquí.
RUN --network=none npm run build:container

# El servidor standalone no copia estos directorios por defecto.
RUN mkdir -p .next/standalone/public \
  && cp -R public/. .next/standalone/public/ \
  && mkdir -p .next/standalone/.next \
  && cp -R .next/static .next/standalone/.next/static \
  && find .next/standalone -maxdepth 1 -type f -name '.env*' -delete

FROM deps AS migrator

COPY prisma/schema.prisma ./prisma/schema.prisma
COPY prisma/migrations ./prisma/migrations
COPY prisma.config.ts ./prisma.config.ts
COPY scripts/container-tools.cjs ./scripts/container-tools.cjs

ENV THEIA_CONTAINER_CONTEXT=1
RUN DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build?schema=public npm run db:generate

# Esta imagen ni siquiera contiene el archivo del seed.
CMD ["npm", "run", "db:deploy:container"]

# Target opcional: no participa en el build ni arranque de runner/migrator.
# Su ejecución requiere además --confirm-seed; ver docs/despliegue-servidor.md.
FROM migrator AS seeder

COPY prisma/seed.mjs ./prisma/seed.mjs

CMD ["npm", "run", "db:seed:container"]

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
