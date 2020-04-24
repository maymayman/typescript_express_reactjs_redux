import * as express from 'express';

import controller from '../../controllers/Stock';
import { asyncController } from '../../plugins/utility';
import Validator from '../../validator/util';

const router = express.Router();
const { create, findById, update, destroy, getList } = controller;

router.post('/', asyncController(Validator), asyncController(create));
router.get('/:id', asyncController(findById));
router.put('/:id', asyncController(Validator), asyncController(update));
router.delete('/:id', asyncController(destroy));
router.get('/', asyncController(getList));
export default router;
