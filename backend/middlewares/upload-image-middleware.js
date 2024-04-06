const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require("path");
const {client} = require('../constants');


const s3Storage = multerS3({
  s3: client,
  bucket: process.env.S3_BUCKET_NAME,
  acl: 'public-read',
  metadata: (req, file, cb) => {
    cb(null, {fieldname: file.fieldname});
  },
  key: (req, file, cb) => {
    const fileName = Date.now() + '_' + file.fieldname + '_' + file.originalname;
    cb(null, fileName);
  }
});

function sanitizeFile(file, cb) {
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}

const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback)
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})

module.exports = uploadImage;

