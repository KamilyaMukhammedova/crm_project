const VacancyModel = require('../models/vacancy-model');
const paginationService = require('../services/pagination-service');

class VacanciesService {
  async getVacancies(req) {
    const data = await paginationService.getRequestWithPagination(req, VacancyModel, 'vacancies');
    return data;
  }

  async getOneVacancy(id) {
    const vacancy = await VacancyModel.findById(id);
    return vacancy;
  }

  async createVacancy(
    title_en, title_ru, title_uz,
    description_en, description_ru, description_uz,
    small_description_en, small_description_ru, small_description_uz, is_active
  ) {
    const vacancy = await VacancyModel.create({
      title_en, title_ru, title_uz,
      description_en, description_ru, description_uz,
      small_description_en, small_description_ru, small_description_uz, is_active
    });

    return vacancy;
  }

  async editVacancy(
    title_en, title_ru, title_uz,
    description_en, description_ru, description_uz,
    small_description_en, small_description_ru, small_description_uz,
    is_active, vacancyId
  ) {
    const editedVacancy = await VacancyModel.findByIdAndUpdate(vacancyId, {
      title_en,
      title_ru,
      title_uz,
      description_en,
      description_ru,
      description_uz,
      small_description_en,
      small_description_ru,
      small_description_uz,
      is_active
    }, { new: true });

    return editedVacancy;
  }

  async deleteVacancy(id) {
    await VacancyModel.findByIdAndDelete(id);
  }
}

module.exports = new VacanciesService();