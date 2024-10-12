import { Page } from '@playwright/test';
import { Input } from '../../page-factory/input';
import { Title } from '../../page-factory/title';
import { Button } from '../../page-factory/button';

type Credentials = {
  email: string;
  password: string;
};

export class LoginModal {
  private readonly loginTitle: Title;
  private readonly emailInput: Input;
  private readonly passwordInput: Input;
  private readonly loginButton: Button;

  constructor(public page: Page) {
    this.loginTitle = new Title({ page, locator: "//h1[text()='Login']", name: 'Login' });
    this.emailInput = new Input({ page, locator: "#o-auth-username", name: 'Email' });
    this.loginButton = new Button({ page, locator: "//span[text()='Login']/..", name: 'Login' });
    this.passwordInput = new Input({ page, locator: "#o-auth-password", name: 'Password' });
  }

  async modalIsOpened(): Promise<void> {
    await this.loginTitle.shouldBeVisible();
    await this.loginTitle.shouldHaveText("Login");
    await this.emailInput.shouldBeVisible();
    await this.loginButton.shouldBeVisible();
    await this.passwordInput.shouldBeVisible();
  }

  async login({ email, password }: Credentials) {
    await this.emailInput.click();
    await this.emailInput.fill(email, { validateValue: true });
    await this.passwordInput.click();
    await this.passwordInput.fill(password, { validateValue: true });
    await this.loginButton.click();
  }
}
