const promotionsService = require('../services/promotions-service');

class PromotionsController {
  async getPromotions(req, res, next) {
    try {
      const promotionsData =  await promotionsService.getPromotions(req);

      return res.send(promotionsData);
    } catch (e) {
      next(e);
    }
  }

  async getOnePromotion(req, res, next) {
    try {
      const promotion =  await promotionsService.getOnePromotion(req.params.id);

      return res.send(promotion);
    } catch (e) {
      next(e);
    }
  }

  async createPromotion(req, res, next) {
    try {
      const {
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active, start_date, end_date
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz ||
        !description_en || !description_ru || !description_uz ||
        !small_description_en || !small_description_ru || !small_description_uz ||
        !detail_image || !preview || !start_date || !end_date
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const createdPromotion = await promotionsService.createPromotion(
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active, start_date, end_date
      );

      return res.send(createdPromotion);
    } catch (e) {
      next(e);
    }
  }

  async editPromotion(req, res, next) {
    try {
      const promotionId = req.params.id;

      const {
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active, start_date, end_date
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz ||
        !description_en || !description_ru || !description_uz ||
        !small_description_en || !small_description_ru || !small_description_uz ||
        !detail_image || !preview || !start_date || !end_date
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const editedPromotion = await promotionsService.editPromotion(
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active, start_date, end_date, promotionId
      );

      return res.send(editedPromotion);
    } catch (e) {
      next(e);
    }
  }

  async deletePromotion(req, res, next) {
    try {
      await promotionsService.deletePromotion(req.params.id);

      return res.send({message: `Promotion with id ${req.params.id} has been deleted`});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PromotionsController();