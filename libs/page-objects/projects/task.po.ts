import { Locator, Page } from '@playwright/test';
import { TaskEditorPO } from './task_editor.po';

export class TaskPO {
  private newTaskName = 'Enter title'
  constructor(private page: Page, private baseUrl:string,private projectId:string) {
  }

  // method to create a new task with "name" as the title
  createNewTask = async (name:string) => {
    await this.goto()
    await this.locators.newTaskButton().click();
    await this.page.waitForURL(`**/projects/${this.projectId}/tasks/*`)

    const taskEditor = new TaskEditorPO(this.page,this.baseUrl,this.projectId);
    await taskEditor.updateTitle(this.newTaskName,name)
    await taskEditor.locators.closeEditor().click();

  }

  goto = async () => {
    const url = `/projects/${this.projectId}/tasks`;
    await this.page.goto(url);
  }

  locators = {
    newTaskButton:(): Locator =>
       this.page.getByRole('button', { name: 'New task' })
  }

}
