const Router = require('express').Router;
const {body} = require('express-validator');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.registration
);
router.post('/auth/admin/', userController.login);
router.post('/auth/logout', userController.logout);
router.post('/auth/verify/', userController.verify);
router.post('/auth/refresh/', userController.refresh);
router.get('/profile/', authMiddleware, userController.getUserProfile);

module.exports = router;