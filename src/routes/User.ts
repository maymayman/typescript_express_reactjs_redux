import * as express from 'express';
import controller from '../controllers/User';
import { asyncController } from '../plugins/utility';

const router = express.Router();
const { post } = controller;

router.post('/', asyncController(post));

export default router;
