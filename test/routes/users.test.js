const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/api/users';
const mail = `${Date.now()}@mail.com`;
let user;

beforeAll(async () => {

  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;

  const res = await app.services.user.save({ nome: usnome, email: mail, senha: senha });
  user = res;
  user.token = jwt.encode(user, 'Segredo!');
});

test('Deve listar todos os usuarios', () => {
  return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir un usuario com sucesso', () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  return request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail, senha: senha })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      // console.log(res.body);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('nome');
      expect(res.body).not.toHaveProperty('senha');
    });
});

test('Deve armazenar uma senha criptografada', async () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;

  const res = await request(app).post(MAIN_ROUTE)
  .send({ nome: usnome, email: mail, senha: senha })
  .set('authorization', `bearer ${user.token}`);
  expect(res.status).toBe(201);

  const { _id } = res.body;
  // console.log(_id);
  const userDB = await app.services.user.find({ _id })
  // console.log(userDB,'userDB');
  expect(userDB[0].senha).not.toBeUndefined();

});

test('Não deve inserir usuário sem nome', () => {
  const senha = `PASS${Date.now()}`;

  return request(app).post(MAIN_ROUTE)
    .send({ email: mail, senha: senha })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Não deve inserir usuário sem email', async () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  const result = await request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, senha: senha })
    .set('authorization', `bearer ${user.token}`)
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('E-mail é um atributo obrigatório');
});


test('Não deve inserir usuário sem senha', (done) => {
  const usnome = `NOME_${Date.now()}`;

  request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail })
    .set('authorization', `bearer ${user.token}`)
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

  return request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail, senha: senha })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com esse email');
    });
});

