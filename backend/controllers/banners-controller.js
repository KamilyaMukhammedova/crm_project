const bannersService = require('../services/banners-service');

class BannersController {
  async getBanners(req, res, next) {
    try {
      const bannersData =  await bannersService.getBanners(req);
      return res.send(bannersData);
    } catch (e) {
      next(e);
    }
  }

  async getOneBanner(req, res, next) {
    try {
      const banner =  await bannersService.getOneBanner(req.params.id);
      return res.send(banner);
    } catch (e) {
      next(e);
    }
  }

  async createBanner(req, res, next) {
    try {
      const {image, position} = req.body;

      if (!image || !position) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const createdBanner = await bannersService.createBanner(image, position);

      return res.send(createdBanner);
    } catch (e) {
      next(e);
    }
  }

  async editBanner(req, res, next) {
    try {
      const bannerId = req.params.id;

      const {image, position} = req.body;

      if (!image || !position) {
        return res.status(400).send({message: 'All fields are required!'});
      }

      const editedBanner = await bannersService.editBanner(image, position, bannerId);

      return res.send(editedBanner);
    } catch (e) {
      next(e);
    }
  }

  async deleteBanner(req, res, next) {
    try {
      await bannersService.deleteBanner(req.params.id);
      return res.send({message: `Banner with id ${req.params.id} has been deleted`});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BannersController();