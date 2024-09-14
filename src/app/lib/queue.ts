import * as Sentry from "@sentry/node";
import Queue from "bull";
import { redisConfig } from "../config/redis.config";
import * as jobs from "../jobs";

const queues = Object.entries(jobs).map(([key, job]) => ({
  bull: new Queue(key, { redis: redisConfig }),
  name: key,
  handle: job.handle,
}));

type QueueNames = keyof typeof jobs;

const getQueue = (name: QueueNames) => {
  return queues.find((queue) => queue.name === name);
};

export const add = async (name: QueueNames, data: any) => {
  const queue = getQueue(name);

  if (!queue) {
    throw new Error(`Queue ${name} not found`);
  }

  await queue.bull.add(data);
};

export const process = () => queues.forEach(({ bull, handle }) => {
  bull.process(handle);
  bull.on('failed', (job, error) => {
    Sentry.captureException(error);
    console.error(`Queue ${bull.name} failed`, job.data);
    console.error(error);
  });
});

