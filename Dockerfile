FROM node:22-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install all dependencies (including devDependencies for build)
FROM base AS deps
RUN pnpm install --frozen-lockfile

# Copy package files
COPY package.json pnpm-lock.yaml ./
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_ACCESS_KEY_ID

# Set environment variables for build
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID

# Production dependencies only
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Install all dependencies
RUN npm ci

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Build the application with verbose output
RUN npm run build --verbose

# Production stage
FROM node:22-alpine AS production

# Install pnpm in runner stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ENV NODE_ENV=production

# Copy built application and production dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=prod-deps /app/node_modules ./node_modules

WORKDIR /app

# Copy package files
COPY package*.json ./

# Final runner stage
FROM node:22-alpine AS runner

# Copy built application
COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["npm", "run", "start"]
