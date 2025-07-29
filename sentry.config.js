const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  // Suas configurações do Next.js aqui
  reactStrictMode: true,
  swcMinify: true,
};

const sentryWebpackPluginOptions = {
  // Configurações do Sentry
  silent: true, // Suprime logs do build
  org: "dentaflow",
  project: "dentaflow-frontend",
  
  // Configurações de upload de source maps
  url: process.env.SENTRY_URL,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  
  // Configurações de telemetria
  telemetry: false,
  
  // Configurações de debug
  debug: false,
  
  // Configurações de upload
  include: '.',
  ignore: ['node_modules', 'next.config.js'],
  
  // Configurações de source maps
  sourcemaps: {
    include: ['./client/.next/static'],
    ignore: ['node_modules'],
    urlPrefix: '~/_next',
  },
  
  // Configurações de releases
  release: {
    name: process.env.npm_package_version,
  },
  
  // Configurações de environment
  environment: process.env.NODE_ENV,
  
  // Configurações de performance
  tracesSampleRate: 1.0,
  
  // Configurações de profiling
  profilesSampleRate: 1.0,
};

module.exports = withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions,
  {
    // Configurações adicionais do Sentry
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
  }
); 