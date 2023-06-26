const bcryptSevice = require('../services/bcrypt.service');

const { users } = require('./data');

const User = (data) => {
  data.password = bcryptSevice().password(data.password); // eslint-disable-line no-param-reassign
  const values = { ...data };
  delete values.password;
  return values;
};

module.exports = {
  User,
  users,
};
