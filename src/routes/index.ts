import * as express from 'express';
import AuthRouter from './Auth';
import SessionRouter from './Session';
import StockRouter from './Stock';
import TransactionRouter from './Transaction';
import UserRouter from './User';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/sessions', SessionRouter);
router.use('/auth', AuthRouter);
router.use('/stocks', StockRouter);
router.use('/transactions', TransactionRouter);

export default router;
