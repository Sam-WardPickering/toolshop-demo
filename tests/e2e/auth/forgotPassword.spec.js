import { test, expect } from '@playwright/test'
import { PageLogin, PageForgotPassword } from '../../pages/index.js';
import { users } from '../../test-data/users.js';

test.describe('Forgot Password', () => {
    test('User can login successfully after password reset (happy path)', async ({ page, browserName }) => {
        // This test resets a shared user's password on a live server.
        // Running across multiple browsers in parallel causes concurrent login attempts,
        // which triggers the account lock (3 failed attempts). Single browser only.
        test.skip(browserName !== 'chromium', 'Shared state - run on single browser only');
        
        await page.goto('/auth/forgot-password');

        const userObj = {
            ...users.defaultUser2,
            password: 'welcome02'
        }

        const pageForgotPassword = new PageForgotPassword(page);

        await pageForgotPassword.submitForgotPassword(users.defaultUser2.email);

        await expect(page.getByRole('alert')).toContainText('page.forgot-password.confirm');

        await page.goto('/auth/login');

        const pageLogin = new PageLogin(page);

        await pageLogin.login(userObj);

        await expect(page.getByTestId('nav-menu')).toContainText('Jack Howe');
        await expect(page).toHaveURL(/account/);

    });
    // An error box and error state is shown, but no error text is.
    // This would be raised as a bug in a real scenario.
    test('User cannot reset a password with invalid email', async ({ page }) => {
        await page.goto('/auth/forgot-password');

        const pageForgotPassword = new PageForgotPassword(page);

        await pageForgotPassword.submitForgotPassword('invalidemail123');

        await expect(pageForgotPassword.emailInputError).toBeVisible();

    });
    test('Error displayed when submitting without a password', async ({ page }) => {
        await page.goto('/auth/forgot-password');

        const pageForgotPassword = new PageForgotPassword(page);

        await pageForgotPassword.submitForgotPassword('');

        await expect(pageForgotPassword.emailInputError).toContainText('Email is required');
    });
});
