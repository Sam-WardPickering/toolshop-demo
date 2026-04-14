import { test, expect } from '@playwright/test';

test.describe('Registration', () => {
    test('new customer registration (happy path)', async ({ page }) => {
        await page.goto('/auth/register');

        
    }); 
});