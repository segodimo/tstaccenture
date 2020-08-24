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

    // console.log(conta.user_id,'conta.user_id');
    // console.log(conta.nome,'conta.nome');
    // const contaDb = await Conta.find({ nome: 'ACC1598233210730', user_id: '5f431a7a24896a1ff64db68e' });
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // const contaDb = await findAll({ nome: conta.nome, user_id: conta.user_id });
    // console.log(contaDb,'contaDb');
    // if (contaDb) throw new ValidationError('Já existe uma conta com esse nome');
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // if (contaDb) console.log('PASANDO++++++++++++++');

    const { nome, user_id } = conta;
    const newConta = new Conta({ nome, user_id });
    await newConta.save();
    return newConta;
  };

  return { find, findAll, save };
};
