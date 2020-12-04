const express = require('express');
const router = express.Router();

const ArticlesCtrl = require('../controllers/articles');



router.get( '/', ArticlesCtrl.getArticles);
router.post( '/', ArticlesCtrl.createArticles);
router.get('/:id', ArticlesCtrl.getArticleById);
//router.put('/:id', ArticlesCtrl.modifyArticle);
//router.delete('/:id', ArticlesCtrl.deleteArticle);
//router.post('/:id/like', ArticlesCtrl.likeArticle);


module.exports = router;