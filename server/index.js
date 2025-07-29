const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Configurações de segurança
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting (comentado temporariamente para evitar erros)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 100, // limite por IP
//   message: 'Muitas requisições deste IP, tente novamente em 15 minutos.'
// });
// app.use('/api/', limiter);

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Conecta ao banco de dados (comentado temporariamente)
// connectDB();

// Dados em memória para simular banco de dados
let clinics = [];
let patients = [];
let appointments = [];
let subscriptions = [];

// Função para gerar ID único
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Função para calcular estatísticas reais
const calculateStats = (clinicId) => {
  const clinicPatients = patients.filter(p => p.clinicId === clinicId);
  const clinicAppointments = appointments.filter(a => a.clinicId === clinicId);
  
  const today = new Date();
  const todayAppointments = clinicAppointments.filter(a => {
    const appointmentDate = new Date(a.date);
    return appointmentDate.toDateString() === today.toDateString();
  });
  
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthAppointments = clinicAppointments.filter(a => {
    const appointmentDate = new Date(a.date);
    return appointmentDate >= thisMonth;
  });
  
  const totalRevenue = monthAppointments.reduce((sum, apt) => sum + (apt.price || 0), 0);
  
  return {
    patients: clinicPatients.length,
    appointments: todayAppointments.length,
    monthlyAppointments: monthAppointments.length,
    revenue: totalRevenue
  };
};

// Rotas da API
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/patients', require('./routes/patients'));
// app.use('/api/appointments', require('./routes/appointments'));
// app.use('/api/clinics', require('./routes/clinics'));

// Rotas de auth simplificadas (sem banco de dados)
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone, cnpj } = req.body;
    
    console.log('Tentativa de registro:', { name, email, phone, cnpj });
    
    // Verificar se email já existe
    const existingClinic = clinics.find(c => c.email === email);
    if (existingClinic) {
      return res.status(400).json({ 
        error: 'Email já cadastrado' 
      });
    }
    
    // Criar nova clínica
    const clinicId = generateId();
    const clinic = {
      _id: clinicId,
      name,
      email,
      phone,
      cnpj,
      createdAt: new Date().toISOString(),
      subscription: {
        plan: 'basic',
        status: 'trial',
        trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        startDate: new Date().toISOString()
      }
    };
    
    clinics.push(clinic);
    
    // Simular token JWT
    const token = 'mock_token_' + clinicId;
    
    console.log('Clínica registrada com sucesso:', clinic.name);
    
    res.status(201).json({
      success: true,
      message: 'Clínica registrada com sucesso',
      token,
      clinic
    });
    
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Tentativa de login:', { email });
    
    // Aceitar qualquer credenciais para demo
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }
    
    // Buscar clínica existente ou criar uma nova
    let clinic = clinics.find(c => c.email === email);
    
    if (!clinic) {
      // Criar clínica se não existir (para demo)
      const clinicId = generateId();
      clinic = {
        _id: clinicId,
        name: email.split('@')[0] + ' Clínica',
        email,
        phone: '(11) 99999-9999',
        cnpj: '12.345.678/0001-90',
        createdAt: new Date().toISOString(),
        subscription: {
          plan: 'basic',
          status: 'trial',
          trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          startDate: new Date().toISOString()
        }
      };
      clinics.push(clinic);
    }
    
    // Simular token JWT
    const token = 'mock_token_' + clinic._id;
    
    console.log('Login realizado com sucesso:', clinic.name);
    
    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      clinic
    });
    
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

