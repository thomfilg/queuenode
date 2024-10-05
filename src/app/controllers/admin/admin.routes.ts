import express, { Router } from 'express';
import { createQueueController } from './QueuesController';

const serverAdapter = createQueueController('/admin/queues');

export const adminRouter = Router();

adminRouter.use('/queues', serverAdapter.getRouter());
