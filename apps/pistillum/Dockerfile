FROM node:20-alpine@sha256:842159a809c86c28a799b235f95e6010aa64d967d98eee0db4db5979d33dd43e AS base

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

FROM nginx:1.25-alpine@sha256:f2802c2a9d09c7aa3ace27445dfc5656ff24355da28e7b958074a0111e3fc076 AS production

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
