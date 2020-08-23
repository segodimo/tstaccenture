const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

module.exports = app => {
  const User = require('../models/User.js');

  const find = async (filter = {}) => {
      return await User.find(filter);
  };
  
  const findAll = async (filter = {}) => {
      return await User.find(filter);
  };

  const getPasswdHash = (senha) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
  };

  const save = async (user) => {
    if (!user.nome) throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.email) throw new ValidationError('E-mail é um atributo obrigatório');
    if (!user.senha) throw new ValidationError('Senha é um atributo obrigatório');

    const userDb = await findAll({ email: user.email });
    if (userDb && userDb.length > 0) throw new ValidationError('Já existe um usuário com esse email');

    const { nome, senha, email  } = user;

    const cryptSenha = getPasswdHash(senha);


    const newUser = new User({nome, senha: cryptSenha, email});

    await newUser.save();
    res =  ({ _id: newUser._id, nome: newUser.nome, email: newUser.email });

    return res
  };

  return { find, findAll, save }
}
