import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function DebugRoutes() {
  const router = useRouter();

  const testRoutes = [
    { path: '/patients/new', name: 'Novo Paciente' },
    { path: '/appointments/new', name: 'Novo Agendamento' },
    { path: '/patients', name: 'Lista de Pacientes' },
    { path: '/appointments', name: 'Lista de Agendamentos' },
    { path: '/test-route', name: 'Rota de Teste' },
  ];

  return (
    <>
      <Head>
        <title>Debug de Rotas - DentaFlow</title>
      </Head>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Debug de Rotas
          </h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Testando Rotas
            </h2>
            
            <div className="space-y-4">
              {testRoutes.map((route) => (
                <div key={route.path} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{route.name}</h3>
                    <p className="text-sm text-gray-600">{route.path}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={route.path}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Testar Link
                    </Link>
                    <button
                      onClick={() => router.push(route.path)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Testar Router
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Informações de Debug:</h3>
              <p className="text-sm text-gray-600">
                Rota atual: {router.asPath}
              </p>
              <p className="text-sm text-gray-600">
                Query: {JSON.stringify(router.query)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 