import { PageProfile } from '../../pages/index.js';
import { test, expect } from '../../fixtures/baseTest.js';
import { users } from '../../test-data/users.js';

test.describe('Profile', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/profile');
    });
    test.only('User can successfully update profile (happy path)', async ({ loggedInDefaultUser: { page } }) => {

        await page.goto('/account/profile');
        const pageProfile = new PageProfile(page);

        pageProfile.updateProfile(users.sam);

       
    });
    // test field validation
    // last name, 20 chars max
})