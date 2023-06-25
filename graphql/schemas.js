const { gql } = require('apollo-server-express');

const schemas = gql`
  # Queries
  type Query {
    users: [User]
    user(id: ID): User
  }

  # Object types
  type User {
    id: ID!
    fullname: String!
    email: String!
  }

  # Mutations
  type Mutation {
    createUser(input: UserInput!): User
    updateUser(input: UserInput!): User
    removeUser(id: ID!): Boolean
  }
  input UserInput {
    fullname: String!
    email: String!
  }
`;

module.exports = schemas;
