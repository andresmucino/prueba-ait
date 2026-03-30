FROM node:20-alpine AS builder

# Set workdir to monorepo root
WORKDIR /app

# Copy whole monorepo
COPY ../../ .

# Install all packages from root
RUN yarn install

# Build only the shell package
WORKDIR /app/packages/host
RUN yarn build

# Stage 2: Serve via NGINX
FROM nginx:alpine
COPY --from=builder /app/packages/host/dist /usr/share/nginx/html