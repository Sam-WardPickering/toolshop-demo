import { test, expect } from '@playwright/test'
import { PageLogin, PageForgotPassword } from '../../pages/index.js';
import { users } from '../../test-data/users.js';

test.describe('Forgot Password', () => {
    test('User can login successfuly after pasword reset', async ({ page }) => {
        await page.goto('/auth/register');

        const pageLogin = new PageLogin(page);
        const pageForgotPassword = new PageForgotPassword(page);


    });
});
