import { Locator, Page } from '@playwright/test';
import { TaskEditor } from './task_editor';

export class TaskPage {
  private newTaskName = 'Enter title'
  constructor(private page: Page, private baseUrl:string,private projectId:string) {
  }

  // method to create a new task with "name" as the title
  createNewTask = async (name:string) => {
    await this.goto()
    await this.newTaskButtonLocator.click();
    await this.page.waitForURL(`**/projects/${this.projectId}/tasks/*`)
    const taskEditor = new TaskEditor(this.page,this.baseUrl,this.projectId);
    await taskEditor.updateTitle(this.newTaskName,name)
    await taskEditor.closeEditorLocator.click();

  }

  goto = async () => {
    const url = `/projects/${this.projectId}/tasks`;
    await this.page.goto(url);
  }

  get newTaskButtonLocator(): Locator {
    return this.page.getByRole('button', { name: 'New task' });
  }
}
