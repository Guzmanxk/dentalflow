const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');
const { authenticate } = require('../middleware/auth');

// Rotas de clínicas
router.get('/', authenticate, clinicController.getAllClinics);
router.get('/:id', authenticate, clinicController.getClinicById);
router.post('/', authenticate, clinicController.createClinic);
router.put('/:id', authenticate, clinicController.updateClinic);
router.delete('/:id', authenticate, clinicController.deleteClinic);
router.get('/:id/stats', authenticate, clinicController.getClinicStats);

module.exports = router; 