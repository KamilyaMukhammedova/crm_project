const fs = require('fs').promises;
const PromotionModel = require('../models/promotion-model');
const paginationService = require('../services/pagination-service');

class PromotionsService {
  async getPromotions(req) {
    const data = await paginationService.getRequestWithPagination(req, PromotionModel);
    return data;
  }

  async getOnePromotion(id) {
    const promotion = await PromotionModel.findById(id);
    return promotion;
  }

  async createPromotion(
    title_en, title_ru, title_uz,
    description_en, description_ru, description_uz,
    small_description_en, small_description_ru, small_description_uz,
    detail_image, preview, is_active, start_date, end_date
  ) {
    const promotion = await PromotionModel.create({
      title_en, title_ru, title_uz,
      description_en, description_ru, description_uz,
      small_description_en, small_description_ru, small_description_uz,
      detail_image, preview, is_active, start_date, end_date
    });

    return promotion;
  }

  async editPromotion(
    title_en, title_ru, title_uz,
    description_en, description_ru, description_uz,
    small_description_en, small_description_ru, small_description_uz,
    detail_image, preview, is_active, start_date, end_date, promotionId
  ) {
    const editedPromotion = await PromotionModel.findByIdAndUpdate(promotionId, {
      title_en,
      title_ru,
      title_uz,
      description_en,
      description_ru,
      description_uz,
      small_description_en,
      small_description_ru,
      small_description_uz,
      detail_image,
      preview,
      is_active,
      start_date,
      end_date
    }, { new: true });

    return editedPromotion;
  }

  async deletePromotion(id) {
    const promotion = await PromotionModel.findById(id);
    const filePath = '/Users/kamilya/crm_project/backend/public';

    await fs.unlink(filePath + promotion.preview);
    await fs.unlink(filePath + promotion.detail_image);
    await PromotionModel.deleteOne({ _id: id });
  }
}

module.exports = new PromotionsService();