export default function handler(req, res) {
  res.status(200).json({
    message: 'DentaFlow API funcionando!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
} 