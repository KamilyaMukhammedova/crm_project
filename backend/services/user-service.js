const UserModel = require('../models/user-model');
const TokenModel = require('../models/token-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, fullName, username) {
    const candidate = await UserModel.findOne({email});

    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({email, password: hashPassword, full_name: fullName, username});

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refresh);

    return {
      ...tokens,
      user: userDto
    };
  }

  async login(username, password) {
    const user = await UserModel.findOne({username});

    if (!user) {
      throw ApiError.BadRequest(`User with username ${username} is not found`);
    }

    const arePasswordsEquals = await bcrypt.compare(password, user.password);

    if (!arePasswordsEquals) {
      throw ApiError.BadRequest('Password is incorrect');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refresh);

    return tokens;
  }

  async logout(refresh) {
    const token = await tokenService.removeToken(refresh);
    return token;
  }

  async refresh(refresh) {
    if (!refresh) {
      throw ApiError.UnathorizedError();
    }

    const userData = tokenService.validateRefreshToken(refresh);
    const tokenFromDB = await tokenService.findToken(refresh);

    if(!userData || !tokenFromDB) {
      throw ApiError.UnathorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refresh);

    return tokens;
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getUserProfile() {
    const users = await UserModel.find();
    const userData = new UserDto(users[0]);
    return userData;
  }
}

module.exports = new UserService();