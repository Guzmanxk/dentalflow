const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Clinic = require('../models/Clinic');
const { validationResult } = require('express-validator');

// Gerar token JWT
const generateToken = (clinicId) => {
  return jwt.sign(
    { clinicId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @desc    Registrar nova clínica
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: errors.array() 
      });
    }

    const {
      name,
      email,
      password,
      phone,
      address,
      cnpj,
      cro,
      specialties
    } = req.body;

    // Verificar se email já existe
    const existingClinic = await Clinic.findOne({ email });
    if (existingClinic) {
      return res.status(400).json({ 
        error: 'Email já cadastrado' 
      });
    }

    // Verificar se CNPJ já existe
    const existingCNPJ = await Clinic.findOne({ cnpj });
    if (existingCNPJ) {
      return res.status(400).json({ 
        error: 'CNPJ já cadastrado' 
      });
    }

    // Criar nova clínica
    const clinic = new Clinic({
      name,
      email,
      password,
      phone,
      address,
      cnpj,
      cro,
      specialties,
      subscription: {
        plan: 'basic',
        status: 'trial',
        trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 dias
      }
    });

    await clinic.save();

    // Gerar token
    const token = generateToken(clinic._id);

    // Atualizar dados de login
    clinic.lastLogin = new Date();
    clinic.loginCount += 1;
    await clinic.save();

    res.status(201).json({
      success: true,
      message: 'Clínica registrada com sucesso',
      token,
      clinic: clinic.toPublicJSON()
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Login da clínica
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Buscar clínica
    const clinic = await Clinic.findOne({ email });
    if (!clinic) {
      return res.status(401).json({ 
        error: 'Email ou senha inválidos' 
      });
    }

    // Verificar se clínica está ativa
    if (!clinic.isActive) {
      return res.status(401).json({ 
        error: 'Conta desativada. Entre em contato com o suporte.' 
      });
    }

    // Verificar senha
    const isPasswordValid = await clinic.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Email ou senha inválidos' 
      });
    }

    // Gerar token
    const token = generateToken(clinic._id);

    // Atualizar dados de login
    clinic.lastLogin = new Date();
    clinic.loginCount += 1;
    await clinic.save();

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      clinic: clinic.toPublicJSON()
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Obter perfil da clínica
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.clinicId);
    if (!clinic) {
      return res.status(404).json({ 
        error: 'Clínica não encontrada' 
      });
    }

    res.json({
      success: true,
      clinic: clinic.toPublicJSON()
    });

  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Atualizar perfil da clínica
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: errors.array() 
      });
    }

    const clinic = await Clinic.findById(req.clinicId);
    if (!clinic) {
      return res.status(404).json({ 
        error: 'Clínica não encontrada' 
      });
    }

    // Campos que podem ser atualizados
    const allowedFields = [
      'name', 'phone', 'address', 'specialties', 
      'workingHours', 'settings'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        clinic[field] = req.body[field];
      }
    });

    await clinic.save();

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      clinic: clinic.toPublicJSON()
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Alterar senha
// @route   PUT /api/auth/password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: errors.array() 
      });
    }

    const { currentPassword, newPassword } = req.body;

    const clinic = await Clinic.findById(req.clinicId);
    if (!clinic) {
      return res.status(404).json({ 
        error: 'Clínica não encontrada' 
      });
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await clinic.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ 
        error: 'Senha atual incorreta' 
      });
    }

    // Atualizar senha
    clinic.password = newPassword;
    await clinic.save();

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Verificar token
// @route   GET /api/auth/verify
// @access  Private
const verifyToken = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.clinicId);
    if (!clinic) {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }

    res.json({
      success: true,
      clinic: clinic.toPublicJSON()
    });

  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Logout
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    // Em uma implementação real, você pode invalidar o token
    // Por enquanto, apenas retornamos sucesso
    res.json({
      success: true,
      message: 'Logout realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Esqueci minha senha
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const clinic = await Clinic.findOne({ email });
    if (!clinic) {
      return res.status(404).json({ 
        error: 'Clínica não encontrada' 
      });
    }

    // Em uma implementação real, você enviaria um email
    // Por enquanto, apenas retornamos sucesso
    res.json({
      success: true,
      message: 'Email de recuperação enviado'
    });
  } catch (error) {
    console.error('Erro ao processar forgot password:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// @desc    Resetar senha
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Em uma implementação real, você validaria o token
    // Por enquanto, apenas retornamos sucesso
    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyToken
}; 