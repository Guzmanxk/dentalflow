import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTooth, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contato - DentaFlow</title>
        <meta name="description" content="Entre em contato com a equipe DentaFlow" />
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
                Entre em <span className="text-gradient">Contato</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Estamos aqui para ajudar sua clínica a crescer. Entre em contato 
                conosco e descubra como o DentaFlow pode transformar seus processos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Informações de Contato */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-8">
                  Vamos Conversar
                </h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Nossa equipe está pronta para ajudar você a encontrar a melhor 
                  solução para sua clínica odontológica.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                      <FaEnvelope className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                      <p className="text-neutral-600">contato@dentaflow.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary-100 text-secondary-600 p-3 rounded-lg">
                      <FaPhone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Telefone</h3>
                      <p className="text-neutral-600">(11) 99999-9999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent-100 text-accent-600 p-3 rounded-lg">
                      <FaMapMarkerAlt className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Endereço</h3>
                      <p className="text-neutral-600">São Paulo, SP - Brasil</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-neutral-100 text-neutral-600 p-3 rounded-lg">
                      <FaClock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Horário de Atendimento</h3>
                      <p className="text-neutral-600">Segunda a Sexta: 8h às 18h</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  Envie uma Mensagem
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Nome</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="input"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="input"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Assunto</label>
                    <select className="input">
                      <option>Selecione um assunto</option>
                      <option>Demonstração</option>
                      <option>Suporte Técnico</option>
                      <option>Comercial</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Mensagem</label>
                    <textarea
                      rows="4"
                      className="input"
                      placeholder="Conte-nos como podemos ajudar..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary w-full btn-lg">
                    Enviar Mensagem
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-xl text-neutral-600">
                Respostas para as dúvidas mais comuns
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Como funciona o teste grátis?
                </h3>
                <p className="text-neutral-600">
                  Oferecemos 14 dias de teste gratuito sem compromisso. Você pode testar 
                  todas as funcionalidades e cancelar a qualquer momento.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Vocês oferecem suporte técnico?
                </h3>
                <p className="text-neutral-600">
                  Sim! Nossa equipe de suporte está disponível por email e telefone 
                  para ajudar com qualquer dúvida ou problema.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Posso migrar meus dados de outro sistema?
                </h3>
                <p className="text-neutral-600">
                  Claro! Nossa equipe pode ajudar você a migrar dados de outros 
                  sistemas para o DentaFlow de forma segura e rápida.
                </p>
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
                Pronto para começar?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Comece seu teste grátis hoje mesmo e veja como o DentaFlow 
                pode transformar sua clínica.
              </p>
              <Link href="/register" className="btn-secondary btn-lg">
                Começar Teste Grátis
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
} 