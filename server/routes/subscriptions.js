const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate } = require('../middleware/auth');

// Rotas de assinaturas
router.get('/', authenticate, subscriptionController.getAllSubscriptions);
router.get('/:id', authenticate, subscriptionController.getSubscriptionById);
router.post('/', authenticate, subscriptionController.createSubscription);
router.put('/:id', authenticate, subscriptionController.updateSubscription);
router.delete('/:id', authenticate, subscriptionController.cancelSubscription);
router.post('/:id/upgrade', authenticate, subscriptionController.upgradeSubscription);
router.post('/:id/downgrade', authenticate, subscriptionController.downgradeSubscription);

module.exports = router; 