import { Page } from '@playwright/test';
import { WorkItem } from '../../../test-data/forms/daily_status/interfaces';

export class DailyStatusFormPO {
  constructor(private page: Page){}
  locators = {
    close:() => this.page.getByRole('dialog').locator('use').first()
  }

  fillWorkLogRow = async (page:Page,row:number, workItem:WorkItem) => {

    // click to add an item
    await page.getByRole('table').filter({ hasText: 'Trade Quantity Hours Work' }).getByRole('button').click()
    await page.getByText('— edit').first().click();

    // fill in the trade and advance to next field
    await page.getByPlaceholder(' ').fill(workItem.trade);
    await page.getByPlaceholder(' ').press('Tab');

    // fill in the hours if available and advance to next field
    if(workItem.hours) {
      await page.getByPlaceholder(' ').fill(workItem.hours.toString());
    }
    await page.getByPlaceholder(' ').press('Tab');

    // fill in the quantity if available and advance to next field
    if (workItem.quantity) {
      await page.getByPlaceholder(' ').fill(workItem.quantity.toString());
    }
    await page.getByPlaceholder(' ').press('Tab');

    // fill in the notes if available
    if (workItem.notes) {
      await page.getByRole('textbox', { name: 'Notes' }).fill(workItem.notes);
    }

  await page.getByRole('textbox', { name: 'Notes' }).press('Tab');
    }
}
