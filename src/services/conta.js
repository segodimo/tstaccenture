module.exports = app => {
  const Conta = require('../models/Conta.js');
  
  const findAll = async (filter = {}) => {
      return await Conta.find(filter);
  };

  const save = async (ddconta) => {

    const { nome, user_id  } = ddconta;
    const newConta = new Conta({nome, user_id});
    await newConta.save();
    return newConta;
  };

  return { findAll, save }
}
