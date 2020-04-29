import * as express from 'express';

import controller from '../../controllers/job/Transactions';
import { asyncMiddleware } from '../../plugins/utility';

const router = express.Router();

const { crawl } = controller;

router.get('/crawl', asyncMiddleware(crawl));

export default router;
