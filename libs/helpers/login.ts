import { Page } from '@playwright/test';

export async function login(page: Page) {
  const email = process.env['FIELDWIRE_EMAIL'];
  const password = process.env['FIELDWIRE_PASSWORD'];

  if (!email || !password) {
    throw new Error('Environment variables FIELDWIRE_EMAIL and FIELDWIRE_PASSWORD must be set');
  }

  await page.goto('/');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
}
