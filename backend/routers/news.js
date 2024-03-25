const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth-middleware');
const newsController = require('../controllers/news-controller');

const router = new Router();

router.get('/news/', authMiddleware, newsController.getNews);
// router.get('/news/', newsController.getNews);
router.get('/news/:id', authMiddleware, newsController.getOneNews);
router.post('/news/', authMiddleware, newsController.createNews);
router.patch('/news/:id', authMiddleware, newsController.editNews);
router.delete('/news/:id', authMiddleware, newsController.deleteNews);

module.exports = router;
