import { Page } from '@playwright/test';
import { Input } from '../../page-factory/input';
import { Title } from '../../page-factory/title';
import { Button } from '../../page-factory/button';
import { Span } from '../../page-factory/span';

export class ProfileModal {
  private readonly profileTitle: Title;
  private readonly profileButton: Button;
  private readonly accountButton: Button;
  private readonly teamMembersButton: Button;
  private readonly planButton: Button;
  private readonly billingButton: Button;
  private readonly inviteNewTeamMemberButton: Button;
  private readonly emailInput: Input;
  private readonly nameInput: Input;
  private readonly familyNameInput: Input;
  private readonly invitedEmailSpan: Span;


  constructor(public page: Page) {
    this.profileTitle = new Title({ page, locator: "//h1[text()='Profile']", name: 'Profile' });
    this.profileButton = new Button({ page, locator: "//a[text()='Profile']", name: 'Profile' });
    this.accountButton = new Button({ page, locator: "//a[text()='Account']", name: 'Account' });
    this.teamMembersButton = new Button({ page, locator: "//a[text()='Team Members']", name: 'Team Members' });
    this.planButton = new Button({ page, locator: "//a[text()='Plan']", name: 'Plan' });
    this.billingButton = new Button({ page, locator: "//a[text()='Billing']", name: 'Billing' });
    this.inviteNewTeamMemberButton = new Button({ page, locator: "//span[text()='Invite new team member']/..", name: 'Invite new team member' });
    this.emailInput = new Input({ page, locator: "#email", name: 'email' });
    this.nameInput = new Input({ page, locator: "#given-name", name: 'name' });
    this.familyNameInput = new Input({ page, locator: "#family-name", name: 'family name' });
    this.invitedEmailSpan = new Input({ page, locator: "//span[text()='{email}']", name: 'invited email' });
  }

  async modalIsOpened(): Promise<void> {
    await this.profileTitle.shouldBeVisible();
    await this.profileButton.shouldBeVisible();
    await this.profileButton.shouldBeClickable();
    await this.accountButton.shouldBeVisible();
    await this.accountButton.shouldBeClickable();
    await this.teamMembersButton.shouldBeVisible();
    await this.teamMembersButton.shouldBeClickable();
    await this.planButton.shouldBeVisible();
    await this.planButton.shouldBeClickable();
    await this.billingButton.shouldBeVisible();
    await this.billingButton.shouldBeClickable();

  }

  async inviteNewTeamMember(email:string, firstName: string, lastName: string): Promise<void> {
    await this.teamMembersButton.click();
    await this.inviteNewTeamMemberButton.click();
    await this.emailInput.fill(email)
    await this.nameInput.fill(firstName)
    await this.familyNameInput.fill(lastName)
    await this.inviteNewTeamMemberButton.click();

    await this.invitedEmailSpan.shouldBeVisible({email})
  }


}
