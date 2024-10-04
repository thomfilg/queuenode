import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });

import '../app/config/sentry.config';
import * as Sentry from "@sentry/node";

import { queues } from "../app/lib/queue";

const process = () => queues.forEach(({ bull, handle }) => {
  bull.process((job) => {
    console.log(`Processing job ${job.id} from queue ${bull.name}`);
    return handle(job);
  })

  bull.on('failed', async (job, error) => {
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
      console.error('bull.on.failed', extras);
      Sentry.setExtras(extras);
      Sentry.captureException(error);
    }
  });
});

export default process;
