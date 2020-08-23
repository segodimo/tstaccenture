module.exports = app => {

	const get = (req, res, next) => {
	    app.services.conta.find(req.params.id)
	    .then(result => res.status(200).json(result))
      .catch(err => next(err))
	};

  const getAll = (req, res, next) => {
      app.services.conta.findAll()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };  

  const create = (req, res, next) => {
      app.services.conta.save(req.body)
      .then((result) => {
        return res.status(201).json(result);
      }).catch(err => next(err));
  };

  return { get, getAll, create }
}
