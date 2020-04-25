import * as express from 'express';

import controller from '../../controllers/Transaction';
import { asyncController } from '../../plugins/utility';
import Validator from '../../validator/util';

const router = express.Router();
const { create, update, findByid, destroy } = controller;

router.post('/', asyncController(Validator), asyncController(create));
router.put('/:id', asyncController(Validator), asyncController(update));
router.get('/:id', asyncController(findByid));
router.delete('/:id', asyncController(destroy));

export default router;
