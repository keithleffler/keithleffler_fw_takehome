import { test, expect } from '@playwright/test';
import { FormsPage } from '@fieldwire/page-objects';
import { ProjectApi } from '@fieldwire/api';
import { shortUUID, UrlData, urlData } from '@fieldwire/helpers';

test.describe('Forms tests', () => {
  let testData: UrlData | undefined = undefined;
  test.beforeEach(async ({ page }, testInfo) => {
    testData = await urlData(testInfo);
    const formsPage = new FormsPage(page, testData.projectId);
    await formsPage.goto();
  });

  test('should submit an existing  form successfully', async ({
    page,
  }, testInfo) => {
    // create FormsPage page object instance
    const formsPage = new FormsPage(page,(testData as UrlData).projectId)

    // click on "New Form"
    await formsPage.newFormButtonLoc.click();

    // click fill "Enter form name" name
    await formsPage.editFormNameLoc.click()
    await formsPage.editFormNameLoc.click(`Daily report ${shortUUID()}`) // todo : datetime would be better, UUID ensures uniqueness for testing

    // click on "Create form"
    await formsPage.createFormButtonLoc.click()

    // expect new form to be created
  });
});
