FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y redis-tools curl

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run tsoa:spec

RUN npm i -g chokidar-cli

EXPOSE 3333
