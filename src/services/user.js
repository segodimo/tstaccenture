module.exports = app => {
  const User = require('../models/User.js');
  
  const findAll = async (filter = {}) => {
      return await User.find(filter);
  };

  const save = async (user) => {
    if (!user.nome) return { error: 'Nome é um atributo obrigatório'};
    if (!user.email) return { error: 'E-mail é um atributo obrigatório'};
    if (!user.senha) return { error: 'Senha é um atributo obrigatório'};

    const userDb = await findAll({ email: user.email });
    // const userDb = await findAll({ email: "1598050455724@mail.com" });
    // console.log(userDb)
    if (userDb && userDb.length > 0) return { error: 'Já existe um usuário com esse email'};

    const { nome, senha, email  } = user;
    const newUser = new User({nome, senha, email});
    await newUser.save();
    return newUser;
  };

  return { findAll, save }
}
