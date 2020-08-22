const { Schema, model } = require('mongoose');

const contaSchema = new Schema(
    {
        nome: {type: String, required: true, unique: true, trim: true },
        user_id: { type: String, required: true},
    }, 
    {
        timestamps: true
    }
);

module.exports = model('Conta', contaSchema);
