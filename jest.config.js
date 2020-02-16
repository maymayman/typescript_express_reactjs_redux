module.exports = {
    roots: [
      "<rootDir>"
    ],
    testMatch: [
      '<rootDir>/__tests__/**/test.controllers/**/*.(spec|test).ts',
      '<rootDir>/__tests__/**/?(*.)(spec|test).ts'
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'
    ],
    coverageThreshold: {
      global: {
        branches: 60,
        functions: 60,
        lines: 60,
        statements: 60
      }
    }
  }
