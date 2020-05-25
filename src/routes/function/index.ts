import * as express from 'express';
import TransactionsRouter from './Transaction';

const router = express.Router();

router.use('/crawl', TransactionsRouter);

export default router;
