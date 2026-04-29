import { test, expect } from '@playwright/test';
import { PageLogin } from '../../pages/index.js';

test.describe('Login', () => {
    test('Login is successful (happy path)', async ({ page }) => {
        await page.goto('/auth/login');

        
    });
})