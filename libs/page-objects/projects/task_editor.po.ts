import { Locator, Page } from '@playwright/test';
export class TaskEditorPO {
  protected url: string
  constructor(private page: Page,private baseUrl:string,private projectId:string) {
    this.url = `${baseUrl}/projects/${projectId}/tasks`
  }

  goto = async (taskId:string  ) => {
    await this.page.goto(`${this.url}/${taskId}`);
  }

  setAttribute =async (locator:Locator, value:string) => {
    await locator.click()
    await this.locators.textBox().click()
    await this.locators.textBox().fill(value)
    await this.locators.submitButton().click()

  }
  updateTitle = async(currentTitle:string, newTitle:string) => {

    await this.page.getByText(`${currentTitle} edit`).click()
    await this.locators.taskName().fill(newTitle)
    await this.locators.submitButton().click()
  }

  // locators for task attribute locators
  locators =  {
    assignee:() => this.page.getByRole('heading',{"name":'Assignee'}),
    category:() => this.page.getByRole('heading',{"name":'Category'}),
    closeEditor:()=> {return this.page.getByRole('dialog').getByText('×')},
    cost:()=> this.page.getByRole('heading',{"name":'Cost'}),
    end_date:() => this.page.getByRole('heading',{"name":'End date'}),
    location:() => this.page.getByRole('heading',{"name":'Location'}),
    manpower:(text?:string) => this.page.getByRole('heading',{"name":'Manpower'}),
    plan:() => this.page.getByRole('heading',{"name":'Plan'}),
    submitButton:() => this.page.getByRole('button',{name:'Submit'}),
    start_date:() => this.page.getByRole('heading',{"name":'Start date'}),
    status:() => this.page.getByRole('heading',{"name":'Status'}),
    tags:() => this.page.getByRole('heading',{"name":'Tags'}),
    taskName:()=>this.page.locator('textarea[name="taskName"]'),
    watchers:() => this.page.getByRole('heading',{"name":'Watchers'}),

    divWithText:(text:RegExp,n:number) => this.page.locator('div').filter({ hasText: text }).nth(n),
    textBox:() => this.page.locator('input[name="default"]')


  }
}
