/* eslint-disable import/no-extraneous-dependencies */
const http = require('http');

const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mapRoutes = require('express-routes-mapper');
const functions = require('firebase-functions');

/**
 * server configuration
 */
const config = require('./config');
const {
  resolvers,
  schemas,
  contextHandler,
} = require('./graphql');
const auth = require('./policies/auth.policy');

// Populate datasources with mock data
require('./scripts/mock-data');

const environment = 'development';

const app = express();
const server = http.Server(app);
const mappedRoutes = mapRoutes(config.publicRoutes, 'controllers/');

// allow cross origin requests
// configure to allow only requests from certain origins
app.use(cors());

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// public REST API
app.use('/rest', mappedRoutes);

// private GraphQL API
app.post('/graphql', (req, res, next) => auth(req, res, next));

// GraphQL server instance
const apolloServer = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: contextHandler,

  // Graphiql
  introspection: true,
  playground: true,
});

// Integrate GraphQL server with Express
apolloServer.applyMiddleware({
  app,
  path: '/graphql',
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

server.listen(4041, 'localhost', () => {
  if (environment !== 'production'
    && environment !== 'development'
    && environment !== 'testing'
  ) {
    // eslint-disable-next-line no-console
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
});

exports.graphql = functions.https.onRequest(app);
