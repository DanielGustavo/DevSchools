export default {
  bail: 1,
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/jest/setupDatabaseTest.ts',
  setupFilesAfterEnv: ['<rootDir>/jest/waitForDatabaseConnection.ts'],
};
