    const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/auth');

    const LikesCtrl = require('../controllers/likes');



    router.get('/:id', auth, LikesCtrl.getArtLike);
    router.get('/:pp/:id', auth, LikesCtrl.getMyLike);
    router.post('/', auth, LikesCtrl.createLike);
    router.put('/:id', auth, LikesCtrl.modifyLike);



    module.exports = router;
