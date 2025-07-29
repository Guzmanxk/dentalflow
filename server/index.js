const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DentaFlow API está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API funcionando corretamente!',
    timestamp: new Date().toISOString()
  });
});

// Rota para pacientes (simplificada)
app.post('/api/patients', (req, res) => {
  try {
    const patientData = req.body;
    console.log('Dados do paciente recebidos:', patientData);
    
    const newPatient = {
      _id: Date.now().toString(),
      ...patientData,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      message: 'Paciente criado com sucesso',
      data: newPatient
    });
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Para Netlify Functions
exports.handler = async (event, context) => {
  // Converter evento do Netlify para request do Express
  const { httpMethod, path, headers, body } = event;
  
  // Simular request do Express
  const req = {
    method: httpMethod,
    url: path,
    headers: headers || {},
    body: body ? JSON.parse(body) : {}
  };
  
  const res = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    body: ''
  };
  
  // Roteamento simples
  if (path === '/api/health' && httpMethod === 'GET') {
    res.body = JSON.stringify({
      status: 'OK',
      message: 'DentaFlow API está funcionando',
      timestamp: new Date().toISOString()
    });
  } else if (path === '/api/test' && httpMethod === 'GET') {
    res.body = JSON.stringify({
      message: 'API funcionando corretamente!',
      timestamp: new Date().toISOString()
    });
  } else if (path === '/api/patients' && httpMethod === 'POST') {
    try {
      const patientData = req.body;
      const newPatient = {
        _id: Date.now().toString(),
        ...patientData,
        createdAt: new Date().toISOString()
      };
      
      res.statusCode = 201;
      res.body = JSON.stringify({
        success: true,
        message: 'Paciente criado com sucesso',
        data: newPatient
      });
    } catch (error) {
      res.statusCode = 500;
      res.body = JSON.stringify({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  } else {
    res.statusCode = 404;
    res.body = JSON.stringify({ error: 'Rota não encontrada' });
  }
  
  return res;
};

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 DentaFlow API rodando na porta ${PORT}`);
  });
} 