import * as Sentry from "@sentry/node";
import Queue from "bull";
import { redisConfig } from "../config/redis.config";
import * as jobs from "../jobs";

export const queues = Object.entries(jobs).map(([key, job]) => {
  const bull = new Queue(key, { redis: redisConfig });
  bull.on('error', (error) => {
    console.error(`Queue Error:`, error);
    Sentry.captureException(error);
  });

  bull.on('stalled', (job) => {
    console.warn(`Stalled Job ${job.id}`);
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

export const add = async (name: QueueNames, data: any) => {
  const queue = getQueue(name);

  if (!queue) {
    throw new Error(`Queue ${name} not found`);
  }

  await queue.bull.add(data, queue.options);
};

export const process = () => queues.forEach(({ bull, handle }) => {
  bull.process(handle);
  bull.on('failed', (job, error) => {
    Sentry.captureException(error);
    console.error(`Queue ${bull.name} failed`, job.data);
    console.error(error);
  });
});

