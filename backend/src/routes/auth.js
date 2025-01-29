import express      from 'express';
import verification from '../controllers/auth/verification.js';
import login        from '../controllers/auth/login.js';
import logout       from '../controllers/auth/logout.js';

const router = express.Router();

router.post('/verification', verification);
router.post('/login',        login);
router.post('/logout',       logout);

export default router;