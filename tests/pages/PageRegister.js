export class PageRegister {
    constructor(page) {
        this.page = page;

        this.firstNameInput = page.getByTestId('first-name');
        this.firstNameInputError = page.getByTestId('first-name-error');

        this.lastNameInput = page.getByTestId('last-name');
        this.lastNameInputError = page.getByTestId('last-name-error');

        this.dobInput = page.getByTestId('dob');
        this.dobInputError = page.getByTestId('dob-error');

        this.streetInput = page.getByTestId('street');
        this.streetInputError = page.getByTestId('street-error');

        this.postalCode = page.getByTestId('postal_code');
        this.postalCodeError = page.getByTestId('postal_code-error');

        this.houseNumber = page.getByTestId('house_number');
        this.houseNumberError = page.getByTestId('house_number-error');

        this.cityInput = page.getByTestId('city');
        this.cityInputError = page.getByTestId('city-error');

        this.stateInput = page.getByTestId('state');
        this.stateInputError = page.getByTestId('state-error');

        this.countrySelect = page.getByTestId('country');
        this.countrySelectError = page.getByTestId('country-error');

        this.phoneNumberInput = page.getByTestId('phone');
        this.phoneNumberInputError = page.getByTestId('phone-error');

        this.emailInput = page.getByTestId('email');
        this.emailInputError = page.getByTestId('email-error');

        this.passwordInput = page.getByTestId('password');
        this.passwordInputError = page.getByTestId('password-error');

        this.registerButton = page.getByTestId('register-submit');
        this.registerErrorAlert = page.getByTestId('register-error');
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