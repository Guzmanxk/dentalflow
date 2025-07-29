# 🦷 DentaFlow - SaaS para Clínicas Odontológicas

Sistema completo de gestão para clínicas odontológicas com agendamento, gestão de pacientes, planos de assinatura e integração com Stripe.

## ✨ Funcionalidades

- **Gestão de Clínicas**: Cadastro e configuração de clínicas
- **Agendamento Inteligente**: Calendário integrado com notificações
- **Gestão de Pacientes**: Histórico completo e prontuário digital
- **Planos de Assinatura**: Básico e Premium com Stripe
- **Dashboard Moderno**: Interface intuitiva e responsiva
- **Landing Page Profissional**: Design elegante para conversão

## 🚀 Tecnologias

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Stripe Integration
- Nodemailer

### Frontend
- React (Next.js)
- Tailwind CSS
- React Hook Form
- React Query
- Framer Motion

## 📦 Instalação

### Pré-requisitos
- Node.js 16+
- MongoDB
- Conta Stripe (para pagamentos)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/dentaflow.git
cd dentaflow
```

### 2. Instale as dependências
```bash
npm run install-all
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/dentaflow

# JWT
JWT_SECRET=sua_chave_secreta_aqui

# Stripe
STRIPE_SECRET_KEY=sk_test_sua_chave_stripe
STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_stripe

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app
```

### 4. Inicie o desenvolvimento
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:5000` e o cliente em `http://localhost:3000`

## 🧪 Testando Funcionalidades

### 1. Configuração Inicial
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/dentaflow.git
cd dentaflow

# Instale as dependências
npm run install-all

# Configure as variáveis de ambiente
cp env.example .env
# Edite o arquivo .env com suas configurações
```

### 2. Iniciar o Sistema
```bash
# Desenvolvimento (backend + frontend)
npm run dev

# Ou separadamente:
npm run server  # Backend na porta 5000
npm run client  # Frontend na porta 3000
```

### 3. Testando as Funcionalidades

#### Cadastro de Clínica
- Acesse `http://localhost:3000/register`
- Preencha os dados da clínica
- Escolha especialidades
- Registre a clínica

#### Login e Dashboard
- Acesse `http://localhost:3000/login`
- Faça login com as credenciais criadas
- Visualize o dashboard em `/dashboard`

#### Gestão de Pacientes
- Use o botão "Novo Paciente" no dashboard
- Adicione informações do paciente
- Visualize lista de pacientes

#### Agendamentos
- Use o botão "Novo Agendamento" no dashboard
- Selecione paciente, data e horário
- Confirme o agendamento

#### API Endpoints Testados
```bash
# Health check
curl http://localhost:5000/api/health

# Registro de clínica
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Clínica Teste","email":"teste@clinica.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@clinica.com","password":"123456"}'
```

### 4. Estrutura de Dados

#### Clínica (Exemplo)
```json
{
  "name": "Clínica Odontológica Exemplo",
  "email": "contato@clinica.com",
  "phone": "(11) 99999-9999",
  "cnpj": "12.345.678/0001-90",
  "address": {
    "street": "Rua das Flores, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  },
  "specialties": ["Clínica Geral", "Ortodontia"],
  "subscription": {
    "plan": "basic",
    "status": "trial",
    "trialEnd": "2024-02-15T00:00:00.000Z"
  }
}
```

#### Paciente (Exemplo)
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 88888-8888",
  "birthDate": "1990-05-15",
  "address": {
    "street": "Rua das Palmeiras, 456",
    "city": "São Paulo",
    "state": "SP"
  },
  "medicalHistory": "Alergia a penicilina",
  "emergencyContact": {
    "name": "Maria Silva",
    "phone": "(11) 77777-7777",
    "relationship": "Esposa"
  }
}
```

#### Agendamento (Exemplo)
```json
{
  "patientId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "date": "2024-01-20T10:00:00.000Z",
  "time": "10:00",
  "service": "Consulta de Rotina",
  "notes": "Paciente com dor de dente",
  "status": "pending"
}
```

## 📁 Estrutura do Projeto

```
dentaflow/
├── server/                 # Backend Node.js
│   ├── controllers/       # Controladores da API
│   ├── models/           # Modelos MongoDB
│   ├── routes/           # Rotas da API
│   ├── middleware/       # Middlewares
│   └── utils/            # Utilitários
├── client/               # Frontend React
│   ├── components/       # Componentes React
│   ├── pages/           # Páginas Next.js
│   ├── hooks/           # Custom hooks
│   └── styles/          # Estilos Tailwind
├── public/              # Arquivos estáticos
└── docs/               # Documentação
```

## 🔧 Scripts Disponíveis

- `npm run dev`: Inicia desenvolvimento (backend + frontend)
- `npm run server`: Apenas servidor backend
- `npm run client`: Apenas cliente frontend
- `npm run build`: Build de produção
- `npm start`: Inicia servidor de produção

## 🎨 Design System

### Cores Principais
- **Azul Médico**: `#2563eb` (Primary)
- **Verde Saúde**: `#10b981` (Success)
- **Laranja Atenção**: `#f59e0b` (Warning)
- **Vermelho Alerta**: `#ef4444` (Error)

### Tipografia
- **Títulos**: Inter Bold
- **Corpo**: Inter Regular
- **Interface**: Inter Medium

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Segurança

- Autenticação JWT
- Rate limiting
- Validação de dados
- Sanitização de inputs
- HTTPS em produção

## 📈 Monitoramento

- Logs estruturados
- Métricas de performance
- Error tracking
- Analytics de uso

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- Email: suporte@dentaflow.com
- Documentação: docs.dentaflow.com
- Status: status.dentaflow.com

---

**DentaFlow** - Transformando a gestão odontológica com tecnologia moderna e inovação. 