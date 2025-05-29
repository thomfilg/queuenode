import parser from 'cron-parser';
import { logger } from '../../../app/lib/logger';
import { ITask } from '../../../app/types/ITask';
import { add } from '../../../app/lib/queue/add';

/**
 * Schedules the next execution for a recurring task
 */
export async function scheduleNextExecution(task: ITask): Promise<void> {
  try {
    if (!task.cronExpression) {
      throw new Error('Cron expression is required for recurring tasks');
    }

    // Parse the cron expression to get the next execution time
    const interval = parser.parse(task.cronExpression);
    const nextExecutionDate = interval.next().toDate();
    const nextExecutionTime = nextExecutionDate.getTime();

    // Create a new task job with the same data but updated execution time
    const jobData = {
      ...task,
      targetTime: nextExecutionTime,
    };

    // Calculate delay in ms (nextExecutionTime - currentTime)
    const delay = Math.max(0, nextExecutionTime - Date.now());

    // Use the existing queue system to add the job
    await add('TaskProcess', jobData, {
      delay,
    });

    logger.info(`Scheduled next execution for recurring task: ${task.name}`, {
      taskId: task.id,
      cronExpression: task.cronExpression,
      nextExecutionTime: nextExecutionDate.toISOString(),
      delayMs: delay,
    });
  } catch (error) {
    logger.error('Failed to schedule next execution', {
      taskId: task.id,
      cronExpression: task.cronExpression,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}