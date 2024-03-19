const fs = require('fs').promises;
const NewsModel = require('../models/news-model');
const paginationService = require('../services/pagination-service');

class NewsService {
  async getNews(req) {
    const data = await paginationService.getRequestWithPagination(req, NewsModel);
    return data;
  }

  async getOneNews(id) {
    const news = await NewsModel.findById(id);
    return news;
  }

  async createNews(
    title_en, title_ru, title_uz,
    description_en, description_ru, description_uz,
    small_description_en, small_description_ru, small_description_uz,
    detail_image, preview, is_active
  ) {
    const news = await NewsModel.create({
      title_en, title_ru, title_uz,
      description_en, description_ru, description_uz,
      small_description_en, small_description_ru, small_description_uz,
      detail_image, preview, is_active
    });

    return news;
  }

  async editNews(
    title_en, title_ru, title_uz,
    description_en, description_ru, description_uz,
    small_description_en, small_description_ru, small_description_uz,
    detail_image, preview, is_active, newsId
  ) {
    const editedNews = await NewsModel.findByIdAndUpdate(newsId, {
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
      is_active
    }, { new: true });

    return editedNews;
  }

  async deleteNews(id) {
    const news = await NewsModel.findById(id);
    const filePath = '/Users/kamilya/crm_project/backend/public';

    await fs.unlink(filePath + news.preview);
    await fs.unlink(filePath + news.detail_image);
    await NewsModel.deleteOne({ _id: id });
  }
}

module.exports = new NewsService();