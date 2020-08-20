module.exports = app => {

  
  const findAll = (req, res) => {
    const users = [
      { name: 'Carlitos', email: 'Buarque'},
    ];
    res.status(200).json(users);
  };

  const create = (req, res) => {
    res.status(200).json(req.body);
  };

  return { findAll, create }
}
