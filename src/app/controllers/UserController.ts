import { Request, Response } from "express";

export const userController = {
  create (req: Request, res: Response): void {
    const { name, email } = req.body;
  
    const user = {
      name,
      email,
    };
    res.json(user);
  }
}