// backend/server.js
require('dotenv').config(); // Carrega variáveis de ambiente do .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite que a API lide com JSON

// Conexão com o MongoDB
const uri = process.env.MONGODB_URI; // URL que você vai pegar no MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log("Conectado ao MongoDB Atlas!"))
  .catch(err => console.log("Erro de conexão com MongoDB: " + err));

// Definição de Rotas (será criada no Passo 1.3)
const clienteRouter = require('./routes/clientes');
app.use('/clientes', clienteRouter);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});