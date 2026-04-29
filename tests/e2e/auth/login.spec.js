import { test, expect } from '@playwright/test';
import { PageLogin } from '../../pages/index.js';
import { users } from '../../test-data/users.js';

test.describe('Login', () => {
    test('Login is successful (happy path)', async ({ page }) => {
        await page.goto('/auth/login');

        const pageLogin = new PageLogin(page);

        const userObj = { 
            email: users.admin.email, 
            password: users.admin.password
        };

        await pageLogin.login(userObj);

        await expect(page.getByTestId('nav-menu')).toContainText('John Doe');
        await expect(page).toHaveURL(/dashboard/);
    });
    test('Login is unsuccessful with invalid email', async ({ page }) => {
        await page.goto('/auth/login');

        const pageLogin = new PageLogin(page);

        const userObj = {
            email: 'invalid',
            password: users.admin.password
        };

        await pageLogin.login(userObj);

        await expect(page).toHaveURL(/login/);
        await expect(pageLogin.emailInputError).toHaveText('Email format is invalid');
    });
})