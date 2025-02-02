import { Page } from '@playwright/test';
import { Link } from '../../page-factory/link';
import { LoginModal } from '../modals/login-modal';
import { CheckoutModal } from '../modals/checkout-modal';
import { SignUpModal } from '../modals/sign-up-modal';
import { SelectPlanModal } from '../modals/select-plan-modal';
import { SetPasswordModal } from '../modals/set-password-modal';
import { ProfileModal } from '../modals/profile-modal';

export class Navbar {
  readonly loginModal: LoginModal;
  readonly checkoutModal: CheckoutModal;
  readonly signUpModal: SignUpModal;
  readonly selectPlanModal: SelectPlanModal;
  readonly setPasswordModal: SetPasswordModal;
  readonly profileModal: ProfileModal;

  private readonly loginLinkProd: Link;
  private readonly loginLinkDev: Link;
  private readonly signUpLink: Link;
  private readonly contactUsLink: Link;
  private readonly aboutLink: Link;

  constructor(public page: Page) {
    this.loginModal = new LoginModal(page);
    this.checkoutModal = new CheckoutModal(page);
    this.signUpModal = new SignUpModal(page);
    this.selectPlanModal = new SelectPlanModal(page);
    this.setPasswordModal = new SetPasswordModal(page);
    this.profileModal = new ProfileModal(page);

    this.loginLinkProd = new Link({ page, locator: "//a[text()='Login']", name: 'Login' });
    this.loginLinkDev = new Link({ page, locator: "//p[text()='Log in']", name: 'Login' });
    this.signUpLink = new Link({ page, locator: "//a[text()='Sign-Up']", name: 'Sign-Up' });
    this.contactUsLink = new Link({ page, locator: "//a[text()='Contact Us']", name: 'Contact Us' });
    this.aboutLink = new Link({ page, locator: "//a[text()='About']", name: 'About' });
  }

 async visitLogin(): Promise<void> {
    const currentUrl = this.page.url();

    if (currentUrl.includes('dev.cvreformatter.com')) {
      await this.loginLinkDev.shouldBeVisible();
      await this.loginLinkDev.click();

    } else if (currentUrl.includes('www.cvreformatter.com')) {
      await this.loginLinkProd.shouldBeVisible();
      await this.loginLinkProd.click();

    } else {
      throw new Error(`Undefined env: ${currentUrl}`);
    }

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
