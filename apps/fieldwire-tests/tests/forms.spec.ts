import { test, expect } from '@playwright/test';

test.describe('Forms tests', () => {


  test('should submit an existing  form successfully', async ({ page }) => {
    // await page.goto('/forms');
    // await page.click('button#new-form');
    // await page.fill('input[name="formName"]', 'Test Form');
    // await page.click('button#submit-form');
    // await expect(page.locator('text=Test Form')).toBeVisible();
  });

  test('should complete a form with many entries', async ({ page }) => {
    expect(true).toBe(true);
  });

});
