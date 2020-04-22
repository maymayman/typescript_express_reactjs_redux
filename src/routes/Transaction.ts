import * as express from 'express';

import controller from '../controllers/Transaction';
import { asyncController } from '../plugins/utility';
import Validator from '../validator/util';

const router = express.Router();
const { put } = controller;

router.put('/:id', asyncController(Validator), asyncController(put));

export default router;
