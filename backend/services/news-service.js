const NewsModel = require('../models/news-model');
const paginationService = require('../services/pagination-service');
const removeFileService = require('../services/remove-file-service');

class NewsService {
  async getNews(req) {
    const data = await paginationService.getRequestWithPagination(req, NewsModel);
    console.log(data)
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
    const newsBeforeUpdate = await NewsModel.findById(newsId);

    if (newsBeforeUpdate.preview !== preview) {
      await removeFileService.deleteFile(newsBeforeUpdate.preview);
    }

    if (newsBeforeUpdate.detail_image !== preview) {
      await removeFileService.deleteFile(newsBeforeUpdate.detail_image);
    }

      const updatedNews = await NewsModel.findByIdAndUpdate(newsId, {
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
      }, {new: true});

    return updatedNews;
  }

  async deleteNews(id) {
    const news = await NewsModel.findById(id);

    await removeFileService.deleteFile(news.preview);
    await removeFileService.deleteFile(news.detail_image);
    await NewsModel.deleteOne({_id: id});
  }
}

module.exports = new NewsService();