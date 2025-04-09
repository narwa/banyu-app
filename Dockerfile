# Stage 1: Build
FROM node:18-alpine AS builder

ARG NUXT_API_BASE_PATH="https://banyuapi.obahnow.com"
ARG NUXT_PUBLIC_FIREBASE_API_ID="AIzaSyDYHEyWwlhH7Zlaa-0gF62hATGLF1jmFe0"
ARG NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN="obahnow-528ec.firebaseapp.com"
ARG NUXT_PUBLIC_FIREBASE_PROJECT_ID="obahnow-528ec"
ARG NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET="obahnow-528ec.firebasestorage.app"
ARG NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1038049532307"
ARG NUXT_PUBLIC_FIREBASE_APP_ID="1:1038049532307:web:e2a20832111355e3633066"

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm i

# Copy source code
COPY app.vue error.vue ./
COPY nuxt.config.ts tailwind.config.js tsconfig.json ./
COPY assets/ ./assets/
COPY builders/ ./builders/
COPY components/ ./components/
COPY composables/ ./composables/
COPY constants/ ./constants/
COPY endpoints/ ./endpoints/
COPY exceptions/ ./exceptions/
COPY layouts/ ./layouts/
COPY middleware/ ./middleware/
COPY models/ ./models/
COPY pages/ ./pages/
COPY plugins/ ./plugins/
COPY public/ ./public/
COPY server/ ./server/
COPY services/ ./services/
COPY stores/ ./stores/
COPY styles/ ./styles/
COPY types/ ./types/
COPY utils/ ./utils/
COPY nginx/ ./nginx/

# Set production environment
ENV NODE_ENV=production

ENV NUXT_PUBLIC_FIREBASE_API_ID=${NUXT_PUBLIC_FIREBASE_API_ID}
ENV NUXT_API_BASE_PATH=${NUXT_API_BASE_PATH}
ENV NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
ENV NUXT_PUBLIC_FIREBASE_PROJECT_ID=${NUXT_PUBLIC_FIREBASE_PROJECT_ID}
ENV NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
ENV NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
ENV NUXT_PUBLIC_FIREBASE_APP_ID=${NUXT_PUBLIC_FIREBASE_APP_ID}

# Generate static files
RUN pnpm run generate

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN apk add logrotate

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV NODE_ENV=production

ENV NUXT_PUBLIC_FIREBASE_API_ID=${NUXT_PUBLIC_FIREBASE_API_ID}
ENV NUXT_API_BASE_PATH=${NUXT_API_BASE_PATH}
ENV NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
ENV NUXT_PUBLIC_FIREBASE_PROJECT_ID=${NUXT_PUBLIC_FIREBASE_PROJECT_ID}
ENV NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
ENV NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
ENV NUXT_PUBLIC_FIREBASE_APP_ID=${NUXT_PUBLIC_FIREBASE_APP_ID}

# Copy nginx configuration (if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder
COPY --chown=appuser:appgroup --from=builder /app/.output/public /usr/share/nginx/html
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/nginx.conf

RUN touch /var/run/nginx.pid && \
  chown -R appuser:appgroup /var/run/nginx.pid && \
  chown -R appuser:appgroup /var/cache/nginx && \
  chown -R appuser:appgroup /etc/periodic/ && \
  chown -R appuser:appgroup /etc/logrotate.d/nginx

# Switch to non-root user
USER appuser

# Expose port 80
EXPOSE 80

# Nginx will start automatically