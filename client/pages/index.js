import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaTooth, 
  FaCalendarAlt, 
  FaUsers, 
  FaChartLine, 
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaPlay,
  FaShieldAlt,
  FaMobileAlt,
  FaCloud,
  FaHeadset,
  FaTimes
} from 'react-icons/fa';

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      title: "Agendamento Inteligente",
      description: "Sistema de agendamento automático com confirmações e lembretes personalizados."
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Gestão de Pacientes",
      description: "Prontuário digital completo com histórico médico e odontológico."
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Relatórios Avançados",
      description: "Dashboards com métricas de performance e relatórios detalhados."
    },
    {
      icon: <FaMobileAlt className="w-6 h-6" />,
      title: "Aplicativo Mobile",
      description: "Acesso completo via smartphone para você e seus pacientes."
    },
    {
      icon: <FaCloud className="w-6 h-6" />,
      title: "Backup Automático",
      description: "Seus dados sempre seguros com backup em nuvem 24/7."
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: "Suporte Especializado",
      description: "Equipe técnica especializada em odontologia para você."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Carlos Silva",
      clinic: "Clínica Sorriso Perfeito",
      rating: 5,
      text: "O DentaFlow revolucionou nossa clínica. Agendamentos organizados e pacientes mais satisfeitos."
    },
    {
      name: "Dra. Ana Costa",
      clinic: "Dental Care Center",
      rating: 5,
      text: "Interface intuitiva e funcionalidades que realmente fazem a diferença no dia a dia."
    },
    {
      name: "Dr. Roberto Santos",
      clinic: "Clínica Odontológica Santos",
      rating: 5,
      text: "Melhor investimento que fizemos. ROI positivo em apenas 3 meses de uso."
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$ 97",
      period: "/mês",
      description: "Ideal para clínicas iniciantes",
      features: [
        "Até 500 pacientes",
        "Agendamento básico",
        "Prontuário digital",
        "Relatórios básicos",
        "Suporte por email",
        "Backup automático"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 197",
      period: "/mês",
      description: "Para clínicas em crescimento",
      features: [
        "Pacientes ilimitados",
        "Agendamento avançado",
        "Prontuário completo",
        "Relatórios avançados",
        "Suporte prioritário",
        "Integração com WhatsApp",
        "App mobile personalizado",
        "Múltiplas especialidades"
      ],
      popular: true
    }
  ];

  return (
    <>
      <Head>
        <title>DentaFlow - Sistema de Gestão para Clínicas Odontológicas</title>
        <meta name="description" content="Sistema completo de gestão para clínicas odontológicas. Agendamento, prontuário digital, relatórios e muito mais." />
        <meta name="keywords" content="odontologia, gestão clínica, agendamento, prontuário digital, clínica odontológica" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <FaTooth className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-gradient">DentaFlow</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-600 hover:text-primary-600 transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-neutral-600 hover:text-primary-600 transition-colors">Planos</a>
              <a href="#testimonials" className="text-neutral-600 hover:text-primary-600 transition-colors">Depoimentos</a>
              <Link href="/login" className="btn-outline">Entrar</Link>
              <Link href="/register" className="btn-primary">Começar Grátis</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Transforme sua
                <span className="text-gradient block">Clínica Odontológica</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Sistema completo de gestão que automatiza processos, organiza agendamentos 
                e aumenta a satisfação dos seus pacientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="btn-primary btn-lg">
                  Começar Teste Grátis
                  <FaArrowRight className="ml-2" />
                </Link>
                <button 
                  onClick={() => setShowDemo(true)}
                  className="btn-outline btn-lg"
                >
                  <FaPlay className="mr-2" />
                  Ver Demo
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-neutral-600">
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary-500 mr-2" />
                  Teste grátis por 14 dias
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary-500 mr-2" />
                  Sem cartão de crédito
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary-500 mr-2" />
                  Cancelamento gratuito
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-large p-8">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white mb-6">
                  <h3 className="text-xl font-semibold mb-2">Dashboard DentaFlow</h3>
                  <p className="text-primary-100">Visão geral da sua clínica</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">Consultas Hoje</span>
                    <span className="text-primary-600 font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">Pacientes Ativos</span>
                    <span className="text-secondary-600 font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">Faturamento Mensal</span>
                    <span className="text-accent-600 font-bold">R$ 45.2k</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Tudo que sua clínica precisa
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Funcionalidades desenvolvidas especificamente para o mercado odontológico, 
              pensadas para otimizar seu fluxo de trabalho.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-medium transition-shadow duration-300"
              >
                <div className="text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-neutral-600">
              Clínicas que já transformaram seus processos com o DentaFlow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-accent-500 w-4 h-4" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.clinic}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Planos que cabem no seu bolso
            </h2>
            <p className="text-xl text-neutral-600">
              Escolha o plano ideal para o tamanho da sua clínica
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary-500 shadow-glow' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-neutral-900">{plan.price}</span>
                    <span className="text-neutral-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-neutral-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <FaCheckCircle className="text-secondary-500 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/register?plan=${plan.name.toLowerCase()}`}
                  className={`btn w-full btn-lg ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                >
                  {plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Pronto para transformar sua clínica?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de clínicas que já otimizaram seus processos 
              com o DentaFlow. Comece seu teste grátis hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-secondary btn-lg">
                Começar Teste Grátis
                <FaArrowRight className="ml-2" />
              </Link>
              <Link href="/contact" className="btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary-600">
                Falar com Vendas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaTooth className="w-6 h-6 text-primary-400" />
                <span className="text-xl font-bold">DentaFlow</span>
              </div>
              <p className="text-neutral-400 mb-4">
                Transformando a gestão odontológica com tecnologia moderna e inovação.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Planos</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Integrações</a></li>
                <li><a href="/docs/api" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="/help" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="/about" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="/press" className="hover:text-white transition-colors">Imprensa</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 DentaFlow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Demonstração */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-neutral-900">Demonstração do DentaFlow</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-neutral-900 mb-4">Funcionalidades Principais</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <FaCalendarAlt className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-neutral-900">Agendamento Inteligente</h5>
                        <p className="text-sm text-neutral-600">Sistema automático com confirmações e lembretes</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FaUsers className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-neutral-900">Gestão de Pacientes</h5>
                        <p className="text-sm text-neutral-600">Prontuário digital completo com histórico</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FaChartLine className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-neutral-900">Relatórios Avançados</h5>
                        <p className="text-sm text-neutral-600">Dashboards com métricas de performance</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FaMobileAlt className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-neutral-900">App Mobile</h5>
                        <p className="text-sm text-neutral-600">Acesso completo via smartphone</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-neutral-900 mb-4">Dashboard Interativo</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium">Consultas Hoje</span>
                      <span className="text-primary-600 font-bold">8</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium">Pacientes Ativos</span>
                      <span className="text-secondary-600 font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium">Faturamento Mensal</span>
                      <span className="text-accent-600 font-bold">R$ 45.2k</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium">Taxa de Ocupação</span>
                      <span className="text-green-600 font-bold">87%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-neutral-600 mb-4">
                  Veja como o DentaFlow pode transformar sua clínica odontológica
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/register"
                    onClick={() => setShowDemo(false)}
                    className="btn-primary"
                  >
                    Começar Teste Grátis
                    <FaArrowRight className="ml-2" />
                  </Link>
                  <button
                    onClick={() => setShowDemo(false)}
                    className="btn-outline"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 