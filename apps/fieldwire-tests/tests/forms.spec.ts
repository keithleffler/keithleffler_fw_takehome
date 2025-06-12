import { test, expect, Page } from '@playwright/test';
import { DailyStatusFormPO, FormsPO } from '@fieldwire/page-objects';
import { getProjectId } from '@fieldwire/helpers';
import {format} from 'date-fns';
import {workLogLarge} from '@fieldwire/test-data'

const createDailyStatusForm = async (page:Page,projectId:string):Promise<DailyStatusFormPO> => {
  const formName = 'Daily Report'

  const formsPage = new FormsPO(page,projectId)
  const dailyStatusForm = new DailyStatusFormPO(page)
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
  return dailyStatusForm;
}
test.describe('Forms tests', () => {
  let projectId = "";
  test.beforeEach(async ({ page }, testInfo) => {
    projectId = await getProjectId(testInfo);
    const formsPage = new FormsPO(page,projectId);
    await formsPage.goto();
  });

  test('should submit a new daily report form', async ({
    page,
  }) => {
    // create FormsPage page object instance
    const dailyStatusForm =await createDailyStatusForm(page,projectId)
    
    // expect to be on the projects/<projectId>/forms/<formId> page
    const formsPageUrl = /projects\/.*\/forms\/.*/
    await expect(page).toHaveURL(formsPageUrl)
    // close the form
    await dailyStatusForm.locators.close().click()

    // expect to be back on projects/<projectId>/forms/templates/<templateId> page
    const templatesPageUrl = /projects\/.*\/forms\/templates\/.*/
    await expect(page).toHaveURL(templatesPageUrl)
  });

  test('it should fill multiple worklog entries',async ({page}) => {

    test.slow()
    const formName = 'Daily Report'

    const dailyStatusForm =await createDailyStatusForm(page,projectId)

    await page.getByRole('table').filter({ hasText: 'Trade Quantity Hours Work' }).getByRole('button').click();

    let index=0
    for(const workItem of workLogLarge) {
      await dailyStatusForm.fillWorkLogRow(page,++index,workItem)
    }
    await dailyStatusForm.locators.close().click()

    // TODO: verify the form data has been saved, preferably with an API call.


  })
});

