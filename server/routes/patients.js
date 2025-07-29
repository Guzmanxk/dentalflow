const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticate } = require('../middleware/auth');

// Rotas de pacientes
router.get('/', authenticate, patientController.getAllPatients);
router.get('/:id', authenticate, patientController.getPatientById);
router.post('/', authenticate, patientController.createPatient);
router.put('/:id', authenticate, patientController.updatePatient);
router.delete('/:id', authenticate, patientController.deletePatient);
router.get('/:id/appointments', authenticate, patientController.getPatientAppointments);
router.get('/:id/history', authenticate, patientController.getPatientHistory);

module.exports = router; 