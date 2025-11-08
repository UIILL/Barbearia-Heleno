
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    
    nome: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 3 
    },
    
    telefone: { 
        type: String, 
        required: false 
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