const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth-middleware');
const collectionsController = require('../controllers/collections-controller');

const router = new Router();

router.get('/collections/', authMiddleware, collectionsController.getCollections);
router.get('/collections/:id', authMiddleware, collectionsController.getOneCollection);
router.post('/collections/', authMiddleware, collectionsController.createCollection);
router.patch('/collections/:id', authMiddleware, collectionsController.editCollection);
router.delete('/collections/:id', authMiddleware, collectionsController.deleteCollection);

module.exports = router;
