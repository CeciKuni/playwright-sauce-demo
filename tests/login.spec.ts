import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/testData';

test.describe('Login - SauceDemo', () => {
  test('login exitoso', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      testData.users.valid.username,
      testData.users.valid.password
    );

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('login con contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      testData.users.invalid.username,
      testData.users.invalid.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );
  });

  test('login con usuario bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      testData.users.locked.username,
      testData.users.locked.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out'
    );
  });
});