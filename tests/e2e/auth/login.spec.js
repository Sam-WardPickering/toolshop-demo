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
})