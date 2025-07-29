#!/bin/bash

# DentaFlow - Script de Instalação
echo "🦷 DentaFlow - Instalação Automatizada"
echo "======================================"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 16+ primeiro."
    echo "📥 Download: https://nodejs.org/"
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js versão 16+ é necessário. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado"
    exit 1
fi

echo "✅ npm $(npm -v) encontrado"

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
npm install

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd client
npm install
cd ..

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp env.example .env
    echo "⚠️  IMPORTANTE: Configure as variáveis de ambiente no arquivo .env"
    echo "   - MONGODB_URI: URL do seu banco MongoDB"
    echo "   - JWT_SECRET: Chave secreta para JWT"
    echo "   - STRIPE_SECRET_KEY: Chave do Stripe (opcional para testes)"
fi

# Verificar se MongoDB está rodando (opcional)
echo "🔍 Verificando conexão com MongoDB..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        echo "✅ MongoDB está rodando"
    else
        echo "⚠️  MongoDB não está rodando. Inicie o MongoDB antes de usar o sistema."
    fi
else
    echo "⚠️  MongoDB não encontrado. Instale o MongoDB para usar o sistema."
fi

echo ""
echo "🎉 Instalação concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis de ambiente no arquivo .env"
echo "2. Inicie o MongoDB (se não estiver rodando)"
echo "3. Execute: npm run dev"
echo "4. Acesse: http://localhost:3000"
echo ""
echo "📚 Documentação: README.md"
echo "🐛 Problemas? Verifique os logs e a documentação" 