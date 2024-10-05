import { Request } from 'express';
import util from 'util';
import winston, { Logger } from 'winston';
import { getRequestId } from './requestId';

const isDevelopment = () => process.env.NODE_ENV === 'development';

const splatSymbol = Symbol.for('splat');
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, [splatSymbol]: splatArgs = [] }) => {
      const isProd = !isDevelopment();
      let formattedMessage = [message, ...splatArgs].map((value) => {
        try {
          if (typeof value === 'object' || Array.isArray(value) || typeof value === 'function') {
            return util.inspect(value, { 
              depth: 5,
              showHidden: false,
              showProxy: false,
              maxArrayLength: null,
              compact: isProd
            });
          }
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return value;
          }
          if (typeof value === 'symbol' || typeof value === 'bigint') {
            return value.toString();
          }
          return String(value);
        } catch (error) {
          console.error(`Error formatting value: ${error}`);
          return value;
        }
      }).join(' ');

      let prefix = level;
      if (isProd) {
        const rid = getRequestId();
        prefix += rid ? ` RequestId=${rid}` : '';
        prefix += ` timestamp=${timestamp}`;
        formattedMessage = formattedMessage.replace(/\n/g, '\t');
      }
      return `${prefix}: ${formattedMessage}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export interface RequestWithLogger extends Request {
  logger: Logger;
}

