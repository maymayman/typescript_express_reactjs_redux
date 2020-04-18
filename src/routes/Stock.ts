import * as express from 'express';

import controller from '../controllers/Stock';
import { asyncController } from '../plugins/utility';
import Validator from '../validator/util';

const router = express.Router();
const { post, put } = controller;

router.post('/', asyncController(Validator), asyncController(post));
router.put('/:id', asyncController(Validator), asyncController(put));

export default router;
