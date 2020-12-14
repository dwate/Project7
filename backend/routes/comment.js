const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const CommentsCtrl = require('../controllers/comment');




router.get('/:id', auth, CommentsCtrl.getCommentbyArtId);
router.post('/', auth, CommentsCtrl.createComment);
router.delete('/:id', auth, CommentsCtrl.deleteComment);



module.exports = router;
