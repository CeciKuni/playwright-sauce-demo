import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly summaryContainer: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.summaryContainer = page.locator('[data-test="checkout-summary-container"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async isLoaded() {
    await this.summaryContainer.waitFor({ state: 'visible' });
  }

  async getItemTotal(): Promise<number> {
    const text = await this.itemTotalLabel.textContent();
    return Number(text?.replace('Item total: $', '').trim());
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    return Number(text?.replace('Tax: $', '').trim());
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    return Number(text?.replace('Total: $', '').trim());
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}