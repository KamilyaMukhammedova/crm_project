const newsService = require('../services/news-service');

class NewsController {
  async getNews(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const newsData =  await newsService.getNews(page, limit);

      return res.send(newsData);
    } catch (e) {
      next(e);
    }
  }

  async getOneNews(req, res, next) {
    try {
      const news =  await newsService.getOneNews(req.params.id);

      return res.send(news);
    } catch (e) {
      next(e);
    }
  }

  async createNews(req, res, next) {
    try {
      const {
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz ||
        !description_en || !description_ru || !description_uz ||
        !small_description_en || !small_description_ru || !small_description_uz ||
        !detail_image || !preview
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const createdNews = await newsService.createNews(
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active
      );

      return res.send(createdNews);
    } catch (e) {
      next(e);
    }
  }

  async editNews(req, res, next) {
    try {
      const newsId = req.params.id;

      const {
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz ||
        !description_en || !description_ru || !description_uz ||
        !small_description_en || !small_description_ru || !small_description_uz ||
        !detail_image || !preview
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const editedNews = await newsService.editNews(
        title_en, title_ru, title_uz,
        description_en, description_ru, description_uz,
        small_description_en, small_description_ru, small_description_uz,
        detail_image, preview, is_active, newsId
      );

      return res.send(editedNews);
    } catch (e) {
      next(e);
    }
  }

  async deleteNews(req, res, next) {
    try {
      await newsService.deleteNews(req.params.id);

      return res.send({message: `News with id ${req.params.id} has been deleted`});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new NewsController();