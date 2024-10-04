import { logger } from '../../app/lib/logger';
import { Mail } from '../../app/lib/mailer';
import { IJob } from '../../app/types/IQueue';
import { IUser } from '../../app/types/IUser';

const oneMinute = 1000 * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

export const RegistrationMail: IJob<IUser> = {
  options: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: oneMinute,
    },
    timeout: oneMinute / 2,
    lifo: true,
    priority: 1,
    removeOnComplete: {
      age: oneDay,
    }
  },
  handle: async ({ data }) => {
    const { name, email } = data;
    await Mail.sendMail({
      from: 'Queue test <queue@queuetest.com>',
      to: `${name} <${email}>`,
      subject: 'Welcome to the queue',
      text: `Hello ${name}, welcome to the queue!`,
    });
    logger.debug(`RegistrationMail sent to ${name} <${email}>`);
  }
};
