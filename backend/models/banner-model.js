const {Schema, model} = require('mongoose');

const BannerSchema = new Schema({
  created_date: {
    type: Date,
    default: () => Date.now(),
  },
  image: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    default: 1,
  },
});

module.exports = model('Banner', BannerSchema);