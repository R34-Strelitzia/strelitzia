# Stage 1 - Base Setup
FROM node:21-alpine@sha256:df76a9449df49785f89d517764012e3396b063ba3e746e8d88f36e9f332b1864 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY --chown=node:node .npmrc .
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

# Stage 2 - Dependencies and Prisma Client
FROM base AS dependencies

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --chown=node:node ./libs/backend/prisma ./libs/backend/prisma
RUN pnpm prisma:generate

# Stage 3 - Production Dependencies
FROM base AS prod-dependencies

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

RUN pnpm prune --prod

# Stage 4 - Build
FROM base AS builder

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm exec nx run gynoecium:build --configuration=production

# Stage 5 - Production Runnner
FROM node:21-alpine@sha256:df76a9449df49785f89d517764012e3396b063ba3e746e8d88f36e9f332b1864 AS production

ENV NODE_ENV production

WORKDIR /app

COPY --chown=node:node --from=prod-dependencies /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist/apps/gynoecium .

USER node

CMD [ "node", "main.js" ]
