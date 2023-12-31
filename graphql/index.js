const { usersController } = require('../controllers');

const resolvers = require('./resolvers');
const schemas = require('./schemas');

const contextHandler = ({ req }) => {
  const userId = req.header('userId') || '';
  const user = usersController.getById(userId);

  return { user };
};

module.exports = {
  resolvers,
  schemas,
  contextHandler,
};
