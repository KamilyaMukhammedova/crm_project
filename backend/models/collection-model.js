const {Schema, model} = require('mongoose');

const CollectionSchema = new Schema({
  created_date: {
    type: Date,
    default: () => Date.now(),
  },
  preview: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  title_en: {
    type: String,
    required: true,
  },
  title_ru: {
    type: String,
    required: true,
  },
  title_uz: {
    type: String,
    required: true,
  },
});

module.exports = model('Collection', CollectionSchema);