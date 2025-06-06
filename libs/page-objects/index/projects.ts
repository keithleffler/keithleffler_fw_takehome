import { Page } from '@playwright/test';

export class ProjectsPage {
  protected url = '/index/projects';

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(this.url);
  }

  locators = {
    newProjectButton: () => {
      return this.page.getByTitle('New project');
    },
  };
}
