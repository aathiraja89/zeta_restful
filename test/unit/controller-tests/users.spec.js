/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const { HttpQueryError } = require('apollo-server-core');
const chai = require('chai');
const faker = require('faker');

const { expect } = chai;
chai.use(require('chai-uuid'));

const usersController = require('../../../controllers/users-controller');

describe('Controllers: Users', () => {
  context('create() user', () => {
    it('Should create a user', () => {
      const input = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const response = usersController.create(input);
      expect(response.id).to.be.a.uuid('v4');
      expect(response.fullname).to.equal(input.fullname);
      expect(response.email).to.equal(input.email);
      expect(usersController.getById(response.id)).to.deep.equal({
        id: response.id,
        fullname: response.fullname,
        email: response.email,
      });
    });

    it('Should be able to create a user even if name not provided', () => {
      const input = {
        fullname: '',
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const response = usersController.create(input);
      expect(response.id).to.be.a.uuid('v4');
      expect(response.fullname).to.equal(input.fullname);
      expect(response.email).to.equal(input.email);
      expect(usersController.getById(response.id)).to.deep.equal({
        id: response.id,
        fullname: response.fullname,
        email: response.email,
      });
    });

    it('Should not be able to create a user if email not provided', () => {
      const input = {
        fullname: faker.name.findName(),
        email: '',
        password: faker.internet.password(),
      };
      expect(() => usersController.create(input)).to.throw(HttpQueryError);
    });

    it('Should not be able to create a user if password not provided', () => {
      const input = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        password: '',
      };
      expect(() => usersController.create(input)).to.throw(HttpQueryError);
    });
  });
});
