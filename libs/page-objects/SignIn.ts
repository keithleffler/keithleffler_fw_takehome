import { Locator, Page } from '@playwright/test';

export class SignIn {
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
  }

  private get continueButton(): Locator {
    const locator =  this.page.getByRole('button', { name: 'Continue' });
    return locator;
  }

  private get emailBox(): Locator {
    const locator = this.page.getByRole('textbox', { name: 'Email address' });
    return locator;
  }

  private get passwordBox(): Locator {
    const locator =  this.page.getByRole('textbox', { name: 'password' });
    return locator
  }

  private get signInButton(): Locator {
    const locator =  this.page.getByRole('button', { name: 'Log in' });
    return locator
  }


}
