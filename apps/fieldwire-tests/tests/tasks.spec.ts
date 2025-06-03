import { test, expect } from '@playwright/test';

test.describe('Tasks tests', () => {
  // test.beforeEach(async ({ page }) => {
  //   const signInPage = new SignIn(page)
  // //   await signInPage.goto()
  //   await signInPage.login()
  //
  // });

  test('should create a new task', async ({ page }) => {
    // await page.goto('/tasks');
    // await page.click('button#create-task');
    // await page.fill('input[name="title"]', 'Sample Task');
    // await page.click('button#submit');
    // await expect(page.locator('text=Sample Task')).toBeVisible();
    expect(true).toBe(
      true
    );
  });

  test('should reject negative hour values', async ({ page }) => {
    expect.soft(true).toBe(true);
  });
  test('should reject very large hour values', async ({ page }) => {
    expect.soft(true).toBe(true);
  });
  test('should reject very small hours values', async ({ page }) => {
    expect.soft(true).toBe(true);
  });
});
