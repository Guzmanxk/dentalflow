const express = require('express');
const router = express.Router();

// Rotas de autenticação (simplificadas)
router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Clínica registrada com sucesso',
    token: 'test_token_123'
  });
});

router.post('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login realizado com sucesso',
    token: 'test_token_123'
  });
});

router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

router.get('/me', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Clínica Teste',
      email: 'teste@clinica.com',
      subscription: {
        plan: 'basic',
        status: 'trial'
      }
    }
  });
});

module.exports = router; 