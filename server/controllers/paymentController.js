const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Clinic = require('../models/Clinic');

// @desc    Buscar todos os pagamentos
// @route   GET /api/payments
// @access  Private
const getAllPayments = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const payments = await stripe.paymentIntents.list({
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: payments.data
    });
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar pagamento por ID
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = async (req, res) => {
  try {
    const payment = await stripe.paymentIntents.retrieve(req.params.id);

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Criar intent de pagamento
// @route   POST /api/payments/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'brl', clinicId, plan } = req.body;

    // Buscar clínica
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    // Criar ou buscar customer no Stripe
    let customer;
    if (clinic.subscription?.stripeCustomerId) {
      customer = await stripe.customers.retrieve(clinic.subscription.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: clinic.email,
        name: clinic.name,
        metadata: {
          clinicId: clinic._id.toString()
        }
      });
    }

    // Criar payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos
      currency,
      customer: customer.id,
      metadata: {
        clinicId: clinic._id.toString(),
        plan: plan || 'subscription'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id
      }
    });
  } catch (error) {
    console.error('Erro ao criar payment intent:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Confirmar pagamento
// @route   POST /api/payments/confirm-payment
// @access  Private
const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Atualizar status da clínica se necessário
      const clinic = await Clinic.findById(paymentIntent.metadata.clinicId);
      if (clinic) {
        clinic.subscription.status = 'active';
        clinic.subscription.lastPayment = new Date();
        await clinic.save();
      }

      res.json({
        success: true,
        message: 'Pagamento confirmado com sucesso',
        data: paymentIntent
      });
    } else {
      res.status(400).json({
        error: 'Pagamento não foi confirmado',
        status: paymentIntent.status
      });
    }
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Webhook do Stripe
// @route   POST /api/payments/webhook
// @access  Public
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Erro no webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Pagamento confirmado:', paymentIntent.id);
        
        // Atualizar status da clínica
        if (paymentIntent.metadata.clinicId) {
          const clinic = await Clinic.findById(paymentIntent.metadata.clinicId);
          if (clinic) {
            clinic.subscription.status = 'active';
            clinic.subscription.lastPayment = new Date();
            await clinic.save();
          }
        }
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Fatura paga:', invoice.id);
        
        // Atualizar assinatura
        if (invoice.subscription) {
          const clinic = await Clinic.findOne({
            'subscription.stripeSubscriptionId': invoice.subscription
          });
          if (clinic) {
            clinic.subscription.status = 'active';
            clinic.subscription.lastPayment = new Date();
            await clinic.save();
          }
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Falha no pagamento:', failedInvoice.id);
        
        // Atualizar status da assinatura
        if (failedInvoice.subscription) {
          const clinic = await Clinic.findOne({
            'subscription.stripeSubscriptionId': failedInvoice.subscription
          });
          if (clinic) {
            clinic.subscription.status = 'past_due';
            await clinic.save();
          }
        }
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        console.log('Assinatura cancelada:', subscription.id);
        
        // Atualizar status da clínica
        const clinic = await Clinic.findOne({
          'subscription.stripeSubscriptionId': subscription.id
        });
        if (clinic) {
          clinic.subscription.status = 'cancelled';
          clinic.subscription.cancelledAt = new Date();
          await clinic.save();
        }
        break;

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar recibo do pagamento
// @route   GET /api/payments/:id/receipt
// @access  Private
const getPaymentReceipt = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Pagamento não foi confirmado' });
    }

    const receipt = {
      id: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      created: new Date(paymentIntent.created * 1000),
      metadata: paymentIntent.metadata
    };

    res.json({
      success: true,
      data: receipt
    });
  } catch (error) {
    console.error('Erro ao buscar recibo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPaymentIntent,
  confirmPayment,
  handleWebhook,
  getPaymentReceipt
}; 