const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

const secret = 'Segredo!';

module.exports = (app) => {

  const signin = (req, res, next) => {

    app.services.user.find({ email: req.body.email })
      .then((user) => {
        if (!user[0]) throw new ValidationError('Usuário e/ou senha inválidos');
        if (bcrypt.compareSync(req.body.senha, user[0].senha)) {
          const payload = {
            id: user[0].id,
            nome: user[0].nome,
            email: user[0].email,
          };
          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        } else throw new ValidationError('Usuário e/ou senha inválidos');
      }).catch(err => next(err));

  };

  return { signin };
};
