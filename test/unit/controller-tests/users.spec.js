const faker = require('faker');
var sinon = require('sinon');
const chai = require("chai");
chai.use(require('chai-uuid'));
const expect = chai.expect;
var { GraphQLString, GraphQLNonNull } = require('graphql');
var userSchema = require('../../../graphql/schemas');
var usersController = require('../../../controllers/users-controller');
const { User } = require('../../../models/user');

describe('Controllers: Users', () => {
  const input =
  {
    fullname: faker.name.findName(),
    email: faker.internet.email(),
  };

  context('create() user', () => {
    it('Should create a user', () => {
      const response = usersController.create(input);
      expect(response.id).to.be.a.uuid('v4');
      expect(response.fullname).to.equal(input.fullname);
      expect(response.email).to.equal(input.email);
      expect(usersController.getById(response.id)).to.be.an.instanceof(User)
    });

    it('Should not create a user if name not provided', () => {
      const response = usersController.create({
        fullname: faker.name.findName()});
      expect(response.id).to.be.a.uuid('v4');
      expect(response.fullname).to.equal(input.fullname);
      expect(response.email).to.equal(input.email);
      expect(usersController.getById(response.id)).to.be.an.instanceof(User)
    });
  });
});
