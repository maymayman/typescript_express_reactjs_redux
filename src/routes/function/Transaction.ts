import * as express from 'express';

import controller from '../../controllers/function/crawl';
import { asyncMiddleware } from '../../plugins/utility';
import CrawlValidator from '../../validator/function/index';

const router = express.Router();

const { crawl } = controller;

router.post('/', asyncMiddleware(CrawlValidator), asyncMiddleware(crawl));

export default router;
