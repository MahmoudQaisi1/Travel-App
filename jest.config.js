// jest.config.js
module.exports = {
    projects: [
      {
        displayName: 'jsdom-tests',
        testEnvironment: 'jsdom',
        testMatch: ['<rootDir>/src/tests/client/**/*.test.js'], 
      },
      {
        displayName: 'node-tests',
        testEnvironment: 'node',
        testMatch: ['<rootDir>/src/tests/server/**/*.test.js'], 
      },
    ],
  };
  