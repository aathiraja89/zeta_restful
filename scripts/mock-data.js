const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const { users } = require('../models/data');
const { User } = require('../models');

const FAKE_USERS_AMOUNT = 20;

/**
 * Populate the users datasource with mock users.
 */
const mockUsers = () => {
  for (let i = 0; i < FAKE_USERS_AMOUNT; i++) {
    const id = uuidv4();
    const fakeUser = {
      id,
      fullname: faker.name.findName(),
      email: faker.internet.email(),
    };

    users.set(id, new User(fakeUser));
  }
};

