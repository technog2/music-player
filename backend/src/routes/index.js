import express from 'express';
import authMw  from '../middlewares/auth.js';
import auth    from './auth.js';
import musics  from './musics.js';
// import stats   from './stats.js';

const router = express.Router();

router.use('/auth',   auth);
router.use('/musics', authMw, musics);
// router.use('/stats',  authMw, stats);

export default router;