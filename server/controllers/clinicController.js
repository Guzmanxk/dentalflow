const Clinic = require('../models/Clinic');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @desc    Buscar todas as clínicas (para admin)
// @route   GET /api/clinics
// @access  Private
const getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: clinics
    });
  } catch (error) {
    console.error('Erro ao buscar clínicas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar clínica por ID
// @route   GET /api/clinics/:id
// @access  Private
const getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id)
      .select('-password');

    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    res.json({
      success: true,
      data: clinic
    });
  } catch (error) {
    console.error('Erro ao buscar clínica:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Criar nova clínica
// @route   POST /api/clinics
// @access  Private
const createClinic = async (req, res) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();

    res.status(201).json({
      success: true,
      message: 'Clínica criada com sucesso',
      data: clinic.toPublicJSON()
    });
  } catch (error) {
    console.error('Erro ao criar clínica:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Atualizar clínica
// @route   PUT /api/clinics/:id
// @access  Private
const updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    res.json({
      success: true,
      message: 'Clínica atualizada com sucesso',
      data: clinic
    });
  } catch (error) {
    console.error('Erro ao atualizar clínica:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Deletar clínica
// @route   DELETE /api/clinics/:id
// @access  Private
const deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);

    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    // Deletar pacientes e agendamentos relacionados
    await Patient.deleteMany({ clinicId: req.params.id });
    await Appointment.deleteMany({ clinicId: req.params.id });

    res.json({
      success: true,
      message: 'Clínica deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar clínica:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar estatísticas da clínica
// @route   GET /api/clinics/:id/stats
// @access  Private
const getClinicStats = async (req, res) => {
  try {
    const clinicId = req.params.id;

    // Contar pacientes
    const patientCount = await Patient.countDocuments({ clinicId });

    // Contar agendamentos
    const appointmentCount = await Appointment.countDocuments({ clinicId });

    // Agendamentos do mês atual
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const monthlyAppointments = await Appointment.countDocuments({
      clinicId,
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });

    // Agendamentos confirmados vs pendentes
    const confirmedAppointments = await Appointment.countDocuments({
      clinicId,
      status: 'confirmed'
    });

    const pendingAppointments = await Appointment.countDocuments({
      clinicId,
      status: 'pending'
    });

    res.json({
      success: true,
      data: {
        patientCount,
        appointmentCount,
        monthlyAppointments,
        confirmedAppointments,
        pendingAppointments
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getAllClinics,
  getClinicById,
  createClinic,
  updateClinic,
  deleteClinic,
  getClinicStats
}; 