const Router = require('express').Router;
const path = require('path');
const multer = require('multer');
const config = require('../config');
const authMiddleware = require('../middlewares/auth-middleware');
const imageController = require('../controllers/image-controller');

const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: async (req, file, cb) => {
    const {nanoid} = await import('nanoid');

    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.post('/file_upload/', authMiddleware, upload.single('file'), imageController.addImage);

module.exports = router;