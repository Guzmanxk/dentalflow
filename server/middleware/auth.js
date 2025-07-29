const jwt = require('jsonwebtoken');
const Clinic = require('../models/Clinic');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token de acesso necessário' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clinic = await Clinic.findById(decoded.clinicId).select('-password');
    
    if (!clinic) {
      return res.status(401).json({ error: 'Clínica não encontrada' });
    }

    req.clinic = clinic;
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = { authenticate }; 