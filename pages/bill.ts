import { Locator, Page } from "@playwright/test";

export class BillPage {
  readonly page: Page;
  readonly billPayLink: Locator;
  readonly payeeNameInput: Locator;
  readonly payeeAddressInput: Locator;
  readonly payeeCityInput: Locator;
  readonly payeeStateInput: Locator;
  readonly payeeZipCodeInput: Locator;
  readonly payeePhoneNumberInput: Locator;
  readonly accountNumberInput: Locator;
  readonly verifyAccountNumberInput: Locator;
  readonly amountInput: Locator;
  readonly fromAccountIdSelect: Locator;
  readonly sendPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billPayLink = page.locator('text=Bill Pay');
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.payeeAddressInput = page.locator('input[name="payee.address.street"]');
    this.payeeCityInput = page.locator('input[name="payee.address.city"]');
    this.payeeStateInput = page.locator('input[name="payee.address.state"]');
    this.payeeZipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.payeePhoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountNumberInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountIdSelect = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.locator('text=Send Payment');
  }

  async paybill(payeeName: string, payeeAddress: string, payeeCity: string, payeeState: string, payeeZipCode: string, payeePhoneNumber: string, accountNumber: string, verifyAccountNumber: string, amount: string) {
    await this.payeeNameInput.fill(payeeName);
    await this.payeeAddressInput.fill(payeeAddress);
    await this.payeeCityInput.fill(payeeCity);
    await this.payeeStateInput.fill(payeeState);
    await this.payeeZipCodeInput.fill(payeeZipCode);
    await this.payeePhoneNumberInput.fill(payeePhoneNumber);
    await this.accountNumberInput.fill(accountNumber);
    await this.verifyAccountNumberInput.fill(verifyAccountNumber);
    await this.amountInput.fill(amount);
    await this.fromAccountIdSelect.selectOption({ index: 0 });

    // await this.page.pause();
    await this.sendPaymentButton.click();
  
  }
}