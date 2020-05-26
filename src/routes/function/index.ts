import * as express from 'express';
import TransactionsRouter from './Transaction';

const router = express.Router();

router.use('/transaction', TransactionsRouter);

export default router;
