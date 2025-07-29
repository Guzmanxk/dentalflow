module.exports = (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'DentaFlow API funcionando!',
    timestamp: new Date().toISOString()
  });
}; 