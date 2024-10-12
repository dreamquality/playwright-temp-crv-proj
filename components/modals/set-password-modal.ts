import { Page } from '@playwright/test';
import { Input } from '../../page-factory/input';
import { Title } from '../../page-factory/title';
import { Button } from '../../page-factory/button';

type Credentials = {
  password: string;
};

export class SetPasswordModal {
  // private readonly mainTitle: Title;
  private readonly passwordInput: Input;
  private readonly setPasswordButton: Button;
  private readonly cancelSettingPasswordButton: Button;

  constructor(public page: Page) {
    // this.mainTitle = new Title({ page, locator: "//h1[text()='Login']", name: 'Login' });
    this.passwordInput = new Input({ page, locator: "#o-auth-password", name: 'Password' });
    this.setPasswordButton = new Button({ page, locator: "//button[1]", name: 'Set Password' });
    this.cancelSettingPasswordButton = new Button({ page, locator: "//button[2]", name: 'Cancel' });
  }

  async modalIsOpened(): Promise<void> {
    // await this.loginTitle.shouldBeVisible();
    await this.passwordInput.shouldBeVisible();
    await this.setPasswordButton.shouldBeVisible();
    await this.setPasswordButton.shouldBeDisabled();
    await this.cancelSettingPasswordButton.shouldBeVisible();
  }

  async setPassword({ password }: Credentials) { 
    await this.passwordInput.fill(password, { validateValue: true });
    await this.setPasswordButton.shouldBeEnabled();
    await this.setPasswordButton.click();
  }
}
