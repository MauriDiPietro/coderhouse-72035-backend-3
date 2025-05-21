import * as controllers from '../controllers/user-controller.js';
import { Router } from 'express';

const router = Router();

router.post('/create', controllers.createUsersMock);
router.get('/', controllers.getAll);

export default router;
