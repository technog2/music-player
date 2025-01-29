import express    from 'express';
import read       from '../controllers/musics/read.js';
import readAlbums from '../controllers/musics/readAlbums.js';
// import create  from '../controllers/musics/create.js';
// import update  from '../controllers/musics/update.js';

const router = express.Router();

router.get ('/',       read);
router.get ('/albums', readAlbums);
// router.post('/create', create);
// router.post('/update', update);

export default router;