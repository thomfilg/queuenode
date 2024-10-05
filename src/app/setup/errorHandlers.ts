import { Express, Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

export const setupErrorHandlers = (app: Express) => {
  Sentry.setupExpressErrorHandler(app);

  app.use(function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    res.statusCode = 500;
    res.end((res as Response & { sentry: unknown }).sentry + "\n");
  });
};