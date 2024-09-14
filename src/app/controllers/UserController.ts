import { Request, Response } from "express";
import { add } from "../lib/queue";
import { IUser } from "../types/IUser";

export const userController = {
  async create (req: Request, res: Response): Promise<void> {
    const { name, email } = req.body || {};
  
    const user: IUser = {
      name,
      email,
    };

    await add('RegistrationMail', user);

    res.json(user);
  }
}