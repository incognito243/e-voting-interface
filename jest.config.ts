// jest.config.js
module.exports = {
  preset: 'ts-jest/presets/default-esm', // now available in ts-jest v29+
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom'
};
