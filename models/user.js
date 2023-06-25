const { users } = require('./data');

/**
 * Represents the User identity
 */
class User {
  constructor (data) {
    Object.assign(this, data);
  }
}

module.exports = {
  User,
  users
};
