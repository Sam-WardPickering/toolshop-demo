export class PageRegister {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.dobInput = page.getByTestId('dob');
        this.streetInput = page.getByTestId('street');
        this.postalCode = page.getByTestId('postal_code');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.countryInput = page.getByTestId('country');
        this.phoneNumberInput = page.getByTestId('phone');
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.registerButton = page.getByTestId('register-submit');
    }
}