import { test, expect } from '@playwright/test';
import { ProjectsPage } from '@fieldwire/page-objects';

test.describe.configure({ mode: 'parallel' });

test.describe('Responsive smoke test', () => {
  const viewports = [
    { name: 'Desktop', options: { width: 1280, height: 800 } },
    { name: 'Tablet', options: { width: 834, height: 1112 } }, // iPad Pro
    { name: 'Mobile', options: { width: 390, height: 844 } }   // iPhone 12
  ];

  for (const { name, options } of viewports) {
    test(`${name} viewport loads projects page`, async ({ page }) => {

      await test.step(`Set viewport: ${name}`, async () => {
        await page.setViewportSize(options);
      });
      const projectsPage = new ProjectsPage(page);
      await projectsPage.goto();
      expect(projectsPage.newProjectButton).toBeVisible();
    });
  }
});
