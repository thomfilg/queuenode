import { JobOptions } from "bull";
import * as jobs from "../../../queue/jobs";
import { logger } from "../logger";
import { getRequestId } from "../requestId";
import { queues } from "./queue";

type QueueNames = keyof typeof jobs;

const getQueue = (name: QueueNames) => {
  return queues.find((queue) => queue.name === name);
};

export const add = async (name: QueueNames, data: Record<string, any>, extraOptions: Partial<JobOptions> = {}) => {
  try {
    logger.info(`Adding job to queue ${name}`);
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
    logger.debug(`Added job to queue ${name}`);
  } catch (error) {
    logger.error('Error adding job to queue', error);
    throw error;
  }
};
