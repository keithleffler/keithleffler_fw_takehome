import { test, expect } from '@playwright/test';
import { login } from '@fieldwire/helpers';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('should create a new task', async ({ page }) => {
  await page.goto('/tasks');
  await page.click('button#create-task');
  await page.fill('input[name="title"]', 'Sample Task');
  await page.click('button#submit');
  await expect(page.locator('text=Sample Task')).toBeVisible();
});
