const PromotionModel = require('../models/promotion-model');
const paginationService = require('../services/pagination-service');
const removeFileService = require("./remove-file-service");

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
    const promotionBeforeUpdate = await PromotionModel.findById(promotionId);

    if (promotionBeforeUpdate.preview !== preview) {
      await removeFileService.deleteFile(promotionBeforeUpdate.preview);
    }

    if (promotionBeforeUpdate.detail_image !== preview) {
      await removeFileService.deleteFile(promotionBeforeUpdate.detail_image);
    }

    const updatedPromotion = await PromotionModel.findByIdAndUpdate(promotionId, {
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

    return updatedPromotion;
  }

  async deletePromotion(id) {
    const promotion = await PromotionModel.findById(id);

    await removeFileService.deleteFile(promotion.preview);
    await removeFileService.deleteFile(promotion.detail_image);
    await PromotionModel.deleteOne({ _id: id });
  }
}

module.exports = new PromotionsService();