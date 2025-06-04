// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/libs'],
  testMatch: ['**/__tests__/**/*.test.ts']
};
