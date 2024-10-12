import { Page } from '@playwright/test';
import { Input } from '../../page-factory/input';
import { Title } from '../../page-factory/title';
import { Button } from '../../page-factory/button';

type Credentials = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
};

export class SignUpModal {
  private readonly modalTitle: Title;
  private readonly firstNameInput: Input;
  private readonly lastNameInput: Input;
  private readonly emailInput: Input;
  private readonly phoneInput: Input;
  private readonly organizationInput: Input;
  private readonly continueCheckoutButton: Button;

  constructor(public page: Page) {
    this.modalTitle = new Title({ page, locator: "//div[@class='o--header o--SectionGroup--sectionGroup']/h1", name: 'Sign Up' });
    this.firstNameInput = new Input({ page, locator: "[name='Person.FirstName']", name: 'First name' });
    this.lastNameInput = new Input({ page, locator: "[name='Person.LastName']", name: 'Last name' });
    this.emailInput = new Input({ page, locator: "[name='Person.Email']", name: 'Email' });
    this.phoneInput = new Input({ page, locator: "[name='Person.PhoneMobile']", name: 'Phone' });
    this.organizationInput = new Input({ page, locator: "[name='Account.Name']", name: 'Organization' });
    this.continueCheckoutButton = new Button({ page, locator: "//span[text()='Continue to checkout']/..", name: 'Continue to Checkout' });
  }

  async modalIsOpened(): Promise<void> {
    await this.modalTitle.shouldBeVisible();
    // await this.modalTitle.shouldHaveText("Sign Up");
    await this.firstNameInput.shouldBeVisible();
    await this.lastNameInput.shouldBeVisible();
    await this.emailInput.shouldBeVisible();
    await this.phoneInput.shouldBeVisible();
    await this.continueCheckoutButton.shouldBeDisabled();
  }

  async fillAllInputsAndContinue({firstName, lastName, email, phone, organization }: Credentials) {
    await this.firstNameInput.fill(firstName, { validateValue: true });
    await this.lastNameInput.fill(lastName, { validateValue: true });
    await this.emailInput.fill(email, { validateValue: true });
    await this.phoneInput.fill(phone, { validateValue: true });
    await this.organizationInput.fill(organization, { validateValue: true });

    await this.continueCheckoutButton.shouldBeEnabled();
    await this.continueCheckoutButton.click();
  }
}
