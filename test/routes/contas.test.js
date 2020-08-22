const request = require('supertest');
const app = require('../../src/app');


const MAIN_ROUTE = '/contas';
let user;

beforeAll(async () => {

	const usnome = `NOME_${Date.now()}`;
	const senha = `PASS${Date.now()}`;
	const mail = `${Date.now()}@mail.com`;

  const res = await app.services.user.save({ nome: usnome, email: mail, senha: senha });
  // user = { ...res};
  user = res;
});

test('Deve inserir uma conta com sucesso', async () => {
  const usnome = `ACC${Date.now()}`;
  const usid = `id_${Date.now()}`;

  return await request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, user_id: user._id })
    .then((result) => {
      expect(result.status).toBe(201);
    });
});


test('Deve listar as contas', async () => {
  const usnome = `ACC${Date.now()}`;
  const usid = `id_${Date.now()}`;

  const Conta = require('../../src/models/Conta.js');
  const newConta = new Conta({ nome: usnome, user_id: user._id });
  await newConta.save();

  const result = await request(app).get(MAIN_ROUTE)
    expect(result.status).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);

});








