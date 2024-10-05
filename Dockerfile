# Stage 1: Build stage
FROM node:20 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npm run tsoa:spec

# Stage 2: Runtime stage
FROM node:20-slim

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3333
