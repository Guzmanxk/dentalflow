const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // Referências
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },

  // Informações do agendamento
  date: {
    type: Date,
    required: [true, 'Data do agendamento é obrigatória']
  },

  startTime: {
    type: String,
    required: [true, 'Horário de início é obrigatório'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de horário inválido']
  },

  endTime: {
    type: String,
    required: [true, 'Horário de término é obrigatório'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de horário inválido']
  },

  duration: {
    type: Number, // em minutos
    default: 60,
    min: 15,
    max: 240
  },

  // Tipo de consulta
  type: {
    type: String,
    required: [true, 'Tipo de consulta é obrigatório'],
    enum: [
      'Consulta Inicial',
      'Retorno',
      'Limpeza',
      'Extração',
      'Canal',
      'Ortodontia',
      'Implante',
      'Cirurgia',
      'Emergência',
      'Outros'
    ]
  },

  // Status do agendamento
  status: {
    type: String,
    enum: ['Agendado', 'Confirmado', 'Em Andamento', 'Concluído', 'Cancelado', 'Não Compareceu'],
    default: 'Agendado'
  },

  // Informações do tratamento
  treatment: {
    description: String,
    cost: Number,
    notes: String,
    procedures: [{
      name: String,
      description: String,
      cost: Number
    }]
  },

  // Observações
  notes: String,
  internalNotes: String, // Notas visíveis apenas para a clínica

  // Confirmação e lembretes
  confirmed: {
    type: Boolean,
    default: false
  },

  confirmedAt: Date,
  confirmedBy: {
    type: String,
    enum: ['Paciente', 'Clínica', 'Sistema']
  },

  // Lembretes enviados
  reminders: [{
    type: {
      type: String,
      enum: ['SMS', 'Email', 'WhatsApp']
    },
    sentAt: Date,
    status: {
      type: String,
      enum: ['Enviado', 'Entregue', 'Falhou']
    }
  }],

  // Histórico de mudanças
  history: [{
    action: {
      type: String,
      enum: ['Criado', 'Modificado', 'Confirmado', 'Cancelado', 'Reagendado']
    },
    changedBy: String,
    changedAt: {
      type: Date,
      default: Date.now
    },
    previousValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,
    notes: String
  }],

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
appointmentSchema.index({ clinicId: 1 });
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ date: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ clinicId: 1, date: 1 });
appointmentSchema.index({ clinicId: 1, status: 1 });

// Middleware para atualizar updatedAt
appointmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Middleware para registrar mudanças no histórico
appointmentSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    const changes = this.modifiedPaths();
    if (changes.length > 0) {
      this.history.push({
        action: 'Modificado',
        changedBy: 'Sistema',
        changedAt: new Date(),
        notes: `Campos modificados: ${changes.join(', ')}`
      });
    }
  }
  next();
});

// Método para verificar se o horário está disponível
appointmentSchema.methods.isTimeAvailable = async function() {
  const conflictingAppointment = await this.constructor.findOne({
    clinicId: this.clinicId,
    date: this.date,
    _id: { $ne: this._id },
    status: { $in: ['Agendado', 'Confirmado'] },
    $or: [
      {
        startTime: { $lt: this.endTime },
        endTime: { $gt: this.startTime }
      }
    ]
  });

  return !conflictingAppointment;
};

// Método para calcular duração
appointmentSchema.methods.calculateDuration = function() {
  const start = new Date(`2000-01-01T${this.startTime}:00`);
  const end = new Date(`2000-01-01T${this.endTime}:00`);
  const diffMs = end - start;
  return Math.round(diffMs / (1000 * 60)); // em minutos
};

// Método para verificar se pode ser cancelado
appointmentSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const appointmentDate = new Date(this.date);
  const hoursDiff = (appointmentDate - now) / (1000 * 60 * 60);
  
  return hoursDiff >= 24; // Pode cancelar até 24h antes
};

// Método para verificar se pode ser reagendado
appointmentSchema.methods.canBeRescheduled = function() {
  const now = new Date();
  const appointmentDate = new Date(this.date);
  const hoursDiff = (appointmentDate - now) / (1000 * 60 * 60);
  
  return hoursDiff >= 2; // Pode reagendar até 2h antes
};

// Virtual para data e hora completa
appointmentSchema.virtual('dateTime').get(function() {
  const date = new Date(this.date);
  return `${date.toLocaleDateString('pt-BR')} às ${this.startTime}`;
});

// Virtual para status colorido
appointmentSchema.virtual('statusColor').get(function() {
  const colors = {
    'Agendado': 'blue',
    'Confirmado': 'green',
    'Em Andamento': 'yellow',
    'Concluído': 'green',
    'Cancelado': 'red',
    'Não Compareceu': 'orange'
  };
  return colors[this.status] || 'gray';
});

// Método para retornar dados públicos
appointmentSchema.methods.toPublicJSON = function() {
  const appointment = this.toObject();
  delete appointment.internalNotes;
  delete appointment.history;
  return appointment;
};

module.exports = mongoose.model('Appointment', appointmentSchema); 