export interface ITask {
  id: string;
  name: string;
  type: 'one-time' | 'recurring';
  targetTime?: number; // Timestamp for one-time tasks
  cronExpression?: string; // Cron expression for recurring tasks
  payload: Record<string, any>; // Task data to be processed
  createdAt?: Date;
  updatedAt?: Date;
}