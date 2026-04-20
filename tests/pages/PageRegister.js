export class PageRegister {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.dobInput = page.getByTestId('dob');
        this.streetInput = page.getByTestId('street');
        this.postalCode = page.getByTestId('postal_code');
        this.houseNumber = page.getByTestId('house_number');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.countrySelect = page.getByTestId('country');
        this.phoneNumberInput = page.getByTestId('phone');
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.registerButton = page.getByTestId('register-submit');
        this.registerErrorAlert = page.getByTestId('register-error');
        this.emailErrorAlert = page.getByTestId('email-error');
    }

    async registerUser(userObj) {
        await this.firstNameInput.fill(userObj.firstName);
        await this.lastNameInput.fill(userObj.lastName);
        await this.dobInput.fill(userObj.dob);
        await this.streetInput.fill(userObj.street);
        await this.postalCode.fill(userObj.postalCode);
        await this.houseNumber.fill(userObj.houseNumber);
        await this.cityInput.fill(userObj.city);
        await this.stateInput.fill(userObj.state);
        await this.countrySelect.click();         // click first to trigger event handling
        await this.countrySelect.selectOption(userObj.country);
        await this.phoneNumberInput.fill(userObj.phoneNumber);
        await this.emailInput.fill(userObj.email);
        await this.passwordInput.fill(userObj.password);
    
        await this.registerButton.click();
    }
}