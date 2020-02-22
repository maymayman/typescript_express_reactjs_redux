import * as express from 'express';

import controller from '../controllers/User';
import { asyncController } from '../plugins/utility';
import UserValidator from '../validator/User';

const router = express.Router();
const { post } = controller;

router.post('/', asyncController(UserValidator.post), asyncController(post));

export default router;
