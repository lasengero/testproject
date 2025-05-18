import { test, expect, request } from '@playwright/test';
import { RegisterPage } from '../pages/register';
import { LoginPage } from '../pages/login';
import { MenuPage } from '../pages/menu';
import { BillPage } from '../pages/bill';

const firstName = 'John';
const lastName = 'Doe';
const address = '123 Main St';
const city = 'Anytown';
const state = 'CA';
const zipCode = '12345';
const phoneNumber = '555-555-5555';
const ssn = '123-45-6789';
const password = 'password123';

const amount = '50';

test.describe.serial('Parabank Test', () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        await page.goto('https://parabank.parasoft.com');
        await page.waitForLoadState('domcontentloaded');
        await registerPage.registerLink.click();
        await registerPage.register(firstName, lastName, address, city, state, zipCode, phoneNumber, ssn, password);


    });

    test('User can register and login successfully', async ({ page }) => {

        // const usernameDisplayedOnPage = await page.locator('.title').textContent();
        // console.log('Displayed Username:', usernameDisplayedOnPage);

        // Verify successful registration

        await expect(page.locator('.title')).toContainText(RegisterPage.randomUsername);
        await expect(page.locator('.title')).toHaveText('Welcome ' + RegisterPage.randomUsername);

        // Logout
        await loginPage.logout();
        await expect(page.locator('#loginPanel')).toBeVisible();

        // Login
        await loginPage.login(RegisterPage.randomUsername, password);

        // Verify successful login
        await expect(page.locator('#showOverview .title')).toHaveText('Accounts Overview');

    });

    test('Navigate Global Navigation', async ({ page }) => {

        await loginPage.logo.click();
        await page.waitForLoadState('domcontentloaded');

        const menuPage = new MenuPage(page);

        await menuPage.home.click();
        await page.waitForLoadState('domcontentloaded');

        await expect(page.url()).toContain(menuPage.homeUrl);

        await menuPage.aboutUs.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain(menuPage.aboutUsUrl);

        await menuPage.services.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain(menuPage.servicesUrl);

        await menuPage.products.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain(menuPage.productsUrl);
        await page.goBack();

        await menuPage.locations.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain(menuPage.locationsUrl);
        await page.goBack();

        await menuPage.forums.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain(menuPage.forumsUrl);
        await page.goBack();

        await menuPage.siteMaps.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain(menuPage.siteMapsUrl);

        await menuPage.contactUs.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.url()).toContain(menuPage.contactUsUrl);


    });

    test('Create Savings Account', async ({ page }) => {

        await loginPage.logo.click();
        await page.waitForLoadState('domcontentloaded');

        await page.waitForSelector('text=Open New Account');
        await page.waitForTimeout(3000);

        // Open New Account
        await page.locator('text=Open New Account').click();
        await page.waitForLoadState('domcontentloaded');
        await page.selectOption('select[id="type"]', '1');
        // await page.pause();
        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();
        await page.waitForTimeout(3000);
        await page.waitForSelector('#newAccountId');
        const accountNumber = await page.locator('#newAccountId').textContent();
        console.log('Account Number:', accountNumber);

        // Verify Account Creation
        await page.locator('text=Accounts Overview').click();
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

        await expect(page.locator('#accountTable')).toContainText(`${accountNumber}`);
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

    });

    test('User can Transfer Funds', async ({ page }) => {

        await loginPage.logo.click();
        await page.waitForLoadState('domcontentloaded');

        // Open New Account
        await page.locator('text=Open New Account').click();
        await page.waitForLoadState('domcontentloaded');
        await page.selectOption('select[id="type"]', '1');
        // await page.pause();
        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();
        await page.waitForTimeout(3000);
        await page.waitForSelector('#newAccountId');

        const accountNumber = await page.locator('#newAccountId').textContent();
        // console.log('Account Number:', accountNumber);

        // Verify Account Creation
        await page.locator('text=Accounts Overview').click();
        await page.waitForLoadState('domcontentloaded');
        await page.pause();

        await expect(page.locator('#accountTable')).toContainText(`${accountNumber}`);
        await page.waitForLoadState('domcontentloaded');
        await page.pause();

        // Transfer Funds
        await page.locator('text=Transfer Funds').click();
        await page.waitForLoadState('domcontentloaded');

        await page.locator('input[id="amount"]').fill(amount);
        await page.locator('select[id="fromAccountId"]').selectOption(accountNumber);
        await page.pause();

        await page.getByRole('button', { name: 'Transfer' }).click();
        await page.waitForLoadState('domcontentloaded');
        await page.pause();

        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
        await expect(page.locator('#amountResult')).toContainText(amount + '.00');
        await expect(page.locator('#fromAccountIdResult')).toContainText(`${accountNumber}`);
        await page.pause();


    });


    test('User can pay bills', async ({ page }) => {

        await loginPage.logo.click();
        await page.waitForLoadState('domcontentloaded');

        const billPage = new BillPage(page);


        // Open New Account
        await page.locator('text=Open New Account').click();
        await page.waitForLoadState('domcontentloaded');
        await page.selectOption('select[id="type"]', '1');
        // await page.pause();
        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await page.waitForLoadState('domcontentloaded');

        // await page.pause();
        await page.waitForTimeout(3000);
        await page.waitForSelector('#newAccountId');
        const accountNumber = await page.locator('#newAccountId').textContent();
        console.log('Account Number:', accountNumber);

        // Verify Account Creation
        await page.locator('text=Accounts Overview').click();
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

        await expect(page.locator('#accountTable')).toContainText(`${accountNumber}`);
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

        // Transfer Funds
        await page.locator('text=Transfer Funds').click();
        await page.waitForLoadState('domcontentloaded');

        await page.locator('input[id="amount"]').fill(amount);
        await page.locator('select[id="fromAccountId"]').selectOption(accountNumber);
        // await page.pause();

        await page.getByRole('button', { name: 'Transfer' }).click();
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
        await expect(page.locator('#amountResult')).toContainText(amount + '.00');
        await expect(page.locator('#fromAccountIdResult')).toContainText(`${accountNumber}`);
        // await page.pause();

        await page.locator('text=Bill Pay').click();
        await page.waitForLoadState('domcontentloaded');

        await billPage.paybill(`${firstName} ${lastName}`, '123 Main St', 'Anytown', 'CA', '12345', phoneNumber, `${accountNumber}`, `${accountNumber}`, amount);

        await expect(page.locator('#billpayResult .title')).toContainText('Bill Payment Complete');
        await expect(page.locator('#amount')).toContainText(amount);
        await expect(page.locator('#fromAccountId')).toContainText(`${accountNumber}`);


    });


    test('Getting Transaction Using API', async ({ page }) => {

        await loginPage.logo.click();
        await page.waitForLoadState('domcontentloaded');

        const billPage = new BillPage(page);


        // Open New Account
        await page.locator('text=Open New Account').click();
        await page.waitForLoadState('domcontentloaded');
        await page.selectOption('select[id="type"]', '1');
        // await page.pause();
        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await page.waitForLoadState('domcontentloaded');

        // await page.pause();
        await page.waitForTimeout(3000);
        await page.waitForSelector('#newAccountId');
        const accountNumber = await page.locator('#newAccountId').textContent();
        console.log('Account Number:', accountNumber);

        // Verify Account Creation
        await page.locator('text=Accounts Overview').click();
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

        await expect(page.locator('#accountTable')).toContainText(`${accountNumber}`);
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

        // Transfer Funds
        await page.locator('text=Transfer Funds').click();
        await page.waitForLoadState('domcontentloaded');

        await page.locator('input[id="amount"]').fill(amount);
        await page.locator('select[id="fromAccountId"]').selectOption(accountNumber);
        // await page.pause();

        await page.getByRole('button', { name: 'Transfer' }).click();
        await page.waitForLoadState('domcontentloaded');
        // await page.pause();

        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
        await expect(page.locator('#amountResult')).toContainText(amount + '.00');
        await expect(page.locator('#fromAccountIdResult')).toContainText(`${accountNumber}`);
        // await page.pause();

        await page.locator('text=Bill Pay').click();
        await page.waitForLoadState('domcontentloaded');

        await billPage.paybill(`${firstName} ${lastName}`, '123 Main St', 'Anytown', 'CA', '12345', phoneNumber, `${accountNumber}`, `${accountNumber}`, amount);

        await expect(page.locator('#billpayResult .title')).toContainText('Bill Payment Complete');
        await expect(page.locator('#amount')).toContainText(amount);
        await expect(page.locator('#fromAccountId')).toContainText(`${accountNumber}`);        

        const cookie = await page.context().cookies();
        console.log('Cookies:', cookie);



        const apiContext = await request.newContext({
            baseURL: 'https://parabank.parasoft.com',
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': cookie.map(c => `${c.name}=${c.value}`).join('; ')
            }
        });

        const requestUrl = 'https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/' + `${accountNumber}`;
        const response = await apiContext.get(requestUrl + '/transactions/amount/50?timeout=30000');

        console.log('Response Status:', response.status());
        console.log('Response Body:', await response.json());



    });
});