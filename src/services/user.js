module.exports = (app) => {
  const User = require('../models/User.js');
  
  const findAll = async (req, res) => {
    try {
      return User.find();
    }
    catch (err) {
      return ({ error: err });
    }
  };

  const create = async (user) => {
    try {
      // const newUser = new User({nome, senha, email});
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (e) {
      // console.log(e)
      //res.json(e.errmsg);
      return (e.errmsg);
    }
  };

  return { findAll, create }
}
