import { test, expect } from '@playwright/test';
import { generateValidEmail } from '../../helpers/email.js';
import { PageRegister } from '../../pages/PageRegister.js';
import { users } from '../../test-data/users.js';
import { generateDOB } from '../../helpers/date.js';

test.describe('Registration', () => {
    test('new customer registration (happy path)', async ({ page }) => {
        const email = generateValidEmail();
        const validUserObj = { ...users.sam, email };

        await page.goto('/auth/register');

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(validUserObj);

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    }); 
    test.only('customer registration rejected when age value < 18', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(17) } // TODO - dynamic date generation

        await page.goto('/auth/register');

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.registerErrorAlert).toContainText('Customer must be 18 years old.');
    });
    test('customer registration accepted when age value = 18', async ({ page }) => {
        
    });
    test('customer registration accepted when age value = 75', async ({ page }) => {
        
    });
    test('customer registration rejected when age value > 75', async ({ page }) => {

    });
});