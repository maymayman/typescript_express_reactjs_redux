import * as express from 'express';
import ApiRouter from './api';
import FunctionRouter from './function';

const router = express.Router();

/* interface for Rest full api */
router.use('/api', ApiRouter);
router.use('/crawl', FunctionRouter);

export default router;
