export class PageLogin {
    constructor(page) {
        this.page = page;

        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
    }

    async login(userObj) {
        await this.emailInput.fill(userObj.email);
        await this.passwordInput.fill(userObj.password);
        await this.loginButton.click();
    }
} 