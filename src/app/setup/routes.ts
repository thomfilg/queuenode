import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../../build/swagger.json';
import { adminRouter } from '../controllers/admin/admin.routes';
import { userRouter } from '../controllers/user/user.routes';

export const setupRoutes = (app: Express) => {
  app.get('/', (req, res) => res.status(200).send('Hello World'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  app.use('/admin', adminRouter);
  app.use('/user', userRouter);
};
