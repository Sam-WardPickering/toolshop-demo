import { test as base, expect } from '@playwright/test';
import { PageLogin } from '../pages/index.js';
import { users } from '../test-data/users.js';

export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        await page.goto('/auth/login');
        const pageLogin = new PageLogin(page);

        const userObj = { 
            email: users.sam.email, 
            password: users.sam.password
        };

        await pageLogin.login(userObj);

        await expect(page.getByTestId('nav-menu')).toContainText('Sam Ward-Pickering');
        await expect(page).toHaveURL(/account/);
        await use({ page });
    },
});

export { expect };