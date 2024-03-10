const {validationResult} = require('express-validator');
const ApiError = require("../exceptions/api-error");
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Error in validation', errors.array()));
      }

      const {email, password, full_name, username} = req.body;

      const userData = await userService.registration(email, password, full_name, username);
      res.cookie('refresh', userData.refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const {username, password} = req.body;
      const userData = await userService.login(username, password);
      res.cookie('refresh', userData.refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const {refresh} = req.cookies;
      const token = await userService.logout(refresh);

      res.clearCookie('refresh');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async verify(req, res, next) {
    try {
      const {token} = req.body;

      if (token) {
        const validation = await tokenService.validateAccessToken(token);
        if(validation) {
          return res.status(200).send({message: 'Verified'});
        } else {
          return res.status(401).send({message: 'Unauthorized'});
        }
      } else {
        return res.status(401).send({message: 'Unauthorized'});
      }
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      // const {refresh} = req.cookies;
      const {refresh} = req.body;
      const userData = await userService.refresh(refresh);
      res.cookie('refresh', userData.refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserProfile(req, res, next) {
    try {
      const userProfile = await userService.getUserProfile();
      return res.send(userProfile);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();