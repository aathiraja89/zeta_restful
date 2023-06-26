/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const usersController = require('../../../controllers/users-controller');
const { getAccessToken } = require('../../helpers/getAccessToken');
const {
  beforeAction,
  afterAction,
} = require('../../helpers/setup');

let api;
let token;

beforeAll(async () => {
  api = await beforeAction();
  token = await getAccessToken();
});

afterAll(async () => {
  await afterAction();
});

test('User | createUser', async () => {
  const user = await usersController.create({
    email: 'felix@test1.com',
  });

  const createMutation = `
  mutation {
    createUser(input: {
      fullname: "aathi",
      email: "aathi@yopmail.com",
    }) {
      id
    }
  }
  `;

  const query = `
  query {
    user(id: ${user.id}) {
      id
      email
    }
  }
`;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.user[0].email).toBe('felix@test1.com');

  const res2 = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: createMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res2.body.data.updateUser.username).toBe('felix');
  expect(res2.body.data.updateUser.email).toBe('felix@test2.com');
});

test('User | updateUser | user does not exist', async () => {
  const updateMutation = `
    mutation {
      updateUser(
        user: {
          id: 9999
          username: "Hans"
        }
      ) {
        id
        username
        email
      }
    }
  `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: updateMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.updateUser).toBe(null);
  expect(res.body.errors[0].message).toBe('User with id: 9999 not found!');
});

test('User | deleteUser', async () => {
  const user = await usersController.create({
    username: 'felix',
    email: 'felix@test3.com',
  });

  const deleteMutation = `
      mutation {
        deleteUser(
          user: {
            id: ${user.id}
          }
        ) {
          id
          username
          email
        }
      }
    `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: deleteMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.deleteUser.email).toBe('felix@test3.com');
});

test('User | deleteUser | user does not exist', async () => {
  const deleteMutation = `
    mutation {
      deleteUser(
        user: {
          id: 9999
        }
      ) {
        id
        username
        email
      }
    }
  `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: deleteMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.deleteUser).toBe(null);
  expect(res.body.errors[0].message).toBe('User with id: 9999 not found!');
});
