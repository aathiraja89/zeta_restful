/* eslint-disable no-undef */
const chai = require('chai');
const faker = require('faker');

const { expect } = chai;
chai.use(require('chai-uuid'));

const usersController = require('../../../controllers/users-controller');
const { User } = require('../../../models/user');

describe('Controllers: Users', () => {
  const input = {
    fullname: faker.name.findName(),
    email: faker.internet.email(),
  };

  context('create() user', () => {
    it('Should create a user', () => {
      const response = usersController.create(input);
      expect(response.id).to.be.a.uuid('v4');
      expect(response.fullname).to.equal(input.fullname);
      expect(response.email).to.equal(input.email);
      expect(usersController.getById(response.id)).to.be.an.instanceof(User);
    });

    it('Should not create a user if name not provided', () => {
      const response = usersController.create({ fullname: faker.name.findName() });
      expect(response.id).to.be.a.uuid('v4');
      expect(response.fullname).to.equal(input.fullname);
      expect(response.email).to.equal(input.email);
      expect(usersController.getById(response.id)).to.be.an.instanceof(User);
    });
  });
});
