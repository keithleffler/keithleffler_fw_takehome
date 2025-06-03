import { test, expect } from '@playwright/test';
import { login } from '@fieldwire/helpers';

test.describe.configure({ mode: 'parallel' });

test.describe('Responsive smoke test', () => {
  const viewports = [
    { name: 'Desktop', options: { width: 1280, height: 800 } },
    { name: 'Tablet', options: { width: 834, height: 1112 } }, // iPad Pro
    { name: 'Mobile', options: { width: 390, height: 844 } }   // iPhone 12
  ];

  for (const { name, options } of viewports) {
    test(`${name} viewport loads dashboard`, async ({ page }) => {
      await test.step(`Set viewport: ${name}`, async () => {
        await page.setViewportSize(options);
      });

      await login(page);
      await page.goto('/dashboard');

      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible(); // adjust if not applicable in all sizes
    });
  }
});
