import { Router } from 'express';
import login from './login';

const auth = Router();

auth.post('/login', login);

export default auth;
