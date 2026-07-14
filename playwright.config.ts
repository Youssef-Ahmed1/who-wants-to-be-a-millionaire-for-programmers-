import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
 // globalSetup: require.resolve('./global-setup'),
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

   timeout: 60000, // 60 seconds
  expect: { timeout: 10000 },

  use: {
    baseURL: 'http://localhost:3000', // Your dev server
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] }, // For mobile testing
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },

});
