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
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  }
