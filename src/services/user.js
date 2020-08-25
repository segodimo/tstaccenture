const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const ValidationError = require('../errors/ValidationError');
// const app = require('../app');
// const express = require('express');

module.exports = (app) => {
  const User = require('../models/User.js');

  const find = async (filter = {}) => {
    return await User.find(filter);
  };

  const findId = async (req = {}) => {
    const getUsId = await User.findOne({ _id: req.params.id });
    const authorization = req.headers.authorization.split(" ")[1];
    if (authorization != getUsId.token) throw new ValidationError('Não autorizado');

    const ultimo_login = getUsId.ultimo_login;
    const agora = Date.now();
    const diffTime = Math.abs((agora - ultimo_login)/(1000 * 60));
    if (diffTime > 30) throw new ValidationError('Sessão inválida');
    return getUsId;
  };

  const findAll = async (filter = {}) => {
    return await User.find(filter);
  };

  const update = async (user = {}) => {
    // console.log(user[0],'user');
    return await User.update({ ultimo_login: Date.now() });
  };

  const getPasswdHash = (senha) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
  };

  const save = async (user) => {
    if (!user.nome) throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.email) throw new ValidationError('E-mail é um atributo obrigatório');
    if (!user.senha) throw new ValidationError('Senha é um atributo obrigatório');
    if (!user.telefones) throw new ValidationError('Telefone e DDD é um atributo obrigatório');

    const userDb = await findAll({ email: user.email });
    if (userDb && userDb.length > 0) throw new ValidationError('Já existe um usuário com esse email');

    const { nome, email, senha, telefones } = user;

    const secret = 'Segredo!';
    const payload = await {
      nome, 
      email,
      senha,
    };
    const token = jwt.encode(payload, secret);

    const cryptSenha = getPasswdHash(senha);
    const ultimo_login = Date.now();
    const newUser = new User({ nome, email, senha: cryptSenha, telefones, token, ultimo_login });
    
    await newUser.save();


    const res = ({ 
            _id: newUser._id, 
            nome: newUser.nome, 
            data_criacao: newUser.createdAt,
            data_atualizacao: newUser.updatedAt,
            ultimo_login: newUser.createdAt,
            email: newUser.email,
            token: newUser.token
          });

    return res;
  };

  return { find, findId, findAll, save, update };
};
