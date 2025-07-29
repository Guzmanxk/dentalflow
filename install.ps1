# DentaFlow - Script de Instalacao para Windows
Write-Host "🦷 DentaFlow - Instalacao Automatizada" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Verificar se Node.js esta instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js nao encontrado. Por favor, instale o Node.js 16+ primeiro." -ForegroundColor Red
    Write-Host "📥 Download: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar se npm esta instalado
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ npm nao encontrado" -ForegroundColor Red
    exit 1
}

# Instalar dependencias do backend
Write-Host "📦 Instalando dependencias do backend..." -ForegroundColor Yellow
npm install

# Instalar dependencias do frontend
Write-Host "📦 Instalando dependencias do frontend..." -ForegroundColor Yellow
Set-Location client
npm install
Set-Location ..

# Criar arquivo .env se nao existir
if (-not (Test-Path ".env")) {
    Write-Host "📝 Criando arquivo .env..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "⚠️  IMPORTANTE: Configure as variaveis de ambiente no arquivo .env" -ForegroundColor Yellow
    Write-Host "   - MONGODB_URI: URL do seu banco MongoDB" -ForegroundColor White
    Write-Host "   - JWT_SECRET: Chave secreta para JWT" -ForegroundColor White
    Write-Host "   - STRIPE_SECRET_KEY: Chave do Stripe (opcional para testes)" -ForegroundColor White
}

# Verificar se MongoDB esta rodando (opcional)
Write-Host "🔍 Verificando conexao com MongoDB..." -ForegroundColor Yellow
try {
    $mongoResult = mongosh --eval "db.runCommand('ping')" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB esta rodando" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB nao esta rodando. Inicie o MongoDB antes de usar o sistema." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  MongoDB nao encontrado. Instale o MongoDB para usar o sistema." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Instalacao concluida!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Proximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure as variaveis de ambiente no arquivo .env" -ForegroundColor White
Write-Host "2. Inicie o MongoDB (se nao estiver rodando)" -ForegroundColor White
Write-Host "3. Execute: npm run dev" -ForegroundColor White
Write-Host "4. Acesse: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentacao: README.md" -ForegroundColor Cyan
Write-Host "🐛 Problemas? Verifique os logs e a documentacao" -ForegroundColor Yellow 