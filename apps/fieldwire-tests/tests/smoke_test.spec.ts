import { test, expect } from '@playwright/test';
import { ProjectsPage } from '@fieldwire/page-objects';

test.describe.configure({ mode: 'parallel' });


test.describe('Responsive smoke test', () => {

  // define multiple viewport sizes to test with a browser
  const viewports = [
    { name: 'Desktop', options: { width: 1280, height: 800 } },
    { name: 'Tablet', options: { width: 834, height: 1112 } }, // iPad Pro
    { name: 'Mobile', options: { width: 390, height: 844 } }   // iPhone 12
  ];

  // loop through the viewports
  for (const { name, options } of viewports) {
    test(`${name} viewport loads projects page`, async ({ page},testInfo ) => {

      // skip this test if the project is not a web browser
      if (testInfo.project.name !== 'chromium') { //  TODO: replace the hard-coded 'chromium' with a more flexible solution
        test.skip()
      }
      // setup step: set the viewport size
      await test.step(`Set viewport: ${name}`, async () => {
        await page.setViewportSize(options);
      });

      // Create a new ProjectsPage page object
      const projectsPage = new ProjectsPage(page);

      // Goto the project page This uses a pre-configured project, with project name defined in the .env variables
      await projectsPage.goto();

      // Confirm the New Project button is visible,
      await expect(projectsPage.locators.newProjectButton()).toBeVisible();
    });
  }
});
