import * as express from 'express';

import controller from '../../controllers/job/Transactions';
import { asyncMiddleware } from '../../plugins/utility';

const router = express.Router();

const { findAll } = controller;

router.get('/crawl', asyncMiddleware(findAll));

export default router;
