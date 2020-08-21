const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    nome: String,
    email: String,
    senha: String
  }
});

module.exports = model('User', userSchema);
