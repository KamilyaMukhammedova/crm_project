const NewsModel = require('../models/news-model');

class NewsService {
  async getNews(page, limit) {
    const news = await NewsModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await NewsModel.countDocuments();

    return {
      results: news,
      count: Math.ceil(count / limit),
      next: '',
      previous: '',
    };
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
    await NewsModel.findByIdAndDelete(id);
  }
}

module.exports = new NewsService();