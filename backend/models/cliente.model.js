// backend/models/cliente.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    // 🚨 GARANTA que o nome do campo é 'nome' e não 'name'
    nome: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 3 
    },
    // 🚨 GARANTA que o nome do campo é 'telefone'
    telefone: { 
        type: String, 
        required: false // Ou true, dependendo da sua regra de negócio
    }, 
    dataCadastro: { 
        type: Date, 
        default: Date.now 
    },
}, {
    timestamps: true,
});

const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;