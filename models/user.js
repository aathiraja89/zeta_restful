const { users } = require('./data');
const bcryptSevice = require('../services/bcrypt.service');

const User = (data) => {
  data.password = bcryptSevice().password(data.password); // eslint-disable-line no-param-reassign
  const values = Object.assign({}, data);
  delete values.password;
  return values;
}

module.exports = {
  User,
  users
};
