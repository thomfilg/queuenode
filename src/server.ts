import * as dotenv from "dotenv";

if (process.env.NODE_ENV === 'development') {
  // dotenv config must be imported before sentry
  dotenv.config({ path: __dirname + '/../.env' });
}

// sentry config must be imported before express
import './app/config/sentry.config';

import express from 'express';
import { logger } from './app/lib/logger';
import { handleProcessErrors, setupErrorHandlers, setupMiddlewares, setupRoutes } from './app/setup';

handleProcessErrors();

export default async () => {
  const app = express();

  setupMiddlewares(app);

  setupRoutes(app);

  setupErrorHandlers(app);

  app.listen(process.env.PORT, () => {
    logger.info('Server Started', {
      server: `http://localhost:${process.env.PORT}`,
      swagger: `http://localhost:${process.env.PORT}/api-docs`,
      bullDashboard: `http://localhost:${process.env.PORT}/admin/queues`,
    });
  });
}
