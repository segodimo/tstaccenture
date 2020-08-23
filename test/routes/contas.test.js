const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const Conta = require('../../src/models/Conta.js');

const MAIN_ROUTE = '/api/contas';
let user;

beforeAll(async () => {

	const usnome = `NOME_${Date.now()}`;
	const senha = `PASS${Date.now()}`;
	const mail = `${Date.now()}@mail.com`;

  const res = await app.services.user.save({ nome: usnome, email: mail, senha: senha });
  // user = { ...res};
  user = res;
  user.token = jwt.encode(user, 'Segredo!');
});

test('Deve inserir uma conta com sucesso', async () => {
  const usnome = `ACC${Date.now()}`;
  // const usid = `id_${Date.now()}`;

  return await request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, user_id: user._id })
    .set('authorization', `bearer ${user.token}`)
    .then((result) => {
      expect(result.status).toBe(201);
    });
});

test('Não deve inserir uma conta sem nome', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ user_id: user._id })
    .set('authorization', `bearer ${user.token}`)
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Deve listar as contas', async () => {
  const usnome = `ACC${Date.now()}`;

  const newConta = new Conta({ nome: usnome, user_id: user._id });
  await newConta.save();

  const result = await request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    expect(result.status).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);

});

test('Deve retornar uma conta por id', async () => {
  const usnome = `ACC${Date.now()}`;

  const newConta = new Conta({ nome: usnome, user_id: user._id });
  const ddsConta = await newConta.save();
  // await console.log(ddsConta,'ddsConta');

  const result = await request(app).get(`${MAIN_ROUTE}/${ddsConta._id}`)
    .set('authorization', `bearer ${user.token}`)
    expect(result.status).toBe(200);
    // expect(result.body.length).toBeGreaterThan(0);


});






