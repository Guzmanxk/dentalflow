const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DentaFlow API funcionando!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando corretamente' });
});

module.exports = app; 