const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const User = require('../../src/models/User.js');

const MAIN_ROUTE = '/api/users';
const mail = `${Date.now()}@mail.com`;
const telefones = { numero: 123456789, ddd: 11 };
let user;

beforeAll(async () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;

  const res = await app.services.user.save({ nome: usnome, email: mail, senha, telefones });
  user = res;
  user.token = jwt.encode(user, 'Segredo!');
});


test('Em caso de sucesso irá retornar: _id ,nome ,data_criacao ,data_atualizacao ,ultimo_login ,notoken, sem senha', () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  return request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail, senha, telefones })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('nome');
      expect(res.body).toHaveProperty('data_criacao');
      expect(res.body).toHaveProperty('data_atualizacao');
      expect(res.body).toHaveProperty('ultimo_login');
      expect(res.body.token).not.toBe('notoken');
      expect(res.body).not.toHaveProperty('senha');
    });
});

test('Deve armazenar uma senha criptografada', async () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;

  const res = await request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail, senha, telefones })
    .set('authorization', `bearer ${user.token}`);
  expect(res.status).toBe(201);

  const { _id } = res.body;
  // console.log(_id);
  const userDB = await app.services.user.find({ _id });
  // console.log(userDB,'userDB');
  expect(userDB[0].senha).not.toBeUndefined();
});

test('Não deve inserir usuário sem nome', () => {
  const senha = `PASS${Date.now()}`;

  return request(app).post(MAIN_ROUTE)
    .send({ email: mail, senha, telefones })
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
    .send({ nome: usnome, senha, telefones })
    .set('authorization', `bearer ${user.token}`);
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('E-mail é um atributo obrigatório');
});

test('Não deve inserir usuário sem senha', (done) => {
  const usnome = `NOME_${Date.now()}`;

  request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail, telefones })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório');
      done();
    })
    .catch((err) => done.fail(err));
});

test('Não deve inserir usuário sem telefones', () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  return request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail, senha })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Telefone e DDD é um atributo obrigatório');
    });
});

test('Não deve inserir usuário com email existente', () => {
  const usnome = `NOME_${Date.now()}`;
  const senha = `PASS${Date.now()}`;

  return request(app).post(MAIN_ROUTE)
    .send({ nome: usnome, email: mail, senha, telefones })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com esse email');
    });
});


test('Deve buscar o usuário pelo id no path autenticando com token', async () => {
  const usnome = `NOME_${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;
  const senha = `PASS${Date.now()}`;
  const telefones = { numero: 123456789, ddd: 11 };

  return request(app).post('/auth/signup')
    .send({ nome: usnome, email: mail, senha, telefones })
    .then((res) => {

      return request(app).get(`${MAIN_ROUTE}/${res.body._id}`)
        .set('authorization', `bearer ${res.body.token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          // expect(res.body.length).toBe(1);
        });

    });

});


test('Deve notificar se o token enviado e o token do user são diferentes', async () => {
  const usnome = `NOME_${Date.now()}`;
  const mail = `${Date.now()}@mail.com`;
  const senha = `PASS${Date.now()}`;
  const telefones = { numero: 123456789, ddd: 11 };

  return request(app).post('/auth/signup')
    .send({ nome: usnome, email: mail, senha, telefones })
    .then((resSend) => {

      return request(app).get(`${MAIN_ROUTE}/${resSend.body._id}`)
        .set('authorization', `bearer ${resSend.body.token}_erro`)
        .then((res) => {
          // console.log(res.body,'res.body');
          expect(res.status).toBe(401);
          expect(res.body.token).not.toBe(resSend.body.token);
        });

    });

});

// test('Deve comparar token usado com token do usuario e ser iguais', () => {
//   return request(app).get(MAIN_ROUTE)
//     .set('authorization', `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });

// test('Caso o token não exista deve retornar "Não autorizado"', () => {
//   return request(app).get(MAIN_ROUTE)
//     .set('authorization', `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });

// test('Caso o token não exista deve retornar "Não autorizado"', () => {
//   return request(app).get(MAIN_ROUTE)
//     .set('authorization', `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });



test('Deve listar todos os usuarios', () => {
  return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});
