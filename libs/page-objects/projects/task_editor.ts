import { Page } from '@playwright/test';
export class TaskEditor {
  constructor(private page: Page) {
  }
  goto = async (taskId:string) => {
  }

  get titleEditor() {return ""}
  get addNewTask() {return ""}
  get addExistingTask() {return ""}
  get createCheckItem() {return ""}
  get addChecklist() {return ""}

  get closeEditor() {return this.page.locator('.close-modal')}
  get attributes() {return {
    status:() => this.page.getByText('Status'),
    category:() => this.page.getByText('Category'),
    assignee:() => this.page.getByText('Assignee'),
    plan:() => this.page.getByText('Plan  '),
    location:() => this.page.getByText('Location'),
    start_date:() => this.page.getByText('Start date'),
    end_date:() => this.page.getByText('End date'),
    manpower:() => this.page.getByText('Manpower'),
    cost:()=> this.page.getByText('Cost'),
    tags:() => this.page.getByText('Tags'),
    watchers:() => this.page.getByText('Watchers'),
  }}
}
