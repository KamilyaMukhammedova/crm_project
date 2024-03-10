const {Schema, model} = require('mongoose');

const BonusSchema = new Schema({
  expected_for_release: {
    type: Number,
    default: 0,
  },
  given_out: {
    type: Number,
    default: 0,
  },
  used_bonus: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Bonus', BonusSchema);