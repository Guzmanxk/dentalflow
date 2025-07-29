import { useState } from 'react';
import Head from 'next/head';

export default function ApiTest() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testPatient = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'João Silva',
          email: 'joao@teste.com',
          phone: '11999999999',
          cpf: '12345678901',
          birthDate: '1990-01-01'
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Teste de API - DentaFlow</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Teste de API
          </h1>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Testes de API
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={testHealth}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Testando...' : 'Testar Health Check'}
                </button>
                
                <button
                  onClick={testPatient}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 ml-4"
                >
                  {loading ? 'Testando...' : 'Testar Criação de Paciente'}
                </button>
              </div>
            </div>
            
            {result && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resultado:
                </h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 