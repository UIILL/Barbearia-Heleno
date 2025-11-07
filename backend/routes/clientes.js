// backend/routes/clientes.js
const router = require('express').Router();
let Cliente = require('../models/cliente.model');

// READ (Listar todos os clientes: GET /clientes/)
router.route('/').get((req, res) => {
  Cliente.find()
    .then(clientes => res.json(clientes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// CREATE (Cadastrar novo cliente: POST /clientes/add)
router.route('/add').post((req, res) => {
  const { nome, telefone } = req.body;
  const novoCliente = new Cliente({ nome, telefone });

  novoCliente.save()
    .then(() => res.json('Cliente adicionado!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Outras rotas (GET por ID, UPDATE, DELETE) seguiriam o mesmo padrão.
// Exemplo de DELETE:
router.route('/:id').delete((req, res) => {
  Cliente.findByIdAndDelete(req.params.id)
    .then(() => res.json('Cliente excluído.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// backend/routes/clientes.js

// ... (rotas anteriores: GET /, POST /add, DELETE /:id) ...

// GET por ID (Para carregar os dados no formulário de edição)
router.route('/:id').get((req, res) => {
    Cliente.findById(req.params.id)
        .then(cliente => res.json(cliente))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE (Para salvar as alterações)
router.route('/update/:id').post((req, res) => {
    Cliente.findById(req.params.id)
        .then(cliente => {
            cliente.nome = req.body.nome;
            cliente.telefone = req.body.telefone;
            
            cliente.save()
                .then(() => res.json('Cliente atualizado!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;