import { Router } from 'express';
import { UserController } from './UserController';

const userController = new UserController();

export const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const response = await userController.create(req.body);
  return res.status(201).json(response);
});
