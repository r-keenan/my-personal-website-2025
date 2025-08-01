FROM node:22-alpine AS builder

WORKDIR /app

# Accept build arguments
ARG SANITY_PROJECT_ID
ARG SANITY_DATASET
ARG SANITY_CDN_URL
ARG SANITY_TOKEN

# Set environment variables for build
ENV SANITY_PROJECT_ID=$SANITY_PROJECT_ID
ENV SANITY_DATASET=$SANITY_DATASET
ENV SANITY_CDN_URL=$SANITY_CDN_URL
ENV SANITY_TOKEN=$SANITY_TOKEN

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Debug: Show environment variables (masked)
RUN echo "Build environment check:" && \
	echo "Node version: $(node --version)" && \
	echo "NPM version: $(npm --version)" && \
	echo "SANITY_PROJECT_ID is set: $([ -n "$SANITY_PROJECT_ID" ] && echo 'YES' || echo 'NO')" && \
	echo "SANITY_DATASET is set: $([ -n "$SANITY_DATASET" ] && echo 'YES' || echo 'NO')"

# Build the application with verbose output
RUN npm run build --verbose

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

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
