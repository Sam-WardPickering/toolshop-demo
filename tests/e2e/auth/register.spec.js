import { test, expect } from '@playwright/test';
import { generateValidEmail } from '../../helpers/email.js';
import { PageRegister } from '../../pages/PageRegister.js';
import { users } from '../../test-data/users.js';
import { generateDOB } from '../../helpers/date.js';

test.describe('Registration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/register');
    });
    test('new customer registration (happy path)', async ({ page }) => {
        const email = generateValidEmail();
        const validUserObj = { ...users.sam, email };

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(validUserObj);

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    }); 
    test('customer registration rejected when age value < 18', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(17) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.registerErrorAlert).toContainText('Customer must be 18 years old.');
    });
    test('customer registration accepted when age value = 18', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(18) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
    test('customer registration accepted when age value = 75', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(75) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
    // NOTE: Docs say max age is 75, but app actually accepts up to ~92.
    // In a real project, this would be raised as a bug ticket.
    test.fixme('customer registration rejected when age value > 75', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(76) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.registerErrorAlert).toContainText('Customer must be younger than 75 years old.');
    });
});