import express from 'express';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });

import { userController } from './app/controllers/UserController';

export default async () => {
  const app = express();
  app.use(express.json());

  app.post('/user', userController.create);
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}
