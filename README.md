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
$ npm run server
# create a User via the REST API
$ curl -H "Content-Type: application/json" -X POST -d '{"email":"test@mail.com","password":"pw","password2":"pw"}' http://localhost:4041/rest/register
# login a User via the REST API
# you will get a JSON with a token and this is your token to get access to the GraphQL API

# Query all Users via the GraphQL API
$ curl 'http://localhost:4041/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4041' -H 'Authorization: Bearer <token>' --data-binary '{"query":"query User {\n  users {\n    id\n    email\n    fullname\n  }\n}\n"}' --compressed

# Mutation - Create an User via the GraphQL API
$ curl 'http://localhost:4041/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4041' -H 'Authorization: Bearer <token>' --data-binary '{"query":"mutation {\n  createUser(input: {\n    fullname: \"aathi\",\n    email: \"aathi@yopmail.com\",\n    password: \"test1234\"\n  }) {\n    id\n  }\n}"}' --compressed

# Query for an User by Id via the GraphQL API
$ curl 'http://localhost:4041/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4041' -H 'Authorization: Bearer <token>' --data-binary '{"query":"query User($id: ID!) {\n  user(id: $id) {\n    id\n    email\n  }\n}\n","variables":{"id":"b49708bc-e05c-481a-9cf9-597cb83a3d01"}}' --compressed

# Mutation - Delete an User by Id via the GraphQL API
$ curl 'http://localhost:4041/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4041' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODc4MzkyNTYsImV4cCI6MTY4Nzg1MDA1Nn0.G7U1M04cn7g7isLw9UeigNALGSCcALBbLSZdIn8QSx8' --data-binary '{"query":"mutation User($id: ID!) {\n  removeUser(id: $id)\n}","variables":{"id":"b49708bc-e05c-481a-9cf9-597cb83a3d01"}}' --compressed
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

This boilerplate has these main directories:

- config - for routes
- controllers - for Auth, app controllers
- graphql - for graphql schemas, resolvers, queries, mutations, models, types, services, etc.
- models - for app function models and data
- policies - auth policies and error handling for the app
- scripts - has scripts to generate Mock data and other utility scripts
- services - for signing and verifying JWT tokens
- test - using [Jest](https://github.com/facebook/jest) to validate controllers

> ```Token Expired```
![Token Expired](https://drive.google.com/uc?export=view&id=1NnFBvSg8IB5E2TrB2l1d692Yd-iLxSRk)

> ```Get All Users```
![Get All Users](https://drive.google.com/uc?export=view&id=19f3BFFARq56T1-2Nk5oGT0AbEOoUO2Fy)

> ```Create User```
![Create User](https://drive.google.com/uc?export=view&id=1-H2TfskifbXi9Pfv1DPxey-fHvmM1l0A)

> ```Get All Users```
![Get All Users](https://drive.google.com/uc?export=view&id=1b_2MxamyMQMelLMAhK7vf6hveVsjRvkC)

> ```Get User By ID```
![Get User By ID](https://drive.google.com/uc?export=view&id=14RgXjUFGWgdnFaoTxhWoGV6FZBKd1ViU)

> ```Delete User```
![Delete User](https://drive.google.com/uc?export=view&id=1MFCHpmrL48ZCmcqIMtkkTbEtERuoKGmF)
