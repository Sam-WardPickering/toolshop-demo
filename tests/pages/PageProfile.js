export class PageProfile {
    constructor(page) {
        this.page = page;

        /* Profile Detail Section */
        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.emailInput = page.getByTestId('email');
        this.phoneInput = page.getByTestId('phone');
        this.streetInput = page.getByTestId('street');
        this.postCodeInput = page.getByTestId('postal_code');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.countryInput = page.getByTestId('country');
        this.updateProfileBtn = page.getByTestId('update-profile-submit');

        /* Change password section */
        this.currentPasswordInput = page.getByTestId('current-password');
        this.newPasswordInput = page.getByTestId('new-password');
        this.confirmNewPasswordInput = page.getByTestId('new-password-confirm');
        this.changePasswordBtn = page.getByTestId('change-password-submit');

    }

    async updateProfile(userObj) {
        await this.firstNameInput.fill(userObj.firstName || "");
        await this.lastNameInput.fill(userObj.lastName || "");
        // emailInput.fill();   /* Email input is not editable */
        await this.phoneInput.fill(userObj.phoneNumber || "");
        await this.streetInput.fill(userObj.street || "");
        await this.postCodeInput.fill(userObj.postalCode || "");
        await this.cityInput.fill(userObj.city || "");
        await this.stateInput.fill(userObj.state || "");
        await this.countryInput.fill(userObj.country || "");

        await this.updateProfileBtn.click();
    }

    async updatePassword(currentPassword, newPassword) {
        await this.currentPasswordInput.fill(currentPassword);
        await this.newPasswordInput.fill(newPassword);
        await this.confirmNewPasswordInput.fill(newPassword);
        await this.changePasswordBtn.click();
    }
}