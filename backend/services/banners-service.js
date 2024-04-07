const BannerModel = require('../models/banner-model');
const paginationService = require('../services/pagination-service');
const removeFileService = require("./remove-file-service");

class BannersService {
  async getBanners(req) {
    const data = await paginationService.getRequestWithPagination(req, BannerModel, 'banners');
    return data;
  }

  async getOneBanner(id) {
    const banner = await BannerModel.findById(id);
    return banner;
  }

  async createBanner(
    image, position
  ) {
    const banner = await BannerModel.create({image, position});
    return banner;
  }

  async editBanner(
    image, position, bannerId
  ) {
    const bannerBeforeUpdate = await BannerModel.findById(bannerId);

    if (bannerBeforeUpdate.image !== image) {
      await removeFileService.deleteFile(bannerBeforeUpdate.image);
    }

    const updatedBanner = await BannerModel.findByIdAndUpdate(bannerId, {
      image,
      position
    }, {new: true});

    return updatedBanner;
  }

  async deleteBanner(id) {
    const banner = await BannerModel.findById(id);

    await removeFileService.deleteFile(banner.image);
    await BannerModel.deleteOne({_id: id});
  }
}

module.exports = new BannersService();