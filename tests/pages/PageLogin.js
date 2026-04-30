export class PageLogin {
    constructor(page) {
        this.page = page;

        this.emailInput = page.getByTestId('email');
        this.emailInputError = page.getByTestId('email-error');

        this.passwordInput = page.getByTestId('password');
        this.passwordInputError = page.getByTestId('password-error');

        this.loginButton = page.getByTestId('login-submit');

        this.loginError = page.getByTestId('login-error');
    }

    async login(userObj) {
        await this.emailInput.fill(userObj.email);
        await this.passwordInput.fill(userObj.password);
        await this.loginButton.click();
    }
} 