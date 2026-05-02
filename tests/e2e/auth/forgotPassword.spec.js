import { test, expect } from '@playwright/test'
import { PageLogin, PageForgotPassword } from '../../pages/index.js';
import { users } from '../../test-data/users.js';

test.describe('Forgot Password', () => {
    test.only('User can login successfuly after pasword reset (happy path)', async ({ page }) => {
        await page.goto('/auth/forgot-password');

        const userObj = {
            ...users.defaultUser,
            password: 'welcome02'
        }

        const pageForgotPassword = new PageForgotPassword(page);

        await pageForgotPassword.submitForgotPassword(users.defaultUser.email);

        await expect(page.getByRole('alert')).toContainText('page.forgot-password.confirm');

        await page.goto('/auth/login');

        const pageLogin = new PageLogin(page);

        await pageLogin.login(userObj);

        await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
        await expect(page).toHaveURL(/account/);

    });
});
