import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });

import * as Sentry from "@sentry/node";
import '../app/config/sentry.config';
import { logger } from "../app/lib/logger";
import { queues } from "../app/lib/queue";
import { session, setRequestId } from "../app/lib/requestId";

const process = () => queues.forEach(({ bull, handle }) => {
  bull.process((job) => {
    session.run(() => {
      setRequestId(job.data.requestId);
      logger.info(`Processing job ${job.id} from queue ${bull.name}`);
      return handle(job.data);
    });
  })

  bull.on('failed', async (job, error) => {
    session.run(() => {
      const attemptsMade = job.attemptsMade;
      const maxAttempts =  job?.opts?.attempts || 1;
      if (attemptsMade >= maxAttempts) {
        const message = error instanceof Error ? error.message : `Queue ${bull.name} failed`;
        const extras = {
          queueName: bull.name,
          jobId: job.id,
          job: job.data,
          attemptsMade: attemptsMade,
          maxAttempts: maxAttempts,
          options: job.opts,
          message,
        };
        logger.error('bull.on.failed', extras);
        Sentry.setExtras(extras);
        Sentry.captureException(error);
      }
    });
  });
});

export default process;
