const express = require('express');

module.exports = (app) => {
  app.route('/auth/signin')
    .post(app.routes.auth.signin);

  app.route('/auth/signup')
    .post(app.routes.users.create);

  app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/contas')
    .all(app.config.passport.authenticate())
    .get(app.routes.contas.getAll)
    .post(app.routes.contas.create);

  app.route('/contas/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.contas.get);
};
