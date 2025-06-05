import {Page} from '@playwright/test';

export class TaskPage {
  constructor(private page: Page, private projectId:string) {
  }
  goto = async () => {
    const url = `/projects/${this.projectId}/tasks`;
    await this.page.goto(url);
  }
}
