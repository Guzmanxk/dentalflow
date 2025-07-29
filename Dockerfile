# ========================================
# DentaFlow - Dockerfile
# ========================================

# Estágio de build do frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/client

# Copiar package.json e instalar dependências
COPY client/package*.json ./
RUN npm ci --only=production

# Copiar código fonte
COPY client/ ./

# Build do frontend
RUN npm run build

# Estágio de build do backend
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fonte do backend
COPY server/ ./server/
COPY env.example ./

# Estágio de produção
FROM node:18-alpine AS production

# Instalar dependências do sistema
RUN apk add --no-cache dumb-init

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S dentaflow -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências e código do backend
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=backend-builder /app/server ./server
COPY --from=backend-builder /app/env.example ./env.example

# Copiar build do frontend
COPY --from=frontend-builder /app/client/.next ./client/.next
COPY --from=frontend-builder /app/client/public ./client/public
COPY --from=frontend-builder /app/client/package.json ./client/package.json

# Criar diretórios necessários
RUN mkdir -p uploads logs && chown -R dentaflow:nodejs /app

# Mudar para usuário não-root
USER dentaflow

# Expor porta
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando de inicialização
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"] 