import Head from 'next/head';

export default function TestRoute() {
  return (
    <>
      <Head>
        <title>Teste de Rota - DentaFlow</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Rota de Teste Funcionando!
          </h1>
          <p className="text-gray-600">
            Se você está vendo esta página, o roteamento está funcionando corretamente.
          </p>
        </div>
      </div>
    </>
  );
} 