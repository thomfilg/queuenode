import { createNamespace, getNamespace } from 'cls-hooked';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const session = createNamespace('loggerNamespace');

export const getRequestId = () => getNamespace('loggerNamespace')?.get('requestId') || 'unknown';
export const setRequestId = (requestId: string) => {
  const currentNamespace = getNamespace('loggerNamespace');
  if (currentNamespace && currentNamespace.active) {
    currentNamespace.set('requestId', requestId);
  } else {
    session.run(() => {
      session.set('requestId', requestId);
    });
  }
};

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  session.run(() => {
    const requestId = randomUUID();
    session.set('requestId', requestId);
    next();
  });
};