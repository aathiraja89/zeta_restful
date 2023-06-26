const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../models');
const { users } = require('../models/data');

const FAKE_USERS_AMOUNT = 3;

/**
 * Populate the users datasource with mock users.
 */
const mockUsers = () => {
  for (let i = 0; i < FAKE_USERS_AMOUNT; i += 1) {
    const id = uuidv4();
    const fakeUser = {
      id,
      fullname: faker.name.findName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    users.set(id, User(fakeUser));
  }
};

mockUsers();
