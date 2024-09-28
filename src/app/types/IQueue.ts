import { Job, JobOptions } from "bull";

export interface IJob<T> {
  handle: (data: Job<T>) => Promise<void>;
  options: JobOptions;
}