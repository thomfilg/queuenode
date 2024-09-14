import { Mail } from '../lib/mailer';
import { IUser } from '../types/IUser';

export const RegistrationMail = {
  handle: async ({ data }: { data: IUser }) => {
    console.log('Sending registration mail to', data);
    const { name, email } = data;

    await Mail.sendMail({
      from: 'Queue test <queue@queuetest.com>',
      to: `${name} <${email}>`,
      subject: 'Welcome to the queue',
      text: `Hello ${name}, welcome to the queue!`,
    });
  }
};
