import { test, expect } from '@playwright/test';
import { generateValidEmail } from '../../helpers/email.js';
import { PageRegister } from '../../pages/PageRegister.js';
import { users } from '../../test-data/users.js';
import { generateDOB } from '../../helpers/date.js';

test.describe('Registration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/register');
    });
    test('new customer registration (happy path)', async ({ page }) => {
        const email = generateValidEmail();
        const validUserObj = { ...users.sam, email };

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(validUserObj);

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    }); 
    test('customer registration rejected when age value < 18', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(17) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.registerErrorAlert).toContainText('Customer must be 18 years old.');
    });
    test('customer registration accepted when age value = 18', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(18) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
    test('customer registration accepted when age value = 75', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(75) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
    // NOTE: Docs say max age is 75, but app actually accepts up to ~92.
    // In a real project, this would be raised as a bug ticket.
    test.fixme('customer registration rejected when age value > 75', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: generateDOB(76) } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.registerErrorAlert).toContainText('Customer must be younger than 75 years old.');
    });
    test.only('customer registration rejected when dob format is invalid', async ({ page }) => {
        const email = generateValidEmail();

        const userObj = { ...users.sam, email, dob: '1234' };

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.emailInputError).toContainText('Please enter a valid date in YYYY-MM-DD format.');
    });
    test('customer registration rejected when email is invalid', async ({ page }) => {
        const userObj = { ...users.sam, email: 'incorrectemail' } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.emailInputError).toContainText('Email format is invalid');
    });
    test('customer registration rejected when email already exists', async ({ page }) => {
        const userObj = { ...users.sam, email: users.admin.email } 

        const pageRegister = new PageRegister(page);

        await pageRegister.registerUser(userObj);

        await expect(pageRegister.registerErrorAlert).toContainText('A customer with this email address already exists.');
    });
    test('required fields display error messages when submitted without values', async ({ page }) => {
        const pageRegister = new PageRegister(page);

        await pageRegister.registerButton.click();

        await expect(pageRegister.firstNameInputError).toContainText('First name is required');
        await expect(pageRegister.lastNameInputError).toContainText('Last name is required');
        await expect(pageRegister.dobInputError).toContainText('Date of Birth is required');
        await expect(pageRegister.streetInputError).toContainText('Street is required');
        await expect(pageRegister.postalCodeError).toContainText('Postcode is required');
        await expect(pageRegister.houseNumberError).toContainText('House number is required');
        await expect(pageRegister.cityInputError).toContainText('City is required');
        await expect(pageRegister.stateInputError).toContainText('State is required');
        await expect(pageRegister.countrySelectError).toContainText('Country is required');
        await expect(pageRegister.phoneNumberInputError).toContainText('Phone is required.');
        await expect(pageRegister.emailInputError).toContainText('Email is required');
        await expect(pageRegister.passwordInputError).toContainText('Password is required');

    })
});