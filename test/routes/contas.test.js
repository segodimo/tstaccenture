const request = require('supertest');
const app = require('../../src/app');


const MAIN_ROUTE = '/contas';
let user;

beforeAll(async () => {

	const usnome = `NOME_${Date.now()}`;
	const senha = `PASS${Date.now()}`;
	const mail = `${Date.now()}@mail.com`;

  const res = await app.services.user.save({ nome: usnome, email: mail, senha: senha });
  // console.log(res)
  // console.log(res)
  // console.log(res._id)
  // const res = await app.services.user.save(req.body);
  // user = { ...res};
  user = res;
  
  // user.token = jwt.encode(user, 'Segredo!');
  // const res2 = await app.services.user.save({ name: 'User Account #2', mail: `${Date.now()}@mail.com`, passwd: '123456' });
  // user2 = { ...res2[0] };
});

test('Deve inserir uma conta com sucesso', async () => {
  const usnome = `ACC${Date.now()}`;
  const usid = `id_${Date.now()}`;

  return await request(app).post(MAIN_ROUTE)
    // .send({ nome: usnome, user_id: usid })
    .send({ nome: usnome, user_id: user._id })
    .then((result) => {
      expect(result.status).toBe(201);
      // expect(result.body.name).toBe('Acc #1');
    });
});
