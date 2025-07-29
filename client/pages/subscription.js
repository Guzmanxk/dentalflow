import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  FaCrown, 
  FaCheck, 
  FaTimes, 
  FaCreditCard,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaArrowLeft
} from 'react-icons/fa';

export default function Subscription() {
  const router = useRouter();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch('/api/subscription', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscription(data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar assinatura:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradePlan = async (plan) => {
    setUpgrading(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch('/api/subscription/plan', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ plan })
      });

      if (response.ok) {
        alert('Plano atualizado com sucesso!');
        fetchSubscription();
      } else {
        alert('Erro ao atualizar plano');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
    } finally {
      setUpgrading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Tem certeza que deseja cancelar sua assinatura?')) return;

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch('/api/subscription/cancel', {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        alert('Assinatura cancelada com sucesso!');
        fetchSubscription();
      } else {
        alert('Erro ao cancelar assinatura');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
    }
  };

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 'R$ 99/mês',
      features: [
        'Até 100 pacientes',
        'Agendamentos ilimitados',
        'Relatórios básicos',
        'Suporte por email'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 199/mês',
      features: [
        'Pacientes ilimitados',
        'Agendamentos ilimitados',
        'Relatórios avançados',
        'Suporte prioritário',
        'Integração com WhatsApp',
        'Backup automático'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'R$ 399/mês',
      features: [
        'Tudo do Premium',
        'Múltiplas clínicas',
        'API personalizada',
        'Suporte 24/7',
        'Treinamento incluído',
        'Personalização completa'
      ],
      popular: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Assinatura - DentaFlow</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="mr-4 p-2 text-gray-600 hover:text-gray-900"
                >
                  <FaArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gerenciar Assinatura
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Status da Assinatura */}
          {subscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6 mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Status da Assinatura
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Plano atual: <span className="font-medium capitalize">{subscription.plan}</span>
                  </p>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                    subscription.status === 'trial' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {subscription.status === 'active' ? 'Ativo' :
                     subscription.status === 'trial' ? 'Trial' :
                     'Cancelado'}
                  </span>
                </div>
              </div>

              {subscription.status === 'trial' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center">
                    <FaExclamationTriangle className="text-yellow-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        Trial ativo - {subscription.daysLeft} dias restantes
                      </p>
                      <p className="text-sm text-yellow-700">
                        Atualize para um plano pago para continuar usando o DentaFlow
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {subscription.status === 'cancelled' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center">
                    <FaTimes className="text-red-600 mr-2" />
                    <p className="text-sm text-red-800">
                      Sua assinatura foi cancelada. Reative para continuar usando o DentaFlow.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Planos Disponíveis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-lg shadow-lg p-6 ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-4">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgradePlan(plan.id)}
                  disabled={upgrading || subscription?.plan === plan.id}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    subscription?.plan === plan.id
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {upgrading ? 'Atualizando...' :
                   subscription?.plan === plan.id ? 'Plano Atual' :
                   'Escolher Plano'}
                </button>
              </div>
            ))}
          </motion.div>

          {/* Ações */}
          {subscription && subscription.status !== 'cancelled' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ações da Assinatura
              </h3>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleCancelSubscription}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                >
                  <FaTimes className="mr-2" />
                  Cancelar Assinatura
                </button>
                
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Voltar ao Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
} 