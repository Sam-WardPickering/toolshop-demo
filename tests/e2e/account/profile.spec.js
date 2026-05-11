import { PageProfile } from '../../pages/index.js';
import { test, expect } from '../../fixtures/baseTest.js';
import { users } from '../../test-data/users.js';

test.describe('Profile', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/profile');
    });
    test.afterEach(async ({ pageProfile }) => {
        await pageProfile.updateProfile(users.defaultUser);
    });
    test('User can successfully update profile (happy path)', async ({ loggedInDefaultUser: { page } }) => {

        await page.goto('/account/profile');
        const pageProfile = new PageProfile(page);

        await pageProfile.updateProfile(users.sam);

        await expect(pageProfile.firstNameInput).toHaveText(users.sam.firstName);
    });
    // test field validation
    // last name, 20 chars max
})