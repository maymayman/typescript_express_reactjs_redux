import * as express from 'express';

import controller from '../controllers/User';
import { asyncController } from '../plugins/utility';
import UserValidator from '../validator/User';

const router = express.Router();
const { post, put, get } = controller;

router.post('/', asyncController(UserValidator), asyncController(post));
router.put('/:id', asyncController(UserValidator), asyncController(put));
router.get('/:id', asyncController(UserValidator), asyncController(get));
export default router;
