import { test, expect } from '../fixtures';
//import fs from 'fs';
import * as fs from 'fs';

const csvData = fs.readFileSync(
    'test-data/login-cases.csv',
    'utf-8'
);

const lines = csvData.trim().split(/\r?\n/);

const [, ...dataLines] = lines;

const records = dataLines.map((line: string) => {
    const [name, email, password, expectedResult] = line.split(',');

    return {
        name,
        email,
        password,
        expectedResult
    };
});

test('account page is open', async ({ loggedInPage }) => {

    await expect(loggedInPage).toHaveURL(/\/account/);

});

test.describe('catalog hooks', () => {

    test.beforeAll(async () => {
        console.log(`Suite started at: ${new Date().toLocaleTimeString()}`);
    });

    test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
});

    test.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {
        await testInfo.attach('failure screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png'
        });
    }

});

    test.afterAll(async () => {
    console.log('Catalog hooks suite finished.');
});

    test('catalog page loaded', async ({ page }) => {
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
});

});

// TASK 3 - Data Driven Login Tests

for (const record of records) {

    test(`CSV login - ${record.name}`, async ({ page }) => {

        await page.goto('https://practicesoftwaretesting.com/auth/login');

        await page.getByTestId('email').fill(record.email);
        await page.getByTestId('password').fill(record.password);
        await page.getByTestId('login-submit').click();

        if (record.expectedResult === 'success') {
            await expect(page).toHaveURL(/\/account/);
        } else {
            await expect(
                page.getByText('Invalid email or password')
            ).toBeVisible();
        }

    });

}




