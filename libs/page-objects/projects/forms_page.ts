import {Page} from '@playwright/test';

export class FormsPage {
  constructor(private page: Page, private projectId:string) {}
  goto = async () => {
    const url = `/projects/${this.projectId}/forms`;
    await this.page.goto(url);
  }
}
