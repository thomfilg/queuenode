import * as Sentry from "@sentry/node";
import Queue, { JobOptions } from "bull";
import * as jobs from "../../queue/jobs";
import { redisConfig } from "../config/redis.config";
import { logger } from "./logger";
import { getRequestId } from "./requestId";

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

type QueueNames = keyof typeof jobs;

const getQueue = (name: QueueNames) => {
  return queues.find((queue) => queue.name === name);
};

export const add = async (name: QueueNames, data: Record<string, any>, extraOptions: Partial<JobOptions> = {}) => {
  const queue = getQueue(name);

  if (!queue) {
    throw new Error(`Queue ${name} not found`);
  }

  await queue.bull.add({
    requestId: getRequestId(),
    data,
  }, {
    ...queue.options,
    ...extraOptions,
  });
};

