import { test, expect } from '@playwright/test';

test('TASK 1 - Search for pliers', async ({ page }) => {

    // STEP 1: Navigate to the PracticeSoftwareTesting home page
    await page.goto('https://practicesoftwaretesting.com/');

    // STEP 2: Locate the Search textbox using its accessible role
    const searchField = page.getByRole('textbox', { name: 'Search' });

    // STEP 3: Double-click the Search textbox
    await searchField.dblclick();

    // STEP 4: Fill the Search textbox with Pliers
    await searchField.fill('Pliers');

    // STEP 5: Verify that the Search textbox contains Pliers
    await expect(searchField).toHaveValue('Pliers');

    // STEP 6: Click the Search button
    await page.getByRole('button', { name: 'Search' }).click();

    // STEP 7: Create one locator for all product titles
    const productTitles = page.locator('[data-test="product-name"]');

    // STEP 8: Verify that exactly 4 products are displayed
    await expect(productTitles).toHaveCount(4);

});

test('TASK 2 - Filter the catalog to hammers', async ({ page }) => {

    // STEP 1: Navigate to the PracticeSoftwareTesting home page
    await page.goto('https://practicesoftwaretesting.com/');

    // STEP 2: Locate the Hammer category checkbox
    const hammerCheckbox = page.getByRole('checkbox', { name: 'Hammer' });

    // STEP 3: Check the Hammer category checkbox
    await hammerCheckbox.check();

    // STEP 4: Verify that the Hammer checkbox is checked
    await expect(hammerCheckbox).toBeChecked();

    // STEP 5: Locate all product titles inside the filtered results container
    const productTitles = page.locator(
        '[data-test="filter_completed"] [data-test="product-name"]'
    );

    // STEP 6: Verify that exactly 7 hammer products are displayed
    await expect(productTitles).toHaveCount(7);

    // STEP 7: Uncheck the Hammer category checkbox
    await hammerCheckbox.uncheck();

    // STEP 8: Verify that the Hammer checkbox is no longer checked
    await expect(hammerCheckbox).not.toBeChecked();

});

test('TASK 3 - Sort products by name', async ({ page }) => {

    // STEP 1: Navigate to the PracticeSoftwareTesting home page
    await page.goto('https://practicesoftwaretesting.com/');

    // STEP 2: Locate the Sort dropdown
    const sortDropdown = page.locator('[data-test="sort"]');

    // STEP 3: Select Name (A - Z) from the Sort dropdown
    await sortDropdown.selectOption({ label: 'Name (A - Z)' });

    // STEP 4: Locate all product titles inside the sorted results container
    const productTitles = page.locator(
        '[data-test="sorting_completed"] [data-test="product-name"]'
    );

    // STEP 5: Verify that exactly 9 product titles are displayed
    await expect(productTitles).toHaveCount(9);

    // STEP 6: Locate the first product title
    const firstProduct = productTitles.first();

    // STEP 7: Verify that the first product contains Adjustable Wrench
    await expect(firstProduct).toContainText('Adjustable Wrench');

    // STEP 8: Verify that the first product has the CSS class card-title
    await expect(firstProduct).toHaveClass(/(?:^|\s)card-title(?:\s|$)/);

});

test('TASK 4 - Inspect a product and add two items to the cart', async ({ page }) => {

    // STEP 1: Navigate to the home page
    await page.goto('https://practicesoftwaretesting.com/');

    // STEP 2: Locate the Combination Pliers product card
    const productCard = page.getByRole('link').filter({
        has: page.getByRole('heading', {
            name: 'Combination Pliers'
        })
    });

    // STEP 3: Hover over the product
    await productCard.hover();

    // STEP 4: Click the Combination Pliers product
    await productCard.click();

    // STEP 5: Verify that the Combination Pliers heading is visible
    const productHeading = page.getByRole('heading', {
        name: 'Combination Pliers',
        level: 1
    });

    await expect(productHeading).toBeVisible();

    // STEP 6: Locate the Quantity spinbutton
    const quantityInput = page.getByRole('spinbutton', {
        name: 'Quantity'
    });

    // STEP 7: Verify that the initial quantity is 1
    await expect(quantityInput).toHaveValue('1');

    // STEP 8: Click Increase quantity once
    await page.getByRole('button', {
        name: 'Increase quantity'
    }).click();

    // STEP 9: Verify that the quantity becomes 2
    await expect(quantityInput).toHaveValue('2');

    // STEP 10: Click Add to cart
    await page.getByRole('button', {
        name: 'Add to cart'
    }).click();

    // STEP 11: Verify the success alert
    await expect(page.getByRole('alert')).toContainText(
        'Product added to shopping cart.'
    );

    // STEP 12: Locate the cart link
    const cartLink = page.getByRole('link', {
        name: 'cart'
    });

    // STEP 13: Verify that the cart link is visible
    await expect(cartLink).toBeVisible();

    // STEP 14: Verify that the cart contains 2 items
    await expect(cartLink).toContainText('2');

});





