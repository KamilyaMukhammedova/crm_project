const collectionsService = require('../services/collections-service');

class CollectionsController {
  async getCollections(req, res, next) {
    try {
      const collectionsData =  await collectionsService.getCollections(req);
      return res.send(collectionsData);
    } catch (e) {
      next(e);
    }
  }

  async getOneCollection(req, res, next) {
    try {
      const collection =  await collectionsService.getOneCollection(req.params.id);
      return res.send(collection);
    } catch (e) {
      next(e);
    }
  }

  async createCollection(req, res, next) {
    try {
      const {
        title_en, title_ru, title_uz, preview, is_active
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz || !preview
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const createdCollection = await collectionsService.createCollection(
        title_en, title_ru, title_uz, preview, is_active
      );

      return res.send(createdCollection);
    } catch (e) {
      next(e);
    }
  }

  async editCollection(req, res, next) {
    try {
      const collectionId = req.params.id;

      const {
        title_en, title_ru, title_uz, preview, is_active
      } = req.body;

      if (
        !title_en || !title_ru || !title_uz || !preview
      ) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const editedCollection = await collectionsService.editCollection(
        title_en, title_ru, title_uz, preview, is_active, collectionId
      );

      return res.send(editedCollection);
    } catch (e) {
      next(e);
    }
  }

  async deleteCollection(req, res, next) {
    try {
      await collectionsService.deleteCollection(req.params.id);
      return res.send({message: `Collection with id ${req.params.id} has been deleted`});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CollectionsController();