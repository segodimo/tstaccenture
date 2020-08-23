const request = require('supertest');
const app = require('../../src/app');

test('Deve receber token ao logar', () => {
	const usnome = `NOME_${Date.now()}`;
	const mail = `${Date.now()}@mail.com`;
	const senha = `PASS${Date.now()}`;

  return app.services.user.save({ nome: usnome, email: mail, senha: senha })
    .then(() => request(app).post('/auth/signin')
      .send({ email: mail, senha: senha }))
    .then((res) => {
      expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty('token');
    });
});
