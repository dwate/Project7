const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const ArticlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');


router.get( '/', auth, ArticlesCtrl.getArticles);
router.post( '/', auth, multer, ArticlesCtrl.createArticles);
router.get('/:id', auth, ArticlesCtrl.getArticleById);
router.get('/user/:id', auth, ArticlesCtrl.getArticlesByUserId);
router.put('/:id', auth, multer,  ArticlesCtrl.modifyArticle);
router.delete('/:id', auth, ArticlesCtrl.deleteArticle);
//router.post('/:id/like', ArticlesCtrl.likeArticle);


module.exports = router;