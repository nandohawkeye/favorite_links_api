import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  forceExit: true,
  setupFiles: ['dotenv/config'],
  testEnvironmentOptions: {
    env: {
      NODE_ENV: 'test',
    },
  },
};

export default config;
