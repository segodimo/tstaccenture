const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const Conta = require('../models/Conta.js');
  
  const find = async (filter = {}) => {
      return await Conta.findOne({ _id: filter });
  };
  
  const findAll = async (filter = {}) => {
      return await Conta.find(filter);
  };

  const save = async (conta) => {
    if (!conta.nome) throw new ValidationError('Nome é um atributo obrigatório');
    const { nome, user_id  } = conta;
    const newConta = new Conta({nome, user_id});
    await newConta.save();
    return newConta;
  };

  return { find, findAll, save }
}
