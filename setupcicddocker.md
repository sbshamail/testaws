# Next.js Deployment with Docker and PM2 (No Nginx)

---

## 1. Dockerfile Setup

Create a `Dockerfile` in your Next.js project root:

# Stage 1: Build

FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependencies files

COPY package.json package-lock.json ./

# Install dependencies

RUN npm ci --legacy-peer-deps

# Copy rest of the app

COPY . .

# Build the app

RUN npm run build

# ==============================

# Stage 2: Docker File

FROM node:22-alpine

WORKDIR /app

# Copy production essentials from builder

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next

# COPY --from=builder /app/public ./public # uncomment if you need public folder

COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]

# Stage 2: .github\workflows\file.yml

```yml
name: Build & Deploy via Docker (Self-hosted)

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: self-hosted

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Set up Docker
        uses: docker/setup-buildx-action@v3

      - name: Build Docker image
        run: |
          docker build \
            --build-arg SITE_URL=${{ secrets.SITE_URL }} \
            -t nextjs-app:latest .

      - name: Stop existing container (if any)
        run: |
          docker stop nextjs-app || true
          docker rm nextjs-app || true

      - name: Run new container
        run: |
          docker run -d \
            --name nextjs-app \
            -p 3000:3000 \
            -e SITE_URL=${{ secrets.SITE_URL }} \
            nextjs-app:latest
```
