import { logger } from '../lib/logger';
import * as Sentry from '@sentry/node';

export const handleProcessErrors = () => {
  process.on('unhandledRejection', (reason, promise) => {
    try {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      Sentry.captureException(reason);
    } catch (err) {
      console.error('Error in unhandledRejection handler:', err, 'original unhandledRejection:', reason);
    }
  });

  process.on('uncaughtException', (error) => {
    try {
      logger.error('Uncaught Exception thrown', error);
      Sentry.captureException(error);
    } catch (err) {
      console.error('Error in uncaughtException handler:', err, 'original error:', error);
    }
  });
};
