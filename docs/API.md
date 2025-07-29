# 🦷 DentaFlow API Documentation

## 📋 Visão Geral

A API do DentaFlow é uma API RESTful desenvolvida em Node.js com Express e MongoDB. Ela fornece endpoints para gerenciar clínicas odontológicas, pacientes, agendamentos e pagamentos.

## 🔗 Base URL

```
Development: http://localhost:5000/api
Production: https://api.dentaflow.com/api
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header de todas as requisições autenticadas:

```
Authorization: Bearer <seu_token_jwt>
```

## 📊 Status Codes

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autorizado
- `403` - Proibido
- `404` - Não encontrado
- `500` - Erro interno do servidor

## 🚀 Endpoints

### Autenticação

#### POST /auth/register
Registra uma nova clínica.

**Request Body:**
```json
{
  "name": "Clínica Sorriso Perfeito",
  "email": "contato@clinica.com",
  "password": "senha123",
  "phone": "(11) 99999-9999",
  "address": {
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Sala 45",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  },
  "cnpj": "12.345.678/0001-90",
  "cro": "12345",
  "specialties": ["Ortodontia", "Endodontia"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Clínica registrada com sucesso",
  "token": "jwt_token_aqui",
  "clinic": {
    "id": "clinic_id",
    "name": "Clínica Sorriso Perfeito",
    "email": "contato@clinica.com",
    // ... outros campos
  }
}
```

#### POST /auth/login
Faz login da clínica.

**Request Body:**
```json
{
  "email": "contato@clinica.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "jwt_token_aqui",
  "clinic": {
    "id": "clinic_id",
    "name": "Clínica Sorriso Perfeito",
    // ... outros campos
  }
}
```

#### GET /auth/profile
Obtém o perfil da clínica logada.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "clinic": {
    "id": "clinic_id",
    "name": "Clínica Sorriso Perfeito",
    "email": "contato@clinica.com",
    // ... outros campos
  }
}
```

#### PUT /auth/profile
Atualiza o perfil da clínica.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Nova Clínica",
  "phone": "(11) 88888-8888",
  "address": {
    "street": "Nova Rua",
    "number": "456",
    "city": "São Paulo",
    "state": "SP"
  }
}
```

### Pacientes

#### GET /patients
Lista todos os pacientes da clínica.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number): Página atual (default: 1)
- `limit` (number): Itens por página (default: 10)
- `search` (string): Termo de busca
- `status` (string): Filtro por status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "patient_id",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999",
      "cpf": "123.456.789-00",
      "birthDate": "1990-01-01T00:00:00.000Z",
      "status": "Ativo",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### POST /patients
Cria um novo paciente.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "(11) 88888-8888",
  "cpf": "987.654.321-00",
  "birthDate": "1985-05-15",
  "address": {
    "street": "Rua das Palmeiras",
    "number": "789",
    "neighborhood": "Jardim",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "04567-890"
  },
  "emergencyContact": {
    "name": "João Santos",
    "relationship": "Esposo",
    "phone": "(11) 77777-7777"
  }
}
```

#### GET /patients/:id
Obtém detalhes de um paciente específico.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "patient": {
    "id": "patient_id",
    "name": "Maria Santos",
    "email": "maria@email.com",
    "phone": "(11) 88888-8888",
    "cpf": "987.654.321-00",
    "birthDate": "1985-05-15T00:00:00.000Z",
    "age": 38,
    "address": {
      "street": "Rua das Palmeiras",
      "number": "789",
      "neighborhood": "Jardim",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "04567-890"
    },
    "emergencyContact": {
      "name": "João Santos",
      "relationship": "Esposo",
      "phone": "(11) 77777-7777"
    },
    "medicalHistory": {
      "allergies": ["Penicilina"],
      "medications": ["Vitamina D"],
      "conditions": ["Hipertensão"],
      "surgeries": ["Apendicite - 2010"]
    },
    "dentalHistory": {
      "lastVisit": "2024-01-15T00:00:00.000Z",
      "oralHygiene": "Boa",
      "smoking": false,
      "alcohol": false
    },
    "status": "Ativo",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Agendamentos

#### GET /appointments
Lista todos os agendamentos da clínica.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number): Página atual
- `limit` (number): Itens por página
- `date` (string): Filtro por data (YYYY-MM-DD)
- `status` (string): Filtro por status
- `patientId` (string): Filtro por paciente

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "appointment_id",
      "patient": {
        "id": "patient_id",
        "name": "Maria Santos"
      },
      "date": "2024-02-15T00:00:00.000Z",
      "startTime": "14:00",
      "endTime": "15:00",
      "duration": 60,
      "type": "Consulta Inicial",
      "status": "Agendado",
      "confirmed": false,
      "notes": "Primeira consulta"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### POST /appointments
Cria um novo agendamento.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "patientId": "patient_id",
  "date": "2024-02-20",
  "startTime": "14:00",
  "endTime": "15:00",
  "type": "Consulta Inicial",
  "notes": "Primeira consulta do paciente"
}
```

#### PUT /appointments/:id
Atualiza um agendamento.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "date": "2024-02-21",
  "startTime": "15:00",
  "endTime": "16:00",
  "status": "Confirmado",
  "notes": "Consulta reagendada"
}
```

