const request = require('supertest');

const app = require('../../src/app');

test('Deve listar todos os usuarios', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir un usuario com sucesso', () => {
  const usnome = `NOME_${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;
  const senha = `PASS${Date.now()}`;
  return request(app).post('/users')
    .send({ nome: usnome, email: mail, senha: senha })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});
