# Stage 1: Build stage
FROM node:20 AS build

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends redis-tools curl && \
    rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run tsoa:spec

RUN npm install -g chokidar-cli

# Stage 2: Runtime stage
FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends redis-tools curl iputils-ping netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /app /app

EXPOSE 3333
