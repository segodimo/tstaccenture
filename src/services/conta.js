module.exports = app => {
  const Conta = require('../models/Conta.js');
  
  const find = async (filter = {}) => {
      return await Conta.findOne({ _id: filter });
  };
  
  const findAll = async () => {
      return await Conta.find();
  };

  const save = async (ddconta) => {

    const { nome, user_id  } = ddconta;
    const newConta = new Conta({nome, user_id});
    await newConta.save();
    return newConta;
  };

  return { find, findAll, save }
}
