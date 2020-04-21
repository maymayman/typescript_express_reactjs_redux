import * as express from 'express';

import controller from '../controllers/Transaction';
import { asyncController } from '../plugins/utility';
import Validator from '../validator/util';

const router = express.Router();
const { post } = controller;

router.post('/', asyncController(Validator), asyncController(post));

export default router;
