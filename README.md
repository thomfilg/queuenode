# Node.js Queue Processing with Bull, Redis, and Sentry

This repository demonstrates how to implement background job processing in a Node.js application using TypeScript, Bull (a Redis-based queue library), and Sentry for error tracking and performance monitoring. The application includes a simple user registration system that sends a welcome email asynchronously through a job queue.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Queue Monitoring](#queue-monitoring)
- [Error Tracking](#error-tracking)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- **User Registration**: Register users via a RESTful API.
- **Asynchronous Email Sending**: Send welcome emails using background job processing.
- **Job Queues with Bull**: Manage and process jobs using Bull and Redis.
- **Queue Monitoring**: Monitor job queues with Bull Board.
- **Error Tracking**: Track errors and performance metrics with Sentry.
- **TypeScript Support**: Write clean and maintainable code with TypeScript.
- **Dockerized Application**: Easily set up the application, queue processor, and Redis using Docker Compose.

## Technologies Used

- **[Node.js (v20.x)](https://nodejs.org/)**: JavaScript runtime environment.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript.
- **[Express.js](https://expressjs.com/)**: Web framework for Node.js.
- **[Bull](https://github.com/OptimalBits/bull)**: Fast and reliable Redis-based queue for Node.js.
- **[Bull Board](https://github.com/felixmosh/bull-board)**: UI to monitor and manage Bull queues.
- **[Redis](https://redis.io/)**: In-memory data structure store used as a database, cache, and message broker.
- **[Nodemailer](https://nodemailer.com/)**: Module for Node.js applications to send emails.
- **[Sentry](https://sentry.io/)**: Application monitoring platform for error tracking and performance monitoring.
- **[Docker & Docker Compose](https://www.docker.com/)**: Containerization platform to run the application and services.
- **[dotenv](https://github.com/motdotla/dotenv)**: Module to load environment variables from a `.env` file.

## Prerequisites

- **Docker & Docker Compose**: For running the application and services ([Install Docker](https://docs.docker.com/get-docker/))

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/queuenode.git
   cd queuenode
   ```

2. **Set Up Environment Variables**

   Create a `.env` file in the root directory and configure the necessary environment variables:

   ```env
   PORT=3333

   MAILER_USER="your_email@example.com"
   MAILER_PASSWORD="your_email_password"
   MAILER_HOST="smtp.example.com"
   MAILER_PORT=587

   REDIS_HOST="redis"
   REDIS_PORT=6379

   SENTRY_DSN="your_sentry_dsn"
   ```

   > **Note**: Set `REDIS_HOST` to `redis` because the Docker network will resolve the hostname `redis` to the Redis container.

3. **Start Services using Docker Compose**

   If you have Docker installed, you can start all services (API server, queue processor, and Redis) using the provided `docker-compose.yml`:

   ```bash
   docker-compose up -d
   ```

   This will build the application images and start the containers in detached mode.

## Running the Application

The application is now running inside Docker containers:

- **API Server**: Accessible at `http://localhost:3333`
- **Queue Processor**: Runs in the background processing jobs
- **Redis**: In-memory data store used by the application and queue

## API Endpoints

- **POST `/user`**: Register a new user and send a welcome email asynchronously.

  **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

  **Response:**

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

- **GET `/`**: Simple endpoint returning "Hello World".

## Queue Monitoring

Monitor and manage your job queues using Bull Board:

- **URL**: `http://localhost:3333/admin/queues`

Here you can:

- View job statuses
- Retry failed jobs
- Clean completed or failed jobs

## Error Tracking

This application integrates with Sentry for error tracking and performance monitoring.

- **Debug Endpoint**: Trigger a test error by visiting `http://localhost:3333/debug-sentry`.

Ensure you have set your Sentry DSN in the `.env` file for error reporting to work.

## Environment Variables

| Variable          | Description                                 | Default     |
| ----------------- | ------------------------------------------- | ----------- |
| `PORT`            | Port number for the API server              | `3333`      |
| `MAILER_USER`     | Email username for Nodemailer               |             |
| `MAILER_PASSWORD` | Email password for Nodemailer               |             |
| `MAILER_HOST`     | SMTP host for Nodemailer                    |             |
| `MAILER_PORT`     | SMTP port for Nodemailer                    | `587`       |
| `REDIS_HOST`      | Hostname for Redis server                   | `redis`     |
| `REDIS_PORT`      | Port for Redis server                       | `6379`      |
| `SENTRY_DSN`      | DSN for Sentry error tracking               |             |

## License

This project is licensed under the MIT License.

---

Feel free to contribute to this project by opening issues or submitting pull requests. Your contributions are welcome!
