import * as express from 'express';
import heathcheckCtroller from '../controllers/Heathcheck';
const router = express.Router();

router.get('/', heathcheckCtroller.run);

export default router;
