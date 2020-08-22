const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

test('Deve listar todos os usuarios', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir un usuario com sucesso', () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  return request(app).post('/users')
    .send({ nome: usnome, email: mail, senha: senha })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

test('Deve inserir un usuario com sucesso', () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;

  return request(app).post('/users')
    .send({ nome: usnome, email: mail, senha: senha })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

test('Não deve inserir usuário sem nome', () => {
  const senha = `PASS${Date.now()}`;

  return request(app).post('/users')
    .send({ email: mail, senha: senha })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Não deve inserir usuário sem email', async () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  const result = await request(app).post('/users')
    .send({ nome: usnome, senha: senha })
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('E-mail é um atributo obrigatório');
});


test('Não deve inserir usuário sem senha', (done) => {
  const usnome = `NOME_${Date.now()}`;

  request(app).post('/users')
    .send({ nome: usnome, email: mail })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório');
      done();
    })
    .catch(err => done.fail(err));
});

test('Não deve inserir usuário com email existente', () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  return request(app).post('/users')
    .send({ nome: usnome, email: mail, senha: senha })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com esse email');
    });
});

