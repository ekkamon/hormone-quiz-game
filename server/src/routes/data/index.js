import { Router } from 'express';
import question from './question';

const data = Router();

data.get('/question', question);

export default data;
