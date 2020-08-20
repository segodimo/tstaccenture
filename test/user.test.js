const request = require('supertest');

const app = require('../src/app');

test('Deve listar todos os usuarios', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      //expect(res.bodyjkj)
    });
});

test('Deve inserir un usuario com sucesso', () => {
  return request(app).post('/users')
    .send({ name: 'us2', email:'us@test.com' })
    .then((res) => {
      expect(res.status).toBe(200);
      // expect(res.body.name).toBe('us2');
    });
});
