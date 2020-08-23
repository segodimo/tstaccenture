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
        return res.status(201).json(result[0]);
      }).catch(err => next(err));
  };

  // const create = async (req, res, next) => {
  //   // const result = await  app.services.conta.save(req.body);
  //   // if(result.error) return res.status(400).json(result)
  //   // return res.status(201).json(result[0]);
  //   try{
  //     const result = await  app.services.conta.save(req.body);
  //     return res.status(201).json(result[0]);
  //   }catch (err) {
  //     // return res.status(400).json({ error: err.message })
  //     return next(err);
  //   }
  // };

  return { get, getAll, create }
}
