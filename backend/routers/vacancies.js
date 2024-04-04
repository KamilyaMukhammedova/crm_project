const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth-middleware');
const vacanciesController = require('../controllers/vacancies-controller');

const router = new Router();

router.get('/vacancies/', authMiddleware, vacanciesController.getVacancies);
router.get('/vacancies/:id', authMiddleware, vacanciesController.getOneVacancy);
router.post('/vacancies/', authMiddleware, vacanciesController.createVacancy);
router.patch('/vacancies/:id', authMiddleware, vacanciesController.editVacancy);
router.delete('/vacancies/:id', authMiddleware, vacanciesController.deleteVacancy);

module.exports = router;
