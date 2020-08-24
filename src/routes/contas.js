const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:id', (req, res, next) => {
    app.services.conta.find(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/', (req, res, next) => {
    // console.log(req.user,'req.user');
    app.services.conta.findAll({ user_id: req.user._id })
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.post('/', (req, res, next) => {
    app.services.conta.save({ ...req.body, user_id: req.user._id })
      .then((result) => {
        return res.status(201).json(result);
      }).catch((err) => next(err));
  });

  return router;
};
