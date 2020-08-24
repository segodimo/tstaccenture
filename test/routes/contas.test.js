const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const Conta = require('../../src/models/Conta.js');

const MAIN_ROUTE = '/api/contas';
let user;
let user2;

beforeEach(async () => {

  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;

  const res = await app.services.user.save({ nome: usnome, email: mail, senha: senha });
  user = res;
  user.token = jwt.encode(user, 'Segredo!');

  const res2 = await app.services.user.save({ nome: usnome+'_2', email: mail+'_2', senha: senha });
  user2 = res2;
});

test('Deve inserir uma conta com sucesso', async () => {
  const usnome = `ACC${Date.now()}`;
  // const usid = `id_${Date.now()}`;

  return await request(app).post(MAIN_ROUTE)
    .send({ nome: usnome })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.nome).toBe(usnome);
    });
});

test('Não deve inserir uma conta sem nome', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Deve listar apenas a conta do usuario', async () => {
  const usnome1 = `ACC${Date.now()}_1`;
  const usnome2 = `ACC${Date.now()}_2`;

  // console.log(user._id,'user._id');
  // console.log(user2._id,'user2._id');

  const newConta = new Conta({ nome: usnome1, user_id: user._id });
  const ddsConta = await newConta.save();

  const newConta2 = new Conta({ nome: usnome2, user_id: user2._id });
  const ddsConta2 = await newConta2.save();

  const res = await request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      // console.log(res.body,'res.body');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

});

test('Deve retornar uma conta por id', async () => {
  const usnome = `ACC${Date.now()}`;

  const newConta = new Conta({ nome: usnome, user_id: user._id });
  const ddsConta = await newConta.save();
  // await console.log(ddsConta,'ddsConta');

  const res = await request(app).get(`${MAIN_ROUTE}/${ddsConta._id}`)
    .set('authorization', `bearer ${user.token}`)
    expect(res.status).toBe(200);
    // expect(res.body.length).toBeGreaterThan(0);


});






