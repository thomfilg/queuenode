import { logger } from '../../../app/lib/logger';
import { IJob } from '../../../app/types/IQueue';
import { ITask } from '../../../app/types/ITask';
import { oneDay, oneMinute } from '../config';
import { executeTask } from './executeTask';
import { scheduleNextExecution } from './scheduleNextExecution';

export const TaskProcess: IJob<ITask> = {
  options: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: oneMinute,
    },
    timeout: oneMinute / 2,
    lifo: false,  // First in, first out for fair task processing
    priority: 1,
    removeOnComplete: {
      age: oneDay * 7, // Keep completed tasks for a week
    }
  },
  handle: async ({ data }) => {
    try {
      const { id, name, type, targetTime, cronExpression, payload } = data;
      
      logger.info(`Processing task: ${name}`, { 
        taskId: id,
        type,
        targetTime: targetTime ? new Date(targetTime).toISOString() : null,
        cronExpression
      });
      
      await executeTask(data);
      
      // For recurring tasks, schedule the next execution
      if (type === 'recurring' && cronExpression) {
        await scheduleNextExecution(data);
      }
      
      logger.debug(`Task ${name} (${id}) executed successfully`);
    } catch (error) {
      logger.error('Task execution failed', { error });
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Task execution failed');
    }
  }
};