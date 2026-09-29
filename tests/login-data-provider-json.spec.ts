import { test, expect } from '@playwright/test';
import loginData from '../test-data/login.json';

test('login with data from JSON', async ({ page }) => {

    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.getByTestId('email').fill(loginData.email);
    await page.getByTestId('password').fill(loginData.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*account/);



});