app.get('/api/auth/me', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    // Simular clínica
    const clinic = {
      _id: 'mock_clinic_id',
      name: 'Clínica Teste',
      email: 'teste@clinica.com',
      phone: '(11) 99999-9999',
      cnpj: '12.345.678/0001-90',
      createdAt: new Date().toISOString(),
      subscription: {
        plan: 'basic',
        status: 'trial',
        trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    };
    
    res.status(200).json({
      success: true,
      data: clinic
    });
    
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

app.get('/api/auth/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    // Simular clínica
    const clinic = {
      _id: 'mock_clinic_id',
      name: 'Clínica Teste',
      email: 'teste@clinica.com',
      phone: '(11) 99999-9999',
      cnpj: '12.345.678/0001-90',
      createdAt: new Date().toISOString(),
      subscription: {
        plan: 'basic',
        status: 'trial',
        trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    };
    
    res.status(200).json({
      success: true,
      clinic
    });
    
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para estatísticas da clínica
app.get('/api/clinics/stats', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const stats = calculateStats(clinicId);
    
    res.status(200).json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para obter informações da assinatura
app.get('/api/subscription', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const clinic = clinics.find(c => c._id === clinicId);
    
    if (!clinic) {
      return res.status(404).json({ 
        error: 'Clínica não encontrada' 
      });
    }
    
    // Verificar se o trial expirou
    const trialEnd = new Date(clinic.subscription.trialEnd);
    const now = new Date();
    const isTrialExpired = now > trialEnd;
    
    const subscription = {
      ...clinic.subscription,
      isTrialExpired,
      daysLeft: Math.max(0, Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24)))
    };
    
    res.status(200).json({
      success: true,
      data: subscription
    });
    
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para atualizar plano da assinatura
app.put('/api/subscription/plan', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const { plan } = req.body;
    
    const clinic = clinics.find(c => c._id === clinicId);
    
    if (!clinic) {
      return res.status(404).json({ 
        error: 'Clínica não encontrada' 
      });
    }
    
    // Atualizar plano
    clinic.subscription.plan = plan;
    clinic.subscription.status = 'active';
    clinic.subscription.startDate = new Date().toISOString();
    
    console.log(`Plano da clínica ${clinic.name} atualizado para: ${plan}`);
    
    res.status(200).json({
      success: true,
      message: 'Plano atualizado com sucesso',
      data: clinic.subscription
    });
    
  } catch (error) {
    console.error('Erro ao atualizar plano:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para cancelar assinatura
app.put('/api/subscription/cancel', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    
    const clinic = clinics.find(c => c._id === clinicId);
    
    if (!clinic) {
      return res.status(404).json({ 
        error: 'Clínica não encontrada' 
      });
    }
    
    // Cancelar assinatura
    clinic.subscription.status = 'cancelled';
    clinic.subscription.cancelledAt = new Date().toISOString();
    
    console.log(`Assinatura da clínica ${clinic.name} cancelada`);
    
    res.status(200).json({
      success: true,
      message: 'Assinatura cancelada com sucesso',
      data: clinic.subscription
    });
    
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para listar pacientes
app.get('/api/patients', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    // Extrair clinicId do token
    const clinicId = token.replace('mock_token_', '');
    const clinicPatients = patients.filter(p => p.clinicId === clinicId);
    
    res.status(200).json({
      success: true,
      data: clinicPatients
    });
    
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para criar paciente
app.post('/api/patients', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const patientData = req.body;
    
    const newPatient = {
      _id: generateId(),
      clinicId,
      ...patientData,
      createdAt: new Date().toISOString()
    };
    
    patients.push(newPatient);
    
    console.log('Paciente criado:', newPatient.name);
    
    res.status(201).json({
      success: true,
      message: 'Paciente criado com sucesso',
      data: newPatient
    });
    
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para buscar paciente por ID
app.get('/api/patients/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const patientId = req.params.id;
    
    const patient = patients.find(p => p._id === patientId && p.clinicId === clinicId);
    
    if (!patient) {
      return res.status(404).json({ 
        error: 'Paciente não encontrado' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: patient
    });
    
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para buscar agendamentos do paciente
app.get('/api/patients/:id/appointments', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const patientId = req.params.id;
    
    // Simular agendamentos do paciente
    const appointments = [
      {
        _id: '1',
        service: 'Consulta Geral',
        date: new Date().toISOString(),
        time: '09:00',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        service: 'Limpeza',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '14:30',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        service: 'Extração',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ];
    
    res.status(200).json({
      success: true,
      data: appointments
    });
    
  } catch (error) {
    console.error('Erro ao buscar agendamentos do paciente:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para deletar paciente
app.delete('/api/patients/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const patientId = req.params.id;
    
    const initialLength = patients.length;
    patients = patients.filter(p => p._id !== patientId || p.clinicId !== clinicId);
    
    if (patients.length < initialLength) {
      console.log(`Paciente ${patientId} excluído com sucesso`);
      res.status(200).json({
        success: true,
        message: 'Paciente excluído com sucesso'
      });
    } else {
      res.status(404).json({
        error: 'Paciente não encontrado'
      });
    }
    
  } catch (error) {
    console.error('Erro ao excluir paciente:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para buscar agendamento por ID
app.get('/api/appointments/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const appointmentId = req.params.id;
    
    // Simular agendamento encontrado
    const appointment = {
      _id: appointmentId,
      patient: {
        _id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '(11) 99999-9999',
        address: {
          street: 'Rua das Flores',
          number: '123',
          city: 'São Paulo',
          state: 'SP'
        }
      },
      service: 'Consulta Geral',
      date: new Date().toISOString(),
      time: '09:00',
      duration: 60,
      status: 'confirmed',
      price: 150.00,
      notes: 'Paciente com histórico de alergia a penicilina.',
      createdAt: new Date().toISOString()
    };
    
    res.status(200).json({
      success: true,
      data: appointment
    });
    
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para atualizar agendamento
app.put('/api/appointments/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const appointmentId = req.params.id;
    const updateData = req.body;
    
    console.log(`Agendamento ${appointmentId} atualizado:`, updateData);
    
    // Simular agendamento atualizado
    const appointment = {
      _id: appointmentId,
      patient: {
        _id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '(11) 99999-9999'
      },
      service: 'Consulta Geral',
      date: new Date().toISOString(),
      time: '09:00',
      duration: 60,
      status: updateData.status || 'confirmed',
      price: 150.00,
      notes: 'Paciente com histórico de alergia a penicilina.',
      createdAt: new Date().toISOString()
    };
    
    res.status(200).json({
      success: true,
      message: 'Agendamento atualizado com sucesso',
      data: appointment
    });
    
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para deletar agendamento
app.delete('/api/appointments/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const appointmentId = req.params.id;
    
    // Simular exclusão
    console.log(`Agendamento ${appointmentId} excluído com sucesso`);
    
    res.status(200).json({
      success: true,
      message: 'Agendamento excluído com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DentaFlow API está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rota de teste para verificar se a API está funcionando
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API funcionando corretamente!',
    timestamp: new Date().toISOString()
  });
});

// Rota de teste para pacientes (sem banco de dados)
app.post('/api/patients', (req, res) => {
  try {
    const patientData = req.body;
    console.log('Dados do paciente recebidos:', patientData);
    console.log('Headers:', req.headers);
    
    // Simular criação de paciente
    const newPatient = {
      _id: Date.now().toString(),
      ...patientData,
      createdAt: new Date().toISOString()
    };
    
    console.log('Paciente criado:', newPatient);
    
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

// Rota de teste para agendamentos (sem banco de dados)
app.post('/api/appointments', (req, res) => {
  try {
    const appointmentData = req.body;
    console.log('Dados do agendamento recebidos:', appointmentData);
    
    // Simular criação de agendamento
    const newAppointment = {
      _id: Date.now().toString(),
      ...appointmentData,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      message: 'Agendamento criado com sucesso',
      data: newAppointment
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para listar agendamentos
app.get('/api/appointments', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const clinicAppointments = appointments.filter(a => a.clinicId === clinicId);
    
    // Adicionar dados do paciente para cada agendamento
    const appointmentsWithPatients = clinicAppointments.map(apt => {
      const patient = patients.find(p => p._id === apt.patientId);
      return {
        ...apt,
        patient: patient ? {
          _id: patient._id,
          name: patient.name,
          email: patient.email,
          phone: patient.phone
        } : null
      };
    });
    
    res.status(200).json({
      success: true,
      data: appointmentsWithPatients
    });
    
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para criar agendamento
app.post('/api/appointments', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não fornecido' 
      });
    }
    
    const clinicId = token.replace('mock_token_', '');
    const appointmentData = req.body;
    
    const newAppointment = {
      _id: generateId(),
      clinicId,
      ...appointmentData,
      status: appointmentData.status || 'pending',
      price: appointmentData.price || 0,
      createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    
    console.log('Agendamento criado:', newAppointment.service);
    
    res.status(201).json({
      success: true,
      message: 'Agendamento criado com sucesso',
      data: newAppointment
    });
    
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 DentaFlow API rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
}); 