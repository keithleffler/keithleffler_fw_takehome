import { test, expect } from '@playwright/test';
import { DailyStatusForm, FormsPage } from '@fieldwire/page-objects';
import { UrlData, urlData } from '@fieldwire/helpers';
import {format} from 'date-fns';

test.describe('Forms tests', () => {
  let testData: UrlData | undefined = undefined;
  test.beforeEach(async ({ page }, testInfo) => {
    testData = await urlData(testInfo);
    const formsPage = new FormsPage(page, testData.projectId);
    await formsPage.goto();
  });

  test('should submit a new daily report form', async ({
    page,
  }) => {
    // create FormsPage page object instance
    const formName = 'Daily Report'

    const formsPage = new FormsPage(page,(testData as UrlData).projectId)
    const dailyStatusForm = new DailyStatusForm(page)
    // click on "Daily report in template list"
    await formsPage.locators.templateWithName(formName).click();

    // click on "New Form";
    await formsPage.locators.newFormButton().click();

    // click on the textbox in the modal window
    await formsPage.locators.editFormName().click()

    // fill new report name
    const formattedDate = format(new Date(), 'yyyy-MM-dd:HH:mm:ss')
    await formsPage.locators.editFormName().fill(`${formName} ${formattedDate}`)

    // click on "Create form"
    await formsPage.locators.createFormButton().click()


    // expect to be on the projects/<projectId>/forms/<formId> page
    const formsPageUrl = /projects\/.*\/forms\/.*/
    await expect(page).toHaveURL(formsPageUrl)
    // close the form
    await dailyStatusForm.locators.close().click()

    // expect to be back on projects/<projectId>/forms/templates/<templateId> page
    const templatesPageUrl = /projects\/.*\/forms\/templates\/.*/
    await expect(page).toHaveURL(templatesPageUrl)
  });
});
