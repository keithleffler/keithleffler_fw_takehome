import { Locator, Page } from '@playwright/test';

export class SignInPage {
  protected url = '/auth/sign_in';
  protected email: string;
  protected password: string;

  constructor(private page: Page) {
    this.email = process.env['FIELDWIRE_EMAIL'] as string;
    this.password = process.env['FIELDWIRE_PASSWORD'] as string;
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login() {
    await this.goto();
    await this.emailBox.fill(this.email);
    await this.continueButton.click();
    await this.passwordBox.fill(this.password);
    await this.signInButton.click();
    await this.page.waitForURL('**/index/projects')
  }

  private get continueButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  private get emailBox(): Locator {
    return this.page.getByRole('textbox', { name: 'Email address' });
  }

  private get passwordBox(): Locator {
    return this.page.getByRole('textbox', { name: 'password' });
  }

  private get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Log in' });
  }
}
