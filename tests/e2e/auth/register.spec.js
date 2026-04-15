import { test, expect } from '@playwright/test';
import { generateValidEmail } from '../../helpers/email.js';
import { PageRegister } from '../../pages/PageRegister.js';
import { users } from '../../test-data/users.js';

const validUserObj = users.sam;

test.describe('Registration', () => {
    test('new customer registration (happy path)', async ({ page }) => {
        const email = generateValidEmail();

        await page.goto('/auth/register');

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(validUserObj, email);

        await expect(page).toHaveURL(/login/);
    }); 
});