#### DELETE /appointments/:id
Cancela um agendamento.

**Headers:**
```
Authorization: Bearer <token>
```

### Pagamentos

#### POST /payments/create-subscription
Cria uma nova assinatura.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "plan": "premium",
  "paymentMethodId": "pm_card_visa"
}
```

#### GET /payments/subscription
Obtém informações da assinatura atual.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "subscription": {
    "plan": "premium",
    "status": "active",
    "currentPeriodStart": "2024-01-01T00:00:00.000Z",
    "currentPeriodEnd": "2024-02-01T00:00:00.000Z",
    "trialEnd": null
  }
}
```

## 🔧 Middlewares

### Autenticação
```javascript
const auth = require('../middleware/auth');
app.use('/api/protected-route', auth);
```

### Validação
```javascript
const { body, validationResult } = require('express-validator');
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');
```

## 📝 Exemplos de Uso

### JavaScript (Fetch)
```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'contato@clinica.com',
    password: 'senha123'
  })
});

const data = await response.json();
const token = data.token;

// Criar paciente
const patientResponse = await fetch('/api/patients', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00'
  })
});
```

### cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"contato@clinica.com","password":"senha123"}'

# Criar paciente
curl -X POST http://localhost:5000/api/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"João Silva","email":"joao@email.com"}'
```

## 🚨 Tratamento de Erros

### Estrutura de Erro
```json
{
  "error": "Mensagem de erro",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ],
  "code": "VALIDATION_ERROR"
}
```

### Códigos de Erro
- `VALIDATION_ERROR` - Dados inválidos
- `AUTHENTICATION_ERROR` - Erro de autenticação
- `AUTHORIZATION_ERROR` - Erro de autorização
- `NOT_FOUND_ERROR` - Recurso não encontrado
- `INTERNAL_ERROR` - Erro interno do servidor

## 📊 Webhooks

### Stripe Webhooks
```
POST /api/webhooks/stripe
```

**Headers:**
```
Stripe-Signature: <signature>
```

## 🔒 Segurança

- JWT com expiração de 7 dias
- Rate limiting por IP
- Validação de dados com express-validator
- Sanitização de inputs
- Headers de segurança (Helmet)
- CORS configurado
- HTTPS em produção

## 📈 Monitoramento

- Logs estruturados
- Métricas de performance
- Health checks
- Error tracking

## 🆘 Suporte

- Email: api@dentaflow.com
- Documentação: docs.dentaflow.com
- Status: status.dentaflow.com 