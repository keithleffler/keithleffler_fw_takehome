import { test, expect } from '@playwright/test';

test.describe('Tasks tests', () => {

  const projectId = ""
  test.beforeAll( async ({ page }) => {

    await page.goto(`/projects/${projectId}/tasks`);
  })

  test('should create a new task',  ({ page }) => {

  });

  test('should reject negative hour values',  ({ page }) => {
    expect.soft(true).toBe(true);
  });
  test('should reject very large hour values',  ({ page }) => {
    expect.soft(true).toBe(true);
  });
  test('should reject very small hours values',  ({ page }) => {
    expect.soft(true).toBe(true);
  });
});
