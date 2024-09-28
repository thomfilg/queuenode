import { Mail } from '../lib/mailer';
import { IJob } from '../types/IQueue';
import { IUser } from '../types/IUser';

export const RegistrationMail: IJob<IUser> = {
  options: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 60000,
    },
    jobId: 'RegistrationMail',
    stackTraceLimit: 10,
    lifo: true,
    priority: 1,
  },
  handle: async ({ data }) => {
    const { name, email } = data;

    await Mail.sendMail({
      from: 'Queue test <queue@queuetest.com>',
      to: `${name} <${email}>`,
      subject: 'Welcome to the queue',
      text: `Hello ${name}, welcome to the queue!`,
    });
  }
};
