import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './apps/fieldwire-tests/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://staging.fieldwire.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'setup', testMatch: '**/setup/*setup.ts' },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'
      },
      dependencies:['setup']
    },
    // {
    //   name: 'Tablet (iPad)',
    //   use: {
    //     ...devices['iPad Pro 11'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies:['setup']
    // },
    // {
    //   name: 'Mobile (iPhone)',
    //   use: {
    //     ...devices['iPhone 12'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies:['setup']
    //
    // }
  ]
});
