import { Router, Request, Response } from 'express';
import resize from './api/resize';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to our World 🌍 - check our api for rezing images at /resize'
  );
});

routes.use('/resize', resize);

export default routes;
