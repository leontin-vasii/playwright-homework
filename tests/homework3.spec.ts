import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';


test('Adding items to cart', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(homePage.cartBadge).toBeHidden();


    // Add Combination Pliers

    await homePage.addItemToCart('Combination Pliers');

    // Verify first product

    await expect(homePage.cartBadge).toHaveText('1');


    // Add Bolt Cutters

    await homePage.addItemToCart('Bolt Cutters');

    // Verify second product

    await expect(homePage.cartBadge).toHaveText('2');

});


test('Removing an item from cart', async ({ page }) => {

    // Create an instance of HomePage
    const homePage = new HomePage(page);

    // Navigate to the Home Page
    await homePage.goto();

    // Verify that the shopping cart is initially empty
    await expect(homePage.cartBadge).toBeHidden();

    // Add Combination Pliers
    await homePage.addItemToCart('Combination Pliers');

    // Verify the first product was added
    await expect(homePage.cartBadge).toHaveText('1');

    // Add Pliers
    await homePage.addItemToCart('Pliers');

    // Verify that the cart contains 2 items
    await expect(homePage.cartBadge).toHaveText('2');

    // Remove Combination Pliers
    await homePage.removeItemFromCart('Combination Pliers');

    // Verify that only 1 item remains
    await expect(homePage.cartBadge).toHaveText('1');

});










