export class PageForgotPassword {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByTestId('email');
        this.setNewPasswordButton = page.getByTestId('forgot-password-submit');
    }

    async submitForgotPassword(email) {
        this.emailInput.fill(email);
        this.setNewPasswordButton.click();
    }
}
