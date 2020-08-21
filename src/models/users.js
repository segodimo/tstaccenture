const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        senha: { type: String, required: true},
        email: { type: String, required: true},
    }, {
        timestamps: true
    });

// const userSchema = new Schema(
//     {
//         username: {type: String, required: true},
//         pass: { type: String, required: true},
//     }, {
//         timestamps: true
//     });

module.exports = model('User', userSchema);