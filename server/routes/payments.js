const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

// Rotas de pagamentos
router.get('/', authenticate, paymentController.getAllPayments);
router.get('/:id', authenticate, paymentController.getPaymentById);
router.post('/create-payment-intent', authenticate, paymentController.createPaymentIntent);
router.post('/confirm-payment', authenticate, paymentController.confirmPayment);
router.post('/webhook', paymentController.handleWebhook);
router.get('/:id/receipt', authenticate, paymentController.getPaymentReceipt);

module.exports = router; 