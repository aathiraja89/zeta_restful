const faker = require('faker');

const usersController = require('../../controllers/users-controller');
const authService = require('../../services/auth.service');

const getAccessToken = async (id) => {
  let token;

  if (id) {
    token = authService().issue({ id });
    return token;
  }

  const user = await usersController.create({
    username: 'test',
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  token = authService().issue({ id: user.id });
  return token;
};

module.exports = {
  getAccessToken,
};
