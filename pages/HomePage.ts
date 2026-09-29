import { type Locator, type Page } from '@playwright/test';

export class HomePage {

    readonly page: Page;

    readonly sortDropdown: Locator;
    readonly productLinks: Locator;
    readonly productPrices: Locator;

    readonly addToCartButton: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;


    constructor(page: Page) {

        this.page = page;

        // Home Page locators

        this.sortDropdown = page.getByTestId('sort');

        this.productLinks = page.locator('a.card');

        this.productPrices = page.locator('.card-footer');


        // Product Page locators

        this.addToCartButton = page.getByTestId('add-to-cart');


        // Shopping Cart locators

        this.cartBadge = page.getByTestId('cart-quantity');

        this.cartLink = page.getByTestId('nav-cart');

    }


    // Navigate to the Home Page

    async goto(): Promise<void> {

        await this.page.goto('https://practicesoftwaretesting.com/');

    }


    // Open a product by its name

    async openProduct(productName: string): Promise<void> {

    await this.productLinks
        .filter({
            has: this.page.getByTestId('product-name')
                .getByText(productName, { exact: true })
        })
        .click();

}


    // Add a product to the shopping cart

    // async addItemToCart(productName: string): Promise<void> {

    //     await this.goto();

    // await this.openProduct(productName);

    // await this.addToCartButton.click();

    // }

    async addItemToCart(productName: string): Promise<void> {

    // Navigate to the Home Page

    await this.goto();

    // Open the selected product

    await this.openProduct(productName);

    // Add the product to the cart

    await this.addToCartButton.click();

    // Wait until the Add to cart button becomes enabled again

    await this.addToCartButton.waitFor({
        state: 'visible'
    });

}

    // Remove a specific product from the shopping cart

async removeItemFromCart(productName: string): Promise<void> {

    await this.cartLink.click();

    const productRow = this.page
        .locator('tbody tr')
        .filter({ hasText: productName });

    await productRow
        .locator('a.btn-danger')
        .click();

}

}