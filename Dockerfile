# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependencies files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy rest of the app
COPY . .

# Build the app
RUN pnpm build

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy built app from builder
COPY --from=builder /app ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
