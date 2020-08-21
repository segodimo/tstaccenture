module.exports = app => {

  const User = require('../models/users.js');
  
  const findAll = async (req, res) => {


    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }


    // // const users = [
    // //   { name: 'Carlitos', email: 'Buarque'},
    // // ];
    // const users = await User.find();
    // console.log(users)
    // res.status(200).json(users);
  };

  const create = async (req, res) => {

    try {
        const { nome, senha, email  } = req.body;
        console.log(req.body);
        const newUser = new User({nome, senha, email});
        await newUser.save();
        res.json('User created');
    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }


    // const { nome, email, senha } = req.body;
    // console.log(nome, email, senha);
    // const newUser = new User({
    //   nome: nome,
    //   email: email,
    //   senha: senha
    // });

    // res.status(200).json(newUser);
  };

  return { findAll, create }
}
