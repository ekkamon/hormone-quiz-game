import { Router } from 'express';
import auth from './auth';
import data from './data';

const routes = Router();

routes.use('/auth', auth);
routes.use('/data', data);

export default routes;
