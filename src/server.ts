import express from 'express';
import { userController } from './app/controllers/UserController';


export default async () => {
  const app = express();

  app.post('/users', userController.create);
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(4444, () => {
    console.log('Server is running on http://localhost:4444');
  });
}
