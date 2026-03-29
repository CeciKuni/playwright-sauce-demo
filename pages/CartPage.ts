import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async isLoaded() {
        await this.cartItems.first().waitFor({ state: 'visible' });
    }

    async getItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getPrices(): Promise<number[]> {
        const prices: number[] = [];
        const count = await this.cartItems.count();

        for (let i = 0; i < count; i++) {
            const priceText = await this.cartItems
                .nth(i)
                .locator('.inventory_item_price')
                .textContent();

            prices.push(Number(priceText?.replace('$', '').trim()));
        }

        return prices;
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async removeFirstItem() {
        await this.cartItems.first().locator('button').click();
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');

        if (await badge.count() === 0) {
            return 0;
        }

        const text = await badge.textContent();
        return Number(text);
    }
}