import * as express from 'express';
import ApiRouter from './api';
import CrawlRouter from './craw';

const router = express.Router();

/* interface for Rest full api */
router.use('/api', ApiRouter);
router.use('/job', CrawlRouter);

export default router;
