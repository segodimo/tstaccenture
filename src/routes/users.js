module.exports = app => {

  const User = require('../models/users.js');
  
  const findAll = async (req, res) => {
    // const users = [
    //   { name: 'Carlitos', email: 'Buarque'},
    // ];
    const users = await User.find();
    console.log(users)
    res.status(200).json(users);
  };

  const create = (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(nome, email, senha);
    const newUser = new User({
      nome: nome,
      email: email,
      senha: senha
    });

    res.status(200).json(newUser);
  };

  return { findAll, create }
}
