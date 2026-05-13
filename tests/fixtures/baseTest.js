import { test as base, expect } from '@playwright/test';
import { PageLogin } from '../pages/index.js';
import { users } from '../test-data/users.js';

export const test = base.extend({
    loginUser: [null, { option: true }],

    loggedInPage: async ({ page, loginUser }, use) => {
        await page.goto('/auth/login');
        const pageLogin = new PageLogin(page);

        await pageLogin.login({
            email: loginUser.email,
            password: loginUser.password
        });

        await expect(page).toHaveURL(/account/);
        await use({ page });
    },
});

export { expect };