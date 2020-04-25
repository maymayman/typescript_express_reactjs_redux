import * as express from 'express';
import ApiRouter from './api';

const router = express.Router();

/* interface for Rest full api */
router.use('/api', ApiRouter);

export default router;
