import { test as base, expect } from '@playwright/test';
import { PageLogin } from '../../pages/index.js';
import { users } from '../../test-data/users.js';

export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        await page.goto('/auth/login');
        const pageLogin = new PageLogin(page);

        const userObj = { 
            email: users.defaultUser.email, 
            password: users.defaultUser.password
        };

        await pageLogin.login(userObj);

        await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
        await expect(page).toHaveURL(/dashboard/);
        await use({ page });
    },
});