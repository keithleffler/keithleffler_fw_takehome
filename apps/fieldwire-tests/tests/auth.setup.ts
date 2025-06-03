import { test as setup} from '@playwright/test'
import path from 'path'
import {SignInPage} from '@fieldwire/page-objects';

const authFile = path.join(__dirname, '../../../playwright/.auth/user.json')

setup('authenticate',async ({page}) => {
  const signIn = new SignInPage(page)
  await signIn.login()
  await page.waitForURL('**\/index\/projects')
  await page.context().storageState({path: authFile})
})
