const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'admin',
    enum: ['user', 'admin']
  }
});

module.exports = model('User', UserSchema);