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

    async registerUser(userObj, userEmail) {
        await this.firstNameInput.fill(userObj.firstName);
        await this.firstNameInput.fill(userObj.lastName);
        await this.dobInput.fill(userObj.dob);
        await this.streetInput.fill(userObj.street);
        await this.postalCode.fill(userObj.postalCode);
        await this.cityInput.fill(userObj.city);
        await this.stateInput.fill(userObj.state);
        await this.countryInput.fill(userObj.country);
        await this.phoneNumberInput.fill(userObj.phoneNumber);
        await this.passwordInput.fill(userObj.password);
        await this.emailInput.fill(userEmail);

        await this.registerButton.click();
    }
}