export default {
  bail: 1,
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest/setupEnvVars.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest/waitForDatabaseConnection.ts'],
};
