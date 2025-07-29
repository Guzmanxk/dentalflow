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
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaIdCard,
  FaNotesMedical,
  FaHistory,
  FaPlus
} from 'react-icons/fa';

export default function PatientDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchPatientDetails();
      fetchPatientAppointments();
    }
  }, [id]);

  const fetchPatientDetails = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch(`/api/patients/${id}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPatient(data.data);
      } else {
        setError('Erro ao carregar dados do paciente');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientAppointments = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch(`/api/patients/${id}/appointments`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  const handleEdit = () => {
    router.push(`/patients/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este paciente?')) return;

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('dentaflow_token');
      const response = await fetch(`/api/patients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        alert('Paciente excluído com sucesso!');
        router.push('/patients');
      } else {
        alert('Erro ao excluir paciente');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
    }
  };

  const handleNewAppointment = () => {
    router.push(`/appointments/new?patientId=${id}`);
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

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Paciente não encontrado</p>
          <button
            onClick={() => router.push('/patients')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar para Pacientes
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Detalhes do Paciente - DentaFlow</title>
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
                  Detalhes do Paciente
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações do Paciente */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informações Pessoais
                  </h2>
                  <button
                    onClick={handleNewAppointment}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Novo Agendamento
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Nome</p>
                        <p className="font-medium">{patient.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{patient.email || 'Não informado'}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Telefone</p>
                        <p className="font-medium">{patient.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaIdCard className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">CPF</p>
                        <p className="font-medium">{patient.cpf}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Data de Nascimento</p>
                        <p className="font-medium">
                          {patient.birthDate ? new Date(patient.birthDate).toLocaleDateString('pt-BR') : 'Não informado'}
                        </p>
                      </div>
                    </div>

                    {patient.address && (
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gray-400 mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Endereço</p>
                          <p className="font-medium">
                            {patient.address.street}, {patient.address.number}
                            {patient.address.complement && ` - ${patient.address.complement}`}
                            <br />
                            {patient.address.neighborhood && `${patient.address.neighborhood}, `}
                            {patient.address.city} - {patient.address.state}
                            {patient.address.zipCode && ` (${patient.address.zipCode})`}
                          </p>
                        </div>
                      </div>
                    )}

                    {patient.emergencyContact && (
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Contato de Emergência</p>
                          <p className="font-medium">
                            {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                            <br />
                            <span className="text-sm text-gray-600">{patient.emergencyContact.phone}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {patient.notes && (
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <FaNotesMedical className="text-gray-400 mr-2" />
                      <p className="text-sm font-medium text-gray-700">Observações</p>
                    </div>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                      {patient.notes}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Agendamentos Recentes */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Agendamentos Recentes
                  </h3>
                  <FaHistory className="text-gray-400" />
                </div>

                {appointments.length > 0 ? (
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map((appointment) => (
                      <div
                        key={appointment._id}
                        className="border-l-4 border-blue-500 pl-4 py-2"
                      >
                        <p className="font-medium text-sm">{appointment.service}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Confirmado' :
                           appointment.status === 'pending' ? 'Pendente' :
                           appointment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Nenhum agendamento encontrado</p>
                )}

                <button
                  onClick={() => router.push(`/patients/${id}/appointments`)}
                  className="mt-4 w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Ver Todos os Agendamentos
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 