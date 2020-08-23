const express = require('express');

module.exports = (app) => {
  app.use('/auth', app.routes.auth);
  const protectedRouter = express.Router();

  protectedRouter.use('/users', app.routes.users);
  protectedRouter.use('/contas', app.routes.contas);

  app.use('/api', app.config.passport.authenticate(), protectedRouter);
  app.use('/api-root', protectedRouter);
};
