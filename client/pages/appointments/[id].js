import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function AppointmentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchAppointmentDetails();
    }
  }, [id]);

  const fetchAppointmentDetails = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch(`/api/appointments/${id}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointment(data.data);
      } else {
        setError('Erro ao carregar dados do agendamento');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/appointments/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        alert('Agendamento excluído com sucesso!');
        router.push('/appointments');
      } else {
        alert('Erro ao excluir agendamento');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
    }
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ status: 'confirmed' })
      });

      if (response.ok) {
        alert('Agendamento confirmado com sucesso!');
        fetchAppointmentDetails(); // Recarregar dados
      } else {
        alert('Erro ao confirmar agendamento');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
    }
  };

  const handleCancel = async () => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (response.ok) {
        alert('Agendamento cancelado com sucesso!');
        fetchAppointmentDetails(); // Recarregar dados
      } else {
        alert('Erro ao cancelar agendamento');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
    }
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-600" />;
      case 'pending':
        return <FaExclamationTriangle className="text-yellow-600" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaExclamationTriangle className="text-gray-600" />;
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Agendamento não encontrado</p>
          <button
            onClick={() => router.push('/appointments')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar para Agendamentos
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Detalhes do Agendamento - DentaFlow</title>
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
                  Detalhes do Agendamento
                </h1>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                >
                  <FaTrash className="mr-2" />
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações do Agendamento */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informações do Agendamento
                  </h2>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(appointment.status)}
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Data</p>
                        <p className="font-medium">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaClock className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Horário</p>
                        <p className="font-medium">{appointment.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Serviço</p>
                        <p className="font-medium">{appointment.service}</p>
                      </div>
                    </div>

                    {appointment.duration && (
                      <div className="flex items-center">
                        <FaClock className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Duração</p>
                          <p className="font-medium">{appointment.duration} minutos</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {appointment.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Observações</p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                          {appointment.notes}
                        </p>
                      </div>
                    )}

                    {appointment.price && (
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-green-600">
                          R$ {appointment.price.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex space-x-3">
                    {appointment.status === 'pending' && (
                      <>
                        <button
                          onClick={handleConfirm}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                        >
                          <FaCheckCircle className="mr-2" />
                          Confirmar
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                        >
                          <FaTimesCircle className="mr-2" />
                          Cancelar
                        </button>
                      </>
                    )}
                    
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                      >
                        <FaTimesCircle className="mr-2" />
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Informações do Paciente */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informações do Paciente
                </h3>

                {appointment.patient ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{appointment.patient.name}</p>
                        <p className="text-sm text-gray-500">{appointment.patient.email}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaPhone className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.patient.phone}</span>
                      </div>

                      {appointment.patient.address && (
                        <div className="flex items-start">
                          <FaEnvelope className="text-gray-400 mr-2 mt-1" />
                          <span className="text-sm text-gray-600">
                            {appointment.patient.address.street}, {appointment.patient.address.number}
                            <br />
                            {appointment.patient.address.city} - {appointment.patient.address.state}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => router.push(`/patients/${appointment.patient._id}`)}
                      className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    >
                      Ver Perfil Completo
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Paciente não encontrado</p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 