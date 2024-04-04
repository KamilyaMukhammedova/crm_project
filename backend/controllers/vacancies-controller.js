const vacanciesService = require('../services/vacancies-service');

class VacanciesController {
  async getVacancies(req, res, next) {
    try {
      const vacanciesData =  await vacanciesService.getVacancies(req);
      return res.send(vacanciesData);
    } catch (e) {
      next(e);
    }
  }

  async getOneVacancy(req, res, next) {
    try {
      const vacancy =  await vacanciesService.getOneVacancy(req.params.id);
      return res.send(vacancy);
    } catch (e) {
      next(e);
    }
  }

  async createVacancy(req, res, next) {
    try {
      const {
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz, is_active
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz ||
        !description_en || !description_ru || !description_uz ||
        !small_description_en || !small_description_ru || !small_description_uz
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const createdVacancy = await vacanciesService.createVacancy(
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz, is_active
      );

      return res.send(createdVacancy);
    } catch (e) {
      next(e);
    }
  }

  async editVacancy(req, res, next) {
    try {
      const vacancyId = req.params.id;

      const {
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz, is_active
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz ||
        !description_en || !description_ru || !description_uz ||
        !small_description_en || !small_description_ru || !small_description_uz
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const editedVacancy = await vacanciesService.editVacancy(
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        is_active, vacancyId
      );

      return res.send(editedVacancy);
    } catch (e) {
      next(e);
    }
  }

  async deleteVacancy(req, res, next) {
    try {
      await vacanciesService.deleteVacancy(req.params.id);
      return res.send({message: `Vacancy with id ${req.params.id} has been deleted`});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new VacanciesController();