const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const profileCtrl = require('../controllers/profile');

router.post('/', auth, multer, profileCtrl.createProfile);
router.get('/:id', auth, profileCtrl.getProfileByUId);
router.put('/:id', auth, multer, profileCtrl.updateProfile);


module.exports = router;