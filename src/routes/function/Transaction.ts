import * as express from 'express';

import controller from '../../controllers/function/crawl';
import { asyncMiddleware } from '../../plugins/utility';
import Validator from '../../validator/function/index';
import { crawlSchema } from '../../validator/function/Transaction';

const router = express.Router();

const { crawl } = controller;
const crawlValidation = Validator({ schema: crawlSchema });

router.post('/crawl', asyncMiddleware(crawlValidation), asyncMiddleware(crawl));

export default router;
