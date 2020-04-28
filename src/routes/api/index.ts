import * as express from 'express';
import SessionRouter from './Session';
import StockRouter from './Stock';
import TransactionRouter from './Transaction';
import UserRouter from './User';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/sessions', SessionRouter);
router.use('/stocks', StockRouter);
router.use('/transactions', TransactionRouter);

export default router;
