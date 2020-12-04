const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile');

router.post('/', profileCtrl.createProfile);
//router.put('/:id', profileCtrl.updateProfile);


module.exports = router;