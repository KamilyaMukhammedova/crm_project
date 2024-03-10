const UsersStatiscticsModel = require('../models/users-statistic-model');
const BonusModel = require('../models/bonus-model');

class BonusStatisticController {
  async getUsersStatistic(req, res, next) {
    try {
      const usersStatistics = await UsersStatiscticsModel.find();
      return res.send(usersStatistics[0]);
    } catch (e) {
      next(e);
    }
  }

  async createUsersStatistic(req, res, next) {
    try {
      const {active_users, all_users, inactive_users} = req.body;
      const usersStatistics = await UsersStatiscticsModel.create({active_users, all_users, inactive_users});

      return res.send(usersStatistics);
    } catch (e) {
      next(e);
    }
  }

  async getBonusStatistic(req, res, next) {
    try {
      const bonus = await BonusModel.find();
      return res.send(bonus[0]);
    } catch (e) {
      next(e);
    }
  }

  async createBonusStatistic(req, res, next) {
    try {
      const {expected_for_release, given_out, used_bonus} = req.body;
      const bonus = await BonusModel.create({expected_for_release, given_out, used_bonus});

      return res.send(bonus);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BonusStatisticController();