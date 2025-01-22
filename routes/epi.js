const express = require('express');
const jwt = require('jsonwebtoken');
const Epi = require('../models/Epi');
const User = require('../models/user');

const router = express.Router();

// Middleware para verificar se o usuário é admin
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token não encontrado' });

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err || decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  });
};

// Rota para cadastrar EPI (somente admin)
router.post('/cadastro', isAdmin, async (req, res) => {
  const { name, quantity, expirationDate } = req.body;
  const epi = new Epi({ name, quantity, expirationDate });
  await epi.save();
  res.status(201).json(epi);
});

// Rota para listar EPIs
router.get('/', async (req, res) => {
  const epis = await Epi.find();
  res.json(epis);
});

module.exports = router;
