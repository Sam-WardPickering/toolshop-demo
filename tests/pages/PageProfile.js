export class PageProfile {
    constructor(page) {
        this.page = page;

        /* Profile Detail Section */
        firstNameInput = page.getByTestId('first-name');
        lastNameInput = page.getByTestId('last-name');
        emailInput = page.getByTestId('email');
        phoneInput = page.getByTestId('phone');
        streetInput = page.getByTestId('street');
        postCodeInput = page.getByTestId('postal_code');
        cityInput = page.getByTestId('city');
        stateInput = page.getByTestId('state');
        countryInput = page.getByTestId('country');
        updateProfileBtn = page.getByTestId('update-profile-submit');

        /* Change password section */
        currentPasswordInput = page.getByTestId('current-password');
        newPasswordInput = page.getByTestId('new-password');
        confirmNewPasswordInput = page.getByTestId('new-password-confirm');
        changePasswordBtn = page.getByTestId('change-password-submit');

    }
}