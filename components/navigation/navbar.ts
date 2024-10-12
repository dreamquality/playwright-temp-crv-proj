import { Page } from '@playwright/test';
import { Link } from '../../page-factory/link';
import { LoginModal } from '../modals/login-modal';
import { CheckoutModal } from '../modals/checkout-modal';
import { SignUpModal } from '../modals/sign-up-modal';
import { SelectPlanModal } from '../modals/select-plan-modal';
import { SetPasswordModal } from '../modals/set-password-modal';

export class Navbar {
  readonly loginModal: LoginModal;
  readonly checkoutModal: CheckoutModal;
  readonly signUpModal: SignUpModal;
  readonly selectPlanModal: SelectPlanModal;
  readonly setPasswordModal: SetPasswordModal;

  private readonly loginLink: Link;
  private readonly signUpLink: Link;
  private readonly contactUsLink: Link;
  private readonly aboutLink: Link;

  constructor(public page: Page) {
    this.loginModal = new LoginModal(page);
    this.checkoutModal = new CheckoutModal(page);
    this.signUpModal = new SignUpModal(page);
    this.selectPlanModal = new SelectPlanModal(page);
    this.setPasswordModal = new SetPasswordModal(page);

    this.loginLink = new Link({ page, locator: "//a[text()='Login']", name: 'Login' });
    this.signUpLink = new Link({ page, locator: "//a[text()='Sign-Up']", name: 'Sign-Up' });
    this.contactUsLink = new Link({ page, locator: "//a[text()='Contact Us']", name: 'Contact Us' });
    this.aboutLink = new Link({ page, locator: "//a[text()='About']", name: 'About' });
  }

  async visitLogin(): Promise<void> {
    await this.loginLink.shouldBeVisible();
    await this.loginLink.click();

    await this.loginModal.modalIsOpened();
  }

  async visitSignUp(): Promise<void> {
    await this.signUpLink.click();
  }

  async visitContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }

  async visitAbout(): Promise<void> {
    await this.aboutLink.click();
  }

}
