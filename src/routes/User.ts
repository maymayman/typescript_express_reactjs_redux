import * as express from 'express';

import controller from '../controllers/User';
import { asyncController } from '../plugins/utility';
import Validator from '../validator/util';

const router = express.Router();
const { post, put, destroy, get } = controller;

router.post('/', asyncController(Validator), asyncController(post));
router.put('/:id', asyncController(Validator), asyncController(put));
router.get('/:id', asyncController(get));
router.delete('/:id', asyncController(destroy));
export default router;
