# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Build-time args - pass your API URLs when building
ARG BASE_URL=http://localhost:3001
ARG MAIN_URL=http://localhost:8080

ENV BASE_URL=$BASE_URL
ENV MAIN_URL=$MAIN_URL
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package*.json ./
RUN npm ci

COPY . .

# Generate static files for SPA (outputs to dist/)
RUN npm run generate

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config for SPA routing (all routes -> index.html)
RUN echo 'server { \
  listen 80; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { \
    try_files $uri $uri/ /200.html; \
  } \
  location /health { \
    return 200 "ok"; \
    add_header Content-Type text/plain; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
