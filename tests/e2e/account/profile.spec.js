import { PageProfile } from '../../pages/index.js';
import { test, expect } from '../../fixtures/baseTest.js';
import { users } from '../../test-data/users.js';

test.describe('Profile', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/profile');
    });
    test('User can successfully update profile (happy path)', async ({ loggedInDefaultUser: { page }, browserName }) => {
        // Profile tests modify shared user data on a live server.
        // Running in parallel across browsers causes state conflicts. Single browser only.
        test.skip(browserName !== 'chromium', 'Shared state - run on single browser only');

        await page.goto('/account/profile');
        const pageProfile = new PageProfile(page);

        await expect(pageProfile.firstNameInput).toHaveValue(users.defaultUser.firstName);
        await expect(pageProfile.lastNameInput).toHaveValue(users.defaultUser.lastName);

        await pageProfile.updateProfile(users.sam);

        await expect(page.getByText('Your profile is successfully updated!')).toBeVisible();        

        await expect(pageProfile.firstNameInput).toHaveValue(users.sam.firstName);
        await expect(pageProfile.lastNameInput).toHaveValue(users.sam.lastName);
        await expect(pageProfile.phoneInput).toHaveValue(users.sam.phoneNumber);
        await expect(pageProfile.streetInput).toHaveValue(users.sam.street);
        await expect(pageProfile.postCodeInput).toHaveValue(users.sam.postalCode);
        await expect(pageProfile.cityInput).toHaveValue(users.sam.city);
        await expect(pageProfile.stateInput).toHaveValue(users.sam.state);
        await expect(pageProfile.countryInput).toHaveValue(users.sam.country);

        // Undo profile update changes, revert back to defaultUser data
        await pageProfile.updateProfile(users.defaultUser);

        await expect(page.getByText('Your profile is successfully updated!')).toBeVisible();
        await expect(pageProfile.firstNameInput).toHaveValue(users.defaultUser.firstName);        
        await expect(pageProfile.lastNameInput).toHaveValue(users.defaultUser.lastName);
        await expect(pageProfile.phoneInput).toHaveValue("");
        
    });
    test('password reset cannot reuse the current password', async ({ lpage }) => {
        test.skip(browserName !== 'chromium', 'Shared state - run on single browser only');

        await page.goto('/account/profile');
        const pageProfile = new PageProfile(page);
    });
})