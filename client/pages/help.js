import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTooth, FaArrowLeft, FaSearch, FaBook, FaVideo, FaQuestionCircle } from 'react-icons/fa';

export default function Help() {
  return (
    <>
      <Head>
        <title>Central de Ajuda - DentaFlow</title>
        <meta name="description" content="Central de ajuda e suporte do DentaFlow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <FaArrowLeft className="w-4 h-4 text-neutral-600" />
                <span className="text-neutral-600">Voltar ao site</span>
              </Link>
              
              <Link href="/" className="flex items-center space-x-2">
                <FaTooth className="w-8 h-8 text-primary-600" />
                <span className="text-2xl font-bold text-gradient">DentaFlow</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Central de <span className="text-gradient">Ajuda</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Encontre respostas para suas dúvidas e aprenda a usar todas as 
                funcionalidades do DentaFlow.
              </p>
              
              {/* Busca */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Digite sua dúvida..."
                    className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categorias de Ajuda */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Como podemos ajudar?
              </h2>
              <p className="text-xl text-neutral-600">
                Escolha uma categoria para encontrar o que você precisa
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="card p-6 text-center hover:shadow-medium transition-shadow"
              >
                <div className="bg-primary-100 text-primary-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FaBook className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Primeiros Passos
                </h3>
                <p className="text-neutral-600 mb-4">
                  Guias para começar a usar o DentaFlow e configurar sua clínica.
                </p>
                <Link href="/help/getting-started" className="text-primary-600 hover:text-primary-700 font-medium">
                  Ver guias →
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-6 text-center hover:shadow-medium transition-shadow"
              >
                <div className="bg-secondary-100 text-secondary-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FaVideo className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Vídeos Tutoriais
                </h3>
                <p className="text-neutral-600 mb-4">
                  Aprenda com vídeos explicativos de todas as funcionalidades.
                </p>
                <Link href="/help/tutorials" className="text-secondary-600 hover:text-secondary-700 font-medium">
                  Ver vídeos →
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="card p-6 text-center hover:shadow-medium transition-shadow"
              >
                <div className="bg-accent-100 text-accent-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FaQuestionCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  FAQ
                </h3>
                <p className="text-neutral-600 mb-4">
                  Respostas para as perguntas mais frequentes dos usuários.
                </p>
                <Link href="/help/faq" className="text-accent-600 hover:text-accent-700 font-medium">
                  Ver FAQ →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Artigos Populares */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Artigos Populares
              </h2>
              <p className="text-xl text-neutral-600">
                Os tópicos mais consultados pelos usuários
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Como criar meu primeiro agendamento?
                </h3>
                <p className="text-neutral-600 mb-4">
                  Aprenda o passo a passo para criar agendamentos no DentaFlow.
                </p>
                <Link href="/help/first-appointment" className="text-primary-600 hover:text-primary-700 font-medium">
                  Ler artigo →
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Configurando especialidades da clínica
                </h3>
                <p className="text-neutral-600 mb-4">
                  Saiba como configurar as especialidades odontológicas da sua clínica.
                </p>
                <Link href="/help/specialties" className="text-primary-600 hover:text-primary-700 font-medium">
                  Ler artigo →
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Importando dados de pacientes
                </h3>
                <p className="text-neutral-600 mb-4">
                  Guia completo para importar sua base de pacientes existente.
                </p>
                <Link href="/help/import-patients" className="text-primary-600 hover:text-primary-700 font-medium">
                  Ler artigo →
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Configurando lembretes automáticos
                </h3>
                <p className="text-neutral-600 mb-4">
                  Configure lembretes por email e WhatsApp para seus pacientes.
                </p>
                <Link href="/help/reminders" className="text-primary-600 hover:text-primary-700 font-medium">
                  Ler artigo →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section className="section-padding bg-gradient-primary">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Não encontrou o que procurava?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-secondary btn-lg">
                  Entrar em Contato
                </Link>
                <Link href="/register" className="btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary-600">
                  Começar Teste Grátis
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
} 