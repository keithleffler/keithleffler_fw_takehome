import {Page} from '@playwright/test';
export class TasksSidebar {
  constructor(private page: Page, private projectId:string) {
  }
  get myTasksLink() {return null}
  get watchedTasksLink() {return null}
  get allTasksLink() {return null}
}
