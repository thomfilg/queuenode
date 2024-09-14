import { Request, Response } from "express";
import { IUser } from "../types/IUser";
import { Mail } from "../lib/mailer";

export const userController = {
  async create (req: Request, res: Response): Promise<void> {
    const { name, email } = req.body || {};
  
    const user: IUser = {
      name,
      email,
    };

    await Mail.sendMail({
      from: 'Queue test <queue@queuetest.com>',
      to: `${name} <${email}>`,
      subject: 'Welcome to the queue',
      text: `Hello ${name}, welcome to the queue!`,
    });

    res.json(user);
  }
}