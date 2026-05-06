import { PageProfile } from '../../pages/index.js';
import { test, expect } from '../../fixtures/baseTest.js';

test.describe('Profile', () => {
    test.only('', async ({ loggedInPage: { page } }) => {
        // tests
        await page.goto('/account/profile');

        await page.pause();
    })
})