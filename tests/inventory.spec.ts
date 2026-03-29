import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testData } from '../data/testData';

test.describe('Inventory - SauceDemo', () => {
  test('agregar productos menores a 10 USD', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    const { username, password } = testData.users.valid;

    // Login
    await loginPage.goto();
    await loginPage.login(username, password);

    // Validar que cargó inventory
    await inventoryPage.isLoaded();

    // Ordenar por precio menor a mayor
    await inventoryPage.sortByLowestPrice();

    // Agregar productos menores a 10 USD
    await inventoryPage.addProductsCheaperThan(10);

    // Validar que se agregaron productos
    const count = await inventoryPage.getCartCount();

    expect(count).toBeGreaterThan(0);
  });
});