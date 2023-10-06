module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFiles: ['./jest-config/jest-modules-mock.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!@react-navigation/bottom-tabs)/'],
  transform: {
      '^.+\\.svg$': 'jest-transformer-svg',
      '^.+\\.(ts|tsx)?$': [
          'ts-jest',
          {
              tsconfig: 'tsconfig.test.json',
          },
      ],
  },
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!**/node_modules/**',
      '!src/**/*TestIds.{ts,tsx}',
      '!src/**/*.mock.*',
      '!src/**/unitTests.utils.ts',
  ],
  coverageProvider: 'v8',
};
