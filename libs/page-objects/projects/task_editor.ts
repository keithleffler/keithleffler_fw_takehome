import { Page } from '@playwright/test';
export class TaskEditor {
  protected url: string
  constructor(private page: Page,private baseUrl:string,private projectId:string) {
    this.url = `${baseUrl}/projects/${projectId}/tasks`
  }

  // method to update a task title.
  updateTitle = async(currentTitle:string, newTitle:string) => {
    await this.page.getByText(`${currentTitle} edit`).click()
    await this.page.locator('textarea[name="taskName"]').fill(newTitle)
    await this.page.getByRole('button',{name:'Submit'}).click()
  }

  // locator for the "button" to close the task editor
  get closeEditorLocator() {return this.page.getByRole('dialog').getByText('×')}

  // locators for task attribute locators
  get attributesLocator() {return {
    status:() => this.page.getByRole('heading',{"name":'Status'}),
    category:() => this.page.getByRole('heading',{"name":'Category'}),
    assignee:() => this.page.getByRole('heading',{"name":'Assignee'}),
    plan:() => this.page.getByRole('heading',{"name":'Plan'}),
    location:() => this.page.getByRole('heading',{"name":'Location'}),
    start_date:() => this.page.getByRole('heading',{"name":'Start date'}),
    end_date:() => this.page.getByRole('heading',{"name":'End date'}),
    manpower:() => this.page.getByRole('heading',{"name":'Manpower'}),
    cost:()=> this.page.getByRole('heading',{"name":'Cost'}),
    tags:() => this.page.getByRole('heading',{"name":'Tags'}),
    watchers:() => this.page.getByRole('heading',{"name":'Watchers'}),
  }}
}
