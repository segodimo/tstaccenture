module.exports = app => {
  
  const findAll = (req, res, next) => {
      app.services.user.findAll()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };  

  const create = (req, res, next) => {
      app.services.user.save(req.body)
      .then((result) => {
        return res.status(201).json(result);
      }).catch(err => next(err));
  };

  return { findAll, create }
}
