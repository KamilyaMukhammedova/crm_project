const fs = require('fs').promises;
const CollectionModel = require('../models/collection-model');
const paginationService = require('../services/pagination-service');

class CollectionsService {
  async getCollections(req) {
    const data = await paginationService.getRequestWithPagination(req, CollectionModel);
    return data;
  }

  async getOneCollection(id) {
    const collection = await CollectionModel.findById(id);
    return collection;
  }

  async createCollection(
    title_en, title_ru, title_uz, preview, is_active
  ) {
    const collection = await CollectionModel.create({
      title_en, title_ru, title_uz, preview, is_active
    });

    return collection;
  }

  async editCollection(
    title_en, title_ru, title_uz, preview, is_active, collectionId
  ) {
    const editeCollection = await CollectionModel.findByIdAndUpdate(collectionId, {
      title_en,
      title_ru,
      title_uz,
      preview,
      is_active
    }, { new: true });

    return editeCollection;
  }

  async deleteCollection(id) {
    const collection = await CollectionModel.findById(id);
    const filePath = '/Users/kamilya/crm_project/backend/public';

    await fs.unlink(filePath + collection.preview);

    await CollectionModel.deleteOne({ _id: id });
  }
}

module.exports = new CollectionsService();