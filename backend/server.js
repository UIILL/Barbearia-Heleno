
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); // Permite que a API lide com JSON

// Conexão com o MongoDB
const uri = process.env.MONGODB_URI; 
mongoose.connect(uri)
  .then(() => console.log("Conectado ao MongoDB Atlas!"))
  .catch(err => console.log("Erro de conexão com MongoDB: " + err));


const clienteRouter = require('./routes/clientes');
app.use('/clientes', clienteRouter);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});