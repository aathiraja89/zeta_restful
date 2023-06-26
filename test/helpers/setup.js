/* eslint-disable import/no-extraneous-dependencies */
// const http = require('http');

const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const mapRoutes = require('express-routes-mapper');

const config = require('../../config');
const {
  resolvers,
  schemas,
  contextHandler,
} = require('../../graphql');
const auth = require('../../policies/auth.policy');

process.env.NODE_ENV = 'testing';

const beforeAction = async () => {
  // const environment = 'development';
  const testapp = express();
  // const server = http.Server(testapp);
  const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'controllers/');

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  // public REST API
  testapp.use('/rest', mappedOpenRoutes);

  // private GraphQL API
  testapp.post('/graphql', (req, res, next) => auth(req, res, next));

  const graphQLServer = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: contextHandler,
  });

  graphQLServer.applyMiddleware({
    app: testapp,
    cors: {
      origin: true,
      credentials: true,
      methods: ['POST'],
      allowedHeaders: [
        'X-Requested-With',
        'X-HTTP-Method-Override',
        'Content-Type',
        'Accept',
        'Authorization',
        'Access-Control-Allow-Origin',
      ],
    },
  });

  // server.listen(4041, 'localhost', () => {
  //   if (environment !== 'production'
  //     && environment !== 'development'
  //     && environment !== 'testing'
  //   ) {
  //     // eslint-disable-next-line no-console
  //     console.error(`NODE_ENV is set to ${environment},
  // but only production and development are valid.`);
  //     process.exit(1);
  //   }
  // });

  return testapp;
};

const afterAction = async () => {
};

module.exports = {
  beforeAction,
  afterAction,
};
