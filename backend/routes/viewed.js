const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const ViewCtrl = require('../controllers/viewed');



router.get('/:id', auth, ViewCtrl.getAllViewed);
router.get('/:pp/:id', auth, ViewCtrl.getHaveIViewed);
router.post('/', auth, ViewCtrl.addViewed);
//router.put('/:id', auth, ViewCtrl.modView);



module.exports = router;
