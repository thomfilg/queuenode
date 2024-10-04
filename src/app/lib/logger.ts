import { Request } from 'express';
import util from 'util';
import winston, { Logger } from 'winston';
import { getRequestId } from './requestId';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const requestId = getRequestId();
      const formattedMessage = typeof message === 'string' ? message : util.format(message, ...Object.values(meta));
      return `${timestamp}${requestId ? ` [${requestId}] ` : ' '}${level}: ${formattedMessage}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export interface RequestWithLogger extends Request {
  logger: Logger;
}

