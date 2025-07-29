module.exports = {
  // Diretórios de teste
  testMatch: [
    '<rootDir>/server/**/__tests__/**/*.js',
    '<rootDir>/server/**/*.test.js',
    '<rootDir>/client/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/client/**/*.test.{js,jsx,ts,tsx}'
  ],

  // Diretórios a serem ignorados
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/client/.next/',
    '<rootDir>/client/out/',
    '<rootDir>/build/',
    '<rootDir>/dist/'
  ],

  // Configurações do ambiente
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Transformações
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    }]
  },

  // Módulos
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/client/components/$1',
    '^@/pages/(.*)$': '<rootDir>/client/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/client/styles/$1',
    '^@/utils/(.*)$': '<rootDir>/client/utils/$1',
    '^@/hooks/(.*)$': '<rootDir>/client/hooks/$1',
    '^@/contexts/(.*)$': '<rootDir>/client/contexts/$1'
  },

  // Cobertura de código
  collectCoverageFrom: [
    'server/**/*.js',
    'client/**/*.{js,jsx,ts,tsx}',
    '!server/**/*.test.js',
    '!client/**/*.test.{js,jsx,ts,tsx}',
    '!server/node_modules/**',
    '!client/node_modules/**',
    '!server/coverage/**',
    '!client/coverage/**'
  ],

  // Configurações de cobertura
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Configurações de mock
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', '<rootDir>'],

  // Configurações de snapshot
  snapshotSerializers: ['jest-serializer-path'],

  // Configurações de timeout
  testTimeout: 10000,

  // Configurações de verbose
  verbose: true,

  // Configurações de setup
  setupFiles: ['<rootDir>/jest.setup.js'],

  // Configurações de globals
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/client/tsconfig.json'
    }
  },

  // Configurações de reporters
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true
      }
    ]
  ],

  // Configurações de watch
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  // Configurações de clearMocks
  clearMocks: true,

  // Configurações de restoreMocks
  restoreMocks: true,

  // Configurações de resetMocks
  resetMocks: true,

  // Configurações de resetModules
  resetModules: true,

  // Configurações de testSequencer
  testSequencer: '<rootDir>/jest.sequencer.js',

  // Configurações de projects
  projects: [
    {
      displayName: 'server',
      testMatch: ['<rootDir>/server/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/server/jest.setup.js']
    },
    {
      displayName: 'client',
      testMatch: ['<rootDir>/client/**/*.test.{js,jsx,ts,tsx}'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/client/jest.setup.js']
    }
  ]
}; 