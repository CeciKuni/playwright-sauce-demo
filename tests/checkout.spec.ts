import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../data/testData';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test.describe('Checkout - SauceDemo', () => {
  test('completar checkout exitosamente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    const { username, password } = testData.users.valid;
    const { firstName, lastName, postalCode } = testData.checkout.valid;

    await loginPage.goto();
    await loginPage.login(username, password);

    await inventoryPage.isLoaded();
    await inventoryPage.sortByLowestPrice();
    await inventoryPage.addProductsCheaperThan(10);
    await inventoryPage.goToCart();

    await cartPage.isLoaded();
    expect(await cartPage.getItemsCount()).toBe(2);

    await cartPage.removeFirstItem();
    expect(await cartPage.getItemsCount()).toBe(1);

    await cartPage.goToCheckout();

    await checkoutPage.fillInformation(firstName, lastName, postalCode);
    await checkoutPage.continueCheckout();

    await checkoutOverviewPage.isLoaded();

    const itemTotal = await checkoutOverviewPage.getItemTotal();
    const tax = await checkoutOverviewPage.getTax();
    const total = await checkoutOverviewPage.getTotal();

    expect(total).toBeCloseTo(itemTotal + tax, 2);

    await checkoutOverviewPage.finishCheckout();

    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await expect(page.locator('[data-test="complete-header"]')).toContainText(
      'Thank you for your order!'
    );
  });

  test('checkout sin código postal muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const { username, password } = testData.users.valid;
    const { firstName, lastName, postalCode } =
      testData.checkout.withoutPostalCode;

    await loginPage.goto();
    await loginPage.login(username, password);

    await inventoryPage.isLoaded();
    await inventoryPage.sortByLowestPrice();
    await inventoryPage.addProductsCheaperThan(10);
    await inventoryPage.goToCart();

    await cartPage.isLoaded();
    await cartPage.goToCheckout();

    await checkoutPage.fillInformation(firstName, lastName, postalCode);
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(
      'Postal Code is required'
    );
  });
});