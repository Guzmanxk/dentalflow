import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaChartLine,
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle
} from 'react-icons/fa';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    monthlyAppointments: 0,
    revenue: 0
  });
  const [recentPatients, setRecentPatients] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      
      // Buscar estatísticas
      const statsResponse = await fetch('/api/clinics/stats', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data);
      }

      // Buscar pacientes recentes
      const patientsResponse = await fetch('/api/patients', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      if (patientsResponse.ok) {
        const patientsData = await patientsResponse.json();
        setRecentPatients(patientsData.data || []);
      }

      // Buscar agendamentos recentes
      const appointmentsResponse = await fetch('/api/appointments', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json();
        setRecentAppointments(appointmentsData.data || []);
      }

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPatient = () => {
    router.push('/patients/new');
  };

  const handleNewAppointment = () => {
    router.push('/appointments/new');
  };

  const handleSearchPatients = () => {
    router.push('/patients');
  };

  const handleViewPatient = (patientId) => {
    router.push(`/patients/${patientId}`);
  };

  const handleViewAppointment = (appointmentId) => {
    router.push(`/appointments/${appointmentId}`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - DentaFlow</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard
              </h1>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleNewAppointment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Novo Agendamento
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaUsers size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.patients}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <FaCalendarAlt size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Agendamentos Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.appointments}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FaChartLine size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Agendamentos do Mês</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.monthlyAppointments}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FaDollarSign size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Receita do Mês</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue)}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ações Rápidas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Ações Rápidas
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleNewPatient}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-center">
                    <FaUsers className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="font-medium text-gray-900">Novo Paciente</p>
                    <p className="text-sm text-gray-500">Cadastrar paciente</p>
                  </div>
                </button>

                <button
                  onClick={handleNewAppointment}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-center">
                    <FaCalendarAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="font-medium text-gray-900">Novo Agendamento</p>
                    <p className="text-sm text-gray-500">Marcar consulta</p>
                  </div>
                </button>

                <button
                  onClick={handleSearchPatients}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-center">
                    <FaSearch className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="font-medium text-gray-900">Buscar Pacientes</p>
                    <p className="text-sm text-gray-500">Gerenciar cadastros</p>
                  </div>
                </button>

                <button
                  onClick={() => router.push('/appointments')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-center">
                    <FaClock className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="font-medium text-gray-900">Ver Agendamentos</p>
                    <p className="text-sm text-gray-500">Gerenciar consultas</p>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Status da Assinatura */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Status da Assinatura
                </h2>
                <button
                  onClick={() => router.push('/subscription')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Gerenciar
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plano:</span>
                  <span className="text-sm font-medium text-gray-900">Básico</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Trial Ativo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dias restantes:</span>
                  <span className="text-sm font-medium text-gray-900">14 dias</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/subscription')}
                className="w-full mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Atualizar Plano
              </button>
            </motion.div>
          </div>

          {/* Pacientes Recentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Pacientes Recentes
              </h2>
              <button
                onClick={() => router.push('/patients')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver Todos
              </button>
            </div>

            <div className="space-y-3">
              {recentPatients.slice(0, 5).map((patient) => (
                <div
                  key={patient._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUsers className="text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.phone}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleViewPatient(patient._id)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                  >
                    <FaEye size={16} />
                  </button>
                </div>
              ))}
              
              {recentPatients.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Nenhum paciente cadastrado
                </p>
              )}
            </div>
          </motion.div>

          {/* Agendamentos Recentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Agendamentos de Hoje
              </h2>
              <button
                onClick={() => router.push('/appointments')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver Todos
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serviço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUsers className="text-blue-600 text-sm" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {appointment.patient?.name || 'Paciente'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.patient?.phone || ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{appointment.service}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{appointment.time}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewAppointment(appointment._id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <FaEye size={14} />
                        </button>
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          <FaCheckCircle size={14} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FaTimesCircle size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {recentAppointments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        Nenhum agendamento para hoje
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 