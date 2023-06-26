const {
  usersController,
} = require('../controllers');

const resolverFunctions = {
  // Queries
  Query: {
    // Users
    users: usersController.index,
    user: (_, { id }) => usersController.getById(id),
  },

  // Mutations
  Mutation: {
    createUser: (_, { input }) => usersController.create(input),
    updateUser: (_, { input }) => usersController.create(input),
    removeUser: (_, { id }, context) => usersController.remove(id, context),
  },
};

module.exports = resolverFunctions;
