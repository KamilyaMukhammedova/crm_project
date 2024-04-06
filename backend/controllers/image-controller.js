// const mongoose = require("mongoose");
// const fs = require('fs').promises;
//
//
// class ImageController {
//   async addImage(req, res, next) {
//     try {
//       if(req.file) {
//         const image = {file: '/uploads/' + req.file.filename};
//         return res.send(image);
//       } else {
//         return res.status(400).send({message: 'Image is required!'});
//       }
//     } catch (e) {
//       if (e instanceof mongoose.Error.ValidationError) {
//         if(req.file) {
//           await fs.unlink(req.file.path);
//         }
//         return res.status(400).send(e);
//       }
//
//       next(e);
//     }
//   }
// }
//
// module.exports = new ImageController();


class ImageController {
  async addImage(req, res, next) {
    try {
      if(req.file) {
        const image = {file: req.file.key};
        return res.send(image);
      } else {
        return res.status(400).send({message: 'Image is required!'});
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ImageController();