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

        await expect(page.getByRole('alert')).toContainText('Your profile is successfully updated!');

        await expect(pageProfile.firstNameInput).toHaveText(users.sam.firstName);
        await expect(pageProfile.lastNameInput).toHaveText(users.sam.lastName);
        await expect(pageProfile.phoneInput).toHaveText(users.sam.phoneNumber);
        await expect(pageProfile.streetInput).toHaveText(users.sam.street);
        await expect(pageProfile.postCodeInput).toHaveText(users.sam.postalCode);
        await expect(pageProfile.cityInput).toHaveText(users.sam.city);
        await expect(pageProfile.stateInput).toHaveText(users.sam.state);
        await expect(pageProfile.countryInput).toHaveText(users.sam.country);

        // Undo profile update changes, revert back to defaultUser data
        await pageProfile.updateProfile(users.defaultUser);

        await expect(page.getByRole('alert')).toContainText('Your profile is successfully updated!');
        await expect(pageProfile.firstNameInput).toHaveText(users.defaultUser.firstName);
        await expect(pageProfile.lastNameInput).toHaveText(users.defaultUser.lastName);
        await expect(pageProfile.phoneInput).toHaveText("");
        
    });
    // test field validation
    // last name, 20 chars max
})