# Use small, secure base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /src

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy app source
COPY . .

# Build step (if you use TypeScript or bundlers)
# RUN npm run build

# Use non-root user for security
USER node

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
