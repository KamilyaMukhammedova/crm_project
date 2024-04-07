const CollectionModel = require('../models/collection-model');
const paginationService = require('../services/pagination-service');
const removeFileService = require("./remove-file-service");

class CollectionsService {
  async getCollections(req) {
    const data = await paginationService.getRequestWithPagination(req, CollectionModel, 'collections');
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
    const collectionBeforeUpdate = await CollectionModel.findById(collectionId);

    if (collectionBeforeUpdate.preview !== preview) {
      await removeFileService.deleteFile(collectionBeforeUpdate.preview);
    }

    const updatedCollection = await CollectionModel.findByIdAndUpdate(collectionId, {
      title_en,
      title_ru,
      title_uz,
      preview,
      is_active
    }, { new: true });

    return updatedCollection;
  }

  async deleteCollection(id) {
    const collection = await CollectionModel.findById(id);

    await removeFileService.deleteFile(collection.preview);
    await CollectionModel.deleteOne({ _id: id });
  }
}

module.exports = new CollectionsService();