import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly cartBadge: Locator;
  readonly cartButton: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');

    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
  }

  async isLoaded() {
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }

  async sortByLowestPrice() {
    await this.sortDropdown.selectOption('lohi');
  }

  async addProductsCheaperThan(maxPrice: number) {
    const items = this.page.locator('.inventory_item');
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);

      const priceText = await item
        .locator('.inventory_item_price')
        .textContent();

      const price = Number(priceText?.replace('$', '').trim());

      if (price < maxPrice) {
        await item.locator('[data-test^="add-to-cart"]').click();
      } else {
        break; // porque ya ordenamos por precio
      }
    }
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return Number(text);
  }

  async goToCart() {
    await this.cartButton.click();
  }

}