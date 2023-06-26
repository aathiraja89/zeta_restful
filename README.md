# zeta-restful-graphql-firebase
> Zeta RESTful Assignment

- Authentication via [JWT](https://jwt.io/)
- Support for [graphiql](https://github.com/graphql/graphiql) an easy way exploring a GraphQL API
- Linting via [eslint](https://github.com/eslint/eslint)
- Integration tests running with [Jest](https://github.com/facebook/jest)
- Built with [npm scripts](#npm-scripts)
- Locally Deployed with Firebase [Firebase](https://firebase.google.com/docs)
## Quick Intro

GraphQL is a Query Language where your REST API can co-exist directly beside your GraphQL API in **harmony**. To demonstrate this we have two REST endpoints for `register` and `login`, with which generates the JWT token as public endpoints and the GraphQL API acts as a private enpoint and is authenticated with that generated token

```sh
# clone repository
$ git clone https://github.com/aathiraja89/zeta_restful.git
# cd into project root
$ cd zeta_restful
# install dependencies
$ npm i
# start application
$ npm server
# create a User via the REST API
$ curl -H "Content-Type: application/json" -X POST -d '{"email":"test@mail.com","password":"pw","password2":"pw"}' http://localhost:4041/rest/register
# login a User via the REST API
# you will get a JSON with a token and this is your token to get access to the GraphQL API
$ curl -H "Content-Type: application/json" -X POST -d '{"email":"test@mail.com","password":"pw"}' http://localhost:4041/rest/login
# requesting a User via the GraphQL API
$ curl -i -H "Content-Type:application/json" -H "Authorization: Bearer <token>" -X POST -d '{"query": "{user{id, username}}"}'  http://localhost:4041/graphql
# creating a Note for a user via the GraphQL API
$ curl -i -H "Content-Type:application/json" -H "Authorization: Bearer <token>" -X POST -d '{"query": "mutation{createNote(userId:1,note:\"this is a note\"){id,userId,note}}"}' http://localhost:4041/graphql
# requesting a User with its Notes via the GraphQL API (nested Query)
$ curl -i -H "Content-Type:application/json" -H "Authorization: Bearer <token>" -X POST -d '{"query": "{user{id, username, notes{id, note}}}"}'  http://localhost:4041/graphql
```

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/aathiraja89/zeta_restful.git
```

then

```sh
# change directory to project root
$ cd zeta_restful
# install dependencies
$ npm i
```

or

```sh
# change directory to project root
$ cd zeta_restful
# install dependencies
$ yarn
```

## Folder Structure

This boilerplate has four main directories:

- config - for routes
- controllers - for Auth, app controllers
- graphql - for graphql schemas, resolvers, queries, mutations, models, types, services, etc.
- models - for app function models and data
- policies - auth policies and error handling for the app
- scripts - has scripts to generate Mock data and other utility scripts
- services - for signing and verifying JWT tokens
- test - using [Jest](https://github.com/facebook/jest) to validate controllers

