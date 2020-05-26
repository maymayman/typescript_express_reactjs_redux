import * as express from 'express';
import ApiRouter from './api';
import FunctionRouter from './function';

import { asyncMiddleware } from '../plugins/utility';
import Validator from '../validator/api/index';

const router = express.Router();

/* interface for Rest full api */
router.use('/api', asyncMiddleware(Validator), ApiRouter);
router.use('/function', FunctionRouter);

export default router;
