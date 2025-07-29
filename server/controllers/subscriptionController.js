const Clinic = require('../models/Clinic');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Buscar todas as assinaturas
// @route   GET /api/subscriptions
// @access  Private
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Clinic.find({})
      .select('name email subscription')
      .sort({ 'subscription.createdAt': -1 });

    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Erro ao buscar assinaturas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Buscar assinatura por ID
// @route   GET /api/subscriptions/:id
// @access  Private
const getSubscriptionById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id)
      .select('name email subscription');

    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    res.json({
      success: true,
      data: clinic
    });
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Criar nova assinatura
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = async (req, res) => {
  try {
    const { clinicId, plan, stripeCustomerId } = req.body;

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    // Criar assinatura no Stripe
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: plan === 'premium' ? process.env.STRIPE_PREMIUM_PRICE_ID : process.env.STRIPE_BASIC_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Atualizar clínica
    clinic.subscription = {
      plan,
      status: 'active',
      stripeSubscriptionId: subscription.id,
      stripeCustomerId,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      createdAt: new Date()
    };

    await clinic.save();

    res.status(201).json({
      success: true,
      message: 'Assinatura criada com sucesso',
      data: {
        subscription: clinic.subscription,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret
      }
    });
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Atualizar assinatura
// @route   PUT /api/subscriptions/:id
// @access  Private
const updateSubscription = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    // Atualizar assinatura no Stripe
    if (clinic.subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(clinic.subscription.stripeSubscriptionId, {
        items: [{ price: req.body.plan === 'premium' ? process.env.STRIPE_PREMIUM_PRICE_ID : process.env.STRIPE_BASIC_PRICE_ID }]
      });
    }

    // Atualizar dados locais
    clinic.subscription.plan = req.body.plan;
    clinic.subscription.updatedAt = new Date();

    await clinic.save();

    res.json({
      success: true,
      message: 'Assinatura atualizada com sucesso',
      data: clinic.subscription
    });
  } catch (error) {
    console.error('Erro ao atualizar assinatura:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Cancelar assinatura
// @route   DELETE /api/subscriptions/:id
// @access  Private
const cancelSubscription = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    // Cancelar assinatura no Stripe
    if (clinic.subscription.stripeSubscriptionId) {
      await stripe.subscriptions.cancel(clinic.subscription.stripeSubscriptionId);
    }

    // Atualizar dados locais
    clinic.subscription.status = 'cancelled';
    clinic.subscription.cancelledAt = new Date();

    await clinic.save();

    res.json({
      success: true,
      message: 'Assinatura cancelada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Fazer upgrade da assinatura
// @route   POST /api/subscriptions/:id/upgrade
// @access  Private
const upgradeSubscription = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    if (clinic.subscription.plan === 'premium') {
      return res.status(400).json({ error: 'Clínica já possui plano premium' });
    }

    // Atualizar para premium
    if (clinic.subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(clinic.subscription.stripeSubscriptionId, {
        items: [{ price: process.env.STRIPE_PREMIUM_PRICE_ID }]
      });
    }

    clinic.subscription.plan = 'premium';
    clinic.subscription.updatedAt = new Date();

    await clinic.save();

    res.json({
      success: true,
      message: 'Upgrade realizado com sucesso',
      data: clinic.subscription
    });
  } catch (error) {
    console.error('Erro ao fazer upgrade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// @desc    Fazer downgrade da assinatura
// @route   POST /api/subscriptions/:id/downgrade
// @access  Private
const downgradeSubscription = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ error: 'Clínica não encontrada' });
    }

    if (clinic.subscription.plan === 'basic') {
      return res.status(400).json({ error: 'Clínica já possui plano básico' });
    }

    // Atualizar para básico
    if (clinic.subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(clinic.subscription.stripeSubscriptionId, {
        items: [{ price: process.env.STRIPE_BASIC_PRICE_ID }]
      });
    }

    clinic.subscription.plan = 'basic';
    clinic.subscription.updatedAt = new Date();

    await clinic.save();

    res.json({
      success: true,
      message: 'Downgrade realizado com sucesso',
      data: clinic.subscription
    });
  } catch (error) {
    console.error('Erro ao fazer downgrade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  upgradeSubscription,
  downgradeSubscription
}; 