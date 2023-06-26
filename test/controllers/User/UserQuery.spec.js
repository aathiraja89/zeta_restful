/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

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

afterAll(() => {
  afterAction();
});

test('User | query', async () => {
  jest.useFakeTimers();
  const query = `
  query User {
    users {
      id
      email
      fullname
    }
  }
  `;
  console.log('TTTTTTTTT: ', token);
  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.user[0].username).toBe('test');
  expect(res.body.data.user[0].notes).toEqual([]);
});
