const Router = require('express').Router;
const router = new Router();
const bonusStatisticController = require('../controllers/bonus-statistic-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/dashboard/users/', authMiddleware, bonusStatisticController.createUsersStatistic);
router.get('/dashboard/users/', authMiddleware, bonusStatisticController.getUsersStatistic);
router.post('/dashboard/bonus/', bonusStatisticController.createBonusStatistic);
router.get('/dashboard/bonus/', bonusStatisticController.getBonusStatistic);

module.exports = router;