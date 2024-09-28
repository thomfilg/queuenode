import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

import { queues } from '../../lib/queue';

export const createQueueController = (path: string) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath(path);
  createBullBoard({
    queues: queues.map(queue => new BullAdapter(queue.bull)),
    serverAdapter: serverAdapter,
  });
  return serverAdapter;
}