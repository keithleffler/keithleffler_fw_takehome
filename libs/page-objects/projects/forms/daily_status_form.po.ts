import { Page } from '@playwright/test';

export class DailyStatusFormPO {
  constructor(private page: Page){}
  locators = {
    close:() => this.page.getByRole('dialog').locator('use').first()
  }
}
