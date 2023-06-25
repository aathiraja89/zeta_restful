const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  resolvers,
  schemas,
  contextHandler
} = require('./graphql');

const app = express();

// GraphQL server instance
const apolloServer = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: contextHandler,

  // Graphiql
  introspection: true,
  playground: true
});

apolloServer.start({ app });

// Integrate GraphQL server with Express
apolloServer.applyMiddleware({ app });
