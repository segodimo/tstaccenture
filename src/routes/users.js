const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/:id', (req, res, next) => {
    app.services.user.findId(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => next(err))
  });

  router.post('/', (req, res, next) => {
    app.services.user.save(req.body)
      .then((result) => {
        return res.status(201).json(result);
      }).catch((err) => next(err));
  });

  return router;
};
