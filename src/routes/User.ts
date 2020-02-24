import * as express from 'express';

import controller from '../controllers/User';
import { asyncController } from '../plugins/utility';
import UserValidator from '../validator/User';

const router = express.Router();
const { post, put } = controller;

router.post('/', asyncController(UserValidator.post), asyncController(post));
router.put('/:id', asyncController(UserValidator.put), asyncController(put));

export default router;
