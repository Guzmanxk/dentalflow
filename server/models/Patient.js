const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // Referência à clínica
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true
  },

  // Informações pessoais
  name: {
    type: String,
    required: [true, 'Nome do paciente é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },

  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },

  phone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Telefone inválido']
  },

  // Documentos
  cpf: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: true,
    match: [/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido']
  },

  rg: String,
  birthDate: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória']
  },

  // Endereço
  address: {
    street: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String,
    state: {
      type: String,
      enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    },
    zipCode: String
  },

  // Informações médicas
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },

  // Histórico médico
  medicalHistory: {
    allergies: [String],
    medications: [String],
    conditions: [String],
    surgeries: [String],
    notes: String
  },

  // Histórico odontológico
  dentalHistory: {
    lastVisit: Date,
    previousTreatments: [{
      treatment: String,
      date: Date,
      notes: String
    }],
    currentComplaints: String,
    oralHygiene: {
      type: String,
      enum: ['Excelente', 'Boa', 'Regular', 'Ruim']
    },
    smoking: {
      type: Boolean,
      default: false
    },
    alcohol: {
      type: Boolean,
      default: false
    }
  },

  // Exame clínico
  clinicalExam: {
    // Dentes
    teeth: {
      missing: [String],
      restored: [String],
      decayed: [String],
      sensitive: [String]
    },
    
    // Gengiva
    gums: {
      type: String,
      enum: ['Saudável', 'Gengivite', 'Periodontite', 'Outros']
    },

    // Oclusão
    occlusion: {
      type: String,
      enum: ['Normal', 'Classe I', 'Classe II', 'Classe III', 'Outros']
    },

    // Radiografias
    radiographs: [{
      type: String,
      date: Date,
      description: String,
      fileUrl: String
    }],

    // Fotos
    photos: [{
      type: String,
      date: Date,
      description: String,
      fileUrl: String
    }]
  },

  // Tratamentos
  treatments: [{
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['Planejado', 'Em Andamento', 'Concluído', 'Cancelado'],
      default: 'Planejado'
    },
    cost: Number,
    notes: String
  }],

  // Agendamentos
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],

  // Status do paciente
  status: {
    type: String,
    enum: ['Ativo', 'Inativo', 'Transferido'],
    default: 'Ativo'
  },

  // Observações gerais
  notes: String,

  // Metadados
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para performance
patientSchema.index({ clinicId: 1 });
patientSchema.index({ cpf: 1 });
patientSchema.index({ name: 1 });
patientSchema.index({ email: 1 });
patientSchema.index({ status: 1 });

// Middleware para atualizar updatedAt
patientSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Método para calcular idade
patientSchema.methods.getAge = function() {
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Método para retornar dados públicos
patientSchema.methods.toPublicJSON = function() {
  const patient = this.toObject();
  delete patient.medicalHistory;
  delete patient.dentalHistory;
  delete patient.clinicalExam;
  return patient;
};

// Virtual para nome completo
patientSchema.virtual('fullName').get(function() {
  return this.name;
});

// Virtual para endereço completo
patientSchema.virtual('fullAddress').get(function() {
  if (!this.address) return '';
  
  const addr = this.address;
  return `${addr.street || ''}, ${addr.number || ''}${addr.complement ? ` - ${addr.complement}` : ''}, ${addr.neighborhood || ''}, ${addr.city || ''} - ${addr.state || ''}, CEP: ${addr.zipCode || ''}`;
});

module.exports = mongoose.model('Patient', patientSchema); 