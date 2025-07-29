import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTooth, FaArrowLeft, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Head>
        <title>Sobre - DentaFlow</title>
        <meta name="description" content="Conheça mais sobre o DentaFlow e nossa missão" />
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
                Sobre o <span className="text-gradient">DentaFlow</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Transformando a gestão odontológica com tecnologia inovadora e soluções 
                desenvolvidas especificamente para o mercado brasileiro.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Missão e Valores */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                  Nossa Missão
                </h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  Simplificar e otimizar a gestão de clínicas odontológicas através de 
                  tecnologia moderna, permitindo que profissionais se concentrem no que 
                  realmente importa: o cuidado com seus pacientes.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Acreditamos que toda clínica odontológica merece ter acesso a ferramentas 
                  profissionais que facilitem seu dia a dia e impulsionem seu crescimento.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Nossos Valores</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-600 text-white p-3 rounded-lg">
                      <FaUsers className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Foco no Cliente</h4>
                      <p className="text-neutral-600">Desenvolvemos soluções pensando sempre na experiência do usuário.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary-600 text-white p-3 rounded-lg">
                      <FaAward className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Excelência</h4>
                      <p className="text-neutral-600">Buscamos a excelência em tudo que fazemos.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent-600 text-white p-3 rounded-lg">
                      <FaGlobe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Inovação</h4>
                      <p className="text-neutral-600">Sempre buscando novas formas de melhorar nossos produtos.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Números que Inspiram
              </h2>
              <p className="text-xl text-neutral-600">
                O impacto do DentaFlow no mercado odontológico
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <p className="text-lg text-neutral-600">Clínicas Atendidas</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-secondary-600 mb-2">50k+</div>
                <p className="text-lg text-neutral-600">Pacientes Gerenciados</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent-600 mb-2">98%</div>
                <p className="text-lg text-neutral-600">Satisfação dos Clientes</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-primary">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Faça parte da transformação
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de clínicas que já transformaram seus processos 
                com o DentaFlow.
              </p>
              <Link href="/register" className="btn-secondary btn-lg">
                Começar Agora
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
} 