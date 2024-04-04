const {Schema, model} = require('mongoose');

const VacancySchema = new Schema({
  created_date: {
    type: Date,
    default: () => Date.now(),
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
  description_en: {
    type: String,
    required: true,
  },
  description_ru: {
    type: String,
    required: true,
  },
  description_uz: {
    type: String,
    required: true,
  },
  small_description_en: {
    type: String,
    required: true,
  },
  small_description_ru: {
    type: String,
    required: true,
  },
  small_description_uz: {
    type: String,
    required: true,
  },
  requests: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Vacancy', VacancySchema);