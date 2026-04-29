export class PageLogin {
    constructor(page) {
        this.page = page;

        this.emailInput = page.getElementById('email');
        this.passwordInput = page.getElementById('password');
        this.loginButton = page.getElementById('login-submit');
    }
} 