import { Page } from '@playwright/test';

export class FormsPO {
  constructor(
    private page: Page,
    private projectId: string,
  ) {}

  get url() {
    return `/projects/${this.projectId}/forms`;
  }

  goto = async () => {
    await this.page.goto(this.url);
  };

  locators = {
    createFormButton: () =>
      this.page.getByRole('button', { name: 'Create form' }),
    editFormName: () =>
      this.page.getByRole('textbox', { name: 'Enter form name' }),
    formsDropdownItem: (name: string) =>
      this.page.getByRole('listitem', { name: name }).locator('a'),
    newFormButton: () => this.page.getByRole('button', { name: 'New form' }),
    templateWithName: (name: string) => this.page.getByText(name),
  };
}
