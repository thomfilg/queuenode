// dotenv config must be imported before sentry
import * as Sentry from '@sentry/node';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + '/../.env' });

// sentry config must be imported before express
import './app/config/sentry.config';

import express, { NextFunction, Request, Response } from 'express';

import { userController } from './app/controllers/UserController';
import { createQueueController } from './app/controllers/admin/QueuesController';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

export default async () => {
  const app = express();
  app.use(express.json());

  const serverAdapter = createQueueController('/admin/queues');
  app.use('/admin/queues', serverAdapter.getRouter());

  app.post('/user', userController.create);
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  Sentry.setupExpressErrorHandler(app);

  app.use(function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    res.statusCode = 500;
    res.end((res as Response & { sentry: unknown}).sentry + "\n");
  });
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}
