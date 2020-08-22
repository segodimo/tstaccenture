module.exports = app => {

	const get = (req, res) => {
	    app.services.conta.find(req.params.id)
	    .then(result => res.status(200).json(result));
	};

  const getAll = (req, res) => {
      app.services.conta.findAll()
      .then(result => res.status(200).json(result));
  };  

  const create = async (req, res) => {
    const result = await  app.services.conta.save(req.body);
    if(result.error) return res.status(400).json(result)
    return res.status(201).json(result[0]);
  };

  return { get, getAll, create }
}
