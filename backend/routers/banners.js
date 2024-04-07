const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth-middleware');
const bannersController = require('../controllers/banners-controller');

const router = new Router();

router.get('/banners/', authMiddleware, bannersController.getBanners);
router.get('/banners/:id', authMiddleware, bannersController.getOneBanner);
router.post('/banners/', authMiddleware, bannersController.createBanner);
router.patch('/banners/:id', authMiddleware, bannersController.editBanner);
router.delete('/banners/:id', authMiddleware, bannersController.deleteBanner);

module.exports = router;
