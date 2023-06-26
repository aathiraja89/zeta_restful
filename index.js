const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  resolvers,
  schemas,
  contextHandler
} = require('./graphql');

const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');

/**
 * server configuration
 */
const config = require('./config/');
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

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

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
  playground: true
});

// Integrate GraphQL server with Express
apolloServer.applyMiddleware({
  app,
  path: '/',
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
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
});

exports.graphql = functions.https.onRequest(app);
