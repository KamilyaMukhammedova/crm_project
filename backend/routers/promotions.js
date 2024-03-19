const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth-middleware');
const promotionController = require('../controllers/promotions-controller');

const router = new Router();

router.get('/discounts/', authMiddleware, promotionController.getPromotions);
router.get('/discounts/:id', authMiddleware, promotionController.getOnePromotion);
router.post('/discounts/', authMiddleware, promotionController.createPromotion);
router.patch('/discounts/:id', authMiddleware, promotionController.editPromotion);
router.delete('/discounts/:id', authMiddleware, promotionController.deletePromotion);

module.exports = router;
