const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefones: {
      numero: { type: Number, required: true },
      ddd: { type: Number, required: true },
    },
    token: { type: String, required: true },
    ultimo_login: { type: String, required: true },
  },
  { 
    timestamps: true
  },
);

module.exports = model('User', userSchema);
