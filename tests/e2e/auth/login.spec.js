import { test, expect } from '@playwright/test';
import { PageLogin } from '../../pages/index.js';
import { users } from '../../test-data/users.js';

test.describe('Login', () => {
    test('login is successful (happy path)', async ({ page }) => {
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
    test('login is unsuccessful with invalid email', async ({ page }) => {
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
    test('login is unsuccessful with no password', async ({ page }) => {
        await page.goto('/auth/login');

        const pageLogin = new PageLogin(page);

        const userObj = {
            email: users.admin.email,
            password: ''
        };

        await pageLogin.login(userObj);

        await expect(page).toHaveURL(/login/);
        await expect(pageLogin.passwordInputError).toHaveText('Password is required');
    });
    test('login is unsuccessful with incorrect password', async ({ page }) => {
        await page.goto('/auth/login');

        const pageLogin = new PageLogin(page);

        const userObj = {
            email: users.admin.email,
            password: 'incorrect password'
        };

        await pageLogin.login(userObj);

        await expect(page).toHaveURL(/login/);
        await expect(pageLogin.loginError).toHaveText('Invalid email or password');
    });
    test('login is unsuccessful with incorrect email', async ({ page }) => {
        await page.goto('/auth/login');

        const pageLogin = new PageLogin(page);

        const userObj = {
            email: 'test@email.com',
            password: users.admin.password
        };

        await pageLogin.login(userObj);

        await expect(page).toHaveURL(/login/);
        await expect(pageLogin.loginError).toHaveText('Invalid email or password');
    })
})