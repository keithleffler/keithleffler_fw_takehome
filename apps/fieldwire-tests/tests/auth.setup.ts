import { test as setup, expect} from '@playwright/test'
import path from 'path'
import {SignIn} from '@fieldwire/page-objects';

const authFile = path.join(__dirname, 'auth.json')

setup('authenticate',async ({page}) => {
  const signIn = new SignIn(page)
  await signIn.login()
  await page.waitForURL('**\/index\/projects')
  await page.context().storageState({path: authFile})
})
