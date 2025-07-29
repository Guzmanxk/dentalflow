const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @desc    Buscar todos os pacientes da clínica
// @route   GET /api/patients
// @access  Private
const getAllPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const clinicId = req.clinic._id;

    const query = { clinicId };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const patients = await Patient.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Patient.countDocuments(query);

    res.json({
      success: true,
      data: patients,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPatients: total
      }
    });
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar paciente por ID
// @route   GET /api/patients/:id
// @access  Private
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      clinicId: req.clinic._id
    });

    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Criar novo paciente
// @route   POST /api/patients
// @access  Private
const createPatient = async (req, res) => {
  try {
    const patientData = {
      ...req.body,
      clinicId: req.clinic._id
    };

    const patient = new Patient(patientData);
    await patient.save();

    res.status(201).json({
      success: true,
      message: 'Paciente criado com sucesso',
      data: patient
    });
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Atualizar paciente
// @route   PUT /api/patients/:id
// @access  Private
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      {
        _id: req.params.id,
        clinicId: req.clinic._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json({
      success: true,
      message: 'Paciente atualizado com sucesso',
      data: patient
    });
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Deletar paciente
// @route   DELETE /api/patients/:id
// @access  Private
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({
      _id: req.params.id,
      clinicId: req.clinic._id
    });

    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    // Deletar agendamentos relacionados
    await Appointment.deleteMany({ patientId: req.params.id });

    res.json({
      success: true,
      message: 'Paciente deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar agendamentos do paciente
// @route   GET /api/patients/:id/appointments
// @access  Private
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.id,
      clinicId: req.clinic._id
    })
    .sort({ date: -1 })
    .populate('patient', 'name email phone');

    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar histórico do paciente
// @route   GET /api/patients/:id/history
// @access  Private
const getPatientHistory = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      clinicId: req.clinic._id
    });

    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    const appointments = await Appointment.find({
      patientId: req.params.id,
      clinicId: req.clinic._id,
      status: 'completed'
    })
    .sort({ date: -1 })
    .limit(20);

    res.json({
      success: true,
      data: {
        patient,
        appointments
      }
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientAppointments,
  getPatientHistory
}; 