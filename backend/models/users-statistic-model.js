const {Schema, model} = require('mongoose');

const UsersStatisticsSchema = new Schema({
  active_users: {
    type: Number,
    default: 0,
  },
  all_users: {
    type: Number,
    default: 0,
  },
  inactive_users: {
    type: Number,
    default: 0,
  },
});

module.exports = model('UsersStatistic', UsersStatisticsSchema);