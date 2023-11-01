# Stage 1 - Base Setup
FROM node:20-alpine@sha256:8e015de364a2eb2ed7c52a558e9f716dcb615560ffd132234087c10ccc1f2c63 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Stage 2 - Dependencies and Prisma Client
FROM base AS dependencies

COPY --chown=node:node .npmrc .
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --chown=node:node ./libs/backend/prisma ./libs/backend/prisma
RUN pnpm prisma:generate

# Stage 3 - Build
FROM base AS builder

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm exec nx run gynoecium:build --configuration=production

# Stage 4 - Production Dependencies
FROM base AS prod-dependencies

COPY --chown=node:node --from=builder /app/dist/apps/gynoecium/package.json .
COPY --chown=node:node --from=builder /app/dist/apps/gynoecium/pnpm-lock.yaml .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --production --frozen-lockfile

COPY --chown=node:node --from=dependencies /app/node_modules/.prisma/client ./node_modules/@prisma/client

# Stage 5 - Production Runnner
FROM node:20-alpine@sha256:8e015de364a2eb2ed7c52a558e9f716dcb615560ffd132234087c10ccc1f2c63 AS production

ENV NODE_ENV production

WORKDIR /app

COPY --chown=node:node --from=prod-dependencies /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist/apps/gynoecium .

USER node

CMD [ "node", "main.js" ]
