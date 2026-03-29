import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { testData } from '../data/testData';

test('validar productos agregados al carrito', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const { username, password } = testData.users.valid;

    // Login
    await loginPage.goto();
    await loginPage.login(username, password);

    // Inventory
    await inventoryPage.isLoaded();
    await inventoryPage.sortByLowestPrice();
    await inventoryPage.addProductsCheaperThan(10);

    // Ir al carrito
    await inventoryPage.goToCart();

    await cartPage.isLoaded();

    // Validar cantidad exacta
    const itemCount = await cartPage.getItemsCount();
    expect(itemCount).toBe(2);

    // Validar precios
    const prices = await cartPage.getPrices();

    expect(prices.length).toBe(2);

    await cartPage.removeFirstItem();

    expect(await cartPage.getItemsCount()).toBe(1);
    expect(await cartPage.getCartBadgeCount()).toBe(1);

    for (const price of prices) {
        expect(price).toBeLessThan(10);
    }
});