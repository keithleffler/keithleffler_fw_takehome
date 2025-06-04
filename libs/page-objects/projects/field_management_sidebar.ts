import {Page} from '@playwright/test';
export class FieldManagementSidebar {
  constructor(private page: Page, private projectId:string) {
  }
  get tasksLink() {return null}
  get formsLink() {return null}
}
