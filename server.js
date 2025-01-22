const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Inicializar o app
const app = express();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/epi-manager', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelos
const User = require('./models/user');
const Epi = require('./models/Epi');

// Roteadores
const authRouter = require('./routes/auth');
const epiRouter = require('./routes/epi');
app.use('/auth', authRouter);
app.use('/epi', epiRouter);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
