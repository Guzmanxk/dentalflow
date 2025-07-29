const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/auth');

// Rotas de agendamentos
router.get('/', authenticate, appointmentController.getAllAppointments);
router.get('/:id', authenticate, appointmentController.getAppointmentById);
router.post('/', authenticate, appointmentController.createAppointment);
router.put('/:id', authenticate, appointmentController.updateAppointment);
router.delete('/:id', authenticate, appointmentController.deleteAppointment);
router.get('/calendar/:clinicId', authenticate, appointmentController.getCalendarEvents);
router.post('/:id/confirm', authenticate, appointmentController.confirmAppointment);
router.post('/:id/cancel', authenticate, appointmentController.cancelAppointment);

module.exports = router; 