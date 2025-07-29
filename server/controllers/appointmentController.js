const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// @desc    Buscar todos os agendamentos da clínica
// @route   GET /api/appointments
// @access  Private
const getAllAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date } = req.query;
    const clinicId = req.clinic._id;

    const query = { clinicId };
    
    if (status) {
      query.status = status;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone')
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      data: appointments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalAppointments: total
      }
    });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar agendamento por ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      clinicId: req.clinic._id
    }).populate('patient', 'name email phone');

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Criar novo agendamento
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const { patientId, date, time, service, notes } = req.body;
    const clinicId = req.clinic._id;

    // Verificar se o paciente existe
    const patient = await Patient.findOne({
      _id: patientId,
      clinicId
    });

    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    // Verificar se já existe agendamento no mesmo horário
    const existingAppointment = await Appointment.findOne({
      clinicId,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Horário já ocupado' });
    }

    const appointment = new Appointment({
      clinicId,
      patientId,
      date: new Date(date),
      time,
      service,
      notes,
      status: 'pending'
    });

    await appointment.save();

    // Popular dados do paciente
    await appointment.populate('patient', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Agendamento criado com sucesso',
      data: appointment
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Atualizar agendamento
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        clinicId: req.clinic._id
      },
      req.body,
      { new: true, runValidators: true }
    ).populate('patient', 'name email phone');

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Agendamento atualizado com sucesso',
      data: appointment
    });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Deletar agendamento
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      clinicId: req.clinic._id
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Agendamento deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar eventos do calendário
// @route   GET /api/appointments/calendar/:clinicId
// @access  Private
const getCalendarEvents = async (req, res) => {
  try {
    const { start, end } = req.query;
    const clinicId = req.clinic._id;

    const query = { clinicId };
    
    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone')
      .sort({ date: 1, time: 1 });

    const events = appointments.map(appointment => ({
      id: appointment._id,
      title: `${appointment.patient.name} - ${appointment.service}`,
      start: new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.time}`),
      end: new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.time}`),
      backgroundColor: appointment.status === 'confirmed' ? '#10b981' : '#f59e0b',
      borderColor: appointment.status === 'confirmed' ? '#10b981' : '#f59e0b',
      extendedProps: {
        status: appointment.status,
        patient: appointment.patient,
        service: appointment.service,
        notes: appointment.notes
      }
    }));

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Erro ao buscar eventos do calendário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Confirmar agendamento
// @route   POST /api/appointments/:id/confirm
// @access  Private
const confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        clinicId: req.clinic._id
      },
      { status: 'confirmed' },
      { new: true }
    ).populate('patient', 'name email phone');

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Agendamento confirmado com sucesso',
      data: appointment
    });
  } catch (error) {
    console.error('Erro ao confirmar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Cancelar agendamento
// @route   POST /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        clinicId: req.clinic._id
      },
      { status: 'cancelled' },
      { new: true }
    ).populate('patient', 'name email phone');

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Agendamento cancelado com sucesso',
      data: appointment
    });
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getCalendarEvents,
  confirmAppointment,
  cancelAppointment
}; 