const mongoose = require("mongoose");
const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
  if(err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors});
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err);
  }

  return res.status(500).json({message: 'Server error'});
};
