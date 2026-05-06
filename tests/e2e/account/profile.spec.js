import { PageProfile } from '../../pages/index.js';
import { test, expect } from '../../fixtures/baseTest.js';

test.describe('Profile', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/profile');
    });
    test('', async ({ loggedInPage: { page } }) => {
        // tests
        await page.goto('/account/profile');

       
    })
})