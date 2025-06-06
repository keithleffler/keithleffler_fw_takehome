import { Page } from '@playwright/test';

export class DailyStatusForm {
  constructor(private page: Page){}
  locators = {
    close:() => this.page.getByRole('dialog').locator('use').first()
  }
}
