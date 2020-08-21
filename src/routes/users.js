module.exports = app => {
  const User = require('../models/User.js');
  
  const findAll = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    }
    catch (err) {
      res.status(400).json({ error: err });
    }
  };

  const create = async (req, res) => {
    try {
      const { nome, senha, email  } = req.body;
      // console.log(req.body);
      const newUser = new User({nome, senha, email});
      await newUser.save();
      res.status(201).json(newUser);
    } catch (e) {
      console.log(e)
      //res.json(e.errmsg);
      res.status(400).json(e.errmsg);
    }
  };

  return { findAll, create }
}
