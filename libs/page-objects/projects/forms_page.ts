import { Page } from '@playwright/test';

export class FormsPage {
  constructor(
    private page: Page,
    private projectId: string,
  ) {}

  goto = async () => {
    const url = `/projects/${this.projectId}/forms`;
    await this.page.goto(url);
  };
  get createFormButtonLoc() {
    return this.page.getByRole('button', { name: 'Create form' });
  }
  get editFormNameLoc() {
    return this.page.getByRole('textbox', { name: 'Enter form name' });
  }

  get newFormButtonLoc() {
    return this.page.getByRole('button', { name: 'New form' });
  }
}
