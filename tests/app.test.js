const request = require('supertest');
const app = require('../app');

test('GET / returns running message', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Todo API is running');
});

test('POST /todos creates a todo', async () => {
  const res = await request(app).post('/todos').send({ task: 'Buy milk' });
  expect(res.statusCode).toBe(201);
  expect(res.body.task).toBe('Buy milk');
});

test('GET /todos returns list', async () => {
  const res = await request(app).get('/todos');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});