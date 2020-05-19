import * as express from 'express';

import controller from '../../controllers/job/Transactions';
import { asyncMiddleware } from '../../plugins/utility';
import CrawlValidator from '../../validator/function/index';

const router = express.Router();

const { crawl } = controller;

router.post('/crawl', asyncMiddleware(CrawlValidator), asyncMiddleware(crawl));

export default router;
