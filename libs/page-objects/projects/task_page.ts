import { Locator, Page } from '@playwright/test';
import { TaskEditor } from './task_editor';

export class TaskPage {
  constructor(private page: Page, private projectId:string) {
  }

  createNewTask = async (name:string) => {
    await this.goto()
    await this.newTaskButton.click();
    const taskEditor = new TaskEditor(this.page);
    await taskEditor.closeEditor.click();

  }
  goto = async () => {
    const url = `/projects/${this.projectId}/tasks`;
    await this.page.goto(url);
  }

  get newTaskButton(): Locator {
    return this.page.getByRole('button', { name: 'New task' });
  }
}
