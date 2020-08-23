const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

const secret = 'Segredo!';

module.exports = (app) => {

  const signin = (req, res, next) => {

    // app.services.user.find({ email: req.body.email })
    // .then(result => res.status(200).json(result))
    // .catch(err => next(err));

    // console.log(req.body.email,'email');

    app.services.user.find({ email: req.body.email })
      .then((user) => {
        // console.log(user,'user');
        // console.log(req.body.senha,'req.body.senha');
        // console.log(user[0].senha,'user.senha');
        // console.log(user[0]._id,'user._id');
        
        // if (req.body.senha == user[0].senha) {
        if (bcrypt.compareSync(req.body.senha, user[0].senha)) {
          const payload = {
            id: user[0].id,
            nome: user[0].nome,
            email: user[0].email,
          };
          // console.log(payload,'payload');
          const token = jwt.encode(payload, secret);
          // console.log(token,'token');
          res.status(200).json({ token });
        } else throw new ValidationError('Usuário ou senha inválido');
      }).catch(err => next(err));

  };


  return { signin };
};
