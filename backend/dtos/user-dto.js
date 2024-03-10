module.exports = class UserDto {
  email;
  id;
  full_name;
  username;
  role = 'admin';

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.full_name = model.full_name;
    this.username = model.username;
  }
};