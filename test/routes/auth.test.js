const request = require('supertest');
const app = require('../../src/app');
const ValidationError = require('../../src/errors/ValidationError');

test('Deve criar usuário via signup', () => {
  const usnome = `NOME_${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;
  const senha = `PASS${Date.now()}`;
  const telefones = { numero: 123456789, ddd: 11 };

  return request(app).post('/auth/signup')
    .send({ nome: usnome, email: mail, senha, telefones })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.nome).toBe(usnome);
      expect(res.body).toHaveProperty('email');
      expect(res.body).not.toHaveProperty('senha');
    });
});

test('Deve receber token ao logar', () => {
  const usnome = `NOME_${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;
  const senha = `PASS${Date.now()}`;
  const telefones = { numero: 123456789, ddd: 11 };

  return app.services.user.save({ nome: usnome, email: mail, senha, telefones })
    .then(() => request(app).post('/auth/signin')
      .send({ email: mail, senha }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Não deve autenticar usuário com senha errada', () => {
  const usnome = `NOME_${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;
  const senha = `PASS${Date.now()}`;
  const telefones = { numero: 123456789, ddd: 11 };

  return app.services.user.save({ nome: usnome, email: mail, senha, telefones })
    .then(() => request(app).post('/auth/signin')
      .send({ email: mail, senha: 'senhaerrada' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário e/ou senha inválidos');
    });
});

test('Não deve autenticar usuário que não existe', () => {
  return request(app).post('/auth/signin')
    .send({ email: 'usuarioNaoExiste@mail.com', senha: 'senhaerrada' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário e/ou senha inválidos');
    });
});

test('Não deve acessar uma rota protegida sem token', () => {
  return request(app).get('/api/users')
    .then((res) => {
      expect(res.status).toBe(401);
    });
});
