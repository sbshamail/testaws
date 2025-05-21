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

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

# Copy only production essentials from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
