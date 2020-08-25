const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

const secret = 'Segredo!';

module.exports = (app) => {
  const router = express.Router();
  router.post('/signin', (req, res, next) => {
    app.services.user.find({ email: req.body.email })
      .then((user) => {
        if (!user[0]) throw new ValidationError('Usuário e/ou senha inválidos');
        if (bcrypt.compareSync(req.body.senha, user[0].senha)) {
          // const payload = {
          //   id: user[0].id,
          //   nome: user[0].nome,
          //   email: user[0].email,
          // };
          // const token = jwt.encode(payload, secret);
          // user[0].token
          // const ver = app.services.user.update('OKOKOKO');
          const updateDataUser = app.services.user.update(user);
          // console.log(ver,'ver');
          // console.log(user,'user');
          // User.update
          res.status(200).json({ updateDataUser });
        } else throw new ValidationError('Usuário e/ou senha inválidos');
      }).catch((err) => next(err));
  });

  router.post('/signup', async (req, res, next) => {
    app.services.user.save(req.body)
      .then((result) => {
        return res.status(201).json(result);
      }).catch((err) => next(err));
  });

  return router;
};
