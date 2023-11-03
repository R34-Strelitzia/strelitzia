# Stage 1 - Base Setup
FROM node:20-alpine AS base

RUN apk add --no-cache tini

WORKDIR /app

# Stage 2 - Setup pnpm
FROM base AS pnpm

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Stage 3 - Dependencies and Prisma Client
FROM pnpm AS dependencies

COPY --chown=node:node .npmrc .
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --chown=node:node ./libs/backend/prisma ./libs/backend/prisma
RUN pnpm prisma:generate

# Stage 4 - Build
FROM pnpm AS builder

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm exec nx run gynoecium:build --configuration=production

# Stage 5 - Production Dependencies
FROM pnpm AS prod-dependencies

COPY --chown=node:node --from=builder /app/dist/apps/gynoecium/package.json .
COPY --chown=node:node --from=builder /app/dist/apps/gynoecium/pnpm-lock.yaml .

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

RUN pnpm prune --production

# Stage 6 - Production Runnner
FROM base

ENV NODE_ENV production

COPY --chown=node:node --from=prod-dependencies /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist/apps/gynoecium .

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "node", "main.js" ]
