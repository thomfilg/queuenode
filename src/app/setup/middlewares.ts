import { Express, Request, Response, NextFunction } from 'express';
import { sessionMiddleware } from '../lib/requestId';
import { logger } from '../lib/logger';
import express from 'express';

export const setupMiddlewares = (app: Express) => {
  app.use(express.json());
  app.use(sessionMiddleware);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (['favicon.ico', 'robots.txt', 'api-docs', 'debug-sentry', 'admin'].some((route) => req.url.includes(route))) {
      return next();
    }

    res.on('finish', () => {
      logger.info(`${req.method} ${req.url} status code: ${res.statusCode}`);
    });
  
    next();
  });
};
