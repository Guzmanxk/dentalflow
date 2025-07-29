const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clinicSchema = new mongoose.Schema({
  // Informações básicas
  name: {
    type: String,
    required: [true, 'Nome da clínica é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },
  
  // Dados de acesso
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres']
  },

  // Informações de contato
  phone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Telefone inválido']
  },

  // Endereço
  address: {
    street: {
      type: String,
      required: [true, 'Rua é obrigatória']
    },
    number: {
      type: String,
      required: [true, 'Número é obrigatório']
    },
    complement: String,
    neighborhood: {
      type: String,
      required: [true, 'Bairro é obrigatório']
    },
    city: {
      type: String,
      required: [true, 'Cidade é obrigatória']
    },
    state: {
      type: String,
      required: [true, 'Estado é obrigatório'],
      enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    },
    zipCode: {
      type: String,
      required: [true, 'CEP é obrigatório'],
      match: [/^\d{5}-?\d{3}$/, 'CEP inválido']
    }
  },

  // Informações profissionais
  cnpj: {
    type: String,
    required: [true, 'CNPJ é obrigatório'],
    unique: true,
    match: [/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido']
  },

  cro: {
    type: String,
    required: [true, 'CRO é obrigatório']
  },

  // Configurações da clínica
  specialties: [{
    type: String,
    enum: ['Ortodontia', 'Endodontia', 'Periodontia', 'Implantodontia', 'Odontopediatria', 'Cirurgia', 'Estética', 'Prevenção', 'Outros']
  }],

  workingHours: {
    monday: { start: String, end: String, active: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, active: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, active: { type: Boolean, default: true } },
    thursday: { start: String, end: String, active: { type: Boolean, default: true } },
    friday: { start: String, end: String, active: { type: Boolean, default: true } },
    saturday: { start: String, end: String, active: { type: Boolean, default: false } },
    sunday: { start: String, end: String, active: { type: Boolean, default: false } }
  },

  // Plano de assinatura
  subscription: {
    plan: {
      type: String,
      enum: ['basic', 'premium'],
      default: 'basic'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'trial'],
      default: 'trial'
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    trialEnd: Date
  },

  // Configurações do sistema
  settings: {
    appointmentDuration: {
      type: Number,
      default: 60, // minutos
      min: 15,
      max: 240
    },
    reminderNotifications: {
      type: Boolean,
      default: true
    },
    autoConfirmAppointments: {
      type: Boolean,
      default: false
    },
    allowOnlineBooking: {
      type: Boolean,
      default: true
    }
  },

  // Status da conta
  isActive: {
    type: Boolean,
    default: true
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  // Metadados
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índices para performance
clinicSchema.index({ email: 1 });
clinicSchema.index({ cnpj: 1 });
clinicSchema.index({ 'subscription.status': 1 });
clinicSchema.index({ createdAt: -1 });

// Middleware para hash da senha
clinicSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
clinicSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para retornar dados públicos
clinicSchema.methods.toPublicJSON = function() {
  const clinic = this.toObject();
  delete clinic.password;
  delete clinic.stripeCustomerId;
  delete clinic.stripeSubscriptionId;
  return clinic;
};

// Método para verificar se a assinatura está ativa
clinicSchema.methods.hasActiveSubscription = function() {
  return this.subscription.status === 'active' || 
         (this.subscription.status === 'trial' && this.subscription.trialEnd > new Date());
};

// Virtual para endereço completo
clinicSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  return `${addr.street}, ${addr.number}${addr.complement ? ` - ${addr.complement}` : ''}, ${addr.neighborhood}, ${addr.city} - ${addr.state}, CEP: ${addr.zipCode}`;
});

module.exports = mongoose.model('Clinic', clinicSchema); 