import { test, expect } from '@playwright/test';
import { login } from '@fieldwire/helpers';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('should submit a form successfully', async ({ page }) => {
  await page.goto('/forms');
  await page.click('button#new-form');
  await page.fill('input[name="formName"]', 'Test Form');
  await page.click('button#submit-form');
  await expect(page.locator('text=Test Form')).toBeVisible();
});
