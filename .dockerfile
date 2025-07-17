FROM node:22-alpine AS builder

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

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["npm", "run", "start"]

