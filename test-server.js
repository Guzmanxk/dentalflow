const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DentaFlow API está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rota de teste de registro
app.post('/api/auth/register', (req, res) => {
  res.json({
    success: true,
    message: 'Clínica registrada com sucesso',
    token: 'test_token_123'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor de teste rodando na porta ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
}); 