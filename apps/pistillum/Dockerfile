FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

FROM base AS dependencies

COPY --chown=nginx:nginx .npmrc .
COPY --chown=nginx:nginx package.json ./
COPY --chown=nginx:nginx pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder

COPY --chown=nginx:nginx --from=dependencies /app/node_modules ./node_modules

COPY --chown=nginx:nginx . .

RUN pnpm exec nx run pistillum:build --configuration=production

FROM nginx:1.25-alpine@sha256:bb193a04d4f2026c6342fc142741d8036a27ea89674830a0fd0569d58bb2ca77 AS production

COPY --chown=nginx:nginx ./apps/pistillum/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY --chown=nginx:nginx --from=builder /app/dist/apps/pistillum ./www

RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080
STOPSIGNAL SIGQUIT
CMD [ "nginx", "-g", "daemon off;" ]
