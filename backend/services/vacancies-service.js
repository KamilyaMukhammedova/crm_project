const fs = require('fs').promises;
const VacancyModel = require('../models/vacancy-model');
const paginationService = require('../services/pagination-service');

class VacanciesService {
  async getVacancies(req) {
    const data = await paginationService.getRequestWithPagination(req, VacancyModel);
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
    // const vacancy = await VacancyModel.findById(id);
    // const filePath = '/Users/kamilya/crm_project/backend/public';
    //
    // await fs.unlink(filePath + vacancy.preview);
    // await fs.unlink(filePath + news.detail_image);
    // await NewsModel.deleteOne({ _id: id });

    await VacancyModel.findByIdAndDelete(id);
  }
}

module.exports = new VacanciesService();