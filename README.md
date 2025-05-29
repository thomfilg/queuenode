# Distributed Task Scheduler with Node.js, Bull, and Redis

This repository implements a distributed task scheduler system that allows clients to register tasks with specific execution times or recurring schedules. The system ensures that tasks are executed within 10 seconds of their scheduled time, with high availability and data durability guarantees.

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

- **Task Scheduling**: Register one-time tasks at specific dates/times and recurring tasks using cron syntax.
- **Guaranteed Execution**: Tasks are executed within 10 seconds of their scheduled time.
- **Task Management**: Create, view, update, and delete tasks through a RESTful API.
- **Execution History**: Track task execution history and results.
- **Asynchronous Processing**: Execute tasks in background worker processes.
- **Job Queues with Bull**: Manage and process tasks using Bull and Redis.
- **Queue Monitoring**: Monitor task queues with Bull Board.
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
- **[Cron Parser](https://github.com/harrisiirak/cron-parser)**: Library for parsing cron expressions.
- **[Sentry](https://sentry.io/)**: Application monitoring platform for error tracking and performance monitoring.
- **[Docker & Docker Compose](https://www.docker.com/)**: Containerization platform to run the application and services.
- **[React](https://reactjs.org/)**: Frontend library for building user interfaces.
- **[dotenv](https://github.com/motdotla/dotenv)**: Module to load environment variables from a `.env` file.

## Prerequisites

- **Docker & Docker Compose**: For running the application and services ([Install Docker](https://docs.docker.com/get-docker/))
- **Node.js Setup**: If not using Docker for development, set up Node.js environment using the provided setup script:
  ```bash
  # Run the setup script to install Node.js, nvm, and pnpm
  npm run setup
  ```
  
  This script (located at `scripts/setup.sh`) will:
  - Update system packages
  - Install curl
  - Set up nvm (Node Version Manager)
  - Install the latest LTS version of Node.js
  - Configure pnpm as the package manager

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/task-scheduler.git
   cd task-scheduler
   ```
   
   > **Note**: If you're not using Docker for development, run `npm run setup` first to configure your Node.js environment.

2. **Set Up Environment Variables**

   Create a `.env` file in the root directory and configure the necessary environment variables:

   ```env
   PORT=3333

   REDIS_HOST="redis"
   REDIS_PORT=6379

   SENTRY_DSN="your_sentry_dsn"
   ```

   > **Note**: Set `REDIS_HOST` to `redis` because the Docker network will resolve the hostname `redis` to the Redis container.

3. **Start Services using Docker Compose**

   If you have Docker installed, you can start all services (API server, task processor, and Redis) using the provided `docker-compose.yml`:

   ```bash
   docker-compose up -d
   ```

   This will build the application images and start the containers in detached mode.

## Running the Application

The application is now running inside Docker containers:

- **API Server**: Accessible at `http://localhost:3333`
- **Task Processor**: Runs in the background processing tasks
- **Redis**: In-memory data store used by the application and queue
- **React UI**: Accessible at `http://localhost:4200`

## API Endpoints

- **POST `/api/tasks`**: Create a new task
  
  **Request Body (One-time Task):**
  ```json
  {
    "name": "Send notification",
    "description": "Send a push notification to user",
    "type": "one-time",
    "scheduledAt": "2023-12-01T15:00:00Z",
    "payload": {
      "userId": "12345",
      "message": "Hello, world!"
    }
  }
  ```

  **Request Body (Recurring Task):**
  ```json
  {
    "name": "Daily report",
    "description": "Generate daily report",
    "type": "recurring",
    "cronExpression": "0 0 * * *",
    "payload": {
      "reportType": "daily",
      "recipients": ["user@example.com"]
    }
  }
  ```

- **GET `/api/tasks`**: Get all tasks
- **GET `/api/tasks/:id`**: Get a specific task
- **PUT `/api/tasks/:id`**: Update a task
- **DELETE `/api/tasks/:id`**: Delete a task
- **GET `/api/tasks/:id/history`**: Get execution history for a task
- **GET `/api/history`**: Get execution history for all tasks

## Queue Monitoring

Monitor and manage your task queues using Bull Board:

- **URL**: `http://localhost:3333/admin/queues`

Here you can:

- View task statuses
- Monitor upcoming scheduled tasks
- Retry failed tasks
- Clean completed or failed tasks

## Error Tracking

This application integrates with Sentry for error tracking and performance monitoring.

- **Debug Endpoint**: Trigger a test error by visiting `http://localhost:3333/debug-sentry`.

Ensure you have set your Sentry DSN in the `.env` file for error reporting to work.

## Environment Variables

| Variable          | Description                                 | Default     |
| ----------------- | ------------------------------------------- | ----------- |
| `PORT`            | Port number for the API server              | `3333`      |
| `REDIS_HOST`      | Hostname for Redis server                   | `redis`     |
| `REDIS_PORT`      | Port for Redis server                       | `6379`      |
| `SENTRY_DSN`      | DSN for Sentry error tracking               |             |

## License

This project is licensed under the MIT License.

---

Feel free to contribute to this project by opening issues or submitting pull requests. Your contributions are welcome!