import * as Sentry from "@sentry/node";
import Queue from "bull";
import * as jobs from "../../../queue/jobs";
import { redisConfig } from "../../config/redis.config";
import { logger } from "../logger";

export const queues = Object.entries(jobs).map(([key, job]) => {
  const bull = new Queue(key, { redis: redisConfig });
  bull.on('error', (error) => {
    logger.error(`Queue Error:`, error);
    Sentry.captureException(error);
  });

  bull.on('stalled', (job) => {
    logger.warn(`Stalled Job ${job.id}`);
    const error = new Error(`Stalled Job ${job.id}`);
    error.cause = job;
    Sentry.captureException(error);
  });

  return {
    bull,
    name: key,
    handle: job.handle,
    options: job.options,
  };
});

