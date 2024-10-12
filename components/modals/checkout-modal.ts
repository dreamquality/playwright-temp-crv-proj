import { Page } from '@playwright/test';
import { Title } from '../../page-factory/title';
import { Button } from '../../page-factory/button';
import { Checkbox } from '../../page-factory/checkbox';


export class CheckoutModal {
  private readonly modalTitle: Title;
  private readonly serviceTermsCheckbox: Checkbox;
  private readonly completeCheckoutButton: Button;

  constructor(public page: Page) {
    this.modalTitle = new Title({ page, locator: "//h1[text()='Checkout']", name: 'Checkout' });
    this.serviceTermsCheckbox = new Checkbox({ page, locator: "input[type='checkbox'][required]", name: 'Service terms' });
    this.completeCheckoutButton = new Button({ page, locator: "//span[text()='Complete sign up']/..", name: 'Complete checkout button' });
  }

  async modalIsOpened(): Promise<void> {
    await this.modalTitle.shouldBeVisible();
    await this.serviceTermsCheckbox.shouldBeVisible();
    await this.completeCheckoutButton.shouldBeVisible();
    await this.completeCheckoutButton.shouldBeDisabled();
  }
  
  async agreeWithTerms(): Promise<void> {
    await this.serviceTermsCheckbox.click()
    await this.completeCheckoutButton.shouldBeEnabled();
  }
  
  async clickOnCompleteSignUpButton(): Promise<void> {
    await this.completeCheckoutButton.click();
  }


}
