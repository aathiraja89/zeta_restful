// eslint-disable-next-line import/no-extraneous-dependencies
const { HttpQueryError } = require('apollo-server-core');
const { v4: uuidv4 } = require('uuid');

const { users, User } = require('../models/user');

/**
 * Fetch all the users from datasource
 * @returns {User[]} List of all users
 */
const index = () => users.values();

/**
 * Get an user by filtering by the given user id
 * @param {string} id UUID of the user to fetch
 * @returns {User|null} User or null if not found
 */
const getById = (id) => users.get(id);

/**
 * Create an user
 * @param {object} input Data of the user to be created
 * @returns {User} Created user
 */
const create = (input) => {
  const id = uuidv4();
  const { fullname, email, password } = input;
  if (!email) {
    // eslint-disable-next-line no-throw-literal
    throw new HttpQueryError('Required query params missing');
  }
  const newUser = User({
    id, fullname, email, password,
  });
  users.set(id, newUser);

  return newUser;
};

/**
 * Remove an User with the given id
 * @param {string} id UUID of the User to be removed
 * @returns {boolean} true if the User was removed, otherwise false
 */
const remove = (id) => {
  if (!users.has(id)) {
    return false;
  }

  return users.delete(id);
};

module.exports = {
  index,
  getById,
  create,
  remove,
};
