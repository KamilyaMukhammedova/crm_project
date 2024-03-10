const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
  generateTokens(payload) {
    const access = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
    const refresh = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

    return {access, refresh};
  }

  async saveToken(userId, refresh) {
    const tokenData = await tokenModel.findOne({user: userId});

    if(tokenData) {
      tokenData.refresh = refresh;
      return tokenData.save();
    }

    const token = await tokenModel.create({
      user: userId,
      refresh
    });

    return token;
  }

  async removeToken(refresh){
    const tokenData = await tokenModel.deleteOne({refresh});
    return tokenData;
  }

  async findToken(refresh){
    const tokenData = await tokenModel.findOne({refresh});
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();