import * as express from 'express';

import controller from '../controllers/Stock';
import { asyncController } from '../plugins/utility';
import Validator from '../validator/util';

const router = express.Router();
const { post, get } = controller;

router.post('/', asyncController(Validator), asyncController(post));
router.get('/:id', asyncController(get));

export default router;
