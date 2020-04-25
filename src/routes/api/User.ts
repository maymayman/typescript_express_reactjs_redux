import * as express from 'express';

import controller from '../../controllers/User';
import { asyncController } from '../../plugins/utility';
import Validator from '../../validator/util';

const router = express.Router();
const { create, update, destroy, findById } = controller;

router.post('/', asyncController(Validator), asyncController(create));
router.put('/:id', asyncController(Validator), asyncController(update));
router.get('/:id', asyncController(findById));
router.delete('/:id', asyncController(destroy));
export default router;
